import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@mui/styles"; 
import { createTheme, MenuItem, Select, ThemeProvider } from '@mui/material';
import {fetchCoins, MainPageReducer} from '../../Redux/reducer/MainPage-reducer';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {authentication} from '../../API/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';


const useStyles = makeStyles({
   title: {
      flex: 1,
      color: 'gold',
      fontFamily: 'Montserrat',
      fontWeight: '700',
      cursor: 'pointer'
   },
   background : {
      backgroundColor: '#14161a',
      height : 50,
   },
   button : {
     width: 100,
     height: 50,
     backgroundColor: 'gold',
     color : "#111",
   }
});
const darkTheme = createTheme({
   palette : {
      primary: {
         main: "#fff"
      },
      mode: 'dark',
   },
})

export default function Header() {
   const [user] = useAuthState(authentication)
   const classes = useStyles();
   const history = useNavigate()
   const dispatch = useAppDispatch();
   const {symbol} = useAppSelector(state => state.MainPageReducer);
   const {changeSymbol} = MainPageReducer.actions;
   const handleChangeSymbol = (e: any) => {
      dispatch(changeSymbol(e))
   }  
   return (
      <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.background}>
          <Typography className={classes.title} variant="h4" component="div" sx={{ flexGrow: 1}} onClick={() => history('/')}>
               CryptoApp
          </Typography>
          <Select
            value={symbol}
            variant='outlined'
            style={{
               width: 150,
               height: 50,
               marginRight: 15,
            }}
            onChange={(e) => handleChangeSymbol(e.target.value)}
          >
             <MenuItem value={"USD"}>
             USD
             </MenuItem>
             <MenuItem value={"RUB"}>
             RUB
             </MenuItem>

          </Select>
          <Button className={classes.button} onClick={() => authentication.signOut()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
   )
}
