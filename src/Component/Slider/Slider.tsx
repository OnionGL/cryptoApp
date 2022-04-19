import { CircularProgress, Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useEffect , useState} from 'react'
import { fetchAllCoins, fetchCoins } from '../../Redux/reducer/MainPage-reducer';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(({
   image : {
      backgroundImage: "url(https://w-dog.ru/wallpapers/13/18/454963954650339.jpg)",
      backgroundOrigin: '0.7',
      backgroundSize: "100%",
      backgroundPosition: 'center',
   },
   imageContainer : {
      height: 400,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      paddingTop: 10,
   },
   textContain:{
      display: 'flex',
      flexDirection : 'column',
      textAlign: 'center',
      justifyContent: 'center'
   },
}))
export const ChangeNumber = (x: any) => {
   return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
export default function Slider() {
   const history = useNavigate();
   const classes = useStyles()
   const { listTradingCoin, symbol , isLoadingTrading} = useAppSelector(state => state.MainPageReducer);
   const item = listTradingCoin.map(coins => {
      let profit = coins?.price_change_percentage_24h>=0;
      return(
         <div style={{
            cursor: 'pointer',
            }} onClick={() => history(`/${coins.id}`)}>
           <img 
          src={coins?.image}
          alt={coins?.name}
          height='80'
          style={{marginTop: 50}}
         />
         <div style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            color: '#fff'
         }}>
            <div style={{
               display: 'flex',
               flexDirection: 'row',
               justifyContent: 'center',
               alignContent: 'center'
            }}>
               <div style={{color : '#fff', marginRight: 5}}>{coins?.symbol}</div> 
            <span style={{
               color: profit ? '#00FF00' : 'red',
            }}>{profit && '+'} {coins?.price_change_percentage_24h?.toFixed(2)+ "%"}</span>
            </div>
            
            <span style={{fontSize: 22, fontWeight: 500}}>
            {symbol} {ChangeNumber(coins?.current_price?.toFixed(2))}
         </span>
         </div>
         
         </div>
      )
   })
   return <>
   {isLoadingTrading ? <CircularProgress />:
      <div className={classes.image}>
         <Container className={classes.imageContainer}>
            <div className={classes.textContain}>
               <Typography variant = "h1" style={{
                  color : "#fff",
                  fontWeight : 'bold'
               }}>
               CryptoApp
            </Typography>
            <AliceCarousel 
               mouseTracking
               infinite
               autoPlayInterval={1000}
               animationDuration={1500}
               disableDotsControls
               responsive = {{
                  0: {
                     items: 2,
                  },
                  512: {
                     items: 4,
                  }
               }}
               autoPlay
               items = {item}
               disableButtonsControls
            />
            </div>
         </Container>
      </div>}
   </>
}
