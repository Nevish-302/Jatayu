import React from "react";
import { styles } from "../styles";
import Navbar from "../components/navbar";
import image from "../assets/image/bg1.png";
import Signup from "../components/signup";

const signupPage = () => {
  return (
    <>
      <div className={`${styles.paddingX} signup-page-bg bg-cover`}>
        <Navbar />
        <div className="flex flex-col sm:flex-row justify-between items-center p-4">
          {/* Right Side */}
          <div className="ml-auto mt-10 w-1/2 flex-end   h-full">
            <Signup />
          </div>
        </div>
      </div>
    </>
  );
};

export default signupPage;
