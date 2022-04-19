import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MainInterface } from "../models/MainInterface";
import { TrendingCoins, CoinList } from '../../API/API';
import axios from "axios";

export const fetchCoins = createAsyncThunk(
   'main/fetchCoins',
   async function (symbol:string) {
      const {data} = await axios.get(TrendingCoins(symbol))
      return data;
   }
)
export const fetchAllCoins = createAsyncThunk(
   'main/fetchAllCoins',
   async function (symbol:string) {
      const {data} = await axios.get(CoinList(symbol))
      return data;
   }
)

const initialState:MainInterface = {
   listTradingCoin : [],
   listAllCoin: [],
   symbol: "USD",
   isLoadingTrading : false,
   isLoadingAll : false,
   error : '',
}


export const MainPageReducer = createSlice ({
   name : 'main',
   initialState , 
   reducers: {
      changeSymbol(state, action:PayloadAction<string>){
         state.symbol = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchCoins.pending, (state, action) => {
         state.isLoadingTrading = true;
      })
      builder.addCase(fetchCoins.fulfilled, (state, action) => {
         state.listTradingCoin = action.payload;
         state.isLoadingTrading = false;
      })
      builder.addCase(fetchCoins.rejected, (state, action) => {
         state.error = 'Не удалось загрузить данные';
      })
      builder.addCase(fetchAllCoins.pending, (state, action) => {
         state.isLoadingAll = true;
      })
      builder.addCase(fetchAllCoins.fulfilled, (state, action) => {
         state.listAllCoin = action.payload;
         state.isLoadingAll = false;
      })
      builder.addCase(fetchAllCoins.rejected, (state, action) => {
         state.error = 'Не удалось загрузить данные';
      })
   }

})

export default MainPageReducer.reducer;

