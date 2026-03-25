import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../utils/api";
import "./Register.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  bio: "",
  contact: "",
  skills: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [profile, setProfile] = useState(null);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const stepTitle = useMemo(() => {
    if (mode !== "register") return "Welcome Back";
    return `Create Account - Step ${step} of 4`;
  }, [mode, step]);

  const change = (e) => {
    setError("");
    setNotice("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetRegisterState = () => {
    setStep(1);
    setProfile(null);
    setResume(null);
    setForm(INITIAL_FORM);
    setError("");
    setNotice("");
  };

  const validateStep = () => {
    if (step === 1) {
      if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
        return "Name, email, and password are required.";
      }
      if (!emailRegex.test(form.email.trim())) return "Please enter a valid email.";
      if (form.password.length < 6) return "Password must be at least 6 characters.";
    }

    if (step === 2) {
      if (!form.bio.trim()) return "Bio is required in step 2.";
      if (!form.contact.trim()) return "Contact number is required in step 2.";
    }

    if (step === 3 && !form.skills.trim()) {
      return "Please add at least one skill in step 3.";
    }

    if (step === 4 && !resume) {
      return "Resume PDF is required in step 4.";
    }

    return "";
  };

  const moveStep = (targetStep) => {
    const stepError = validateStep();
    if (targetStep > step && stepError) {
      setError(stepError);
      return;
    }
    setError("");
    setStep(targetStep);
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Enter email and password.");
      return;
    }

    if (!emailRegex.test(form.email.trim())) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setNotice("");

      const res = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    const stepError = validateStep();
    if (stepError) {
      setError(stepError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));

      if (profile) data.append("profileImage", profile);
      if (resume) data.append("resume", resume);

      await registerUser(data);

      setMode("login");
      setStep(1);
      setProfile(null);
      setResume(null);
      setForm((prev) => ({ ...INITIAL_FORM, email: prev.email }));
      setNotice("Registration successful. Please log in.");
    } catch (err) {
      setNotice("");
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay" />
      <div className="auth-card">
        <h2>{stepTitle}</h2>

        {mode === "login" ? (
          <form onSubmit={submitLogin} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={change}
              autoComplete="email"
            />

            <div className="password-wrapper">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={change}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPass((prev) => !prev)}
                aria-label="Toggle password visibility"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="status-msg error">{error}</p>}
            {notice && <p className="status-msg success">{notice}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="switch">
              Do not have an account?
              <span
                onClick={() => {
                  setMode("register");
                  setError("");
                  setNotice("");
                }}
              >
                {" "}Create one
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={submitRegister} className="auth-form">
            {step === 1 && (
              <>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={change}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={change}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={change}
                />
              </>
            )}

            {step === 2 && (
              <>
                <textarea
                  name="bio"
                  placeholder="Tell about yourself"
                  rows="4"
                  value={form.bio}
                  onChange={change}
                />
                <input
                  name="contact"
                  placeholder="Contact Number"
                  value={form.contact}
                  onChange={change}
                />
              </>
            )}

            {step === 3 && (
              <input
                name="skills"
                placeholder="Skills (comma separated)"
                value={form.skills}
                onChange={change}
              />
            )}

            {step === 4 && (
              <>
                <label className="file-label">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfile(e.target.files?.[0] || null)}
                />

                <label className="file-label">Resume (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                />
              </>
            )}

            {error && <p className="status-msg error">{error}</p>}
            {notice && <p className="status-msg success">{notice}</p>}

            <div className="step-buttons">
              {step > 1 ? (
                <button type="button" className="back" onClick={() => moveStep(step - 1)}>
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  className="back"
                  onClick={() => {
                    setMode("login");
                    resetRegisterState();
                  }}
                >
                  Cancel
                </button>
              )}

              {step < 4 ? (
                <button type="button" onClick={() => moveStep(step + 1)}>
                  Next
                </button>
              ) : (
                <button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              )}
            </div>

            <p className="switch">
              Already have an account?
              <span
                onClick={() => {
                  setMode("login");
                  setStep(1);
                  setError("");
                  setNotice("");
                }}
              >
                {" "}Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
