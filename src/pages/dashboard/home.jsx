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

const MySwal = withReactContent(Swal)


export function Home() {
  const { fetchContractData, state, updateCollections } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const [openGoldModal, setOpenGoldModal] = useState(false);
  const [openBitCoinModal, setOpenBitcoinModal] = useState(false);
  const [openMiscModal, setOpenMiscModal] = useState(false);
  const [updateMpModal, setUpdateMpModal] = useState(false);
  const [goldVal, setGoldVal] = useState('')
  const [btcVal, setBtcVal] = useState('')
  const [miscVal, setMiscVal] = useState('')
  const [mpVal, setMpVal] = useState('')
  const [poolId, setPoolId] = useState('')
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()
  const { openConnectModal } = useConnectModal()
  const provider = useProvider()

  console.log(state)

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
      const estimateGas = await contract.estimateGas._setBitcoinReserves(btcVal)
      const txOpt = {
        gasLimit: estimateGas.toString()
      }
      const tx = await contract._setBitcoinReserves(btcVal, txOpt)
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

  const submitMp = async () => {
    try {
      
      if (!isConnected) {
        openConnectModal()
        return
      }
      if (mpVal === '') {
        errorMsg('Please enter valid Amount!')
        return
      }
      setLoading(true)
      const contract = new ethers.Contract(CONFIG.STAKING_CONTRACT, staking_ci, signer)
      const mpValue = ethers.utils.parseUnits(mpVal, 6)
      const estimateGas = await contract.estimateGas.set(poolId, mpValue)
      const txOpt = {
        gasLimit: estimateGas.toString()
      }
      const tx = await contract.set(poolId, mpValue, txOpt)
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


  const handleOpenGoldModal = () => setOpenGoldModal(!openGoldModal);
  const handleOpenBitCoinModal = () => setOpenBitcoinModal(!openBitCoinModal);
  const handleOpenMiscModal = () => setOpenMiscModal(!openMiscModal);


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

  }

  const updateMarketPrice = (pid) => {
    setPoolId(pid)
    setUpdateMpModal(!updateMpModal)
  }

  const getCollections = async () => {
    try {
      const res = await axios.get(`${CONFIG.BASE_URI}/api/collections?filters[status]=Active&filters[feature]=true`)
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
          let totalSupply = await contract.maxSupply()
          totalSupply = parseFloat(totalSupply.toString())
          let cost = await contract.cost()
          cost = ethers.utils.formatUnits(cost, 6)
          cost = parseFloat(cost)
          const totalValue = totalSupply * cost
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
    fetchContractData()
    getCollections()
  }, [])


  return (
    <div className="mt-12">
      {loading && (<LoadingComponent msg='Waiting for transaction...' />)}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
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
                    "Floor Price",
                    "Market Price",
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
                {state.Collections.map(
                  ({ id, attributes: { name }, totalSupply, totalValue, floorPrice, marketPrice, pid }, key) => {
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
                                <MenuItem onClick={() => updateMarketPrice(pid)}>Update Market Price</MenuItem>
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
      <UpdateModal open={openGoldModal} handleOpen={handleOpenGoldModal} title={'Update Gold Reserves'} val={goldVal} setVal={setGoldVal} submit={submitGold} />
      <UpdateModal open={openBitCoinModal} handleOpen={handleOpenBitCoinModal} title={'Update Bitcoin Reserves'} val={btcVal} setVal={setBtcVal} submit={submitBtc} />
      <UpdateModal open={openMiscModal} handleOpen={handleOpenMiscModal} title={'Update Miscellaneous Reserves'} val={miscVal} setVal={setMiscVal} submit={submitMisc} />
      <UpdateModal open={updateMpModal} handleOpen={updateMarketPrice} title={'Update Market Price'} val={mpVal} setVal={setMpVal} submit={submitMp} />
    </div>
  );
}

export default Home;
