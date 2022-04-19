import React, { useEffect } from 'react'
import {
   Routes,
   Route,
   Navigate,
   BrowserRouter} from 'react-router-dom'
import Header from '../Component/Header/Header'
import MainPage from '../Component/MainPage/MainPage'
import CoinById from '../Component/CoinById/CoinById';
import { useAppSelector } from '../Redux/hooks/hooks';
import {useAuthState} from 'react-firebase-hooks/auth'
import Login from '../Component/Login/Login';
import {authentication} from '../API/Firebase'


export default function AppRouting() {
   const [user] = useAuthState(authentication)
   return <>
      <Header />
      {user ? (
         <Routes>
         <Route exact path="/" element={<MainPage />}/>
         <Route path="/:id" element={<CoinById />}/>
         </Routes>
      ) : (
         <Login />
      )}
      
   </>
}
