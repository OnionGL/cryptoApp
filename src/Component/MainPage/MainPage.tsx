import React , {useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks/hooks';
import Slider, { ChangeNumber } from '../Slider/Slider';
import {useNavigate} from 'react-router-dom'
import {Table, createTheme, LinearProgress, TableContainer, TextField, ThemeProvider, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { fetchCoins , fetchAllCoins } from '../../Redux/reducer/MainPage-reducer';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  border: {
    "&:hover" : {
      border: '2px solid #fff',
   }
  }
})
const darkTheme = createTheme({
  palette : {
     primary: {
        main: "#fff"
     },
     mode: 'dark',
  },
})

export default function MainPage() {
  const classes = useStyles();
  const {listAllCoin , symbol, isLoadingAll} = useAppSelector(state => state.MainPageReducer)
  const [search , setSearch] = useState('')
  const [page , setPage] = useState(1)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCoins(symbol))
    dispatch(fetchAllCoins(symbol))
  },[symbol])
  const history = useNavigate()
  const handleSearch = () => {
      return listAllCoin.filter(item => 
      item.name.toUpperCase().includes(search) ||
      item.name.toLowerCase().includes(search) 
    )
  }
   return <>
      <div style={{
        backgroundColor: '#14161a'
      }}>
        <ThemeProvider theme={darkTheme}>
          <Slider />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <TextField 
          label="Search Crypto by Name"
          variant="outlined"
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: '80%'
          }}
          onChange={(e) => setSearch(e.target.value)}
         />
         <TableContainer style={{width: '80%'}}>
            {
              isLoadingAll ? (
                <LinearProgress />
              ) : (
                <Table>
                  <TableHead style={{backgroundColor: "#0057b7"}}>
                    <TableRow>
                      {["CRYPTO" , "PRICE" , "24H CHANGE" , "MARKET CAP"].map(head => (
                        <TableCell
                         style={{
                           color: '#fff',
                           fontWeight: 700,
                           fontFamily: "Montserrat"
                         }}
                         key={head}
                         align="center"
                        >
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {handleSearch()
                    .slice((page-1)*10,(page-1)*10+10)
                    .map(row => (
                      <TableRow className={classes.border} style={{cursor: 'pointer'}} onClick={() => history(`/${row.id}`)} key={row.name}>
                      <TableCell component="th" scope="row">
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}>
                          <img 
                          src={row.image}
                          style={{
                            width: 50,
                            height: 50,
                            marginBottom: 20,
                          }}
                        />
                        {row.symbol.toUpperCase()}
                        <span style={{color: 'darkgray'}}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="center"><div>
                        {symbol} {ChangeNumber(row.current_price.toFixed(2))}
                        </div></TableCell>
                      <TableCell align="center" style={{
                        color: row.price_change_percentage_24h > 0 ? '#00FF00' : "red",
                      }}>{row.price_change_percentage_24h>=0 && "+"}{row.price_change_percentage_24h.toFixed(2) + "%"}</TableCell>
                      <TableCell align="center">{symbol} {ChangeNumber(row.market_cap.toString().slice(0 , -6))} M</TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            }
         </TableContainer>
         <Pagination 
           style={{
             color: '#0057b7',
             marginTop: 25,
             marginBottom: 25,
           }}
           count={Number((handleSearch()?.length / 10).toFixed(0))}
           onChange={(_ ,value) => {
            setPage(value); 
            window.scroll(0, 450)
          }}
         />
        </div>
         
        </ThemeProvider>
         
      </div>
   </>
}
