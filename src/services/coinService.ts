

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}


const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana';

export async function fetchCoins(): Promise<Coin[]> {
  try {
    const response = await fetch(API_URL);

    
    if (!response.ok) {
      throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
    }

    const data: Coin[] = await response.json();
    return data;
  } catch (error) {
    console.error('Falla al obtener las criptomonedas:', error);
    throw error;
  }
}