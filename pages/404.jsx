import Image from "next/image";
import img from "../public/error-404-web-page-template-page-found_451939-147.jpg";
import style from "../styles/404.module.css";

export default function Notfound() {
  return (
    <>
      <div
        className={`${style.over} text-center position-relative d-flex justify-content-center align-items-center mt-4`}
      >
        <div className="container">
          <Image className="img-fluid" src={img} alt="" />
        </div>
      </div>
    </>
  );
}
