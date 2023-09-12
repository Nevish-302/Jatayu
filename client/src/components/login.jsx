// LoginForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h2>Log In</h2>
      <p>To login, enter your credentials</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission here
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="organizationId">Organization ID</label>
              <Field type="text" id="organizationId" name="organizationId" />
              <ErrorMessage
                name="organizationId"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                />
                <span onClick={togglePasswordVisibility}>
                  {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Log In
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p>Don't have an account? Sign up</p>
    </div>
  );
};

export default LoginForm;
