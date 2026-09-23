'use client';

import { useState } from 'react';
import type { CatalogNode } from '@/lib/oll-bot/catalog';
import type { PilotSessionContext } from '@/lib/oll-bot/pilot-api';
import { PossibilityCard } from './PossibilityCard';
import { ConsultationCTA } from './ConsultationCTA';
import { LeadCaptureForm } from './LeadCaptureForm';
import { NominationForm } from './NominationForm';
import { ThankYouCard } from './ThankYouCard';

export function CatalogRenderer({
  nodes,
  onContinue,
  pilotContext,
}: {
  nodes: CatalogNode[];
  onContinue?: () => void;
  pilotContext?: PilotSessionContext;
}) {
  const [showLead, setShowLead] = useState(false);
  const [thankYou, setThankYou] = useState<'lead' | 'nomination' | null>(null);
  const [nominationResult, setNominationResult] = useState<{
    is_auto_assigned?: boolean;
    message?: string;
  } | null>(null);

  if (thankYou === 'lead') {
    return (
      <ThankYouCard
        title="Thank you"
        body="We received your request. The OLL team will be in touch shortly."
      />
    );
  }

  if (thankYou === 'nomination') {
    const autoAssigned = nominationResult?.is_auto_assigned !== false;
    return (
      <ThankYouCard
        title="Nomination submitted"
        body={
          nominationResult?.message ||
          (autoAssigned
            ? 'Thank you. We matched the nominee to a diagnostic assessment and sent them an invitation. You will receive the diagnostic report when they complete it.'
            : 'Thank you. We could not auto-match this job title — our team will assign the right assessment shortly. You will receive the diagnostic report when the nominee completes it.')
        }
      />
    );
  }

  return (
    <div className="ml-[46px] space-y-2.5">
      {nodes.map((node, i) => {
        switch (node.type) {
          case 'PossibilityCard':
            return <PossibilityCard key={`c-${i}`} {...node.props} />;
          case 'ConsultationCTA':
            return (
              <ConsultationCTA
                key={`c-${i}`}
                {...node.props}
                onPrimary={() => setShowLead(true)}
                onSecondary={onContinue}
              />
            );
          case 'LeadCaptureForm':
            return (
              <LeadCaptureForm
                key={`c-${i}`}
                {...node.props}
                onSuccess={() => setThankYou('lead')}
              />
            );
          case 'nomination_form':
            return (
              <NominationForm
                key={`c-${i}`}
                {...node.props}
                pilotContext={pilotContext}
                onSuccess={(result) => {
                  setNominationResult(result);
                  setThankYou('nomination');
                }}
              />
            );
          case 'ThankYouCard':
            return <ThankYouCard key={`c-${i}`} {...node.props} />;
          default:
            return null;
        }
      })}
      {showLead && !nodes.some((n) => n.type === 'LeadCaptureForm') ? (
        <LeadCaptureForm onSuccess={() => setThankYou('lead')} />
      ) : null}
    </div>
  );
}
