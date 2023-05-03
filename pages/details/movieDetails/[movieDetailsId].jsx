import store from "@/store";
import { getDetailsMovie } from "@/store/movieDetailsSlice";

export default function details({ detailsMovie }) {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  console.log(detailsMovie);
  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="myImage p-5 mt-5">
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
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  console.log(context);
  const { movieDetailsId } = context.params;
  await store.dispatch(getDetailsMovie(movieDetailsId));
  const detailsMovie = store.getState().movieDetailsSlice.detailsMovie;

  return {
    props: {
      detailsMovie,
    },
  };
}
