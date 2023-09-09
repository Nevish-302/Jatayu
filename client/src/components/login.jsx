import React from "react";
import { styles } from "../styles";
import Navbar from "../components/navbar";
import image from "../assets/image/bg1.png";
const login = () => {
  return (
    <>
      <div className={`${styles.paddingX}`}>
        <Navbar />
        <div class="flex flex-col sm:flex-row justify-between items-center p-4">
          <div class="flex-1 pr-0 md:pr-9 md:justify-start">
            <img src={image} alt="Image" class="  w-5/6  mx-auto" />
          </div>
          <div class="flex-1 border-2 border-blue-700 justify-end h-full">
            <form className="h-full">
              <div>wegweg</div>
              <div>wegweg</div>
              <div>wegweg</div>
              <div>wegweg</div>
              <div>wegweg</div>
              <div>wegweg</div>
              <div>wegweg</div>
              <div>wegweg</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
