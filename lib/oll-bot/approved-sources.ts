/**
 * Fetches text from allowlisted OLL websites and injects it into the agent prompt.
 * This is how the bot "reads" your sites — not open-web search (Tavily/Bifrost).
 *
 * Note: www.platform.ollacademy.com and www.research.ollacademy.com do not resolve;
 * use platform.ollacademy.com and research.ollacademy.com instead.
 */

import { ALLOWED_DOMAINS } from '@/lib/oll-bot/guardrails';

/** Working pages on allowlisted hosts (expand as needed). */
export const APPROVED_SOURCE_URLS = [
  'https://www.theorganizationlearninglabs.com/',
  'https://www.ollacademy.com/',
  'https://www.ollacademy.com/about',
  'https://www.ollacademy.com/platform',
  'https://www.ollacademy.com/research',
  'https://www.ollacademy.com/for-professionals',
  'https://www.ollacademy.com/for-organizations',
  'https://platform.ollacademy.com/',
  'https://research.ollacademy.com/',
] as const;

const FETCH_TIMEOUT_MS = 10000;
const MAX_CHARS_PER_PAGE = 4000;
const MAX_TOTAL_CHARS = 18000;
const CACHE_TTL_MS = 15 * 60 * 1000;

type CacheEntry = { text: string; expiresAt: number };

const cache = new Map<string, CacheEntry>();

function isAllowedUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return ALLOWED_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));
  } catch {
    return false;
  }
}

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchPageText(url: string): Promise<string | null> {
  if (!isAllowedUrl(url)) return null;

  const cached = cache.get(url);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.text;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; OLL-Academy-Bot/1.0; +https://www.ollacademy.com)',
        Accept: 'text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const html = await res.text();
    const text = htmlToText(html).slice(0, MAX_CHARS_PER_PAGE);
    if (text.length < 40) return null;

    cache.set(url, { text, expiresAt: Date.now() + CACHE_TTL_MS });
    return text;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Pull excerpts from allowlisted OLL sites for prompt grounding. */
export async function fetchApprovedSourceContext(): Promise<string> {
  const results = await Promise.all(
    APPROVED_SOURCE_URLS.map(async (url) => {
      const text = await fetchPageText(url);
      if (!text) return null;
      return `Source: ${url}\n${text}`;
    })
  );

  const parts: string[] = [];
  let total = 0;
  for (const part of results) {
    if (!part) continue;
    if (total + part.length > MAX_TOTAL_CHARS) {
      const room = MAX_TOTAL_CHARS - total;
      if (room > 200) parts.push(part.slice(0, room));
      break;
    }
    parts.push(part);
    total += part.length;
  }

  if (parts.length === 0) {
    return '';
  }

  return (
    `Fetched ${parts.length} approved page(s).\n\n` + parts.join('\n\n---\n\n')
  );
}
