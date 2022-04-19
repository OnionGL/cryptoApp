import React , {useEffect, useState} from 'react'
import { SingleCoinInterface } from '../../Redux/models/SingleCoinInterface';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import { fetchSingleCoinsHistory } from '../../Redux/reducer/SingleCoin-reducer';
import { Button, createTheme, LinearProgress, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const darkTheme = createTheme({
   palette: {
     primary: {
       main: "#fff",
     },
     mode: "dark",
   },
 });
 const useStyles = makeStyles({
   container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
   }
});
export default function CoinInfoChart(coin: any) {
   const chartDays = [
      {
        label: "24 Hours",
        value: 1,
      },
      {
        label: "30 Days",
        value: 30,
      },
      {
        label: "3 Months",
        value: 90,
      },
      {
        label: "1 Year",
        value: 365,
      },
    ];
   const classes = useStyles();
   const dispatch = useAppDispatch()
   const {symbol} = useAppSelector(state => state.MainPageReducer)
   const {historyArray , isLoadingHistory} = useAppSelector(state => state.SingleCoinReducer)
   const [days , setDays] = useState(365)
   const obj = {
      id: coin.coin.id,
      days: days,
      currency: symbol
   }
   useEffect(() => {
      dispatch(fetchSingleCoinsHistory(obj))
   }, [obj.currency , obj.days])
   console.log(obj.days)
   return (
      <ThemeProvider theme={darkTheme}>
         <div className={classes.container}>
         {!historyArray ? 
         <LinearProgress /> 
         : 
         <>
         <Line
              data={{
                labels: historyArray.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return obj.days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historyArray.map((coin) => coin[1]),
                    label: `Price ${obj.days} Days in ${obj.currency}`,
                    borderColor: "#0057b7",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <Button
                  style={{
                     backgroundColor: '#0057b7',
                     color: "#fff"
                  }}
                  variant="contained"
                  key={day.value}
                  onClick={() => setDays(day.value)}
                >
                  {day.label}
                </Button>
              ))}
            </div>
            </>
}
         </div>
      </ThemeProvider>
   )
}
