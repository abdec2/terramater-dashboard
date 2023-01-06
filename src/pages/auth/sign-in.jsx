import { Link, useNavigate } from "react-router-dom";
import  auth from './../../auth/auth'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { CONFIG } from "../config/config";
import { useState } from "react";
import LoadingComponent from "../components/loading";

export function SignIn() {
  const errorMsg = useRef()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData(e.target);
      var loginCred = {};
      formData.forEach((value, key) => {
        loginCred[key] = value;
      });

      axios
        .post(`${CONFIG.BASE_URI}/api/auth/local`, loginCred)
        .then((response) => {
          // Handle success.
          errorMsg.current.style.display = 'none'
          auth.setToken(response.data.jwt, true)
          auth.setUserInfo(response.data.user, true)
          setLoading(false)
          navigate('/dashboard/home')
        })
        .catch((error) => {
          // Handle error.
          setLoading(false)
          errorMsg.current.style.display = 'block'
          errorMsg.current.innerHTML = error.response.statusText
          console.log("An error occurred:", error.response);
        });
    } catch (e) {
      setLoading(false)
      console.log(e);
    }
  };

  useEffect(()=> {
    const isAuth = auth.getToken() !== null;
    isAuth ? navigate('/') : ''
  }, [])

  return (
    <>
      {loading && (<LoadingComponent msg='Loading...' />)}
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardBody className="flex flex-col gap-4">
              <p ref={errorMsg} className="text-red-900" style={{display: 'none'}}></p>
              <Input
                name="identifier"
                type="text"
                label="Username"
                size="lg"
                required
              />
              <Input
                name="password"
                type="password"
                label="Password"
                size="lg"
                required
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
