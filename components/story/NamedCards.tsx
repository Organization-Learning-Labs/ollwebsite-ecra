type NamedCardsProps = {
  items: readonly { title: string; body: string }[];
  cols?: 2 | 3 | 4;
  closing?: string;
};

/** Bold title + one line per card. */
export function NamedCards({ items, cols = 3, closing }: NamedCardsProps) {
  return (
    <>
      <ul className={`s-cards s-cards--${cols}`} data-stagger>
        {items.map((item) => (
          <li key={item.title} className="s-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
      {closing ? (
        <p className="s-closing" data-reveal="up">
          {closing}
        </p>
      ) : null}
    </>
  );
}
