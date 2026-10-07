import type { AutocompleteOption } from '@/components/oll-bot/catalog/AutocompleteField';

export const JOB_ROLES_PAGE_SIZE = 40;

export type JobRoleRow = {
  id?: string;
  job_role?: string;
  sub_industry?: string;
  sub_industry_id?: string;
  is_active?: boolean;
};

export type RoleOption = AutocompleteOption & {
  subIndustry?: string;
  subIndustryId?: string;
};

export type JobRolesPagination = {
  currentPage: number;
  hasMore: boolean;
};

export function mapJobRoleRows(rows: JobRoleRow[]): RoleOption[] {
  return rows
    .filter((row) => row.is_active !== false && row.id && row.job_role)
    .map((row) => ({
      id: String(row.id),
      label: String(row.job_role),
      subIndustry: row.sub_industry?.trim() || '',
      subIndustryId: row.sub_industry_id ? String(row.sub_industry_id) : '',
    }));
}

export function filterRolesBySubIndustryName(
  roles: RoleOption[],
  knownSubIndustry: string
): RoleOption[] {
  const sub = knownSubIndustry.toLowerCase();
  const filtered = roles.filter((role) => {
    const name = role.subIndustry?.toLowerCase() || '';
    return name === sub || name.includes(sub) || sub.includes(name);
  });
  return filtered.length > 0 ? filtered : roles;
}

function dedupeRoles(roles: RoleOption[]): RoleOption[] {
  const seen = new Set<string>();
  return roles.filter((role) => {
    if (seen.has(role.id)) return false;
    seen.add(role.id);
    return true;
  });
}

export async function fetchAssessableJobRoles(params: {
  industryId?: string;
  subIndustryId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}): Promise<{ roles: RoleOption[]; pagination: JobRolesPagination }> {
  const search = new URLSearchParams();
  if (params.subIndustryId) {
    search.set('sub_industry_id', params.subIndustryId);
  } else if (params.industryId) {
    search.set('industry_id', params.industryId);
  } else {
    return { roles: [], pagination: { currentPage: 1, hasMore: false } };
  }

  search.set('page', String(params.page ?? 1));
  search.set('page_size', String(params.pageSize ?? JOB_ROLES_PAGE_SIZE));
  if (params.search?.trim()) {
    search.set('search', params.search.trim());
  }

  const res = await fetch(
    `/api/dropdowns/job-roles-with-assessments?${search.toString()}`
  );
  const payload = (await res.json().catch(() => ({}))) as {
    data?: JobRoleRow[];
    pagination?: {
      currentPage?: number;
      nextIterationFlag?: boolean;
    };
    error?: string;
  };
  if (!res.ok) {
    throw new Error(payload.error || 'Could not load job roles');
  }

  return {
    roles: mapJobRoleRows(payload.data || []),
    pagination: {
      currentPage: payload.pagination?.currentPage ?? params.page ?? 1,
      hasMore: Boolean(payload.pagination?.nextIterationFlag),
    },
  };
}

export async function fetchAllAssessableJobRoles(params: {
  industryId?: string;
  subIndustryId?: string;
  knownSubIndustry?: string;
}): Promise<RoleOption[]> {
  let page = 1;
  let hasMore = true;
  const all: RoleOption[] = [];

  while (hasMore) {
    const { roles, pagination } = await fetchAssessableJobRoles({
      industryId: params.industryId,
      subIndustryId: params.subIndustryId,
      page,
      pageSize: JOB_ROLES_PAGE_SIZE,
    });
    all.push(...roles);
    hasMore = pagination.hasMore;
    page += 1;
    if (page > 100) break;
  }

  const deduped = dedupeRoles(all);
  if (params.knownSubIndustry) {
    return filterRolesBySubIndustryName(deduped, params.knownSubIndustry);
  }
  return deduped;
}
