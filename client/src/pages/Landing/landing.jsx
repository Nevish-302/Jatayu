import React, { useState } from "react";
import logo from "../../assets/image/Jatayu2.png";
import person from "../../assets/image/person1.png";
// import { Link, useHistory, useNavigate } from "react-router-dom"; // Import necessary hooks

function App() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top: element.offsetTop,
      });
    }
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="bg-white p-4 flex justify-between items-center fixed w-full top-0 z-50">
        {/* Logo */}
        <div className="flex items-center ml-10">
          <img src={logo} alt="Logo" className="w-auto h-10 mr-2" />
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Links */}
        <ul className="flex space-x-12 mr-10">
          <li
            className="cursor-pointer hover:text-prime-blue font-medium"
            onClick={() => scrollToSection("home")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-prime-blue font-medium"
            onClick={() => scrollToSection("about")}
          >
            About Us
          </li>
          <li
            className="cursor-pointer hover:text-prime-blue font-medium"
            onClick={() => scrollToSection("features")}
          >
            Features
          </li>
        </ul>

        {/* Buttons */}
        <div className="space-x-4 mr-10">
          <button className="px-6 py-2 border-2 border-black">Login</button>
          <button className="px-6 py-2 bg-prime-blue text-white hover:bg-blue-600 hover:text-white transition duration-300">
            Signup
          </button>
        </div>
      </nav>

      {/* main body */}
      <div className="">
        {/* Sections */}
        <section
          id="home"
          className={`section ${activeSection === "home" ? "active" : ""}`}
        >
          <div id="home" className="container flex bg-[#F5F5F5] ">
            {/* Left Part */}
            <div className="flex-1 p-4 flex flex-col justify-center items-left ml-16">
              <h1 className="text-5xl font-bold text-prime-blue ">
                Connecting India's Heroes:
              </h1>
              <h1 className="text-5xl font-bold text-black mb-10">
                Uniting Disaster Management <br />
                Agencies for Safer Tomorrows
              </h1>
              <p className="text-lg   w-3/4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                hendrerit turpis vel tortor gravida, ac facilisis tellus
                volutpat. Nulla facilisi. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nullam hendrerit turpis vel tortor
                gravida, ac facilisis tellus volutpat. Nulla facilisi.
              </p>
            </div>

            {/* Right Part */}
            <div className="">
              <img
                src={person} // Replace with your image path
                alt="Image"
                className="mt-10 h-full   w-5/6"
              />
            </div>
          </div>

          {/* Home Content Goes Here */}
        </section>

        <section className="bg-banner-grey  mt-10 py-10">
          <div className=" container flex items-center justify-between">
            {/* Left Part */}
            <div className="ml-16 text-black">
              <h2 className="text-2xl font-bold">
                Download our app for a better experience
              </h2>
            </div>

            {/* Right Part */}
            <div className="mr-16">
              <button className="  px-14 py-5 bg-prime-blue text-white  hover:bg-blue-600 hover:text-white transition duration-300">
                Download App
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-blue h-10"></div>
        </section>
        <section
          id="about"
          className={`section ${activeSection === "about" ? "active" : ""}`}
        >
          <h1>About Us Section</h1>

          {/* About Us Content Goes Here */}
        </section>
        <section
          id="features"
          className={`section ${activeSection === "features" ? "active" : ""}`}
        >
          <h1>Features Section</h1>

          {/* Features Content Goes Here */}
        </section>
      </div>
    </div>
  );
}

export default App;
