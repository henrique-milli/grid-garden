import React, { createContext, useContext, useState, ReactNode } from "react";
import { Plant } from "../models.ts";

interface PlantContextType {
  plantsByPosition: Record<number, Plant[]>;
  updatePlantsAtPosition: (position: number, plants: Plant[]) => void;
  getAllUniquePlants: () => Plant[];
}

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plantsByPosition, setPlantsByPosition] = useState<Record<number, Plant[]>>({});

  const updatePlantsAtPosition = (position: number, plants: Plant[]) => {
    setPlantsByPosition(prev => ({
      ...prev,
      [position]: plants
    }));
  };

  const getAllUniquePlants = (): Plant[] => {
    const uniquePlants: Record<string, Plant> = {};

    Object.values(plantsByPosition).forEach(positionPlants => {
      positionPlants.forEach(plant => {
        uniquePlants[plant.name] = plant;
      });
    });

    return Object.values(uniquePlants);
  };

  return (
    <PlantContext.Provider value={{
      plantsByPosition,
      updatePlantsAtPosition,
      getAllUniquePlants
    }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext = () => {
  const context = useContext(PlantContext);
  if (context === undefined) {
    throw new Error("usePlantContext must be used within a PlantProvider");
  }
  return context;
};