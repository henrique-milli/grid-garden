import './Square.css';
import React, { useState } from "react";
import PlantDialog from "../plant-dialog/PlantDialog.tsx";
import { Add, Edit } from "@mui/icons-material";
import { Tooltip } from '@mui/material';
import { usePlantContext } from "../../contexts/PlantContext";
import { Plant } from '../../models.ts';

interface SquareProps {
    position: number;
}

const Square: React.FC<SquareProps> = ({position}) => {
    const {plantsByPosition, updatePlantsAtPosition} = usePlantContext();
    const [dialogOpen, setDialogOpen] = useState(false);

    // Get plants for this position from context
    const plants = plantsByPosition[position] || [];

    const handleClick = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleUpdatePlants = (updatedPlants: Plant[]) => {
        updatePlantsAtPosition(position, updatedPlants);
    };

    // Get dynamic class based on number of plants
    const getPlantGridClass = () => {
        return `plant-grid plants-${plants.length}`;
    };

    return (<>
        <div className="square-content" onClick={handleClick}>
            <div className="position-number">{position}</div>

            {plants.length === 0 ? <Add/> : (<>
                <div className={getPlantGridClass()}>
                    {plants.map((plant, index) => (<Tooltip key={index} title={plant.name} arrow placement="top">
                            <div className="plant-item">
                                {plant.imageUrl ? (
                                    <img src={plant.imageUrl} alt={plant.name} className="plant-icon"/>) : (
                                    <span>{plant.name.substring(0, 3)}</span>)}
                            </div>
                        </Tooltip>))}
                </div>
                <div className="edit-button">
                    <Edit fontSize="small"/>
                </div>
            </>)}
        </div>

        <PlantDialog
            open={dialogOpen}
            onClose={handleClose}
            plants={plants}
            onUpdatePlants={handleUpdatePlants}
        />
    </>);
}

export default Square;