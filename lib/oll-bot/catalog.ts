export type CatalogType =
  | 'PossibilityCard'
  | 'ConsultationCTA'
  | 'LeadCaptureForm'
  | 'nomination_form'
  | 'job_role_form'
  | 'marketplace_link'
  | 'role_match_actions'
  | 'ThankYouCard';

export const CATALOG_TYPES: CatalogType[] = [
  'PossibilityCard',
  'ConsultationCTA',
  'LeadCaptureForm',
  'nomination_form',
  'job_role_form',
  'marketplace_link',
  'role_match_actions',
  'ThankYouCard',
];

export type PossibilityCardProps = {
  title?: string;
  body?: string;
  status?: string;
};

export type ConsultationCTAProps = {
  title?: string;
  body?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export type LeadCaptureFormProps = {
  title?: string;
  subtitle?: string;
};

export type NominationFormProps = {
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  nominator_name?: string;
  nominator_email?: string;
  nominator_role?: string;
  organization_name?: string;
  campaign_id?: string;
  executive_id?: string;
  nominee_name?: string;
  nominee_email?: string;
  nominee_job_title?: string;
  nominee_dept?: string;
  nominee_industry?: string;
  lockIdentity?: boolean;
};

export type ThankYouCardProps = {
  title?: string;
  body?: string;
};

export type JobRoleFormProps = {
  title?: string;
  subtitle?: string;
  submitLabel?: string;
};

export type MarketplaceLinkProps = {
  title?: string;
  body?: string;
  buttonLabel?: string;
};

export type RoleMatchActionsProps = {
  industry?: string;
  industry_id?: string;
  job_role?: string;
  job_role_id?: string;
};

export type JobRoleSubmitPayload = {
  industry: string;
  industry_id: string;
  job_role: string;
  job_role_id: string;
};

export type CatalogNode =
  | { type: 'PossibilityCard'; props: PossibilityCardProps }
  | { type: 'ConsultationCTA'; props: ConsultationCTAProps }
  | { type: 'LeadCaptureForm'; props: LeadCaptureFormProps }
  | { type: 'nomination_form'; props: NominationFormProps }
  | { type: 'job_role_form'; props: JobRoleFormProps }
  | { type: 'marketplace_link'; props: MarketplaceLinkProps }
  | { type: 'role_match_actions'; props: RoleMatchActionsProps }
  | { type: 'ThankYouCard'; props: ThankYouCardProps };

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

function validateNode(raw: unknown): CatalogNode | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  const type = String(obj.type || '');
  const props =
    obj.props && typeof obj.props === 'object'
      ? (obj.props as Record<string, unknown>)
      : {};

  switch (type) {
    case 'PossibilityCard':
      return {
        type,
        props: {
          title: asString(props.title, 'Where OLL may help'),
          body: asString(
            props.body,
            'Explore research-backed capability development tailored to your context.'
          ),
          status: asString(props.status, 'AVAILABLE'),
        },
      };
    case 'ConsultationCTA':
      return {
        type,
        props: {
          title: asString(props.title, 'Talk with the OLL team'),
          body: asString(
            props.body,
            'A short conversation can clarify what is available today and what needs consultation.'
          ),
          primaryLabel: asString(props.primaryLabel, 'Request a consultation'),
          secondaryLabel: asString(props.secondaryLabel, 'Continue asking questions'),
        },
      };
    case 'LeadCaptureForm':
      return {
        type,
        props: {
          title: asString(props.title, 'Request a consultation'),
          subtitle: asString(
            props.subtitle,
            'Share your details and the OLL team will follow up.'
          ),
        },
      };
    case 'nomination_form':
    case 'NominationForm':
      return {
        type: 'nomination_form',
        props: {
          title: asString(props.title, 'Nominate an employee'),
          subtitle: asString(
            props.subtitle,
            'Nominate someone for a diagnostic scan. We will provision access and send them an invitation.'
          ),
          nominator_name: asString(props.nominator_name) || undefined,
          nominator_email: asString(props.nominator_email) || undefined,
          nominator_role: asString(props.nominator_role) || undefined,
          organization_name: asString(props.organization_name) || undefined,
          campaign_id: asString(props.campaign_id) || undefined,
          executive_id: asString(props.executive_id) || undefined,
        },
      };
    case 'job_role_form':
    case 'JobRoleForm':
      return {
        type: 'job_role_form',
        props: {
          title: asString(props.title, 'Tell us your job role'),
          subtitle: asString(
            props.subtitle,
            'We will match assessments you can use to diagnose yourself.'
          ),
          submitLabel: asString(props.submitLabel, 'Show matching assessments'),
        },
      };
    case 'marketplace_link':
    case 'MarketplaceLink':
      return {
        type: 'marketplace_link',
        props: {
          title: asString(props.title, 'OLL Academy marketplace'),
          body: asString(
            props.body,
            'Browse assessments, research, and best practices on the OLL Academy marketplace.'
          ),
          buttonLabel: asString(props.buttonLabel, 'Open marketplace'),
        },
      };
    case 'role_match_actions':
    case 'RoleMatchActions':
      return {
        type: 'role_match_actions',
        props: {
          industry: asString(props.industry) || undefined,
          industry_id: asString(props.industry_id) || undefined,
          job_role: asString(props.job_role) || undefined,
          job_role_id: asString(props.job_role_id) || undefined,
        },
      };
    case 'ThankYouCard':
      return {
        type,
        props: {
          title: asString(props.title, 'Thank you'),
          body: asString(
            props.body,
            'We received your request. The OLL team will be in touch shortly.'
          ),
        },
      };
    default:
      return null;
  }
}

const OLL_UI_FENCE = /```oll-ui\s*([\s\S]*?)```/gi;

/** Extract catalog nodes from assistant text and return cleaned visible text. */
export function parseOllUi(reply: string): { text: string; nodes: CatalogNode[] } {
  const nodes: CatalogNode[] = [];
  let text = reply;

  text = text.replace(OLL_UI_FENCE, (_full, jsonBlock: string) => {
    try {
      const parsed = JSON.parse(String(jsonBlock).trim()) as unknown;
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        const node = validateNode(item);
        if (node) nodes.push(node);
      }
    } catch {
      // ignore invalid fences
    }
    return '';
  });

  return { text: text.trim(), nodes };
}
