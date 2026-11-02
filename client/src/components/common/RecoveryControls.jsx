import { Icon } from "./Icon";
import "./recovery-controls.css";
import "../../assets/style/global.css";

export function TextField({
  id,
  label,
  icon,
  labelAction,
  inputProps,
}) {
  return (
    <>
        <label className="field-label" htmlFor={id}>{label}</label>
        {labelAction}
      <div className="input-wrap">
        {icon && <Icon name={icon} />}
        <input id={id} {...inputProps} />
      </div>
    </>
      
  );
}


export function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  icon,
  title,
  description,
  badge,
}) {
  return (
    <label className={`choice-card${checked ? " is-selected" : ""}`}>
      <input
        checked={checked}
        name={name}
        onChange={onChange}
        type="radio"
        value={value}
      />
      <span className="choice-card-icon"><Icon name={icon} /></span>
      <span className="choice-card-copy">
        <span className="choice-card-title">
          {title}
          {badge && <span className="choice-card-badge">{badge}</span>}
        </span>
        <span className="choice-card-description">{description}</span>
      </span>
      <span className="choice-card-indicator" aria-hidden="true" />
    </label>
  );
}
