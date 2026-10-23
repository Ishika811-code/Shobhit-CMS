import { useRef, useState } from "react";
import {
  ChoiceCard,
  TextField,
} from "../../components/common/RecoveryControls";
import { Icon } from "../../components/common/Icon";
import { requestPasswordReset, resetPassword } from "../../services/auth";
import "./style/password-recovery.css";

const challengeCharacters = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const passwordRequirements = [
  { label: "At least 12 characters", test: (value) => value.length >= 12 },
  {
    label: "An uppercase and a lowercase letter",
    test: (value) => /[A-Z]/.test(value) && /[a-z]/.test(value),
  },
  { label: "A number", test: (value) => /\d/.test(value) },
  { label: "A symbol", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

function createChallenge() {
  const randomValues = new Uint32Array(5);
  window.crypto.getRandomValues(randomValues);
  return Array.from(
    randomValues,
    (value) => challengeCharacters[value % challengeCharacters.length],
  ).join("");
}

function RecoverySteps({ currentStep }) {
  return (
    <ol className="recovery-steps" aria-label="Password recovery steps">
      {["Account details", "Verify & delivery", "New password"].map(
        (label, index) => {
          const step = index + 1;
          return (
            <li
              aria-current={step === currentStep ? "step" : undefined}
              className={
                step === currentStep
                  ? "is-current"
                  : step < currentStep
                    ? "is-complete"
                    : ""
              }
              key={label}
            >
              <span className="recovery-step-number">{step}</span>
              <span className="recovery-step-label">{label}</span>
            </li>
          );
        },
      )}
    </ol>
  );
}

function RecoveryIntro() {
  return (
    <section className="recovery-intro" aria-labelledby="recovery-heading">
      <span className="recovery-intro-icon">
        <Icon name="shield" />
      </span>
      <div className="recovery-intro-copy">
        <span className="portal-label">
          <span /> OFFICIAL PORTAL
        </span>
        <h1 id="recovery-heading">Password Recovery &amp; Reset</h1>
        <p>
          Verify your account, receive a one-time code, and choose a new
          password.
        </p>
      </div>
    </section>
  );
}

function ContactHelp() {
  return (
    <aside className="recovery-help" aria-labelledby="recovery-help-title">
      <div className="recovery-help-heading">
        <span className="recovery-help-icon">
          <Icon name="support" />
        </span>
        <div>
          <h2 id="recovery-help-title">
            Contact Changed or Records Inaccessible?
          </h2>
          <p>
            If your registered mobile number or institutional mail is inactive,
            submit an in-person identity verification.
          </p>
        </div>
      </div>
      <div className="recovery-help-details">
        <p>
          <Icon name="location" /> Room 102, Central IT Admin Block, Meerut
          Campus
        </p>
        <p>
          <Icon name="badge" /> Mandatory: Carry original Physical University ID
          Card
        </p>
      </div>
      <div className="recovery-help-links">
        <a href="tel:204">
          <Icon name="support" /> Ext. 204 / 205
        </a>
        <a href="mailto:it.support@shobhituniversity.ac.in">
          <Icon name="mail" /> Email Helpdesk
        </a>
      </div>
    </aside>
  );
}

function PasswordRecoveryPage() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("sms");
  const [challenge, setChallenge] = useState(createChallenge);
  const [account, setAccount] = useState({ enrollmentNumber: "", contact: "" });
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const verificationInputRef = useRef(null);

  function handleAccountSubmit(event) {
    event.preventDefault();
    setFeedback(null);
    setStep(2);
  }

  async function handleVerificationSubmit(event) {
    event.preventDefault();
    setFeedback(null);
    const formData = new FormData(event.currentTarget);
    const verificationCode = String(formData.get("verificationCode") || "")
      .replace(/\s/g, "")
      .toUpperCase();

    if (verificationCode !== challenge) {
      setFeedback({
        status: "error",
        message: "The security code does not match. Please try again.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPasswordReset({
        ...account,
        method,
        verificationCode,
        challenge,
      });
      setStep(3);
      setFeedback({
        status: "success",
        message:
          "If the details match university records, a one-time code will be sent using the selected method.",
      });
    } catch (error) {
      setFeedback({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to request a password reset.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    setFeedback(null);

    const unmetRequirement = passwordRequirements.find(
      ({ test }) => !test(password),
    );
    if (unmetRequirement) {
      setFeedback({
        status: "error",
        message: `Password must include: ${unmetRequirement.label.toLowerCase()}.`,
      });
      return;
    }
    if (password !== confirmation) {
      setFeedback({ status: "error", message: "The passwords do not match." });
      return;
    }

    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    try {
      await resetPassword({
        ...account,
        resetCode: String(formData.get("resetCode") || "").trim(),
        password,
      });
      setIsComplete(true);
      setFeedback({
        status: "success",
        message: "Your password has been updated. You can now sign in.",
      });
    } catch (error) {
      setFeedback({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to reset your password.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function refreshChallenge() {
    setChallenge(createChallenge());
    setFeedback(null);
    if (verificationInputRef.current) {
      verificationInputRef.current.value = "";
    }
  }

  function goBack(nextStep) {
    setFeedback(null);
    setStep(nextStep);
  }

  return (
    <div className="password-recovery-page">
      <main className="recovery-content">
        <RecoverySteps currentStep={step} />
        <RecoveryIntro />

        {step === 1 && (
          <form className="recovery-form" onSubmit={handleAccountSubmit}>
            <TextField
              className="recovery-field"
              icon="id"
              id="enrollment-number"
              label="University Enrollment No."
              labelAction={
                <span className="field-example">e.g. SHU-2024-CS</span>
              }
              inputProps={{
                autoComplete: "username",
                name: "enrollmentNumber",
                onChange: (event) =>
                  setAccount({
                    ...account,
                    enrollmentNumber: event.target.value,
                  }),
                placeholder: "Enter Enrollment ID",
                required: true,
                value: account.enrollmentNumber,
              }}
            />
            <TextField
              className="recovery-field"
              icon="id"
              id="recovery-contact"
              label="Registered Mobile No. or SIS Email"
              inputProps={{
                autoComplete: "email",
                name: "contact",
                onChange: (event) =>
                  setAccount({ ...account, contact: event.target.value }),
                placeholder: "name@shobhituniversity.ac.in or +91",
                required: true,
                value: account.contact,
              }}
            />
            <p className="recovery-field-note">
              Enter the contact saved in your SIS record. Your details are only
              used to verify your account.
            </p>
            <button className="recovery-submit" type="submit">
              Continue to verification <Icon name="arrowRight" />
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="recovery-form" onSubmit={handleVerificationSubmit}>
            <fieldset className="method-fieldset">
              <legend>Preferred Reset Medium</legend>
              <div className="method-options">
                <ChoiceCard
                  badge="Fast"
                  checked={method === "sms"}
                  description="Send a one-time code to your registered mobile"
                  icon="message"
                  name="reset-method"
                  onChange={() => setMethod("sms")}
                  title="SMS"
                  value="sms"
                />
                <ChoiceCard
                  checked={method === "email"}
                  description="Send a one-time code to your university email"
                  icon="mail"
                  name="reset-method"
                  onChange={() => setMethod("email")}
                  title="University Email"
                  value="email"
                />
              </div>
            </fieldset>

            <section
              className="verification-panel"
              aria-labelledby="verification-label"
            >
              <div className="verification-heading">
                <label id="verification-label" htmlFor="verification-code">
                  Security Check
                </label>
                <button onClick={refreshChallenge} type="button">
                  <Icon name="refresh" /> Refresh
                </button>
              </div>
              <div className="verification-inputs">
                <output
                  className="verification-challenge"
                  aria-label="Security code"
                >
                  {Array.from(challenge).join(" ")}
                </output>
                <input
                  autoComplete="off"
                  className="verification-input"
                  id="verification-code"
                  name="verificationCode"
                  placeholder="TYPE CHARACTERS"
                  ref={verificationInputRef}
                  required
                  type="text"
                />
              </div>
            </section>

            <div className="recovery-actions">
              <button
                className="recovery-secondary"
                onClick={() => goBack(1)}
                type="button"
              >
                Back
              </button>
              <button
                className="recovery-submit"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Sending code..." : "Send one-time code"}
                <Icon name="arrowRight" />
              </button>
            </div>
            {feedback && (
              <p
                className="recovery-feedback"
                data-status={feedback.status}
                role={feedback.status === "error" ? "alert" : "status"}
              >
                {feedback.message}
              </p>
            )}
          </form>
        )}

        {step === 3 && (
          <form className="recovery-form" onSubmit={handlePasswordSubmit}>
            {!isComplete && (
              <>
                <p className="recovery-step-description">
                  Enter the one-time code sent to your selected method and
                  create a strong new password.
                </p>
                <TextField
                  className="recovery-field"
                  icon="lock"
                  id="reset-code"
                  label="One-time code"
                  inputProps={{
                    autoComplete: "one-time-code",
                    inputMode: "numeric",
                    name: "resetCode",
                    placeholder: "Enter the code you received",
                    required: true,
                  }}
                />
                <TextField
                  className="recovery-field"
                  icon="lock"
                  id="new-password"
                  label="New password"
                  inputProps={{
                    autoComplete: "new-password",
                    minLength: 12,
                    name: "password",
                    onChange: (event) => setPassword(event.target.value),
                    required: true,
                    type: "password",
                    value: password,
                  }}
                />
                <ul
                  className="password-requirements"
                  aria-label="Password requirements"
                >
                  {passwordRequirements.map(({ label, test }) => (
                    <li className={test(password) ? "is-met" : ""} key={label}>
                      {label}
                    </li>
                  ))}
                </ul>
                <TextField
                  className="recovery-field"
                  icon="lock"
                  id="confirm-password"
                  label="Confirm new password"
                  inputProps={{
                    autoComplete: "new-password",
                    name: "confirmation",
                    onChange: (event) => setConfirmation(event.target.value),
                    required: true,
                    type: "password",
                    value: confirmation,
                  }}
                />
                {confirmation && (
                  <p
                    className={`password-match${password === confirmation ? " is-matched" : ""}`}
                  >
                    {password === confirmation
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}
                <div className="recovery-actions">
                  <button
                    className="recovery-secondary"
                    onClick={() => goBack(2)}
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    className="recovery-submit"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Updating password..." : "Reset password"}
                    <Icon name="arrowRight" />
                  </button>
                </div>
              </>
            )}
            {feedback && (
              <p
                className="recovery-feedback"
                data-status={feedback.status}
                role={feedback.status === "error" ? "alert" : "status"}
              >
                {feedback.message}
              </p>
            )}
            {isComplete && (
              <a className="recovery-submit recovery-sign-in" href="/">
                Go to sign in <Icon name="arrowRight" />
              </a>
            )}
          </form>
        )}

        {step === 1 && feedback && (
          <p
            className="recovery-feedback"
            data-status={feedback.status}
            role={feedback.status === "error" ? "alert" : "status"}
          >
            {feedback.message}
          </p>
        )}
        <a className="back-to-sign-in" href="/">
          <Icon name="back" /> Back to Institutional Sign In
        </a>
        <ContactHelp />
      </main>
    </div>
  );
}

export default PasswordRecoveryPage;
