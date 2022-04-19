import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './Component/MainPage/MainPage';
import AppRouting from './AppRouting/AppRouting';
import { makeStyles } from "@mui/styles"; 
import { BrowserRouter } from 'react-router-dom';

const useStyles = makeStyles({
  app: {
    backgroundColor: '#14161a',
    height: '100vh',
  },
});
function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
    <div className={classes.app}>
      <AppRouting />
    </div>
    </BrowserRouter>
  );
}

export default App;
