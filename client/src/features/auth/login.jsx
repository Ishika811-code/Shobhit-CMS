import { useState } from "react";
import { Icon } from "../../components/common/Icon";
import { RoleTabs } from "../../components/common/RoleTabs";
import { roles } from "../../utils/roles";
import { clearAccessToken, login } from "../../services/auth";
import "./login.css";
import { UniversityIntro } from "./UniversityIntro";
import { SupportCard } from "./SupportCard";
import { PageFooter } from "../../components/layout/PageFooter";

function SignInForm({ activeRole }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const activeRoleLabel = roles.find((role) => role.id === activeRole)?.label;

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const { user } = await login({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      const expectedRole = activeRole === "staff" ? "admin" : activeRole;
      if (user.role !== expectedRole) {
        clearAccessToken();
        throw new Error("This account does not have access to the selected portal.");
      }
      setFeedback({
        status: "success",
        message: `Signed in as ${user.name}.`,
      });
    } catch (error) {
      setFeedback({
        status: "error",
        message: error instanceof Error ? error.message : "Unable to sign in.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <label className="field-label" htmlFor="campus-email">
          University Email
        </label>
        <div className="input-wrap">
          <Icon name="id" />
          <input
            autoComplete="username"
            id="campus-email"
            name="email"
            placeholder="name@shobhituniversity.ac.in"
            required
            type="email"
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
        <button className="submit-button" disabled={isSubmitting} type="submit">
          <Icon name="login" />
          <span>{isSubmitting ? "Signing In..." : "Sign In to Campus Portal"}</span>
        </button>
        {feedback && (
          <p
            className="login-feedback"
            data-status={feedback.status}
            role={feedback.status === "error" ? "alert" : "status"}
          >
            {feedback.message}
          </p>
        )}
      </form>
    </section>
  );
}

function LoginPage() {
  const [activeRole, setActiveRole] = useState("student");

  return (
    <>
      <main className="login-page">
        <div className="login-content">
          <UniversityIntro />
          <RoleTabs activeRole={activeRole} onRoleChange={setActiveRole} />
          <SignInForm activeRole={activeRole} />
          <SupportCard />
          <PageFooter />
        </div>
      </main>
    </>
  );
}

export default LoginPage;
