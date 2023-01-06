import { createContext, useReducer } from "react";
import { AppReducer } from '../reducer/AppReducer'
import { ethers } from "ethers";
import token_ci from '@/pages/config/token_ci.json'
import staking_ci from '@/pages/config/staking_ci.json'
import { CONFIG } from "@/pages/config/config";
import { useProvider } from 'wagmi'

const initialState = {
    GoldReserve: null,
    BitcoinReserve: null,
    MiscReserve: null, 
    NaturaPrice: null,
    Collections: []
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    const provider = useProvider()

    const updateGoldReserve = (amount) => {
        dispatch({
            type: 'UPDATE_GOLD_RESERVES', 
            payload: amount
        })
    }

    const updateBitcoinReserve = (amount) => {
        dispatch({
            type: 'UPDATE_BITCOIN_RESERVES',
            payload: amount
        })
    }

    const updateMiscReserve = (amount) => {
        dispatch({
            type: 'UPDATE_MISC_RESERVES',
            payload: amount
        })
    }

    const updateNaturaPrice = (price) => {
        dispatch({
            type: 'UPDATE_NATURA_PRICE',
            payload: price
        })
    }

    const updateCollections = (collections) => {
        dispatch({
            type: 'UPDATE_COLLECTIONS',
            payload: collections
        })
    }

    const fetchContractData = async () => {
        const stakingContract = new ethers.Contract(CONFIG.STAKING_CONTRACT, staking_ci, provider)
        const tokenContract = new ethers.Contract(CONFIG.TOKEN_ADDRESS, token_ci, provider)
        const goldReserve = await tokenContract._getGoldReserves()
        const btcReserve = await tokenContract._getBitcoinReserves()
        const miscReserve = await tokenContract._getMiscReserves()
        const nftPrice = await stakingContract.totNftPrice()
        const naturaPrice = await tokenContract.getNaturaPrice(nftPrice.toString())

        updateGoldReserve(goldReserve.toString())
        updateBitcoinReserve(btcReserve.toString())
        updateMiscReserve(miscReserve.toString())
        updateNaturaPrice((parseFloat(naturaPrice.toString()) / 100))

    }

    return (
        <GlobalContext.Provider value={
            {
                state, 
                updateGoldReserve,
                updateBitcoinReserve,
                updateMiscReserve,
                updateNaturaPrice,
                fetchContractData,
                updateCollections
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}