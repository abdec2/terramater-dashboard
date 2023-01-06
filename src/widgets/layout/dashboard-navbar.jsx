import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import logo from "../../../public/img/logo.png";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import auth from "../../auth/auth";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const navigate = useNavigate()


  const handleLogout = () => {
    auth.clearAppStorage()
    navigate('/')

  }

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center justify-center gap-x-2 capitalize">
          <div className="h-[70px] w-[70px]">
            <img src={logo} alt="" className="h-[100%] w-[100%]" />
          </div>
          <h1 className="font-sans text-xl font-bold uppercase text-gray-600">
            Terra Mater
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <div className="mr-5">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
              onClick={handleLogout}
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Sign Out
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              onClick={handleLogout}
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </div>
          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
