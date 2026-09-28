type StoryHeadProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  id?: string;
};

/** Section heading: small eyebrow, large serif title, optional one-line lede. */
export function StoryHead({ eyebrow, title, lede, id }: StoryHeadProps) {
  return (
    <div className="s-head" data-reveal>
      {eyebrow ? <p className="s-eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {lede ? <p className="s-lede">{lede}</p> : null}
    </div>
  );
}
