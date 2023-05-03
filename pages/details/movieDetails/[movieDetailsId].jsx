import store from "@/store";
import { getDetailsMovie, getMovieVideo } from "@/store/movieDetailsSlice";

export default function details({ detailsMovie, movieVideo }) {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";
  const baseYoutube = `https://www.youtube.com/embed/`;
  const secondYoutube = `${movieVideo.results[0].key}`;

  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="myImage p-5 mt-5 text-center">
              <img
                src={baseUrlImg + detailsMovie.poster_path}
                alt="movie img"
                className="img-fluid rounded-5 w-75"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="data">
              <h2 className="text-warning fs-1 fw-bold text-capitalize mb-4">
                Name : {detailsMovie.original_title}
              </h2>
              <p className="text-muted">{detailsMovie.overview}</p>
            </div>
            <span className="me-5 text-capitalize">
              language :{" "}
              <span className="text-warning fw-bold">
                {detailsMovie.original_language}
              </span>
            </span>
            <span className="me-5">
              Date :{" "}
              <span className="text-warning fw-bold">
                {detailsMovie.release_date}
              </span>
            </span>

            <iframe
            className="my-5"
              width="450"
              height="300"
              src={baseYoutube+secondYoutube}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  console.log(context);
  const { movieDetailsId } = context.params;

  // get details
  await store.dispatch(getDetailsMovie(movieDetailsId));
  const detailsMovie = store.getState().movieDetailsSlice.detailsMovie;

  // get video
  await store.dispatch(getMovieVideo(movieDetailsId));
  const movieVideo = store.getState().movieDetailsSlice.movieVideo;

  return {
    props: {
      detailsMovie,
      movieVideo,
    },
  };
}
