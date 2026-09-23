'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/** Legacy outreach emails used `/?campaign=&exec=` — forward to `/pilot`. */
export function PilotOutreachRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const campaign = searchParams.get('campaign')?.trim();
    const exec = searchParams.get('exec')?.trim();
    if (!campaign || !exec) return;

    const qs = new URLSearchParams({ campaign, exec });
    router.replace(`/pilot?${qs.toString()}`);
  }, [router, searchParams]);

  return null;
}
