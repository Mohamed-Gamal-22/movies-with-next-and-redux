import { getMovies } from "./../store/movieSlice";
import store from "./../store/index";

export default function Movies({ movies }) {

  const baseUrlImg = "https://image.tmdb.org/t/p/w500";
  
  return (
    <>
      <div className="container my-5">
        <div className="row">
          {movies.results
            ? movies.results.map((movie, index) => (
                <div className="col-md-2" key={index}>
                  <div className="item">
                    <div className="item my-5">
                      <img
                        className="w-100"
                        src={baseUrlImg + movie.poster_path}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              ))
            : ""}
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
