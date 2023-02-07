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
    otherNaturaReleased: null,
    stakingRewardsClaimed: null,
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

    const updateOtherNaturaReleased = (amount) => {
        dispatch({
            type: 'UPDATE_OTHER_NATURA_RELEASED',
            payload: amount
        })
    }

    const updateCollections = (collections) => {
        dispatch({
            type: 'UPDATE_COLLECTIONS',
            payload: collections
        })
    }

    const updateStakingRewardsClaimed = (amount) => {
        dispatch({
            type: 'UPDATE_STAKING_REWARDS',
            payload: amount
        })
    }

    const fetchContractData = async () => {
        const stakingContract = new ethers.Contract(CONFIG.STAKING_CONTRACT, staking_ci, provider)
        const tokenContract = new ethers.Contract(CONFIG.TOKEN_ADDRESS, token_ci, provider)
        const goldReserve = await tokenContract._getGoldReserves()
        const btcReserve = await tokenContract._getBitcoinReserves()
        const miscReserve = await tokenContract._getMiscReserves()
        const otherNaturaReleased = await tokenContract._getOtherNaturaReleased()
        const naturaPrice = await tokenContract.getNaturaPrice()
        const stakingRewards = await stakingContract.totalRewardsClaimed()

        console.log(goldReserve.toString(), btcReserve.toString(), miscReserve.toString())

        updateGoldReserve(goldReserve.toString())
        updateBitcoinReserve(ethers.utils.formatEther(btcReserve.toString()))
        updateMiscReserve(miscReserve.toString())
        updateOtherNaturaReleased(ethers.utils.formatEther(otherNaturaReleased))
        updateNaturaPrice((parseFloat(naturaPrice.toString()) / Math.pow(10,6)))
        updateStakingRewardsClaimed(ethers.utils.formatEther(stakingRewards.toString()))
    }

    return (
        <GlobalContext.Provider value={
            {
                state, 
                updateGoldReserve,
                updateBitcoinReserve,
                updateMiscReserve,
                updateNaturaPrice,
                updateOtherNaturaReleased,
                fetchContractData,
                updateCollections,
                updateStakingRewardsClaimed
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}