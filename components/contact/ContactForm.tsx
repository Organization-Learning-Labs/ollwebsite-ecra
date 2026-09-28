"use client";

import { useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { siteConfig } from "@/lib/site";

const INQUIRY_TYPES = [
  "Enterprise assessment",
  "Business unit or function",
  "Leaders and roles",
  "Research partnership",
  "Other",
] as const;

type Fields = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields | "inquiryType", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: Fields = { name: "", email: "", phone: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(inquiryType: string, f: Fields): Errors {
  const e: Errors = {};
  if (!inquiryType) e.inquiryType = "Choose what you would like to talk about.";
  if (!f.name.trim()) e.name = "Please add your name.";
  if (!f.email.trim()) e.email = "Please add your work email.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "That email does not look right.";
  if (f.phone.replace(/\D/g, "").length < 7) e.phone = "Please add a phone number we can reach you on.";
  if (f.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  return e;
}

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<string>("");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof Fields) => (ev: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: ev.target.value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const found = validate(inquiryType, fields);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(first === "inquiryType" ? "cf-type" : `cf-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType,
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          message: fields.message.trim(),
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setFields(EMPTY);
    setInquiryType("");
    setErrors({});
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className="cf-done" role="status">
        <svg className="cf-check" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27l7 7 15-15" />
        </svg>
        <h3>Thank you, {fields.name.trim().split(" ")[0]}.</h3>
        <p>
          We have your message about <strong>{inquiryType.toLowerCase()}</strong>. A confirmation is on its way to{" "}
          {fields.email.trim()}, and someone from OLL will reply within one business day.
        </p>
        <button type="button" className="btn btn-ghost" onClick={reset}>
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="cf" onSubmit={onSubmit} noValidate aria-busy={sending}>
      <fieldset className="cf-types">
        <legend>What would you like to talk about?</legend>
        <div className="cf-chips" id="cf-type" tabIndex={-1} role="radiogroup" aria-describedby={errors.inquiryType ? "cf-type-err" : undefined}>
          {INQUIRY_TYPES.map((t, i) => (
            <label key={t} className="cf-chip" style={{ "--i": i } as CSSProperties}>
              <input
                type="radio"
                name="inquiryType"
                value={t}
                checked={inquiryType === t}
                onChange={() => {
                  setInquiryType(t);
                  setErrors((e) => ({ ...e, inquiryType: undefined }));
                }}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
        {errors.inquiryType ? (
          <p className="cf-err" id="cf-type-err">
            {errors.inquiryType}
          </p>
        ) : null}
      </fieldset>

      <div className="cf-row">
        <Field id="name" label="Full name" error={errors.name}>
          <input id="cf-name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} autoComplete="name" value={fields.name} onChange={set("name")} />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <input id="cf-email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined} type="email" autoComplete="email" value={fields.email} onChange={set("email")} />
        </Field>
      </div>
      <Field id="phone" label="Phone" error={errors.phone}>
        <input id="cf-phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "cf-phone-err" : undefined} type="tel" autoComplete="tel" value={fields.phone} onChange={set("phone")} />
      </Field>
      <Field id="message" label="How can we help?" error={errors.message}>
        <textarea id="cf-message" aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined} rows={5} value={fields.message} onChange={set("message")} />
      </Field>

      {status === "error" ? (
        <p className="cf-fail" role="alert">
          We could not send your message just now. Please try again, or call us on{" "}
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>.
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary cf-submit" disabled={sending}>
        {sending ? (
          <>
            <span className="cf-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send message
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={`cf-field${error ? " has-err" : ""}`}>
      <label htmlFor={`cf-${id}`}>{label}</label>
      {children}
      {error ? (
        <p className="cf-err" id={`cf-${id}-err`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
