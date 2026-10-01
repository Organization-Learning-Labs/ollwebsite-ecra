"use client";

import { useActionState, useState } from "react";
import { type UnlockState, unlock } from "@/app/cluster-explorer/actions";

const INITIAL: UnlockState = { error: null };

export function PasswordGate({ next }: { next: string }) {
  const [state, action, pending] = useActionState(unlock, INITIAL);
  const [show, setShow] = useState(false);

  return (
    <section className="cx-gate-sec">
      <div className="wrap">
        <form className="cx-gate" action={action} data-reveal="up">
          <span className="cx-gate-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
              <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
            </svg>
          </span>
          <p className="s-eyebrow">Private preview</p>
          <h1>This page is shared privately</h1>
          <p className="cx-gate-lede">Enter the password you received from the OLL team to explore competence clusters by role.</p>
          <input type="hidden" name="next" value={next} />
          <label className="cx-gate-field">
            <span className="cx-field-k">Password</span>
            <span className="cx-gate-input">
              <input
                type={show ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                autoFocus
                aria-invalid={state.error ? true : undefined}
                aria-describedby={state.error ? "cx-gate-error" : undefined}
              />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>
                {show ? "Hide" : "Show"}
              </button>
            </span>
          </label>
          {state.error ? (
            <p className="cx-gate-error" id="cx-gate-error" role="alert">
              {state.error}
            </p>
          ) : null}
          <button type="submit" className="btn btn-primary cx-gate-btn" disabled={pending}>
            {pending ? "Checking…" : "Unlock"}
          </button>
          <p className="cx-gate-help">Need access? Contact your OLL representative.</p>
        </form>
      </div>
    </section>
  );
}
