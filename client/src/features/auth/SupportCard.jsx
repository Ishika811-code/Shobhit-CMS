import { Icon } from "../../components/common/Icon";

export function SupportCard() {
  return (
    <aside className="support-card">
      <h2>
        <Icon name="support" /> INSTITUTIONAL IT SUPPORT
      </h2>
      <p>
        Need assistance? Contact IT Helpdesk at{" "}
        <a href="mailto:it.support@shobhituniversity.ac.in">
          it.support@shobhituniversity.ac.in
        </a>{" "}
        or visit Computer Centre, Ground Floor, Block-B (09:00 AM - 05:00 PM
        IST).
      </p>
    </aside>
  );
}
