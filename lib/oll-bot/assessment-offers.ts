export type AssessmentOffer = {
  content_id: string;
  content_code?: string;
  title: string;
  description?: string;
  price_original?: number;
  price_discount?: number;
  display_price?: number;
  credits?: number;
  banner_image?: string;
  category?: string;
  marketplace_url?: string;
  buy_url?: string;
  add_to_cart_url?: string;
};

const CARD_HINT =
  /(?:\n\s*)?Use the View\s*\/\s*Buy\s*\/\s*Add to cart buttons on the cards above\.?/gi;

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return undefined;
}

function parseOffer(raw: unknown): AssessmentOffer | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  const title = asString(obj.title);
  const contentId = asString(obj.content_id || obj.id);
  if (!title) return null;

  const marketplaceUrl = asString(obj.marketplace_url || obj.view_url || obj.url);
  const buyUrl = asString(obj.buy_url);
  const addToCartUrl = asString(obj.add_to_cart_url);
  if (!contentId && !marketplaceUrl && !buyUrl && !addToCartUrl) return null;

  return {
    content_id: contentId || title,
    content_code: asString(obj.content_code) || undefined,
    title,
    description: asString(obj.description) || undefined,
    price_original: asNumber(obj.price_original),
    price_discount: asNumber(obj.price_discount),
    display_price: asNumber(obj.display_price),
    credits: asNumber(obj.credits),
    banner_image: asString(obj.banner_image) || undefined,
    category: asString(obj.category) || undefined,
    marketplace_url: marketplaceUrl || undefined,
    buy_url: buyUrl || undefined,
    add_to_cart_url: addToCartUrl || undefined,
  };
}

function parseOfferList(raw: unknown): AssessmentOffer[] {
  if (!Array.isArray(raw)) return [];
  const offers: AssessmentOffer[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    const offer = parseOffer(item);
    if (!offer) continue;
    const key = offer.content_id || offer.title;
    if (seen.has(key)) continue;
    seen.add(key);
    offers.push(offer);
  }
  return offers;
}

type A2uiComponent = {
  id?: string;
  component?: Record<string, Record<string, unknown>>;
};

function componentName(node: A2uiComponent): string {
  const comp = node.component;
  if (!comp || typeof comp !== 'object') return '';
  return Object.keys(comp)[0] || '';
}

function componentProps(node: A2uiComponent): Record<string, unknown> {
  const name = componentName(node);
  const props = node.component?.[name];
  return props && typeof props === 'object' ? props : {};
}

function literalText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj.literalString === 'string') return obj.literalString.trim();
    if (typeof obj.literal === 'string') return obj.literal.trim();
  }
  return '';
}

function childIds(node: A2uiComponent): string[] {
  const props = componentProps(node);
  if (typeof props.child === 'string' && props.child) return [props.child];
  const children = props.children;
  if (Array.isArray(children)) {
    return children.filter((id): id is string => typeof id === 'string');
  }
  if (children && typeof children === 'object') {
    const list = (children as Record<string, unknown>).explicitList;
    if (Array.isArray(list)) {
      return list.filter((id): id is string => typeof id === 'string');
    }
  }
  return [];
}

function collectFromA2uiMessages(raw: unknown): AssessmentOffer[] {
  if (!Array.isArray(raw)) return [];
  const offers: AssessmentOffer[] = [];

  for (const message of raw) {
    if (!message || typeof message !== 'object') continue;
    const msg = message as Record<string, unknown>;
    const surface =
      (msg.surfaceUpdate && typeof msg.surfaceUpdate === 'object'
        ? (msg.surfaceUpdate as Record<string, unknown>)
        : null) ||
      (msg.updateComponents && typeof msg.updateComponents === 'object'
        ? (msg.updateComponents as Record<string, unknown>)
        : null);
    const components = Array.isArray(surface?.components)
      ? (surface.components as A2uiComponent[])
      : Array.isArray(msg.components)
        ? (msg.components as A2uiComponent[])
        : [];
    if (components.length === 0) continue;

    const byId = new Map<string, A2uiComponent>();
    for (const node of components) {
      if (node?.id) byId.set(node.id, node);
    }

    const walk = (id: string, acc: { texts: string[]; buttons: { label: string; url: string }[] }) => {
      const node = byId.get(id);
      if (!node) return;
      const name = componentName(node);
      const props = componentProps(node);
      if (name === 'Text') {
        const text = literalText(props.text) || literalText(props);
        if (text) acc.texts.push(text);
      }
      if (name === 'Button') {
        const action =
          props.action && typeof props.action === 'object'
            ? (props.action as Record<string, unknown>)
            : null;
        const context =
          action?.context && typeof action.context === 'object'
            ? (action.context as Record<string, unknown>)
            : {};
        const url = asString(context.url);
        const label =
          asString(context.label) ||
          (typeof props.child === 'string'
            ? literalText(componentProps(byId.get(props.child) || {}).text)
            : '') ||
          asString(action?.name);
        if (url) acc.buttons.push({ label, url });
      }
      for (const child of childIds(node)) walk(child, acc);
    };

    const cards = components.filter((node) => componentName(node) === 'Card');
    for (const card of cards) {
      const acc = { texts: [] as string[], buttons: [] as { label: string; url: string }[] };
      if (card.id) walk(card.id, acc);
      const title = acc.texts[0];
      if (!title) continue;
      const description = acc.texts.find(
        (text, index) => index > 0 && !/^price:/i.test(text)
      );
      const view = acc.buttons.find((b) => /view/i.test(b.label)) || acc.buttons[0];
      const buy = acc.buttons.find((b) => /^buy$/i.test(b.label));
      const cart = acc.buttons.find((b) => /cart/i.test(b.label));
      offers.push({
        content_id: card.id || title,
        title,
        description,
        marketplace_url: view?.url,
        buy_url: buy?.url,
        add_to_cart_url: cart?.url,
      });
    }
  }

  return offers;
}

function resultObject(payload: Record<string, unknown>): Record<string, unknown> | null {
  return payload.result && typeof payload.result === 'object'
    ? (payload.result as Record<string, unknown>)
    : null;
}

/** Pull marketplace cards from wait/stream agent payloads (offers or A2UI). */
export function extractAssessmentOffers(
  payload: Record<string, unknown>
): AssessmentOffer[] {
  const result = resultObject(payload);
  const toolResult =
    result?.tool_result && typeof result.tool_result === 'object'
      ? (result.tool_result as Record<string, unknown>)
      : null;

  const direct = [
    parseOfferList(payload.assessment_offers),
    parseOfferList(result?.assessment_offers),
    parseOfferList(toolResult?.offers),
  ].find((list) => list.length > 0);

  if (direct && direct.length > 0) return direct;

  return [
    ...collectFromA2uiMessages(payload.a2ui_messages),
    ...collectFromA2uiMessages(result?.a2ui_messages),
  ];
}

function normalizeTitle(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').replace(/[–—-]/g, '-').trim();
}

function lineMatchesOffer(line: string, offers: AssessmentOffer[]): boolean {
  const item = line
    .trim()
    .replace(/^(?:\d+[.)]\s+|[-*•]\s+)/, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!item) return false;
  const needle = normalizeTitle(item);
  return offers.some((offer) => {
    const title = normalizeTitle(offer.title);
    return title === needle || title.includes(needle) || needle.includes(title);
  });
}

/** Drop the leftover "cards above" hint and duplicate numbered lists once cards render. */
export function cleanupOfferReply(text: string, offers: AssessmentOffer[]): string {
  let out = text.replace(CARD_HINT, '').trim();
  if (offers.length === 0) return out;

  const lines = out.split('\n');
  let removed = 0;
  const kept = lines.filter((line) => {
    if (!/^(?:\d+[.)]\s+|[-*•]\s+)/.test(line.trim())) return true;
    if (!lineMatchesOffer(line, offers)) return true;
    removed += 1;
    return false;
  });

  if (removed >= 2) {
    out = kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }
  return out;
}
