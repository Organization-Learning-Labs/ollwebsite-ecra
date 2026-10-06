'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchAssessableJobRoles,
  filterRolesBySubIndustryName,
  type RoleOption,
} from '@/lib/oll-bot/job-role-cascade';

type UsePaginatedJobRolesArgs = {
  industryId?: string;
  subIndustryId?: string;
  knownSubIndustry?: string;
  enabled: boolean;
};

function dedupeRoles(roles: RoleOption[]): RoleOption[] {
  const seen = new Set<string>();
  return roles.filter((role) => {
    if (seen.has(role.id)) return false;
    seen.add(role.id);
    return true;
  });
}

export function usePaginatedJobRoles({
  industryId,
  subIndustryId,
  knownSubIndustry,
  enabled,
}: UsePaginatedJobRolesArgs) {
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState('');
  const pageRef = useRef(1);
  const requestIdRef = useRef(0);

  const applyCampaignFilter = useCallback(
    (items: RoleOption[]) =>
      knownSubIndustry ? filterRolesBySubIndustryName(items, knownSubIndustry) : items,
    [knownSubIndustry]
  );

  const loadPage = useCallback(
    async (page: number, replace: boolean) => {
      if (!enabled) return;

      const requestId = ++requestIdRef.current;
      if (replace) {
        setLoading(true);
        setError('');
      } else {
        setLoadingMore(true);
      }

      try {
        const { roles: batch, pagination } = await fetchAssessableJobRoles({
          industryId,
          subIndustryId,
          page,
        });

        if (requestId !== requestIdRef.current) return;

        pageRef.current = pagination.currentPage;
        setHasMore(pagination.hasMore);
        setRoles((prev) => {
          const combined = replace ? batch : [...prev, ...batch];
          return applyCampaignFilter(dedupeRoles(combined));
        });
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(err instanceof Error ? err.message : 'Could not load job roles');
        if (replace) {
          setRoles([]);
          setHasMore(false);
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [applyCampaignFilter, enabled, industryId, subIndustryId]
  );

  useEffect(() => {
    if (!enabled) {
      requestIdRef.current += 1;
      setRoles([]);
      setHasMore(false);
      setLoading(false);
      setLoadingMore(false);
      pageRef.current = 1;
      return;
    }

    pageRef.current = 1;
    void loadPage(1, true);
  }, [enabled, industryId, subIndustryId, knownSubIndustry, loadPage]);

  const loadMore = useCallback(() => {
    if (!enabled || loading || loadingMore || !hasMore) return;
    void loadPage(pageRef.current + 1, false);
  }, [enabled, hasMore, loading, loadingMore, loadPage]);

  const reset = useCallback(() => {
    requestIdRef.current += 1;
    pageRef.current = 1;
    setRoles([]);
    setHasMore(false);
    setError('');
  }, []);

  return {
    roles,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    reset,
  };
}
