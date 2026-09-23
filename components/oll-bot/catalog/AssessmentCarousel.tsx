'use client';

import { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ShoppingCart } from 'lucide-react';
import type { AssessmentOffer } from '@/lib/oll-bot/assessment-offers';

function formatPrice(offer: AssessmentOffer): string | null {
  const price = offer.display_price ?? offer.price_discount ?? offer.price_original;
  const credits = offer.credits;
  if ((price == null || price === 0) && (credits == null || credits === 0)) {
    return null;
  }
  if (price && price > 0) {
    return credits && credits > 0 ? `$${price} · ${credits} credits` : `$${price}`;
  }
  if (credits && credits > 0) return `${credits} credits`;
  return null;
}

function OfferActions({ offer }: { offer: AssessmentOffer }) {
  const actions = [
    offer.marketplace_url
      ? { href: offer.marketplace_url, label: 'View', kind: 'primary' as const }
      : null,
    offer.buy_url ? { href: offer.buy_url, label: 'Buy', kind: 'secondary' as const } : null,
    offer.add_to_cart_url
      ? { href: offer.add_to_cart_url, label: 'Add to cart', kind: 'ghost' as const }
      : null,
  ].filter((action): action is NonNullable<typeof action> => action != null);

  if (actions.length === 0) return null;

  return (
    <div className="mt-auto flex flex-wrap gap-1.5">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            action.kind === 'primary'
              ? 'inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400'
              : action.kind === 'secondary'
                ? 'inline-flex items-center gap-1 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-primary-700 transition hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
                : 'inline-flex items-center gap-1 rounded-full border border-[#D6E0F0] bg-[#F8FAFC] px-3 py-1.5 text-[11px] font-medium text-gray-700 transition hover:border-primary-300 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          }
        >
          {action.kind === 'ghost' ? (
            <ShoppingCart className="h-3 w-3" aria-hidden />
          ) : action.kind === 'primary' ? (
            <ExternalLink className="h-3 w-3" aria-hidden />
          ) : null}
          {action.label}
        </a>
      ))}
    </div>
  );
}

export function AssessmentCarousel({ offers }: { offers: AssessmentOffer[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((next: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const clamped = Math.max(0, Math.min(offers.length - 1, next));
    const card = scroller.children[clamped] as HTMLElement | undefined;
    if (card) {
      scroller.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
    setIndex(clamped);
  }, [offers.length]);

  if (offers.length === 0) return null;

  return (
    <div className="ml-[46px] space-y-2" role="region" aria-label="Marketplace assessments">
      <div className="flex items-center justify-between gap-2 pr-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-600">
          {offers.length} available to buy
        </p>
        {offers.length > 1 ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollTo(index - 1)}
              disabled={index <= 0}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#D6E0F0] bg-white text-primary-700 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-label="Previous assessment"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(index + 1)}
              disabled={index >= offers.length - 1}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#D6E0F0] bg-white text-primary-700 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-label="Next assessment"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(event) => {
          const scroller = event.currentTarget;
          const card = scroller.children[0] as HTMLElement | undefined;
          if (!card) return;
          const next = Math.round(scroller.scrollLeft / (card.offsetWidth + 10));
          setIndex(Math.max(0, Math.min(offers.length - 1, next)));
        }}
      >
        {offers.map((offer) => {
          const price = formatPrice(offer);
          return (
            <article
              key={offer.content_id}
              className="flex w-[min(248px,78%)] shrink-0 snap-start flex-col rounded-xl border border-primary-100 bg-white p-3.5 shadow-sm"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                {offer.category ? (
                  <span className="rounded-full bg-secondary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-700">
                    {offer.category}
                  </span>
                ) : (
                  <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-700">
                    Assessment
                  </span>
                )}
                {price ? (
                  <span className="text-[11px] font-semibold text-primary-700">{price}</span>
                ) : null}
              </div>
              <h3 className="text-[13px] font-semibold leading-snug text-primary-900">
                {offer.title}
              </h3>
              {offer.description ? (
                <p className="mt-1.5 line-clamp-3 text-[12px] leading-relaxed text-gray-600">
                  {offer.description}
                </p>
              ) : null}
              <div className="mt-3">
                <OfferActions offer={offer} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
