import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialValues = {
  departmentType: "",
  organizationName: "",
  location: "",
  agencyNumber: "",
  contactResources: [{ name: "", number: "" }],
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  departmentType: Yup.string().required("Department Type is required"),
  organizationName: Yup.string().required("Organization Name is required"),
  location: Yup.string().required("Location is required"),
  agencyNumber: Yup.string().required("Agency Number is required"),
  contactResources: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Resource Name is required"),
      number: Yup.string().required("Resource Number is required"),
    })
  ),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-10 z-10 backdrop-blur-sm bg-[#505050] bg-opacity-30 backdrop-filter rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4 text-white">Nice to see You!</h2>
      <p className="text-sm mb-4 font-medium text-[#1b1010]">
        Enter your organization ID and password to log in
      </p>

      <div className="overflow-y-auto w-full max-h-[320px] custom-scrollbar">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Handle form submission here
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center w-full">
              <div className="mb-4 w-9/12">
                <label htmlFor="departmentType" className="block text-white">
                  Department Type
                </label>
                <Field
                  as="select"
                  id="departmentType"
                  name="departmentType"
                  className="w-full px-4 py-2 border-2 border-blue-500 bg-transparent rounded-xl bg-white text-black focus:outline-none"
                >
                  <option value="">Select Department Type</option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  {/* Add more options as needed */}
                </Field>
                <ErrorMessage
                  name="departmentType"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4 w-9/12">
                <label htmlFor="organizationName" className="block text-white">
                  Organization Name
                </label>
                <Field
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  className="w-full px-4 py-2 border-2 border-blue-500 bg-transparent rounded-xl bg-white text-black focus:outline-none"
                />
                <ErrorMessage
                  name="organizationName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4 w-9/12">
                <label htmlFor="location" className="block text-white">
                  Location
                </label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  className="w-full px-4 py-2 border-2 border-blue-500 bg-transparent rounded-xl bg-white text-black focus:outline-none"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4 w-9/12">
                <label htmlFor="agencyNumber" className="block text-white">
                  Agency Number
                </label>
                <Field
                  type="text"
                  id="agencyNumber"
                  name="agencyNumber"
                  className="w-full px-4 py-2 border-2 border-blue-500 bg-transparent rounded-xl bg-white text-black focus:outline-none"
                />
                <ErrorMessage
                  name="agencyNumber"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4 w-9/12">
                <label htmlFor="contactResources" className="block text-white">
                  Contact Resources
                </label>
                <FieldArray
                  name="contactResources"
                  render={(arrayHelpers) => (
                    <div>
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex mb-4">
                          <div className="flex-grow">
                            <label
                              htmlFor={`contactResources.${index}.name`}
                              className="block text-white"
                            >
                              Resource Name
                            </label>
                            <Field
                              type="text"
                              id={`contactResources.${index}.name`}
                              name={`contactResources.${index}.name`}
                              placeholder="Resource Name"
                              className="w-full px-4 py-2 border-2 border-blue-500 bg-transparent rounded-xl bg-white text-black focus:outline-none"
                            />
                            <ErrorMessage
                              name={`contactResources.${index}.name`}
                              component="div"
                              className="text-red-600 text-sm mt-1"
                            />
                          </div>
                          <div className="w-1/2 ml-4">
                            <label
                              htmlFor={`contactResources.${index}.number`}
                              className="block text-white"
                            >
                              Resource Number
                            </label>
                            <Field
                              type="text"
                              id={`contactResources.${index}.number`}
                              name={`contactResources.${index}.number`}
                              placeholder="Resource Number"
                              className="w-full px-4 py-2 border-2 border-blue-500 bg-transparent rounded-xl bg-white text-black focus:outline-none"
                            />
                            <ErrorMessage
                              name={`contactResources.${index}.number`}
                              component="div"
                              className="text-red-600 text-sm mt-1"
                            />
                          </div>
                          <div className="ml-4">
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                className="text-red-600"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ name: "", number: "" })
                        }
                        className="text-blue-500 mt-2"
                      >
                        + Add Resource
                      </button>
                    </div>
                  )}
                />
              </div>
              <div className="mb-4 w-9/12">
                <label htmlFor="password" className="block text-white">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border-2 border-blue-500 bg-transparent rounded-xl bg-white text-black focus:outline-none"
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
              <div className="mb-4 w-9/12">
                <label htmlFor="confirmPassword" className="block text-white">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border-2 border-blue-500 bg-transparent rounded-xl bg-white text-black focus:outline-none"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="w-9/12 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  cl
                  className="w-full bg-[#4763E4] text-white py-2 px-4 hover:bg-blue-600 focus:outline-none rounded-xl "
                >
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <p className="text-sm mt-4 font-medium text-[#1b1010]">
        Already have an account?{" "}
        <Link to="/login" className="text-black text-md">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;

// import React from "react";
// import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
// import * as Yup from "yup";
// import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const initialValues = {
//   departmentType: "",
//   organizationName: "",
//   location: "",
//   agencyNumber: "",
//   contactResources: [{ name: "", number: "" }],
//   password: "",
//   confirmPassword: "",
// };

// const [resource, setresource] = useState({
//   type: "",
//   number: 0,
// });
// const handlework = async (arrayHelpers) => {
//   await setData((ata) => {
//     return {
//       ...ata,
//       contactResources: [...ata.resource, resource],
//     };
//   });
//   setresource({ name: "", number: "" });
// };

// const validationSchema = Yup.object().shape({
//   departmentType: Yup.string().required("Department Type is required"),
//   organizationName: Yup.string().required("Organization Name is required"),
//   location: Yup.string().required("Location is required"),
//   agencyNumber: Yup.string().required("Agency Number is required"),
//   contactResources: Yup.array().of(
//     Yup.object().shape({
//       name: Yup.string().required("Resource Name is required"),
//       number: Yup.string().required("Resource Number is required"),
//     })
//   ),
//   password: Yup.string().required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
// });

// const SignupForm = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center pt-10 pb-10 w-full z-10 bg-card-fill">
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       <p className="text-sm mb-4 text-gray-500">
//         Register your Organization here
//       </p>
//       <div className="overflow-y-auto w-full max-h-[320px] custom-scrollbar">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             console.log(values);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form className="flex flex-col items-center w-full">
//               <div className="mb-4 w-9/12">
//                 <label htmlFor="departmentType" className="block text-gray-700">
//                   Department Type
//                 </label>
//                 <Field
//                   as="select"
//                   id="departmentType"
//                   name="departmentType"
//                   className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                 >
//                   <option value="">Select Department Type</option>
//                   <option value="Option 1">Option 1</option>
//                   <option value="Option 2">Option 2</option>
//                   {/* Add more options as needed */}
//                 </Field>
//                 <ErrorMessage
//                   name="departmentType"
//                   component="div"
//                   className="text-red-600 text-sm mt-1"
//                 />
//               </div>
//               <div className="mb-4 w-9/12">
//                 <label
//                   htmlFor="organizationName"
//                   className="block text-gray-700"
//                 >
//                   Organization Name
//                 </label>
//                 <Field
//                   type="text"
//                   id="organizationName"
//                   name="organizationName"
//                   className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                 />
//                 <ErrorMessage
//                   name="organizationName"
//                   component="div"
//                   className="text-red-600 text-sm mt-1"
//                 />
//               </div>
//               <div className="mb-4 w-9/12">
//                 <label htmlFor="location" className="block text-gray-700">
//                   Location
//                 </label>
//                 <Field
//                   type="text"
//                   id="location"
//                   name="location"
//                   className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                 />
//                 <ErrorMessage
//                   name="location"
//                   component="div"
//                   className="text-red-600 text-sm mt-1"
//                 />
//               </div>
//               <div className="mb-4 w-9/12">
//                 <label htmlFor="agencyNumber" className="block text-gray-700">
//                   Agency Number
//                 </label>
//                 <Field
//                   type="text"
//                   id="agencyNumber"
//                   name="agencyNumber"
//                   className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                 />
//                 <ErrorMessage
//                   name="agencyNumber"
//                   component="div"
//                   className="text-red-600 text-sm mt-1"
//                 />
//               </div>
//               <div className="mb-4 w-9/12">
//                 <label
//                   htmlFor="contactResources"
//                   className="block text-gray-700"
//                 >
//                   Contact Resources
//                 </label>
//                 <FieldArray
//                   name="contactResources"
//                   render={(arrayHelpers) => (
//                     <div>
//                       {arrayHelpers.form.values.contactResources.map(
//                         (_, index) => (
//                           <div key={index} className="flex">
//                             <div className="flex-grow">
//                               <Field
//                                 type="text"
//                                 name={`contactResources[${index}].name`}
//                                 placeholder="Resource Name"
//                                 className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                               />
//                               <ErrorMessage
//                                 name={`contactResources[${index}].name`}
//                                 component="div"
//                                 className="text-red-600 text-sm mt-1"
//                               />
//                             </div>
//                             <div className="w-1/2 ml-4">
//                               <Field
//                                 type="text"
//                                 name={`contactResources[${index}].number`}
//                                 placeholder="Resource Number"
//                                 className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                               />
//                               <ErrorMessage
//                                 name={`contactResources[${index}].number`}
//                                 component="div"
//                                 className="text-red-600 text-sm mt-1"
//                               />
//                             </div>
//                             <div className="ml-4">
//                               {index > 0 && (
//                                 <button
//                                   type="button"
//                                   onClick={() => arrayHelpers.remove(index)}
//                                   className="text-red-600"
//                                 >
//                                   Remove
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         )
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => handlework(arrayHelpers)}
//                         className="text-blue-500 mt-2"
//                       >
//                         + Add Resource
//                       </button>
//                     </div>
//                   )}
//                 />
//                 {/* <FieldArray
//                   name="contactResources"
//                   render={(arrayHelpers) => (
//                     <div>
//                       {[...Array(3)].map((_, index) => (
//                         <div key={index} className="flex mb-4">
//                           <div className="flex-grow">
//                             <label
//                               htmlFor={`contactResources.${index}.name`}
//                               className="block text-gray-700"
//                             >
//                               Resource Name
//                             </label>
//                             <Field
//                               type="text"
//                               id={`contactResources.${index}.name`}
//                               name={`contactResources.${index}.name`}
//                               placeholder="Resource Name"
//                               className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                             />
//                             <ErrorMessage
//                               name={`contactResources.${index}.name`}
//                               component="div"
//                               className="text-red-600 text-sm mt-1"
//                             />
//                           </div>
//                           <div className="w-1/2 ml-4">
//                             <label
//                               htmlFor={`contactResources.${index}.number`}
//                               className="block text-gray-700"
//                             >
//                               Resource Number
//                             </label>
//                             <Field
//                               type="text"
//                               id={`contactResources.${index}.number`}
//                               name={`contactResources.${index}.number`}
//                               placeholder="Resource Number"
//                               className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                             />
//                             <ErrorMessage
//                               name={`contactResources.${index}.number`}
//                               component="div"
//                               className="text-red-600 text-sm mt-1"
//                             />
//                           </div>
//                           <div className="ml-4">
//                             {index > 0 && (
//                               <button
//                                 type="button"
//                                 // onClick={() => arrayHelpers.remove(index)}
//                                 className="text-red-600"
//                               >
//                                 x
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={
//                           handlework
//                           // () =>
//                           // arrayHelpers.push({ name: "", number: "" })
//                         }
//                         className="text-blue-500 mt-2"
//                       >
//                         + Add Resource
//                       </button>
//                     </div>
//                   )}
//                 /> */}
//               </div>
//               <div className="mb-4 w-9/12">
//                 <label htmlFor="password" className="block text-gray-700">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Field
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                   />
//                   <span
//                     onClick={togglePasswordVisibility}
//                     className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
//                   >
//                     {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
//                   </span>
//                 </div>
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-600 text-sm mt-1"
//                 />
//               </div>
//               <div className="mb-4 w-9/12">
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-gray-700"
//                 >
//                   Confirm Password
//                 </label>
//                 <Field
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   className="w-full px-4 py-2 border border-blue-500 bg-transparent text-black focus:outline-none"
//                 />
//                 <ErrorMessage
//                   name="confirmPassword"
//                   component="div"
//                   className="text-red-600 text-sm mt-1"
//                 />
//               </div>
//               <div className="w-9/12 pt-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//       <p className="text-sm mt-4">
//         Already have an account?{" "}
//         <Link to="/" className="text-blue-500">
//           Log In
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default SignupForm;
