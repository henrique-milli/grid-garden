import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

interface GridFormProps {
    onSubmit: (rows: number, columns: number) => void;
}

const FormContainer = styled(Box)({
    display: 'flex', justifyContent: 'center', marginBottom: '1rem',
});

const DimensionControl = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    padding: '8px 16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const StepperButton = styled(Button)(({theme}) => ({
    width: '36px',
    minWidth: '36px',
    height: '36px',
    border: 'none',
    padding: 0,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    fontSize: '18px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText,
    },
}));

const DimensionValue = styled(Typography)(() => ({
    padding: '0 16px', fontSize: '18px', fontWeight: 500, minWidth: '24px', textAlign: 'center',
}));

const DimensionSeparator = styled(Typography)(({theme}) => ({
    margin: '0 16px',
    fontSize: '20px',
    fontWeight: 500,
    color: theme.palette.text.primary,
    fontFamily: 'Prompt, sans-serif',
}));

const GridForm: React.FC<GridFormProps> = ({onSubmit}) => {
    const [rows, setRows] = React.useState(5);
    const [columns, setColumns] = React.useState(5);

    const handleRowsChange = (newRows: number) => {
        if (newRows >= 1) {
            setRows(newRows);
            onSubmit(newRows, columns);
        }
    };

    const handleColumnsChange = (newColumns: number) => {
        if (newColumns >= 1) {
            setColumns(newColumns);
            onSubmit(rows, newColumns);
        }
    };

    return (<FormContainer className={'form-container'}>
        <DimensionControl >
            <StepperButton onClick={() => handleRowsChange(rows - 1)}>-</StepperButton>
            <DimensionValue>{rows}</DimensionValue>
            <StepperButton onClick={() => handleRowsChange(rows + 1)}>+</StepperButton>

            <DimensionSeparator>×</DimensionSeparator>

            <StepperButton onClick={() => handleColumnsChange(columns - 1)}>-</StepperButton>
            <DimensionValue>{columns}</DimensionValue>
            <StepperButton onClick={() => handleColumnsChange(columns + 1)}>+</StepperButton>
        </DimensionControl>
    </FormContainer>);
}

export default GridForm;