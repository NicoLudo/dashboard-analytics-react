import React from "react";

const NutritionCard = ({ icon, value, unit, label }) => {
  return (
    <div className="nutrition-card">
      <div className="nutrition-card__icon">
        <img src={icon} alt={`${label} icon`} />
      </div>
      <div>
        <p className="nutrition-card__value">{value} {unit}</p>
        <p className="nutrition-card__label">{label}</p>
      </div>
    </div>
  );
};

export default NutritionCard;
