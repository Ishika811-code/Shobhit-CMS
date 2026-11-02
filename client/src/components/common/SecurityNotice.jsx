import { Icon } from "./Icon"

const SecurityNotice = () => {
  return (
    <aside className="security-notice" aria-label="Official security notice">
      <span className="notice-icon"><Icon name="shield" /></span>
      <div>
        <h2>OFFICIAL SECURITY NOTICE</h2>
        <p>
          Portal credentials (Enrollment No./Faculty ID &amp; temporary security
          key) are strictly provisioned by the Registrar / IT Cell upon
          enrollment or recruitment. Self-registration is disabled for
          university security.
        </p>
      </div>
    </aside>
  )
}

export default SecurityNotice
