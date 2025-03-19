import React from 'react';
import './Legend.css';

interface Plant {
    name: string;
    imageUrl: string | null;
}

interface LegendProps {
    plants: Plant[];
}

const Legend: React.FC<LegendProps> = ({plants}) => {
    // Convert plants object to array for rendering
    const plantsList = Object.values(plants);

    return (<div className="legend-container">
            <h3>Plant Legend</h3>
            <div className="legend-grid">
                {plantsList.length > 0 ? (plantsList.map((plant, index) => (<div key={index} className="legend-item">
                            {plant.imageUrl ? (<img src={plant.imageUrl} alt={plant.name} className="legend-icon"/>) : (
                                <div className="legend-placeholder">{plant.name.substring(0, 1)}</div>)}
                            <span className="legend-name">{plant.name}</span>
                        </div>))) : (<p>No plants added yet.</p>)}
            </div>
        </div>);
};

export default Legend;