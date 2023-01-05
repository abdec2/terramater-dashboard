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
import { useAccount, useSigner } from 'wagmi'
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

const MySwal = withReactContent(Swal)


export function Home() {
  const { fetchContractData, state } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const [openGoldModal, setOpenGoldModal] = useState(false);
  const [openBitCoinModal, setOpenBitcoinModal] = useState(false);
  const [openMiscModal, setOpenMiscModal] = useState(false);
  const [goldVal, setGoldVal] = useState('')
  const [btcVal, setBtcVal] = useState('')
  const [miscVal, setMiscVal] = useState('')
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()
  const { openConnectModal } = useConnectModal()

  console.log(state)
 
  const submitGold = async () => {
    try {
      setLoading(true)
      if(!isConnected) {
        openConnectModal()
        return
      }
      if(goldVal === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter valid Amount!'
        })
        
        return
      }
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
      setLoading(false)
    } catch(e) {
      setLoading(false)
      console.log(e)
    }
  }

  const submitBtc = async () => {
    try {
      setLoading(true)
      if(!isConnected) {
        openConnectModal()
        return
      }
      if(btcVal === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter valid Amount!'
        })
        
        return
      }
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
      setLoading(false)
    } catch(e) {
      setLoading(false)
      console.log(e)
    }
  }

  const submitMisc = async () => {
    try {
      setLoading(true)
      if(!isConnected) {
        openConnectModal()
        return
      }
      if(miscVal === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter valid Amount!'
        })
        
        return
      }
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
      setLoading(false)
    } catch(e) {
      setLoading(false)
      console.log(e)
    }
  }


  const handleOpenGoldModal = () => setOpenGoldModal(!openGoldModal);
  const handleOpenBitCoinModal = () => setOpenBitcoinModal(!openBitCoinModal);
  const handleOpenMiscModal = () => setOpenMiscModal(!openMiscModal);


  const handleOpen = (id) => {
    if(id === 1) {
      handleOpenGoldModal()
    } 
    if(id === 2) {
      handleOpenBitCoinModal()
    } 
    if(id === 4) {
      handleOpenMiscModal()
    } 

  }


  useEffect(() => {
    fetchContractData()
  }, [])


  return (
    <div className="mt-12">
      <LoadingComponent />
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
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "NFT Collections",
                    "Total Value",
                    "Total Supply",
                    "Update",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, totalValue, totalSupply }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* <Avatar src={img} alt={name} size="sm" /> */}
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {totalValue}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {totalSupply}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
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
                                <MenuItem>Action</MenuItem>
                                <MenuItem>Another Action</MenuItem>
                                <MenuItem>Something else here</MenuItem>
                              </MenuList>
                            </Menu>
                            {/* <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            /> */}
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
    </div>
  );
}






export default Home;
