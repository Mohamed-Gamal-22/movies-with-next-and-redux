// import Head from 'next/head'
// import Image from 'next/image'
import { useState } from "react";
import style from "../styles/registerAndLogin.module.css";
import Joi from "joi";

export default function Home() {
  const [joiError, setJoiError] = useState([]);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const submitData = (e) => {
    e.preventDefault();
    let check = validateFormWithJoi();
    if (check.error) {
      setJoiError(check.error.details);
    } else {
      setJoiError([]);
      console.log("no error here"); ////////////////////////////
    }
  };

  const getData = (e) => {
    let old = { ...data };
    old[e.target.name] = e.target.value;
    setData(old);
  };

  const validateFormWithJoi = () => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required().min(3).max(10),
    });
    return schema.validate(data, { abortEarly: false });
  };

  return (
    <>
      <div className="container mt-5 text-white">
        <form
          onSubmit={submitData}
          className={`${style.form} mx-auto text-capitalize positio-relative`}
        >
          {joiError.length > 0
            ? joiError.map((error, index) => (
                <div className="alert alert-danger" key={index}>
                  {error.message}
                </div>
              ))
            : ""}
          <div className="cont mb-4">
            <label htmlFor="email" className="form-label">
              email :
            </label>
            <input
              onChange={getData}
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              name="email"
            />
          </div>
          <div className="cont mb-4">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              onChange={getData}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
