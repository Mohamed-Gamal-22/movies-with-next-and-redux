import { getTvShows } from "@/store/tvShows";
import store from "./../store/index";

export default function tvShows({ TvShows }) {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {TvShows.results
            ? TvShows.results.map((TvShow, index) => (
                <div className="col-md-2" key={index}>
                  <div className="item my-5">
                    <img
                      className="w-100"
                      src={baseUrlImg + TvShow.poster_path}
                      alt=""
                    />
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
  await store.dispatch(getTvShows());
  const TvShows = store.getState().tvShowsSlice.tv;

  return {
    props: {
      TvShows,
    },
  };
}
