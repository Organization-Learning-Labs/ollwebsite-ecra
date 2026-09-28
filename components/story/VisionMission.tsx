import { SplitWords } from "./SplitWords";

type VisionMissionProps = {
  vision: string;
  mission: string;
};

export function VisionMission({ vision, mission }: VisionMissionProps) {
  return (
    <section className="s-vm" aria-label="Vision and mission">
      <div className="wrap s-vm-grid" data-reveal>
        <div className="s-vm-item">
          <p className="s-vm-k">Our vision</p>
          <p className="s-vm-t">
            <SplitWords text={vision} />
          </p>
        </div>
        <div className="s-vm-item">
          <p className="s-vm-k">Our mission</p>
          <p className="s-vm-t">
            <SplitWords text={mission} />
          </p>
        </div>
      </div>
    </section>
  );
}
