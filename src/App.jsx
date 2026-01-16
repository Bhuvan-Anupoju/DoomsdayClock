import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const targetDate = new Date("2026-18-12T00:00:00");

  const calculate = () => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return null;

    return {
      months: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)),
      days: Math.floor((diff / (1000 * 60 * 60 * 24)) % 30),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculate());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) return <h1>Time Over</h1>;

  return (
    <div className="container">
      <div className="timer">
        {Object.entries(time).map(([key, value]) => (
          <div className="box" key={key}>
            <h1>{String(value).padStart(2, "0")}</h1>
            <p>{key.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
