import React from "react";
import NutritionCard from "./NutritionCard";
import useFetchData from "../../hooks/useFetchData";

import calorieIcon from "../../assets/img/Nutrition Cards/energy.svg";
import proteinIcon from "../../assets/img/Nutrition Cards/chicken.svg";
import carbIcon from "../../assets/img/Nutrition Cards/apple.svg";
import lipidIcon from "../../assets/img/Nutrition Cards/cheeseburger.svg";

const NutritionCards = () => {
  const userData = useFetchData((dataSource) => dataSource.getUserMainData());

  if (!userData) {
    return <div>Chargement des données nutritionnelles...</div>;
  }

  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userData.keyData;

  return (
    <>
      <NutritionCard
        icon={calorieIcon}
        value={calorieCount}
        unit="kCal"
        label="Calories"
      />
      <NutritionCard
        icon={proteinIcon}
        value={proteinCount}
        unit="g"
        label="Protéines"
      />
      <NutritionCard
        icon={carbIcon}
        value={carbohydrateCount}
        unit="g"
        label="Glucides"
      />
      <NutritionCard
        icon={lipidIcon}
        value={lipidCount}
        unit="g"
        label="Lipides"
      />
    </>
  );
};

export default NutritionCards;
