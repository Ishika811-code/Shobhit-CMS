import { Icon } from "../../components/common/Icon";

export function UniversityIntro() {
  return (
    <section className="university-intro" aria-labelledby="university-name">
      <div className="university-emblem">
        <Icon name="university" />
        <span className="emblem-dot" />
      </div>
      <span className="portal-label">
        <span /> DIGICAMPUS CMS PORTAL
      </span>
      <h1 id="university-name">Shobhit University</h1>
      <p className="university-motto">Education Empowers • Gangoh</p>
    </section>
  );
}
