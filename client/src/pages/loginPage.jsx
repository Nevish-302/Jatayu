import React from "react";
import { styles } from "../styles";
import Navbar from "../components/navbar";
import image from "../assets/image/bg1.png";
import Login from "../components/login";
import {login} from "../utils/APICalls/consoleData"

const loginPage = () => {
  // {login()}
  return (
    <>  
      <div className={`${styles.paddingX} signup-page-bg bg-cover`}>
        <Navbar />
        <div class="flex flex-col sm:flex-row justify-between items-center p-4">
          <div class="flex-1 pr-0 md:pr-9 md:justify-start">
            <img src={image} alt="Image" class="  w-5/6  mx-auto" />
          </div>
          <div class="flex-1 border-2  border-prime-blue justify-end h-full">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default loginPage;
