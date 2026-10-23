import { Icon } from '../common/Icon';

export function TopBar() {
    return (
        <header className="topbar">
            <button className="icon-button back-button" type="button" aria-label="Go back">
                <Icon name="back" />
            </button>
            <div className="topbar-brand">
                <span className="brand-mark"><Icon name="university" /></span>
                <span className="topbar-title">
                    <span>SHOBHIT UNIV</span>
                    <strong>Institutional Sign In</strong>
                </span>
            </div>
            <div className="topbar-actions">
                <button className="icon-button help-button" type="button" aria-label="Help">
                    <Icon name="help" />
                </button>
                <button className="profile-button" type="button" aria-label="Account">
                    <Icon name="user" />
                </button>
            </div>
        </header>
    );
}
