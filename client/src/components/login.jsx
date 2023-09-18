// LoginForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
//import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import baseurl from './baseurl'

const initialValues = {
  organizationId: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  organizationId: Yup.string().required("Organization ID is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [cookieName, setCookieName] = useState(['Hello']);
  const [cookieValue, setCookieValue] = useState('Bro');
  const cookies = new Cookies();
console.log(baseurl)
  const handleSetCookie = () => {
    // Set a new cookie
    console.log("Hello")
    cookies.set(cookieName, cookieValue, { path: '/' });
  };
  //useEffect(()=> {
  //  cookies.set(cookieName, cookieValue, { path: '/' });
  //  }, [cookieName])
  const handleRemoveCookie = (name) => {
    // Remove a cookie
    cookies.remove(name, { path: '/' });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  handleSetCookie()
  const loginnow = async (values) =>{
    //e.preventDefault()
    console.log("Hello Babty")
    const Id = values.organizationId
    const password = values.password
  const res = await fetch(`${baseurl}/organisation/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      //credentials: 'include', //for jwt 
      body:JSON.stringify({
        Id,password
      })
    });
    const jack = await res.json()
    //setCook(jack);
    console.log(jack)
    cookies.set("token",jack.data.token, { path: '/' } )
    cookies.set("_id",jack.data.user._id, { path: '/' } )
    //res.status == 200 ? console.log("Success") : console.log("Failure")
    console.log(initialValues, organizationId, password)
  }
  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-10  z-10 bg-card-fill">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <p className="text-sm mb-4 text-gray-500">
        To login, enter your credentials
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) =>{loginnow(values)}}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center w-full">
            <div className="mb-4 w-9/12">
              <label htmlFor="organizationId" className="block text-gray-700">
                Organization ID
              </label>
              <Field
                type="text"
                id="organizationId"
                name="organizationId"
                className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
              />
              <ErrorMessage
                name="organizationId"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div className="w-9/12">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div className="w-9/12 m-2 flex justify-end">
              <Link to="/" className="text-blue-500">
                Forgot Password ?
              </Link>
            </div>
            <div className="w-9/12">
            
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none"
              >
                Log In
              </button>
              
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-sm mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
