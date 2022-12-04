import React, { useState, useEffect } from "react";
import api from "../utils/api";


const Timer = ({ time, item, complete }) => {
  const hour = Number(time.split(':')[0]);
  const min = Number(time.split(':')[1]);
  const sec = 0;
  const [over, setOver] = useState(false);
  const [[h, m, s], setTime] = useState([hour, min, sec]);
  const actualy = document.querySelectorAll('.actually__current-time');
  
  //меняет стиль если время кончилось
  const badActually = () => {
    actualy.forEach((item) => {
      if (item.textContent === 'wasted :(') {
        item.parentNode.parentNode.classList.add('actually__bad');
      }
    })
  }
  badActually();

  //вычитает по -1 у числа и обнавляет Time у объекта на сервере
  const tick = () => {
    if (over || complete) return;
    if (h === 0 && m === 0 && s === 0) {
      setOver(true);
    } else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s === 0) {
      setTime([h, m - 1, 59]);
      const timer = `${h}:${m}`;
      const newTimer = {
        time: timer
      }
      api.updateActuallyTimer(item, newTimer)
        .then()
        .catch((err) => console.log(err));
    } else {
      setTime([h, m, s - 1]);
      const timer = `${h}:${m}`;
      const newTimer = {
        time: timer
      }
      api.updateActuallyTimer(item, newTimer)
        .then()
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  })



  return (
    <p className={`actually__time hero glitch layers ${complete ? 'actually__time_finish' : ''}`}><span className="actually__current-time">
      {`${h.toString().padStart(2, '0')}:${m
        .toString()
        .padStart(2, '0')}:${s.toString().padStart(2, '0')}` === '00:00:00' ?
        'wasted :(' : `${h.toString().padStart(2, '0')}:${m
          .toString()
          .padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      }
    </span> </p>
  );
}

export default React.memo(Timer);