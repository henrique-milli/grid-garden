import './App.css'
import './print.css';
import Grid from "./components/grid/Grid.tsx";
import Legend from "./components/legend/Legend.tsx";
import { useState } from "react";
import GridForm from "./components/grid-form/GridForm.tsx";
import { styled, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { theme } from './theme.ts';
import ZoomControls from "./components/zoom-controls/ZoomControls.tsx";
import PrintButton from "./components/print-button/PrintButton.tsx";
import { PlantProvider, usePlantContext } from "./contexts/PlantContext";

const AppContainer = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    padding: theme.spacing(2),
    maxWidth: '1280px',
    margin: '0 auto',
    fontFamily: '"Prompt", sans-serif',
    display: 'flex',
    flexDirection: 'column',
}));

const ContentLayout = styled(Box)({
    display: 'flex', flexDirection: 'row', flex: 1, gap: '20px', '@media (max-width: 768px)': {
        flexDirection: 'column',
    },
});

const MainContent = styled(Box)({
    flex: 3, display: 'flex', flexDirection: 'column',
});

const SidePanel = styled(Box)({
    flex: 1, display: 'flex', flexDirection: 'column',
});

const ControlsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20px',
    position: 'sticky',
    top: '20px',
    gap: '16px',
});

function AppContent() {
    const [grid, setGrid] = useState<{ rows: number, columns: number }>({ rows: 5, columns: 5 });
    const [scale, setScale] = useState(1.5);
    const { getAllUniquePlants } = usePlantContext();

    const handleGridFormSubmit = (rows: number, columns: number) => {
        setGrid({ rows, columns });
    }

    const zoomIn = () => {
        setScale(prev => Math.min(prev + 0.1, 3));
    };

    const zoomOut = () => {
        setScale(prev => Math.max(prev - 0.1, 0.5));
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <AppContainer>
            <div className={'title'}>
                <img alt={'GridGarden logo'} src={'/icon.png'}/>
                <h1>GridGarden</h1>
            </div>

            <ContentLayout className={'content-layout'}>
                <Legend plants={getAllUniquePlants()} />
                <MainContent>
                    <Grid
                        rows={grid.rows}
                        columns={grid.columns}
                        scale={scale}
                    />
                    <GridForm onSubmit={handleGridFormSubmit}/>
                </MainContent>
                <SidePanel className={'side-panel'}>
                    <ControlsContainer>
                        <ZoomControls
                            scale={scale}
                            onZoomIn={zoomIn}
                            onZoomOut={zoomOut}
                        />
                        <PrintButton onPrint={handlePrint}/>
                    </ControlsContainer>
                </SidePanel>
            </ContentLayout>
        </AppContainer>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <PlantProvider>
                <AppContent />
            </PlantProvider>
        </ThemeProvider>
    );
}

export default App;