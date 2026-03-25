@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap");

:root {
  --bg-1: #050b16;
  --bg-2: #112239;
  --card: rgba(17, 34, 57, 0.58);
  --line: rgba(143, 214, 255, 0.2);
  --text: #ecf2ff;
  --muted: #9eb4d8;
  --brand: #53c5ff;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Manrope", sans-serif;
  color: var(--text);
}

.auth-page {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 22px;
  background:
    radial-gradient(circle at 12% 20%, rgba(25, 118, 210, 0.36), transparent 36%),
    radial-gradient(circle at 88% 16%, rgba(0, 188, 212, 0.24), transparent 38%),
    linear-gradient(135deg, var(--bg-1), var(--bg-2));
}

.auth-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(2px);
}

.auth-card {
  position: relative;
  width: min(100%, 460px);
  padding: 28px;
  border-radius: 24px;
  border: 1px solid var(--line);
  background: var(--card);
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.34);
  animation: rise 0.4s ease;
}

.auth-card h2 {
  margin: 0 0 18px;
  font-size: 1.32rem;
  font-weight: 700;
}

.auth-form {
  display: grid;
  gap: 12px;
}

.auth-form input,
.auth-form textarea {
  width: 100%;
  border: 1px solid rgba(170, 223, 255, 0.25);
  border-radius: 12px;
  padding: 12px 14px;
  color: var(--text);
  background: rgba(8, 18, 33, 0.66);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.auth-form textarea {
  resize: vertical;
  min-height: 120px;
}

.auth-form input:focus,
.auth-form textarea:focus {
  outline: none;
  border-color: var(--brand);
  transform: translateY(-1px);
}

.password-wrapper {
  position: relative;
}

.eye-btn {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: auto;
  background: transparent;
  border: none;
  color: #b9d8ff;
  cursor: pointer;
  padding: 6px 8px;
}

.auth-form button {
  border: none;
  border-radius: 12px;
  padding: 11px 14px;
  font-weight: 700;
  color: #05101f;
  background: linear-gradient(90deg, #4ec4ff, #7de6ff);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.auth-form button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(83, 197, 255, 0.28);
}

.auth-form button:disabled {
  opacity: 0.72;
  cursor: not-allowed;
}

.step-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.back {
  background: transparent !important;
  color: var(--text) !important;
  border: 1px solid rgba(166, 210, 255, 0.3) !important;
}

.switch {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}

.switch span {
  color: #8cddff;
  cursor: pointer;
}

.status-msg {
  margin: 0;
  border-radius: 10px;
  padding: 9px 12px;
  font-size: 0.92rem;
}

.status-msg.error {
  color: #ffd8d8;
  background: rgba(255, 71, 87, 0.16);
  border: 1px solid rgba(255, 71, 87, 0.34);
}

.status-msg.success {
  color: #d8ffe9;
  background: rgba(34, 197, 94, 0.14);
  border: 1px solid rgba(34, 197, 94, 0.38);
}

.file-label {
  font-size: 0.9rem;
  color: var(--muted);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .auth-card {
    padding: 20px;
    border-radius: 18px;
  }

  .step-buttons {
    grid-template-columns: 1fr;
  }
}
