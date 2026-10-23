import { useState } from "react";
import { Icon } from "../../components/common/Icon";
import { RoleTabs } from "../../components/common/RoleTabs";
import { roles } from "../../utils/roles";
import "./login.css";
import { UniversityIntro } from "./UniversityIntro";
import { SupportCard } from "./SupportCard";
import { PageFooter } from "../../components/layout/PageFooter";

function SignInForm({ activeRole }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const activeRoleLabel = roles.find((role) => role.id === activeRole)?.label;
  const identifierLabel =
    activeRole === "student"
      ? "University ID / Enrollment Number"
      : activeRole === "faculty"
        ? "Faculty ID"
        : "Staff ID";

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="sign-in-card" aria-labelledby="sign-in-title">
      <div className="form-heading">
        <h2 id="sign-in-title">Sign In</h2>
        <span className={`access-badge access-badge--${activeRole}`}>
          {activeRoleLabel} ACCESS
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="campus-id">
          {identifierLabel}
        </label>
        <div className="input-wrap">
          <Icon name="id" />
          <input
            autoComplete="username"
            id="campus-id"
            name="campusId"
            placeholder={
              activeRole === "student"
                ? "e.g. SHU-2024-CS089"
                : `Enter your ${identifierLabel}`
            }
            required
          />
        </div>

        <div className="password-label-row">
          <label className="field-label" htmlFor="portal-password">
            Portal Password
          </label>
          <a href="mailto:it.support@shobhituniversity.ac.in?subject=Password%20reset">
            Forgot / Reset?
          </a>
        </div>
        <div className="input-wrap">
          <Icon name="lock" />
          <input
            autoComplete="current-password"
            id="portal-password"
            name="password"
            placeholder="Enter your password"
            required
            type={passwordVisible ? "text" : "password"}
          />
          <button
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            aria-pressed={passwordVisible}
            className="password-toggle"
            onClick={() => setPasswordVisible((visible) => !visible)}
            type="button"
          >
            <Icon name={passwordVisible ? "eyeOff" : "eye"} />
          </button>
        </div>
        <button className="submit-button" type="submit">
          <Icon name="login" />
          <span>Sign In to Campus Portal</span>
        </button>
      </form>
    </section>
  );
}

function LoginPage() {
  const [activeRole, setActiveRole] = useState("student");

  return (
    <main className="login-page">
      <div className="login-content">
        <UniversityIntro />
        <RoleTabs activeRole={activeRole} onRoleChange={setActiveRole} />
        <SignInForm activeRole={activeRole} />
        <SupportCard />
        <PageFooter />
      </div>
    </main>
  );
}

export default LoginPage;
