export interface SingleCoinInterface {
   coin : {
      name: string,
      image: {
         large:string
      },
      description: {
         en: string
      },
      market_cap_rank: number,
      market_data: {
         current_price: {
            usd : number,
            rub : number
         },
         market_cap : {
            usd : number,
            rub : number
         }
      }
   }
   historyArray : Array<Array<number>>,
   isLoadingSingle: boolean,
   isLoadingHistory: boolean,
   error : string
}