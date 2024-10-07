import React from "react";
import meditation from "../assets/img/Aside/meditation.svg";
import swimming from "../assets/img/Aside/swimming.svg";
import cycling from "../assets/img/Aside/cycling.svg";
import training from "../assets/img/Aside/training.svg";

const Aside = () => {
  return (
    <aside>
      <div className="aside__icons">
        <div className="aside__icon"><img src={meditation} alt="Meditation icon" /></div>
        <div className="aside__icon"><img src={swimming} alt="Swimming icon" /></div>
        <div className="aside__icon"><img src={cycling} alt="Cycling icon" /></div>
        <div className="aside__icon"><img src={training} alt="Training icon" /></div>
      </div>
      <div className="aside__copyright">
        <p>Copyright, SportSee 2020</p>
      </div>
    </aside>
  );
};

export default Aside;
