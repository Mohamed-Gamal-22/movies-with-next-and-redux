// therd step to use carosel library
var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}

// fourth step to use carousel library
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

// fivth step to use carousel library
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";

import style from "./Carousel.module.css";

export default function Carousle({ trending }) {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";
  const options = {
    margin: 20,
    responsiveClass: true,
    dots: false,
    autoplay: true,
    loop: true,
    smartSpeed: 800,
    responsive: {
      0: { items: 1 },
      767: { items: 2 },
      800: { items: 3 },
      990: { items: 4 },
      1200: { items: 5 },
    },
  };

  return (
    <>
      {trending.results.length > 0 ? (
        <div className="container">
          <OwlCarousel className="mb-5 mt-5 p-5" {...options}>
            {trending && baseUrlImg
              ? trending.results.map((movie, index) => (
                  <div
                    key={index}
                    className={`position-relative ${style.item}`}
                  >
                    <img
                      className={`${style.img}`}
                      alt="img"
                      src={baseUrlImg + movie.poster_path}
                    />
                    <div className={`${style.over}`}>
                      <div
                        //   onClick={() => goToDetails(movie.id, movie.media_type)}
                        className={`btn btn-danger rounded-pill ${style.btn}`}
                      >
                        Read More...
                      </div>
                      <span className="position-absolute top-0 end-0 bg-danger text-white p-2 m-2 rounded-2">
                        Vote : {movie.vote_average}
                      </span>
                    </div>
                    <div className={`${style.info}`}>
                      <span className="bg-warning text-dark">
                        {movie.release_date}
                      </span>
                      <h4 className="text-capitalize rounded p-1 mt-1">
                        {movie.title ? movie.title : movie.name}
                      </h4>
                    </div>
                  </div>
                ))
              : ""}
          </OwlCarousel>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
