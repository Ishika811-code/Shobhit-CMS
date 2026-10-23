import { Icon } from './Icon';
import { roles } from '../../utils/roles';


export function RoleTabs({ activeRole, onRoleChange }) {
    return (
        <div className="role-tabs" role="group" aria-label="Choose your portal">
            {roles.map((role) => (
                <button
                    aria-pressed={activeRole === role.id}
                    className={`role-tab role-tab--${role.id}${activeRole === role.id ? ' is-active' : ''}`}
                    key={role.id}
                    onClick={() => onRoleChange(role.id)}
                    type="button"
                >
                    <Icon name={role.icon} />
                    <span>{role.label}</span>
                </button>
            ))}
        </div>
    );
}
