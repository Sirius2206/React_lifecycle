import React from "react";
import "./Clock.css";

function Clock({ time }) {
  const [hours, minutes, seconds] = time.split(":");
  var hands = [
    {
      hand: "hours",
      angle: hours * 30 + minutes / 2,
    },
    {
      hand: "minutes",
      angle: minutes * 6,
    },
    {
      hand: "seconds",
      angle: seconds * 6,
    },
  ];

  return (
    <div className="clock">
      <ul className="clock-numbers">
        <li className="cn cn-3">3</li>
        <li className="cn cn-6">6</li>
        <li className="cn cn-9">9</li>
        <li className="cn cn-12">12</li>
      </ul>
      <div className="clock-hands">
        <div
          className="ch ch-hours"
          style={{ transform: `rotateZ(${hands[0].angle}deg)` }}
        />
        <div
          className="ch ch-minutes"
          style={{ transform: `rotateZ(${hands[1].angle}deg)` }}
        />
        <div
          className="ch ch-seconds"
          style={{ transform: `rotateZ(${hands[2].angle}deg)` }}
        />
      </div>
    </div>
  );
}

export default Clock;
