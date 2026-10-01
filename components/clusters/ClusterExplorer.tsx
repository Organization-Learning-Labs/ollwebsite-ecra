"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type CSSProperties, useEffect, useId, useMemo, useRef, useState } from "react";
import { splitKpis } from "@/lib/clusters/kpis";
import type { ExplorerData, JobRoleClusters } from "@/lib/clusters/types";

const uniq = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

export function ClusterExplorer({ data }: { data: ExplorerData }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const industries = useMemo(() => uniq(data.roles.map((r) => r.industry)), [data.roles]);

  const initialIndustry = industries.includes(params.get("industry") ?? "") ? params.get("industry")! : "";
  const initialSub = data.roles.some((r) => r.industry === initialIndustry && r.subIndustry === params.get("sub"))
    ? params.get("sub")!
    : "";
  const initialRole = data.roles.find(
    (r) => r.id === params.get("role") && r.industry === initialIndustry && r.subIndustry === initialSub,
  )
    ? params.get("role")!
    : "";

  const [industry, setIndustry] = useState(initialIndustry);
  const [sub, setSub] = useState(initialSub);
  const [roleId, setRoleId] = useState(initialRole);

  const subIndustries = useMemo(
    () => uniq(data.roles.filter((r) => r.industry === industry).map((r) => r.subIndustry)),
    [data.roles, industry],
  );
  const roles = useMemo(
    () =>
      data.roles
        .filter((r) => r.industry === industry && r.subIndustry === sub)
        .sort((a, b) => a.jobRole.localeCompare(b.jobRole)),
    [data.roles, industry, sub],
  );
  const role = data.roles.find((r) => r.id === roleId) ?? null;

  useEffect(() => {
    const next = new URLSearchParams();
    if (industry) next.set("industry", industry);
    if (sub) next.set("sub", sub);
    if (roleId) next.set("role", roleId);
    const qs = next.toString();
    if (qs !== params.toString()) router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [industry, sub, roleId, pathname, params, router]);

  const pickIndustry = (v: string) => {
    setIndustry(v);
    setSub("");
    setRoleId("");
  };
  const pickSub = (v: string) => {
    setSub(v);
    setRoleId("");
  };
  const reset = () => pickIndustry("");

  return (
    <div className="cx">
      <div className="cx-panel" data-reveal="up">
        <ol className="cx-steps">
          <li className={industry ? "is-done" : "is-active"}>
            <span className="cx-step-n">1</span>
            <label className="cx-field">
              <span className="cx-field-k">Industry</span>
              <select value={industry} onChange={(e) => pickIndustry(e.target.value)}>
                <option value="">Select an industry</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>
          </li>
          <li className={sub ? "is-done" : industry ? "is-active" : "is-locked"}>
            <span className="cx-step-n">2</span>
            <label className="cx-field">
              <span className="cx-field-k">Sub-industry</span>
              <select value={sub} onChange={(e) => pickSub(e.target.value)} disabled={!industry}>
                <option value="">{industry ? "Select a sub-industry" : "Choose an industry first"}</option>
                {subIndustries.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </li>
          <li className={roleId ? "is-done" : sub ? "is-active" : "is-locked"}>
            <span className="cx-step-n">3</span>
            <RolePicker roles={roles} value={roleId} onPick={setRoleId} disabled={!sub} />
          </li>
        </ol>
        {industry ? (
          <div className="cx-chips">
            <span className="cx-chip">{industry}</span>
            {sub ? <span className="cx-chip">{sub}</span> : null}
            {role ? <span className="cx-chip">{role.jobRole}</span> : null}
            <button type="button" className="cx-reset" onClick={reset}>
              Reset
            </button>
          </div>
        ) : null}
      </div>

      {role ? <RoleReveal key={role.id} role={role} /> : <EmptyState />}
    </div>
  );
}

function RolePicker({
  roles,
  value,
  onPick,
  disabled,
}: {
  roles: JobRoleClusters[];
  value: string;
  onPick: (id: string) => void;
  disabled: boolean;
}) {
  const id = useId();
  const selected = roles.find((r) => r.id === value);
  const [query, setQuery] = useState(selected?.jobRole ?? "");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(selected?.jobRole ?? ""), [selected?.jobRole]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const q = query.trim().toLowerCase();
  const matches = selected && query === selected.jobRole ? roles : roles.filter((r) => r.jobRole.toLowerCase().includes(q));

  const choose = (r: JobRoleClusters) => {
    onPick(r.id);
    setQuery(r.jobRole);
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
                <strong>{r.jobRole}</strong>
                <small>{r.careerGrade}</small>
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

function RoleReveal({ role }: { role: JobRoleClusters }) {
  const { summary, kpis } = splitKpis(role.description);
  const [filter, setFilter] = useState("");
  const f = filter.trim().toLowerCase();
  const clusters = f
    ? role.clusters.filter((c) => `${c.name} ${c.description} ${c.id}`.toLowerCase().includes(f))
    : role.clusters;

  return (
    <div className="cx-result">
      <article className="cx-role">
        <span className="cx-badge">Job role</span>
        <h2>{role.jobRole}</h2>
        <ul className="cx-pills">
          <li>
            {role.industry} · {role.subIndustry}
          </li>
          <li>{role.responsibility}</li>
          <li>{role.careerGrade}</li>
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
              <strong>{c.name}</strong>
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
