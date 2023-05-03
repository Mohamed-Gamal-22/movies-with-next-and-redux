// import Head from 'next/head'
// import Image from 'next/image'
import { useState } from "react";
import style from "../styles/loginAuth.module.css";
import styles from "../styles/registerAndLogin.module.css";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { checkLoginUser } from "@/store/userLoginAuth";

export default function Home() {
  const { loading, message, userData } = useSelector(
    (state) => state.userLoginAuth
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [joiError, setJoiError] = useState([]);
  const [data, setData] = useState({
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
      const res = await dispatch(checkLoginUser(data));
      console.log(res);
      if (res.payload.message === "success") {
        ////////
        localStorage.setItem("token", res.payload.token);
        alert("successfully login process");
        router.push("/");
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
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required().min(3).max(10),
    });
    return schema.validate(data, { abortEarly: false });
  };

  return (
    <>
      <div className={`${style.a}`}>
        <div className="container mt-5 text-white">
          <form
            onSubmit={submitData}
            className={`${styles.form} my-5 mx-auto text-capitalize positio-relative`}
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
                  <div className="alert alert-danger mt-5 pt-5" key={index}>
                    {error.message}
                  </div>
                ))
              : ""}
            <div className="cont mb-4 mt-5">
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
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
