// src/components/grid/Grid.tsx (modified)
import './Grid.css';
import React, { useEffect, useRef } from "react";
import Square from "../square/Square";

interface GridProps {
  rows: number;
  columns: number;
  scale: number;
}

const Grid: React.FC<GridProps> = ({ rows, columns, scale }) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridContentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollArea = () => {
      const content = gridContentRef.current;
      const viewport = viewportRef.current;

      if (content && viewport) {
        content.getBoundingClientRect();
        viewport.style.overflow = 'hidden';
        setTimeout(() => {
          if (viewport) viewport.style.overflow = 'auto';
        }, 10);
      }
    };

    updateScrollArea();
  }, [scale]);

  const renderCells = () => {
    const cells = [];
    let position = 1;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        cells.push(
          <div key={`${i}-${j}`} className="grid-cell">
            <Square position={position} />
          </div>
        );
        position++;
      }
    }
    return cells;
  };

  return (
    <div className="grid-container" ref={gridContainerRef}>
      <div className="grid-viewport" ref={viewportRef}>
        <div className="grid-scaling-container">
          <div
            className="grid-content"
            ref={gridContentRef}
            style={{
              transform: `scale(${scale})`
            }}
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`
              }}
            >
              {renderCells()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grid;