import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

import NutritionCard from "./NutritionCard";
import calorieIcon from "../../assets/img/Nutrition Cards/energy.svg";
import proteinIcon from "../../assets/img/Nutrition Cards/chicken.svg";
import carbIcon from "../../assets/img/Nutrition Cards/apple.svg";
import lipidIcon from "../../assets/img/Nutrition Cards/cheeseburger.svg";

const NutritionCards = () => {
  const { userId } = useParams();
  const { data: userData, loading, error } = useFetchData(userId, "mainData");

  if (loading) return <p aria-live="polite">Chargement des données nutritionnelles...</p>;
  if (error) return <p aria-live="assertive">{error}</p>;
  if (!userData) return <p>Les données nutritionnelles sont indisponibles.</p>;

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
