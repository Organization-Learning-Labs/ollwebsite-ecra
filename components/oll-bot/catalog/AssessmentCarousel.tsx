'use client';

import { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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
  ].filter((action): action is NonNullable<typeof action> => action != null);

  if (actions.length === 0) return null;

  return (
    <div className="oll-offer-actions">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`oll-offer-action oll-offer-action--${action.kind}`}
        >
          {action.kind === 'primary' ? (
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

  const scrollTo = useCallback(
    (next: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const clamped = Math.max(0, Math.min(offers.length - 1, next));
      const card = scroller.children[clamped] as HTMLElement | undefined;
      if (card) {
        scroller.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
      }
      setIndex(clamped);
    },
    [offers.length],
  );

  if (offers.length === 0) return null;

  return (
    <div className="oll-offer-carousel" role="region" aria-label="Marketplace assessments">
      <div className="oll-offer-carousel-head">
        <p className="oll-offer-carousel-label">
          {offers.length} available to buy
        </p>
        {offers.length > 1 ? (
          <div className="oll-offer-carousel-nav">
            <button
              type="button"
              onClick={() => scrollTo(index - 1)}
              disabled={index <= 0}
              className="oll-offer-carousel-btn"
              aria-label="Previous assessment"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(index + 1)}
              disabled={index >= offers.length - 1}
              className="oll-offer-carousel-btn"
              aria-label="Next assessment"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      <div
        ref={scrollerRef}
        className="oll-offer-track"
        onScroll={(event) => {
          const scroller = event.currentTarget;
          const card = scroller.children[0] as HTMLElement | undefined;
          if (!card) return;
          const gap = 10;
          const next = Math.round(scroller.scrollLeft / (card.offsetWidth + gap));
          setIndex(Math.max(0, Math.min(offers.length - 1, next)));
        }}
      >
        {offers.map((offer) => {
          const price = formatPrice(offer);
          return (
            <article key={offer.content_id} className="oll-offer-card">
              <div className="oll-offer-card-top">
                {offer.category ? (
                  <span className="oll-offer-badge">{offer.category}</span>
                ) : (
                  <span className="oll-offer-badge oll-offer-badge--default">Assessment</span>
                )}
                {price ? <span className="oll-offer-price">{price}</span> : null}
              </div>
              <p className="oll-offer-title">{offer.title}</p>
              {offer.description ? (
                <p className="oll-offer-desc">{offer.description}</p>
              ) : null}
              <OfferActions offer={offer} />
            </article>
          );
        })}
      </div>
    </div>
  );
}
