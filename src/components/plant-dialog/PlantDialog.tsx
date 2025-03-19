  import React, { useState } from "react";
  import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, List, ListItem, CircularProgress } from "@mui/material";
  import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
  import { fetchPlantIcon } from "../../services/biorender/service.ts";

  interface Plant {
    name: string;
    imageUrl: string | null;
  }

  interface PlantDialogProps {
    open: boolean;
    onClose: () => void;
    plants: Plant[];
    onUpdatePlants: (plants: Plant[]) => void;
  }

  const PlantDialog: React.FC<PlantDialogProps> = ({ open, onClose, plants, onUpdatePlants }) => {
    const [newPlant, setNewPlant] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
      onClose();
      setNewPlant("");
    };

    const handleAddPlant = async () => {
      if (newPlant.trim()) {
        setIsLoading(true);
        try {
          // Call the API to get the plant icon
          const imageUrl = await fetchPlantIcon(newPlant.trim());

          // Add the new plant with its image URL
          onUpdatePlants([...plants, {
            name: newPlant.trim(),
            imageUrl
          }]);

          setNewPlant("");
        } catch (error) {
          console.error("Error fetching plant icon:", error);
          // Add plant anyway with null imageUrl
          onUpdatePlants([...plants, {
            name: newPlant.trim(),
            imageUrl: null
          }]);
          setNewPlant("");
        } finally {
          setIsLoading(false);
        }
      }
    };

    const handleRemovePlant = (index: number) => {
      onUpdatePlants(plants.filter((_, i) => i !== index));
    };

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Plants</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <TextField
              autoFocus
              label="Add Plant"
              fullWidth
              value={newPlant}
              onChange={(e) => setNewPlant(e.target.value)}
              disabled={isLoading}
            />
            <IconButton color="primary" onClick={handleAddPlant} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : <AddIcon />}
            </IconButton>
          </div>

          <List>
            {plants.map((plant, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" onClick={() => handleRemovePlant(index)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {plant.imageUrl &&
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                  }
                  {plant.name}
                </div>
              </ListItem>
            ))}
          </List>
          {plants.length === 0 && <p>No plants added yet.</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  export default PlantDialog;