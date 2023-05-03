import store from "@/store";
import { getDetailsTv } from "@/store/tvDetailsSlice";

export default function details({ detailsTv }) {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  console.log(detailsTv);
  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="myImage p-5 mt-5">
              <img
                src={baseUrlImg + detailsTv.poster_path}
                alt="movie img"
                className="img-fluid rounded-5 w-75"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="data">
              <h2 className="text-warning fs-1 fw-bold text-capitalize mb-4">
                Name : {detailsTv.name}
              </h2>
              <p className="text-muted">{detailsTv.overview}</p>
            </div>
            <span className="me-5 text-capitalize">
              language :{" "}
              <span className="text-warning fw-bold">
                {detailsTv.original_language}
              </span>
            </span>
            <span className="me-5">
              Date :{" "}
              <span className="text-warning fw-bold">
                {detailsTv.first_air_date}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { tvDetailsId } = context.params;
  await store.dispatch(getDetailsTv(tvDetailsId));
  const detailsTv = store.getState().tvDetailsSlice.detailsTv;

  return {
    props: {
      detailsTv,
    },
  };
}
