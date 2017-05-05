import apisauce from 'apisauce'

const api = apisauce.create({
    baseURL: 'https://api.cryptonator.com/api/',
})

export const getPriceOfCoinInCurrency = (coin, currency) => api.get(`ticker/${coin}-${currency}`)
