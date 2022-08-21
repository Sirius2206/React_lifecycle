import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import { nanoid } from "nanoid";

import "./WorldTime.css"

function WorldTime() {
  const [loc, setLoc] = useState("");
  const [timezone, setTimezone] = useState(0);
  const [locsArr, setLocsArr] = useState([]);
  const [dateNow, setDate] = useState(getTime(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getTime(0));
    }, 1000);

    return () => clearInterval(interval);
  }, [dateNow, locsArr]);

  function getTime(timezone) {
    const date = new Date();
    let hours = (+date.getHours() + +timezone + 24) % 24;
    hours = hours < 10 ? "0" + hours : hours;
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
  }

  const handleChange = (e) => {
    if (e.target.name === "location") {
      setLoc(e.target.value);
      return;
    }
    setTimezone(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLocsArr((prevState) => [...prevState, { loc: loc, timezone: timezone }]);
  };
  const deleteTime = (elem) => {
    setLocsArr(locsArr.filter((item) => item !== elem));
  };

  return (
    <>
      <form>
        <label>
          <span>Название</span>
          <input
            type="text"
            placeholder="Название города"
            name="location"
            onChange={handleChange}
          ></input>
        </label>
        <label>
          <span>Временная зона</span>
          <input
            type="number"
            placeholder="Смещение времени(+/-)"
            name="timezone"
            onChange={handleChange}
          ></input>
        </label>
        <button onClick={handleClick}>Добавить</button>
      </form>
      <div>
        <span>Текущее время: </span>
        {getTime(0)}
        <Clock time={getTime(0)} />
      </div>

      <ul className="time-list">
        {locsArr.map((item) => (
            <li className="time-element" key={nanoid()}>
              {item.loc}: {getTime(item.timezone)}
              <Clock time={getTime(item.timezone)}/>
              <button className="time-delete" key={nanoid()} onClick={() => deleteTime(item)}>X</button>
            </li>
        ))}
      </ul>
           
    </>
  );
}

export default WorldTime;
