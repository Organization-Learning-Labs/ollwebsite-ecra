import Link from "next/link";

type StoryCtaProps = {
  heading: string;
  body: string;
  actions: readonly { label: string; href: string; primary?: boolean }[];
};

export function StoryCta({ heading, body, actions }: StoryCtaProps) {
  return (
    <div className="s-cta" data-reveal="up">
      <h2>{heading}</h2>
      <p>{body}</p>
      <div className="s-cta-acts">
        {actions.map((a) =>
          a.href.startsWith("http") ? (
            <a key={a.href} className={`btn ${a.primary ? "btn-primary" : "btn-ghost"}`} href={a.href}>
              {a.label}
            </a>
          ) : (
            <Link key={a.href} className={`btn ${a.primary ? "btn-primary" : "btn-ghost"}`} href={a.href}>
              {a.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
