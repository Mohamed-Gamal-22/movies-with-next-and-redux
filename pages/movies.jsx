import { getMovies } from "./../store/movieSlice";
import store from "./../store/index";
import style from "../styles/movies.module.css";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { useState } from "react";
import { useRouter } from "next/router";
// can i use Link insted of userouter and what is the defference ?

export default function Movies({ movies }) {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";
  const [searchMovies, setSearchMovies] = useState([]);
  const router = useRouter();

  // i did not use usedispatch and useselector inside useEffect 
  // because it will render in client side
  // so insted i use getserverside props at the end of the page

  const searchMovie = (name) => {
    let movie = movies.results.filter((movie) =>
      movie.name
        ? movie.name.toLowerCase().includes(name.toLowerCase())
        : movie.title.toLowerCase().includes(name.toLowerCase())
    );
    setSearchMovies(movie);
  };

  const goToDetails = (id) => {
    router.push(`/details/movieDetails/${id}`);
  };

  return (
    <>
      <div className="container">
        <div className="pt-5"></div>
        <h1 className="text-white text-center text-capitalize mt-5 mb-3">
          all trending <span className="text-warning fw-bold">movies</span>
        </h1>
        <SearchBar searchMovie={searchMovie} />
        <div className="row g-3 mb-5 mt-3">
          {movies.results.length > 0 && searchMovies.length == 0
            ? movies.results.map((e, index) => (
                <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <div className={`${style.smallimg} position-relative`}>
                    <img
                      className={`${style.img}`}
                      alt="img"
                      src={baseUrlImg + e.poster_path}
                    />
                    <div className={`${style.over}`}>
                      <div
                        onClick={() => goToDetails(e.id)}
                        className={`btn btn-danger rounded-pill ${style.btn}`}
                      >
                        Read More...
                      </div>
                      <h6 className="text-capitalize bg-transparent rounded p-1 mt-1 position-absolute start-0 bottom-0 m-3 text-warning">
                        {e.name ? e.name : e.title}
                      </h6>
                    </div>
                  </div>
                </div>
              ))
            : searchMovies.map((e, index) => (
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
  await store.dispatch(getMovies());
  const movies = store.getState().movieSlice.movies;

  return {
    props: {
      movies,
    },
  };
}
