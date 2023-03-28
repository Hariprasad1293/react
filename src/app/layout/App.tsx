
import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Container, createTheme, Typography, CssBaseline, ThemeProvider} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Header from "./Header";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode? 'dark' : 'light';
  const theme = createTheme({
    palette : {
      mode : paletteType,
      background:{
        default : paletteType == 'light' ? '#eaeaea' : '#121212'
      }
    }
  })
  function handleThemeChange(){
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}  />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
export default App;
