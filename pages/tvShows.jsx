import { getTvShows } from "@/store/tvShows";
import store from "./../store/index";
import style from "../styles/tvshows.module.css";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { useState } from "react";

export default function tvShows({ TvShows }) {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";
  const [searchTv, setSearchTv]= useState([])

  const searchMovie = (name) => {
    let tv = TvShows.results.filter((tv) =>
      tv.name
        ? tv.name.toLowerCase().includes(name.toLowerCase())
        : tv.title.toLowerCase().includes(name.toLowerCase())
    );
    setSearchTv(tv)
  };
  return (
    <>
      <div className="container">
        <div className="pt-5"></div>
        <h1 className="text-white text-center text-capitalize pb-0 mt-5 mb-0">
          all trending <span className="text-warning fw-bold">tv shows</span>
        </h1>
        <SearchBar searchMovie={searchMovie}/>
        <div className="row g-3 my-4">
          {TvShows.results.length > 0 && searchTv.length == 0
            ? TvShows.results.map((e, index) => (
                <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <div className={`${style.smallimg} position-relative`}>
                    <img
                      className={`${style.img}`}
                      alt="img"
                      src={baseUrlImg + e.poster_path}
                    />
                    <div className={`${style.over}`}>
                      <div
                        // onClick={() => goToDetails(e.id, e.media_type)}
                        className={`btn btn-danger rounded-pill ${style.btn}`}
                      >
                        Read More...
                      </div>
                      <h6 className="text-capitalize rounded p-1 mt-1 position-absolute start-0 bottom-0 m-3 text-warning">
                        {e.name ? e.name : e.title}
                      </h6>
                    </div>
                  </div>
                </div>
              ))
            : searchTv.map((e, index) => (
              <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className={`${style.smallimg} position-relative`}>
                  <img
                    className={`${style.img}`}
                    alt="img"
                    src={baseUrlImg + e.poster_path}
                  />
                  <div className={`${style.over}`}>
                    <div
                      // onClick={() => goToDetails(e.id, e.media_type)}
                      className={`btn btn-danger rounded-pill ${style.btn}`}
                    >
                      Read More...
                    </div>
                    <h6 className="text-capitalize rounded p-1 mt-1 position-absolute start-0 bottom-0 m-3 text-warning">
                      {e.name ? e.name : e.title}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await store.dispatch(getTvShows());
  const TvShows = store.getState().tvShowsSlice.tv;

  return {
    props: {
      TvShows,
    },
  };
}
