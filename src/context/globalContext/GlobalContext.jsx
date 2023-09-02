import { createContext, useReducer } from "react";
import { AppReducer } from '../reducer/AppReducer'
import { ethers } from "ethers";
import token_ci from '@/pages/config/token_ci.json'
import staking_ci from '@/pages/config/staking_ci.json'
import { CONFIG } from "@/pages/config/config";
import { useProvider } from 'wagmi'
import axios from "axios";
import auth from './../../auth/auth'

const initialState = {
    GoldReserve: null,
    BitcoinReserve: null,
    MiscReserve: null, 
    NaturaPrice: null,
    otherNaturaReleased: null,
    incentiveProgramReleased: null,
    rAndDRealeased: null,
    reserveNaturaReleased: null,
    teamNaturaReleased: null,
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

    const updateIncentiveProgramReleased = (amount) => {
        dispatch({
            type: 'UPDATE_INCENTIVE_PROGRAM_RELEASED',
            payload: amount
        })
    }
    const updateRAndDReleased = (amount) => {
        dispatch({
            type: 'UPDATE_R&D_RELEASED',
            payload: amount
        })
    }
    const updateReserveNaturaReleased = (amount) => {
        dispatch({
            type: 'UPDATE_RESERVE_NATURA_RELEASED',
            payload: amount
        })
    }
    const updateTeamNaturaReleased = (amount) => {
        dispatch({
            type: 'UPDATE_TEAM_NATURA_RELEASED',
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
       
        const token = auth.getToken()
        let attributes ={}
        try {
            const getRes = await axios.get(`${CONFIG.BASE_URI}/api/natura-balances`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
            //   console.log("getRes",getRes.data.data[0])
              attributes = getRes.data.data[0].attributes
            
        } catch (error) {
            console.log("error", error)
        }
        const incentiveProgramReleased = attributes["incentive_program_released"]
        const rAndDReleased = attributes["rnd_release"]
        const reserveNaturaReleased = attributes["reserve_natura_released"]
        const teamNaturaReleased = attributes["team_natura_released"]
       
        // console.log(goldReserve.toString(), btcReserve.toString(), miscReserve.toString())

        updateGoldReserve(goldReserve.toString())
        updateBitcoinReserve(ethers.utils.formatEther(btcReserve.toString()))
        updateMiscReserve(miscReserve.toString())
        updateOtherNaturaReleased(ethers.utils.formatEther(otherNaturaReleased))
        updateNaturaPrice((parseFloat(naturaPrice.toString()) / Math.pow(10,6)))
        updateStakingRewardsClaimed(Number(ethers.utils.formatEther(stakingRewards.toString())).toFixed(3))
        updateIncentiveProgramReleased((incentiveProgramReleased).toFixed(2))
        updateRAndDReleased((rAndDReleased).toFixed(2))
        updateReserveNaturaReleased((reserveNaturaReleased).toFixed(2))
        updateTeamNaturaReleased((teamNaturaReleased).toFixed(2))
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
                updateIncentiveProgramReleased,
                updateRAndDReleased,
                updateReserveNaturaReleased,
                updateTeamNaturaReleased,
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