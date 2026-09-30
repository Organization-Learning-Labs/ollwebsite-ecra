import type { CSSProperties, ReactNode } from "react";
import { siteConfig } from "@/lib/site";

type Network = keyof typeof siteConfig.social;

const NETWORKS: { key: Network; label: string; icon: ReactNode }[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    ),
  },
  {
    key: "x",
    label: "X",
    icon: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45z" />,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: (
      <path d="M13.5 21v-7.5h2.52l.38-2.93h-2.9V8.7c0-.85.24-1.43 1.45-1.43h1.55V4.65a20.7 20.7 0 0 0-2.26-.12c-2.24 0-3.77 1.37-3.77 3.88v2.16H8v2.93h2.47V21h3.03z" />
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: (
      <path d="M22.54 7.2a2.77 2.77 0 0 0-1.95-1.96C18.88 4.8 12 4.8 12 4.8s-6.88 0-8.59.44A2.77 2.77 0 0 0 1.46 7.2 29 29 0 0 0 1 12a29 29 0 0 0 .46 4.8 2.77 2.77 0 0 0 1.95 1.96c1.71.44 8.59.44 8.59.44s6.88 0 8.59-.44a2.77 2.77 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-4.8zM9.8 15.02V8.98L15.5 12l-5.7 3.02z" />
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: (
      <path
        fillRule="evenodd"
        d="M7.8 2.5h8.4a5.3 5.3 0 0 1 5.3 5.3v8.4a5.3 5.3 0 0 1-5.3 5.3H7.8a5.3 5.3 0 0 1-5.3-5.3V7.8a5.3 5.3 0 0 1 5.3-5.3zm0 1.9a3.4 3.4 0 0 0-3.4 3.4v8.4a3.4 3.4 0 0 0 3.4 3.4h8.4a3.4 3.4 0 0 0 3.4-3.4V7.8a3.4 3.4 0 0 0-3.4-3.4H7.8zM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4zm0 1.9a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zm5-3.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"
      />
    ),
  },
];

type SocialLinksProps = {
  className?: string;
  /** Shows the network name next to each icon. */
  labelled?: boolean;
};

export function SocialLinks({ className = "social", labelled }: SocialLinksProps) {
  return (
    <ul className={`${className}${labelled ? " social--labelled" : ""}`} aria-label="OLL on social media">
      {NETWORKS.map((n, i) => (
        <li key={n.key} style={{ "--i": i } as CSSProperties}>
          <a
            href={siteConfig.social[n.key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labelled ? undefined : `${siteConfig.name} on ${n.label}`}
            data-network={n.key}
          >
            <span className="social-ic">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {n.icon}
              </svg>
            </span>
            {labelled ? <span className="social-label">{n.label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
