import "./styles.css";
import React, { useEffect, useState } from "react";

const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const initialValue = { email: "", password: "", confirmPassword: "" };
export default function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formError, setFormError] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorPresent, setErrorPresent] = useState(true);
  useEffect(() => {
    const error = {};
    if (!emailRegex.test(formData.email)) error.email = "Email is not valid";
    if (formData.password.length < 5)
      error.password = "Password must be atleast 5 character long";
    if (formData.password !== formData.confirmPassword)
      error.confirmPassword = "Password and ConfirmPassword doesn't match";
    setErrorPresent(Object.keys(error).length > 0);
    setFormError(error);
  }, [formData, setFormError]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      {submitted && (
        <>
          <pre>Submitted Successfully</pre>
          <pre className="Result">{JSON.stringify(formData)}</pre>
        </>
      )}
      <h1>SignIn</h1>
      <label>Email</label>
      <input name="email" type="text" onChange={changeHandler}></input>
      <p className="Errors">{formError.email}</p>
      <label>Password</label>
      <input name="password" type="password" onChange={changeHandler}></input>
      <p className="Errors">{formError.password}</p>
      <label>Confirm Password</label>
      <input
        name="confirmPassword"
        type="password"
        onChange={changeHandler}
      ></input>
      <p className="Errors">{formError.confirmPassword}</p>
      <button type="submit" disabled={errorPresent}>
        Submit
      </button>
      <button
        type="reset"
        onClick={() => {
          setFormData(initialValue);
          setSubmitted(false);
        }}
      >
        Reset
      </button>
    </form>
  );
}
