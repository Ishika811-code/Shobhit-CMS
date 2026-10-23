import { Icon } from '../common/Icon';

export function TopBar({
    title = "Institutional Sign In",
    backHref = "/",
    helpHref = "mailto:it.support@shobhituniversity.ac.in",
    accountHref = "/",
}) {
    return (
        <header className="topbar">
            <a className="icon-button back-button" href={backHref} aria-label="Back to sign in">
                <Icon name="back" />
            </a>
            <div className="topbar-brand">
                <span className="brand-mark"><Icon name="university" /></span>
                <span className="topbar-title">
                    <span>SHOBHIT UNIV</span>
                    <strong>{title}</strong>
                </span>
            </div>
            <div className="topbar-actions">
                <a className="icon-button help-button" href={helpHref} aria-label="Contact helpdesk">
                    <Icon name="help" />
                </a>
                <a className="profile-button" href={accountHref} aria-label="Sign in">
                    <Icon name="user" />
                </a>
            </div>
        </header>
    );
}
