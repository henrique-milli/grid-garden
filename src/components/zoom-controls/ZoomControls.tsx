import React from "react";
import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import './ZoomControls.css';

interface ZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ scale, onZoomIn, onZoomOut }) => {
  return (
    <div className="zoom-controls">
      <IconButton onClick={onZoomOut} size="small">
        <Remove />
      </IconButton>
      <span>{Math.round(scale * 100)}%</span>
      <IconButton onClick={onZoomIn} size="small">
        <Add />
      </IconButton>
    </div>
  );
};

export default ZoomControls;