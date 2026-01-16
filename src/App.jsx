import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  // Target date: 18 December 2026, midnight
  const targetDate = new Date("2026-12-18T00:00:00");

  const calculateTimeLeft = () => {
    const now = new Date(); // uses system date
    const diff = targetDate.getTime() - now.getTime();

    // 🔍 DEBUG: shows what JS thinks "today" is
    console.log("NOW:", now.toString());

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <h1 style={{ textAlign: "center" }}>⏰ Time Over</h1>;
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>
        Countdown to 18 December 2026
      </h2>

      <div className="timer">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div className="box" key={label}>
            <h1>{String(value).padStart(2, "0")}</h1>
            <p>{label.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
