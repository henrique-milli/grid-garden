import React from 'react';
import { Button, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import './PrintButton.css';

interface PrintButtonProps {
  onPrint: () => void;
}

const PrintButton: React.FC<PrintButtonProps> = ({ onPrint }) => {
  return (
    <div className="print-button-container">
      <Tooltip title="Print garden">
        <Button
          onClick={onPrint}
          startIcon={<PrintIcon />}
          variant="contained"
          color="primary"
          size="medium"
        >
          Print
        </Button>
      </Tooltip>
    </div>
  );
};

export default PrintButton;