"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import { splitKpis } from "@/lib/clusters/kpis";

const BASE_URL = "https://api.ollacademy.com/api";

type Industry = {
  id: string;
  industry: string;
  is_active: boolean;
  is_published: boolean;
};

type SubIndustry = {
  id: string;
  industry_id: string;
  sub_industry: string;
  is_active: boolean;
  is_published: boolean;
};

type JobRole = {
  id: string;
  industry: string;
  industry_id: string;
  sub_industry: string;
  sub_industry_id: string;
  job_role: string;
  career_grade_label: string;
  career_grade_code: string;
  responsibility_id: string;
  job_category: string[];
};

type ClusterDetail = {
  id: number | string;
  cluster: string;
  description: string;
};

type CompetenceClusterResponse = {
  job_role: string;
  description: string;
  responsibility: string;
  career_grade_label: string;
  clusters: ClusterDetail[];
};

export function ClusterExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [industryId, setIndustryId] = useState<string>(params.get("industry") ?? "");
  const [subIndustryId, setSubIndustryId] = useState<string>(params.get("sub") ?? "");
  const [roleId, setRoleId] = useState<string>(params.get("role") ?? "");

  const [industries, setIndustries] = useState<Industry[]>([]);
  const [subIndustries, setSubIndustries] = useState<SubIndustry[]>([]);
  const [roles, setRoles] = useState<JobRole[]>([]);

  const [roleDetails, setRoleDetails] = useState<CompetenceClusterResponse | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams();
    if (industryId) next.set("industry", industryId);
    if (subIndustryId) next.set("sub", subIndustryId);
    if (roleId) next.set("role", roleId);
    const qs = next.toString();
    if (qs !== params.toString()) router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [industryId, subIndustryId, roleId, pathname, params, router]);

  useEffect(() => {
    fetch(`${BASE_URL}/dropdowns/industries`)
      .then((r) => r.json())
      .then((res) => {
        if (res.data) setIndustries(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!industryId) {
      setSubIndustries([]);
      return;
    }
    fetch(`${BASE_URL}/dropdowns/sub-industries?industry_id=${industryId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.data) setSubIndustries(res.data);
      })
      .catch(console.error);
  }, [industryId]);

  useEffect(() => {
    if (!subIndustryId) {
      setRoles([]);
      return;
    }
    fetch(`${BASE_URL}/dropdowns/job-roles?sub_industry_id=${subIndustryId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.data) setRoles(res.data);
      })
      .catch(console.error);
  }, [subIndustryId]);

  useEffect(() => {
    if (!roleId) {
      setRoleDetails(null);
      return;
    }
    setIsLoadingRole(true);
    fetch(`${BASE_URL}/job_role/${roleId}/competence-clusters`)
      .then((r) => r.json())
      .then((res) => {
        if (res.data) setRoleDetails(res.data);
      })
      .catch(console.error)
      .finally(() => setIsLoadingRole(false));
  }, [roleId]);

  const pickIndustry = (id: string) => {
    setIndustryId(id);
    setSubIndustryId("");
    setRoleId("");
  };

  const pickSub = (id: string) => {
    setSubIndustryId(id);
    setRoleId("");
  };

  const reset = () => pickIndustry("");

  const selIndustry = industries.find((i) => i.id === industryId);
  const selSub = subIndustries.find((s) => s.id === subIndustryId);
  const selRole = roles.find((r) => r.id === roleId);

  return (
    <div className="cx">
      <div className="cx-panel" data-reveal="up">
        <ol className="cx-steps">
          <li className={industryId ? "is-done" : "is-active"}>
            <span className="cx-step-n">1</span>
            <label className="cx-field">
              <span className="cx-field-k">Industry</span>
              <select value={industryId} onChange={(e) => pickIndustry(e.target.value)}>
                <option value="">Select an industry</option>
                {industries.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.industry}
                  </option>
                ))}
              </select>
            </label>
          </li>
          <li className={subIndustryId ? "is-done" : industryId ? "is-active" : "is-locked"}>
            <span className="cx-step-n">2</span>
            <label className="cx-field">
              <span className="cx-field-k">Sub-industry</span>
              <select value={subIndustryId} onChange={(e) => pickSub(e.target.value)} disabled={!industryId}>
                <option value="">{industryId ? "Select a sub-industry" : "Choose an industry first"}</option>
                {subIndustries.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.sub_industry}
                  </option>
                ))}
              </select>
            </label>
          </li>
          <li className={roleId ? "is-done" : subIndustryId ? "is-active" : "is-locked"}>
            <span className="cx-step-n">3</span>
            <RolePicker roles={roles} value={roleId} onPick={setRoleId} disabled={!subIndustryId} />
          </li>
        </ol>
        {industryId ? (
          <div className="cx-chips">
            <span className="cx-chip">{selIndustry?.industry || ""}</span>
            {subIndustryId && selSub ? <span className="cx-chip">{selSub.sub_industry}</span> : null}
            {roleId && selRole ? <span className="cx-chip">{selRole.job_role}</span> : null}
            <button type="button" className="cx-reset" onClick={reset}>
              Reset
            </button>
          </div>
        ) : null}
      </div>

      {isLoadingRole ? (
        <LoadingState />
      ) : roleDetails && selIndustry && selSub ? (
        <RoleReveal key={roleId} role={roleDetails} industryName={selIndustry.industry} subIndustryName={selSub.sub_industry} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function RolePicker({
  roles,
  value,
  onPick,
  disabled,
}: {
  roles: JobRole[];
  value: string;
  onPick: (id: string) => void;
  disabled: boolean;
}) {
  const id = useId();
  const selected = roles.find((r) => r.id === value);
  const [query, setQuery] = useState(selected?.job_role ?? "");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(selected?.job_role ?? ""), [selected?.job_role]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const q = query.trim().toLowerCase();
  const matches = selected && query === selected.job_role ? roles : roles.filter((r) => r.job_role.toLowerCase().includes(q));

  const choose = (r: JobRole) => {
    onPick(r.id);
    setQuery(r.job_role);
    setOpen(false);
  };

  return (
    <div className="cx-field cx-combo" ref={wrap}>
      <label className="cx-field-k" htmlFor={`${id}-input`}>
        Job role
      </label>
      <input
        id={`${id}-input`}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        autoComplete="off"
        disabled={disabled}
        placeholder={disabled ? "Choose a sub-industry first" : "Search job roles"}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActive((a) => Math.min(a + 1, matches.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter" && open && matches[active]) {
            e.preventDefault();
            choose(matches[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {open && !disabled ? (
        <ul className="cx-options" id={`${id}-list`} role="listbox">
          {matches.length ? (
            matches.map((r, i) => (
              <li
                key={r.id}
                role="option"
                aria-selected={r.id === value}
                className={i === active ? "is-active" : undefined}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(r);
                }}
              >
                <strong>{r.job_role}</strong>
                <small>{r.career_grade_label}</small>
              </li>
            ))
          ) : (
            <li className="cx-options-empty">No job roles match</li>
          )}
        </ul>
      ) : null}
    </div>
  );
}

function RoleReveal({ role, industryName, subIndustryName }: { role: CompetenceClusterResponse; industryName: string; subIndustryName: string }) {
  const { summary, kpis } = splitKpis(role.description);
  const [filter, setFilter] = useState("");
  const f = filter.trim().toLowerCase();
  
  const clusters = f
    ? role.clusters.filter((c) => `${c.cluster} ${c.description} ${c.id}`.toLowerCase().includes(f))
    : role.clusters;

  return (
    <div className="cx-result">
      <article className="cx-role">
        <span className="cx-badge">Job role</span>
        <h2>{role.job_role}</h2>
        <ul className="cx-pills">
          <li>
            {industryName} · {subIndustryName}
          </li>
          <li>{role.responsibility}</li>
          <li>{role.career_grade_label}</li>
        </ul>
        <p className="cx-role-desc">{summary}</p>
        {kpis.length ? (
          <div className="cx-kpis">
            <span className="cx-kpis-k">KPIs</span>
            <ul>
              {kpis.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>

      <div className="cx-clusters-head">
        <h3>
          <span>{role.clusters.length}</span> linked clusters
        </h3>
        <input
          type="search"
          className="cx-filter"
          placeholder="Filter clusters"
          aria-label="Filter clusters"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {clusters.length ? (
        <ul className="cx-grid">
          {clusters.map((c, i) => (
            <li key={c.id} className="cx-card" style={{ "--i": i } as CSSProperties}>
              <span className="cx-card-id">#{c.id}</span>
              <strong>{c.cluster}</strong>
              <p>{c.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="cx-none">No clusters match &ldquo;{filter}&rdquo;.</p>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="cx-empty">
      <ul className="cx-grid cx-grid--ghost" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i} className="cx-card">
            <span className="cx-card-id">#0000</span>
            <strong>Competence cluster</strong>
            <p>How this capability shows up in the role, and what strong performance looks like.</p>
          </li>
        ))}
      </ul>
      <p className="cx-empty-msg">Choose an industry, sub-industry and job role to reveal its linked clusters.</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="cx-empty">
      <p className="cx-empty-msg" style={{ padding: "3rem", textAlign: "center", color: "var(--color-fg-muted)" }}>Loading clusters...</p>
    </div>
  );
}
