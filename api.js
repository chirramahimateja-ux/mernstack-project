/* ===== Main container ===== */
.portfolio-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background: #08040c;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

/* ===== Heading ===== */
.portfolio-container h1 {
  font-size: 32px;
  margin-bottom: 30px;
  animation: slideInTitle 0.7s forwards;
}

/* ===== Portfolio cards ===== */
.portfolio-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 6px 20px #7429ec;
  padding: 25px 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 550px;
  transition: 0.3s;
  cursor: pointer;
  animation: fadeIn 0.7s forwards;
}

.portfolio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px #5a1ec2;
}

/* ===== Portfolio details ===== */
.portfolio-card h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.portfolio-card p {
  font-size: 16px;
  line-height: 1.5;
  color: #ddd;
}

/* ===== Resume download link ===== */
.resume-link {
  display: inline-block;
  margin-top: 15px;
  padding: 8px 12px;
  background: #7429ec;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  transition: 0.3s;
}

.resume-link:hover {
  background: #5a1ec2;
}

/* ===== Animations ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInTitle {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}