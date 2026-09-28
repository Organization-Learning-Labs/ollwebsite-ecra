import Image from "next/image";
import { LevelDap } from "@/components/ecra/LevelDap";
import { LevelProfile } from "@/components/ecra/LevelProfile";
import { MaturityLadder } from "@/components/ecra/MaturityLadder";
import { ParamTable } from "@/components/ecra/ParamTable";
import { StoryHead } from "@/components/story/StoryHead";
import type { EcraLevel } from "@/data/ecra";

/** Body of an assessment level page: profile, photo, parameters, maturity scale and sample plan. */
export function LevelSections({ level }: { level: EcraLevel }) {
  return (
    <>
      <section>
        <div className="wrap">
          <StoryHead eyebrow="Level profile" title="Who it serves, and what it asks." />
          <LevelProfile level={level} />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <figure className="s-photo">
            <Image
              src={level.photo.src}
              alt={level.photo.alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1140px"
              style={level.photo.position ? { objectPosition: level.photo.position } : undefined}
            />
          </figure>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead
            eyebrow="Assessment parameters"
            title={`What the ${level.title} assessment examines.`}
            lede={`${level.params.length} parameters, each read against the future requirements this level is accountable for.`}
          />
          <ParamTable rows={level.params} label={`${level.title} assessment parameters`} draft={level.paramsDraft} />
          {level.maturity ? (
            <div style={{ marginTop: 80 }}>
              <StoryHead
                eyebrow="Maturity scale"
                title="Five levels, from fragmented to adaptive."
                lede="Each parameter is placed on this scale, against the level the future contribution requires."
              />
              <MaturityLadder stages={level.maturity} />
            </div>
          ) : null}
        </div>
      </section>

      <section>
        <div className="wrap">
          <LevelDap dap={level.dap} levelTitle={level.title} />
        </div>
      </section>
    </>
  );
}
