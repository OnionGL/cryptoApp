import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MainInterface } from "../models/MainInterface";
import { TrendingCoins, CoinList, SingleCoin, HistoricalChart } from '../../API/API';
import { SingleCoinInterface } from '../models/SingleCoinInterface';
import axios from "axios";

export const fetchSingleCoins = createAsyncThunk(
   'main/fetchSingleCoins',
   async function (id:string) {
      const {data} = await axios.get(SingleCoin(id))
      return data;
   }
)
export const fetchSingleCoinsHistory = createAsyncThunk(
   'main/fetchSingleCoinsHistory',
   async function (item: any) {
      const {data} = await axios.get(HistoricalChart(item.id, item.days, item.currency))
      return data.prices;
   }
)

const initialState:SingleCoinInterface = {
   coin : {
      name: '',
      image: {large: ''},
      description: {
         en: ''
      },
      market_cap_rank : 0,
      market_data: {
         current_price: 
            {"usd" : 0,
            "rub" : 0},
         market_cap: 
            {"usd" : 0,
            "rub" : 0}
      }
   },
   historyArray : [],
   isLoadingSingle: false,
   isLoadingHistory: false,
   error : '',
}


export const SingleCoinReducer = createSlice ({
   name : 'main',
   initialState , 
   reducers: {
   },
   extraReducers: (builder) => {
      builder.addCase(fetchSingleCoins.pending, (state, action) => {
         state.isLoadingSingle = true;
      })
      builder.addCase(fetchSingleCoins.fulfilled, (state, action) => {
         state.coin = action.payload;
         state.isLoadingSingle = false;
      })
      builder.addCase(fetchSingleCoins.rejected, (state, action) => {
         state.error = 'Не удалось загрузить данные';
      })
      builder.addCase(fetchSingleCoinsHistory.pending, (state, action) => {
         state.isLoadingHistory = true
      })
      builder.addCase(fetchSingleCoinsHistory.fulfilled, (state, action) => {
         state.historyArray = action.payload;
         state.isLoadingHistory = false
      })
      builder.addCase(fetchSingleCoinsHistory.rejected, (state, action) => {
         state.error = 'Не удалось загрузить данные';
      })
   }

})

export default SingleCoinReducer.reducer;

