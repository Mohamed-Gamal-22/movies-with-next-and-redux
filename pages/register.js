// import Head from 'next/head'
// import Image from 'next/image'
import { useState } from "react";
import style from "../styles/registerAndLogin.module.css";
import styles from "../styles/loginAuth.module.css";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import { checkRegisterUser } from "./../store/userAuthSlice";
import { useRouter } from "next/router";

export default function Home() {
  const { loading, message } = useSelector((state) => state.userAuthSlice);
  const router = useRouter();
  const dispatch = useDispatch();
  const [joiError, setJoiError] = useState([]);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });

  const submitData = async (e) => {
    e.preventDefault();
    let check = validateFormWithJoi();
    if (check.error) {
      setJoiError(check.error.details);
    } else {
      setJoiError([]);
      console.log("no error here");
      const res = await dispatch(checkRegisterUser(data));
      console.log(res);
      if (res.payload.message === "success") {
        alert("successfully registerd");
        router.push("/login");
      }
    }
  };

  const getData = (e) => {
    let old = { ...data };
    old[e.target.name] = e.target.value;
    setData(old);
  };

  const validateFormWithJoi = () => {
    const schema = Joi.object({
      first_name: Joi.string().max(10).min(3).required(),
      last_name: Joi.string().max(10).min(3).required(),
      age: Joi.number().max(60).min(16).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required().min(3).max(10),
    });
    return schema.validate(data, { abortEarly: false });
  };

  return (
    <>
      <div className={`${styles.a}`}>
        <div className="container mt-5 text-white">
          <form
            onSubmit={submitData}
            className={`${style.form} mx-auto text-capitalize positio-relative`}
          >
            {message ? (
              <div className="alert alert-primary" role="alert">
                {message}
              </div>
            ) : (
              ""
            )}
            {joiError.length > 0
              ? joiError.map((error, index) => (
                  <div className="alert alert-danger" key={index}>
                    {error.message}
                  </div>
                ))
              : ""}
            <div className="cont mb-4">
              <label htmlFor="first_name" className="form-label">
                first name :
              </label>
              <input
                onChange={getData}
                type="text"
                className="form-control"
                id="first_name"
                placeholder="Enter First Name"
                name="first_name"
              />
            </div>
            <div className="cont mb-4">
              <label htmlFor="last_name" className="form-label">
                last name :
              </label>
              <input
                onChange={getData}
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Enter Last Name"
                name="last_name"
              />
            </div>
            <div className="cont mb-4">
              <label htmlFor="age" className="form-label">
                age :
              </label>
              <input
                onChange={getData}
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter Age"
                name="age"
              />
            </div>
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
              {loading ? (
                <div>
                  <i className="fa-solid fa-spinner fa-spin bg-primary"></i>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
