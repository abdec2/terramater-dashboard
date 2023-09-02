import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,

} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import {
  statisticsCardsData,
  projectsTableData,
} from "@/data";
import UpdateModal from "./UpdateModal";

import { ethers } from "ethers";
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CONFIG } from "../config/config";
import token_ci from './../config/token_ci.json'
import staking_ci from './../config/staking_ci.json'
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext/GlobalContext";
import { useEffect } from "react";
import LoadingComponent from "../components/loading";
import { errorMsg, successMsg } from "../helpers/helpers";
import axios from "axios";
import nft_ci from './../config/nft_ci.json'
import auth from './../../auth/auth'

const MySwal = withReactContent(Swal)


export function Home() {
  const { fetchContractData, state, updateCollections } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)

  const [openGoldModal, setOpenGoldModal] = useState(false);
  const [openBitCoinModal, setOpenBitcoinModal] = useState(false);
  const [openMiscModal, setOpenMiscModal] = useState(false);
  const [openOtherNaturaModal, setOpenOtherNaturaModal] = useState(false);
 
  const [openTeamNaturaModal, setOpenTeamNaturaModal] = useState(false);
  const [openRAndDNaturaModal, setOpenRAndDNaturaModal] = useState(false);
  const [openReserveNaturaModal, setOpenReserveNaturaModal] = useState(false);
  const [openIncentiveNaturaModal, setOpenIncentiveNaturaModal] = useState(false);
  
  const [updateMpModal, setUpdateMpModal] = useState(false);
  const [goldVal, setGoldVal] = useState('')
  const [btcVal, setBtcVal] = useState('')
  const [miscVal, setMiscVal] = useState('')
  const [mpVal, setMpVal] = useState('')
  const [otherNaturaVal, setOtherNaturaVal] = useState('')
  const [teamVal, setTeamVal] = useState('')
  const [rAndDVal, setRAndDVal] = useState('')
  const [reserveVal, setReserveVal] = useState('')
  const [incentiveVal, setIncentiveVal] = useState('')
  const [poolId, setPoolId] = useState('')
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()
  const { openConnectModal } = useConnectModal()
  const provider = useProvider()

  // console.log(state)

  const submitGold = async () => {
    try {
      if (!isConnected) {
        openConnectModal()
        return
      }
      if (goldVal === '') {
        errorMsg('Please enter valid Amount!')
        return
      }
      setLoading(true)
      const contract = new ethers.Contract(CONFIG.TOKEN_ADDRESS, token_ci, signer)
      const estimateGas = await contract.estimateGas._setGoldReserves(goldVal)
      const txOpt = {
        gasLimit: estimateGas.toString()
      }
      const tx = await contract._setGoldReserves(goldVal, txOpt)
      await tx.wait()
      console.log(tx)
      setGoldVal('')
      fetchContractData()
      successMsg('Transaction has been completed successfuly')
      setLoading(false)
    } catch (e) {
      setLoading(false)
      errorMsg('Something went wrong.')
      console.log(e)
    }
  }

  const submitBtc = async () => {
    try {
      if (!isConnected) {
        openConnectModal()
        return
      }
      if (btcVal === '') {
        errorMsg('Please enter valid Amount!')
        return
      }
      setLoading(true)
      const contract = new ethers.Contract(CONFIG.TOKEN_ADDRESS, token_ci, signer)
      const estimateGas = await contract.estimateGas._setBitcoinReserves(ethers.utils.parseEther(btcVal))
      const txOpt = {
        gasLimit: estimateGas.toString()
      }
      const tx = await contract._setBitcoinReserves(ethers.utils.parseEther(btcVal), txOpt)
      await tx.wait()
      console.log(tx)
      setBtcVal('')
      fetchContractData()
      successMsg('Transaction has been completed successfuly')
      setLoading(false)
    } catch (e) {
      setLoading(false)
      errorMsg('Something went wrong')
      console.log(e)
    }
  }

  const submitMisc = async () => {
    try {
      
      if (!isConnected) {
        openConnectModal()
        return
      }
      if (miscVal === '') {
        errorMsg('Please enter valid Amount!')
        return
      }
      setLoading(true)
      const contract = new ethers.Contract(CONFIG.TOKEN_ADDRESS, token_ci, signer)
      const estimateGas = await contract.estimateGas._setMiscReserves(miscVal)
      const txOpt = {
        gasLimit: estimateGas.toString()
      }
      const tx = await contract._setMiscReserves(miscVal, txOpt)
      await tx.wait()
      console.log(tx)
      setMiscVal('')
      fetchContractData()
      successMsg('Transaction has been completed successfuly')
      setLoading(false)
    } catch (e) {
      setLoading(false)
      errorMsg('Something went wrong')
      console.log(e)
    }
  }

  const submitMp = async (pid, marketPrice) => {
    try {
      
      if (!isConnected) {
        openConnectModal()
        return
      }
      // if (mpVal === '') {
      //   errorMsg('Please enter valid Amount!')
      //   return
      // }
      setLoading(true)
      const contract = new ethers.Contract(CONFIG.STAKING_CONTRACT, staking_ci, signer)
      const mpValue = ethers.utils.parseUnits(marketPrice.toString(), 6)
      const estimateGas = await contract.estimateGas.set(pid, mpValue)
      const txOpt = {
        gasLimit: estimateGas.toString()
      }
      const tx = await contract.set(pid, mpValue, txOpt)
      await tx.wait()
      console.log(tx)
      setMpVal('')
      fetchContractData()
      getCollections()
      successMsg('Transaction has been completed successfuly')
      setLoading(false)
    } catch (e) {
      setLoading(false)
      errorMsg('Something went wrong')
      console.log(e)
    }
  }

  // const submitOtherNaturaReleased = async () => {
  //   try {
      
  //     if (!isConnected) {
  //       openConnectModal()
  //       return
  //     }
  //     if (otherNaturaVal === '') {
  //       errorMsg('Please enter valid Amount!')
  //       return
  //     }
  //     setLoading(true)
  //     const contract = new ethers.Contract(CONFIG.TOKEN_ADDRESS, token_ci, signer)
  //     const otherNatVal = ethers.utils.parseEther(otherNaturaVal)
  //     const estimateGas = await contract.estimateGas._setOtherNaturaReleased(otherNatVal)
  //     const txOpt = {
  //       gasLimit: estimateGas.toString()
  //     }
  //     const tx = await contract._setOtherNaturaReleased(otherNatVal, txOpt)
  //     await tx.wait()
  //     console.log(tx)
  //     setOtherNaturaVal('')
  //     fetchContractData()
  //     getCollections()
  //     successMsg('Transaction has been completed successfuly')
  //     setLoading(false)
  //   } catch (e) {
  //     setLoading(false)
  //     errorMsg('Something went wrong')
  //     console.log(e)
  //   }
  // }

  const submitOtherNaturaReleased = async (mode) => {
    console.log("mode", mode)
    try {
      
      if (!isConnected) {
        openConnectModal()
        return
      }
      let val;
      let attribute;
      if(mode === "team"){
        val = teamVal
        attribute = "team_natura_released"
      }else if(mode === "r&d"){
        val = rAndDVal
        attribute = "rnd_release"
      }else if(mode === "reserve"){
        val = reserveVal
        attribute = "reserve_natura_released"
      }else if(mode === "incentive"){
        val = incentiveVal
        attribute = "incentive_program_released"
      }
      if (val === '') {
        errorMsg('Please enter valid Amount!')
        return
      }
      setLoading(true)
      const token = auth.getToken()
      
        const getRes = await axios.get(`${CONFIG.BASE_URI}/api/natura-balances`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const getData = getRes.data.data[0].attributes[attribute]
        let id = getRes.data.data[0].id
        // console.log("data", getRes.data.data[0])
        let total = Number(val) + getData
        const postRes = await axios.put(`${CONFIG.BASE_URI}/api/natura-balances/${1}`,
        {
          "data": {
            id,
            [attribute] : total
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
   })
        const postData = postRes.data.data.attributes[attribute]
        let totalVal=0
if(postData === total){
   let allAttr = postRes.data.data.attributes
   for (const [key, value] of Object.entries(allAttr)) {
    if(key !== "updatedAt" && key !== "publishedAt" && key !== "createdAt"){
      totalVal += value;
    }
  
  }

try {
   const contract = new ethers.Contract(CONFIG.TOKEN_ADDRESS, token_ci, signer)
      const Val = ethers.utils.parseEther(totalVal.toString())
      const estimateGas = await contract.estimateGas._setOtherNaturaReleased(Val)
      const txOpt = {
        gasLimit: estimateGas.toString()
      }
      const tx = await contract._setOtherNaturaReleased(Val, txOpt)
      await tx.wait()
      console.log(tx)
      setOtherNaturaVal('')
      setRAndDVal('')
      setIncentiveVal('')
      setTeamVal('')
      setReserveVal('')
      fetchContractData()
      getCollections()
      successMsg('Transaction has been completed successfuly')
      setLoading(false)
} catch (error) {
  setLoading(false)
  errorMsg('Something went wrong')
  console.log(error)
}
}
    } catch (e) {
      setLoading(false)
      errorMsg('Something went wrong')
      console.log(e)
    }
  }

  const handleOpenGoldModal = () => setOpenGoldModal(!openGoldModal);
  const handleOpenBitCoinModal = () => setOpenBitcoinModal(!openBitCoinModal);
  const handleOpenMiscModal = () => setOpenMiscModal(!openMiscModal);
  const handleOpenOtherNaturaModal = () => setOpenOtherNaturaModal(!openOtherNaturaModal);
  const handleOpenTeamNaturaModal = () => setOpenTeamNaturaModal(!openTeamNaturaModal);
  const handleOpenRAndDNaturaModal = () => setOpenRAndDNaturaModal(!openRAndDNaturaModal);
  const handleOpenReserveNaturaModal = () => setOpenReserveNaturaModal(!openReserveNaturaModal);
  const handleOpenIncentiveNaturaModal = () => setOpenIncentiveNaturaModal(!openIncentiveNaturaModal);

  const handleOpen = (id) => {
    if (id === 1) {
      handleOpenGoldModal()
    }
    if (id === 2) {
      handleOpenBitCoinModal()
    }
    if (id === 4) {
      handleOpenMiscModal()
    }
    if (id === 5) {
      handleOpenOtherNaturaModal()
    }

    if (id === 7) {
      handleOpenTeamNaturaModal()
    }
    if (id === 8) {
      handleOpenRAndDNaturaModal()
    }
    if (id === 9) {
      handleOpenReserveNaturaModal()
    }
    if (id === 10) {
      handleOpenIncentiveNaturaModal()
    }

  }

  const updateMarketPrice = (pid) => {
    setPoolId(pid)
    setUpdateMpModal(!updateMpModal)
  }

  const getMarketPrice = async (collectionId) => {
    const token = auth.getToken()
    const res = await axios.get(`${CONFIG.BASE_URI}/api/transactions?filters[collection]=${collectionId}&sort[0]=publishedAt:desc&sort[1]=price:asc`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = res.data.data
    return data
  }

  const getCollections = async () => {
    try {
      const token = auth.getToken()
      const res = await axios.get(`${CONFIG.BASE_URI}/api/collections?filters[status]=Active&filters[feature]=true`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const collections = res.data.data
      if (collections.length > 0) {
        const collectionData = await Promise.all(collections.map(async (item) => {
          const contract = new ethers.Contract(item.attributes.contract_address, nft_ci, provider)
          const stcontract = new ethers.Contract(CONFIG.STAKING_CONTRACT, staking_ci, provider)
          let stakingPoolLength = await stcontract.poolLength()
          stakingPoolLength = parseInt(stakingPoolLength.toString())
          if (stakingPoolLength > 0) {
            for (let i = 0; i < stakingPoolLength; i++) {
              let pool = await stcontract.poolInfo(i)
              if (pool.nftAddress.toLowerCase() === item.attributes.contract_address.toLowerCase()) {
                item.pid = i
                item.marketPrice = ethers.utils.formatUnits(pool.cost, 6)
              }
            }
          }
          const tradeData = await getMarketPrice(item.id);
          if(tradeData.length > 0) {
            item.ltp = tradeData[0].attributes.price
          } else {
            item.ltp = 0
          }
          let totalSupply = await contract.maxSupply()
          totalSupply = parseFloat(totalSupply.toString())
          let cost = await contract.cost()
          cost = ethers.utils.formatUnits(cost, 6)
          cost = parseFloat(cost)
          const totalValue = (item.marketPrice !== undefined && parseFloat(item.marketPrice) !== 0) ? totalSupply * parseFloat(item.marketPrice) : totalSupply * cost
          item.totalSupply = totalSupply
          item.totalValue = totalValue
          item.floorPrice = cost
          return item
        }))
        updateCollections(collectionData)
      }

    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    if( fetchContractData){
      fetchContractData()
      getCollections()
    }
   
  }, [])

if(state !== undefined){
  return (
    <div className="mt-12">
      {loading && (<LoadingComponent msg='Waiting for transaction...' />)}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsCardsData.map(({ icon, title, footer, update, id, ...rest }) => (
          <StatisticsCard
            key={title}
            data={state}
            id={id}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              update && (
                <div className="text-right">
                  <Menu placement="left-start">
                    <MenuHandler>
                      <IconButton size="sm" variant="text" color="blue-gray">
                        <EllipsisVerticalIcon
                          strokeWidth={3}
                          fill="currenColor"
                          className="h-6 w-6"
                        />
                      </IconButton>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={() => handleOpen(id)}>Update</MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              )
            }
          />
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-5">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                NFT Collections
              </Typography>
              {/* <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>30 done</strong> this month
              </Typography> */}
            </div>

          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "NFT Collections",
                    "Total Value",
                    "Total Supply",
                    "Start Price",
                    "Market Price",
                    "Last Trade Price",
                    "Action",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] text-center font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state && state.Collections.map(
                  ({ id, attributes: { name }, totalSupply, totalValue, floorPrice, marketPrice, pid, ltp }, key) => {
                    const className = `py-3 px-5 ${key === state.Collections.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold text-center"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            {totalValue}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            {totalSupply}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            USDT {floorPrice}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            USDT {marketPrice}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            USDT {ltp}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex items-center justify-center">
                            <Menu placement="left-start">
                              <MenuHandler>
                                <IconButton
                                  size="sm"
                                  variant="text"
                                  color="blue-gray"
                                >
                                  <EllipsisVerticalIcon
                                    strokeWidth={3}
                                    fill="currenColor"
                                    className="h-6 w-6"
                                  />
                                </IconButton>
                              </MenuHandler>
                              <MenuList>
                                <MenuItem onClick={() => submitMp(pid, ltp)}>Update Market Price</MenuItem>
                              </MenuList>
                            </Menu>

                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        {/* <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card> */}
      </div>
      <UpdateModal open={openGoldModal} handleOpen={handleOpenGoldModal} title={'Update Gold Reserves'} val={goldVal} setVal={setGoldVal} submit={submitGold} txtLabel="Amount in USD"/>
      <UpdateModal open={openBitCoinModal} handleOpen={handleOpenBitCoinModal} title={'Update Bitcoin Reserves'} val={btcVal} setVal={setBtcVal} submit={submitBtc} txtLabel="Amount in BTC"/>
      <UpdateModal open={openMiscModal} handleOpen={handleOpenMiscModal} title={'Update Miscellaneous Reserves'} val={miscVal} setVal={setMiscVal} submit={submitMisc} txtLabel="Amount in USD"/>
      {/* <UpdateModal open={updateMpModal} handleOpen={updateMarketPrice} title={'Update Market Price'} val={mpVal} setVal={setMpVal} submit={submitMp} txtLabel="Amount in USDT"/> */}
      {/* <UpdateModal open={openOtherNaturaModal} handleOpen={handleOpenOtherNaturaModal} title={'Update Other Natura Released'} val={otherNaturaVal} setVal={setOtherNaturaVal} submit={submitOtherNaturaReleased} txtLabel="Enter Natura Tokens" /> */}
                                                                                                                                                                   
      <UpdateModal open={openTeamNaturaModal} handleOpen={handleOpenTeamNaturaModal} title={'Update Team Natura Released'} val={teamVal} setVal={setTeamVal} submit={()=>submitOtherNaturaReleased("team")} txtLabel="Enter Natura Tokens" />
      <UpdateModal open={openRAndDNaturaModal} handleOpen={handleOpenRAndDNaturaModal} title={'Update R&D Natura Released'} val={rAndDVal} setVal={setRAndDVal} submit={()=>submitOtherNaturaReleased("r&d")} txtLabel="Enter Natura Tokens" />
      <UpdateModal open={openReserveNaturaModal} handleOpen={handleOpenReserveNaturaModal} title={'Update Reserve Natura Released'} val={reserveVal} setVal={setReserveVal} submit={()=>submitOtherNaturaReleased("reserve")} txtLabel="Enter Natura Tokens" />
      <UpdateModal open={openIncentiveNaturaModal} handleOpen={handleOpenIncentiveNaturaModal} title={'Update Incentive Program Natura'} val={incentiveVal} setVal={setIncentiveVal} submit={()=>submitOtherNaturaReleased("incentive")} txtLabel="Enter Natura Tokens" />
     
    </div>
  );
}

}

export default Home;
