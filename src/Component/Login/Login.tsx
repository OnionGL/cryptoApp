import React from 'react'
import style from './Login.module.css'
import { authentication } from '../../API/Firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
export default function Login() {
   const SignInWithGogle = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(authentication , provider)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      })
    }
   return (
      <div style={{
         background: '#14161a',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         width: '100vw',
         height: '80vh'
      }}
         >
         <button type="button" onClick={SignInWithGogle} style={{
            width: 350,
            height: 50,
            padding: 12,
            border: 'none',
            borderRadius: 3,
            color: '#111',
            fontSize: 22,
            fontWeight: '500',
          
            backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)',
            backgroundColor: '#ffd601',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 12,
         }}>
               Sign in with Google
         </button>
      </div>
   )
}
