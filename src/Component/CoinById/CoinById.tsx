import { CircularProgress, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import { fetchSingleCoins } from '../../Redux/reducer/SingleCoin-reducer';
import Typography from '@mui/material/Typography';
import ReactHtmlParser from 'react-html-parser';
import { ChangeNumber } from '../Slider/Slider';
import CoinInfoChart from './CoinInfoChart';

const useStyles = makeStyles((theme) => ({
   container: {
     display: "flex",
     backgroundColor: '#14161a',
     color: '#fff',
     padding: 20
   },
   sidebar: {
     width: "30%",
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     marginTop: 25,
     padding: 20,
     borderRight: "2px solid grey",
   },
   heading: {
     fontWeight: "bold",
     marginBottom: 20,
     fontFamily: "Montserrat",
   },
   description: {
     width: "100%",
     fontFamily: "Montserrat",
     padding: 25,
     paddingBottom: 15,
     paddingTop: 0,
     textAlign: "justify",
   },
   marketData: {
     alignSelf: "start",
     paddingTop: 10,
     width: "100%",
   },
 }));

export default function CoinById() {
   const {id} = useParams()
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(fetchSingleCoins(id || ''))
   },[])
   const {coin , isLoadingSingle} = useAppSelector(state => state.SingleCoinReducer)
   const {symbol} = useAppSelector(state => state.MainPageReducer)
   const classes = useStyles();
   return <>
   {isLoadingSingle ? <CircularProgress /> : 
      <div className={classes.container}>
         <div className={classes.sidebar}>
            <img src={coin?.image?.large} alt={coin?.name} height='200' style={{marginBottom: 20}}/>
            <Typography variant='h3' className={classes.heading}>
               {coin?.name}
            </Typography>
            <Typography variant='subtitle1' className={classes.heading}>
               {ReactHtmlParser(coin?.description?.en.split(". ")[0])}
            </Typography>
            <div className={classes.marketData}>
               <span style={{display: 'flex'}}>
                  <Typography variant='h4' className={classes.heading}>
                     Rank: {coin?.market_cap_rank}
                  </Typography>
               </span>
               <span style={{display: 'flex'}}>
                  <Typography variant='h4' className={classes.heading}>
                     Current Price: {symbol}{' '}{symbol === 'RUB' ? ChangeNumber(coin?.market_data.current_price?.rub) : ChangeNumber(coin?.market_data?.current_price?.usd)}
                  </Typography>
               </span>
               <span style={{display: 'flex'}}>
                  <Typography variant='h4' className={classes.heading}>
                     Market Cap: {symbol}{' '}{symbol === 'RUB' ? ChangeNumber(coin?.market_data?.market_cap?.rub.toString().slice(0 , -6) + "M") : ChangeNumber(coin?.market_data?.market_cap?.usd.toString().slice(0 , -6) + "M")}
                  </Typography>
               </span>
            </div>
         </div>
         <CoinInfoChart coin={coin}/>
      </div>}
   </>
}
