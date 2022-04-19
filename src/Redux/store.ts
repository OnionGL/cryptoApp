import { configureStore , combineReducers } from "@reduxjs/toolkit";
import MainPageReducer from './reducer/MainPage-reducer';
import SingleCoinReducer from './reducer/SingleCoin-reducer';

const rootReducer = combineReducers({
   MainPageReducer,
   SingleCoinReducer,
})

export const SetupStore = () => {
   return configureStore({
      reducer : rootReducer
   })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof SetupStore>
export type AppDispatch = AppStore['dispatch']