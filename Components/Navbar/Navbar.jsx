import Link from "next/link";
import style from "./Navbar.module.css";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { userData } = useSelector((state) => state.userLoginAuth);

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${style.bg} fixed-top`}>
        <div className="container-fluid">
          <Link
            className={`navbar-brand fw-bold fs-4 ${style.color} text-warning`}
            href="/"
          >
            Free Netflix
          </Link>
          <button
            className={`navbar-toggler ${style.navbartoggler}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars-staggered text-white"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link active ${style.color}`}
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${style.color}`} href="movies">
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${style.color}`} href="tvShows">
                    Tv Shows
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${style.color}`} href="about">
                    About
                  </Link>
                </li>
              </ul>
            </>
            <>
              <li className="nav-item ms-auto d-flex align-items-center">
                <span
                  onClick={() => goToProfile()}
                  className={`nav-lin ${style.name} ms-5 fw-bold`}
                >
                  {userData
                    ? userData.first_name + " " + userData.last_name
                    : ""}
                </span>
              </li>
            </>
            <>
              <ul className="navbar-nav ms-auto">
                {!userData ? (
                  <>
                    {" "}
                    <li
                      className={`nav-item text-white me-3 d-flex align-items-center`}
                    >
                      <i
                        className={`fa-brands fs-5 mx-2 fa-facebook ${style.icon}`}
                      ></i>
                      <i
                        className={`fa-brands fs-5 mx-2 fa-youtube ${style.icon}`}
                      ></i>
                      <i
                        className={`fa-brands fs-5 mx-2 fa-instagram ${style.icon}`}
                      ></i>
                      <i
                        className={`fa-brands fs-5 mx-2 fa-spotify ${style.icon}`}
                      ></i>
                    </li>
                  </>
                ) : (
                  ""
                )}
                {!userData ? (
                  <>
                    {" "}
                    <li className="nav-item">
                      <Link className={`nav-link ${style.color}`} href="login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${style.color}`}
                        href="register"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className={`nav-link ${style.color}`} href="login">
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </>
          </div>
        </div>
      </nav>
    </>
  );
}
