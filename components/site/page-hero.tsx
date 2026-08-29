import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  aside,
}: PageHeroProps) {
  return (
    <section className="page-hero brand-grid">
      <div className="section-shell grid gap-10 py-14 sm:py-18 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-22">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-primary sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-primary/68 sm:text-lg">
            {description}
          </p>
        </div>
        {aside ? <div className="lg:justify-self-end">{aside}</div> : null}
      </div>
    </section>
  );
}
