import { getTrending, changeTrending } from "./../store/trendingSlice";
import store from "./../store/index";
import Carousle from "@/Components/Carousel/Carousel";
import style from "../styles/Home.module.css";
import Image from "next/image";
import ads from "../public/ads1.png";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Movies({ trending }) {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";
  const dispatch = useDispatch();
  const router = useRouter();
  const { dependTrending } = useSelector((state) => state.trendingSlice);

  const goToDetails = (item) => {
    if (item.media_type == "movie") {
      router.push(`/details/movieDetails/${item.id}`);
    } else if (item.media_type == "tv") {
      router.push(`/details/tvDetails/${item.id}`);
    } else if (item.media_type == "person") {
      router.push(`/details/personDetails/${item.id}`)
    }
  };

  return (
    <>
      <Carousle trending={trending} />
      <div className="container">
        <div className="text-white row px-5">
          <div className="col-md-8 col-sm-12">
            <div className={`${style.spanitem}`}>
              <span onClick={() => dispatch(changeTrending("all"))}>All</span>
              <span onClick={() => dispatch(changeTrending("movie"))}>
                Movies
              </span>
              <span onClick={() => dispatch(changeTrending("tv"))}>
                TV Shows
              </span>
              <span onClick={() => dispatch(changeTrending("person"))}>
                Person
              </span>
            </div>
            <div className="moviesItem my-4">
              <div className="row g-3">
                {trending.results && !dependTrending.results
                  ? trending.results.map((e, index) => {
                      if (e.poster_path || e.profile_path) {
                        return (
                          <div
                            key={index}
                            className="col-lg-3 col-md-4 col-sm-6"
                          >
                            <div
                              className={`${style.smallimg} position-relative`}
                            >
                              <img
                                className={`${style.img}`}
                                alt={e.name ? e.name : e.title}
                                src={
                                  e.poster_path
                                    ? baseUrlImg + e.poster_path
                                    : baseUrlImg + e.profile_path
                                }
                              />
                              <div className={`${style.over}`}>
                                <div
                                  onClick={() => goToDetails(e)}
                                  className={`btn btn-danger rounded-pill ${style.btn}`}
                                >
                                  Read More...
                                </div>
                                <h6 className="text-capitalize rounded p-1 mt-1 position-absolute start-0 bg-transparent bottom-0 m-3 text-warning">
                                  {e.name ? e.name : e.title}
                                </h6>
                              </div>
                            </div>
                          </div>
                        );
                      } else return "";
                    })
                  : dependTrending.results.map((e, index) => {
                      if (e.poster_path || e.profile_path) {
                        return (
                          <div
                            key={index}
                            className="col-lg-3 col-md-4 col-sm-6"
                          >
                            <div
                              className={`${style.smallimg} position-relative`}
                            >
                              <img
                                className={`${style.img}`}
                                alt={e.name ? e.name : e.title}
                                src={
                                  e.poster_path
                                    ? baseUrlImg + e.poster_path
                                    : baseUrlImg + e.profile_path
                                }
                              />
                              <div className={`${style.over}`}>
                                <div
                                  onClick={() => goToDetails(e)}
                                  className={`btn btn-danger rounded-pill ${style.btn}`}
                                >
                                  Read More...
                                </div>
                                <h6 className="text-capitalize rounded p-1 mt-1 position-absolute start-0 bg-transparent bottom-0 m-3 text-warning">
                                  {e.name ? e.name : e.title}
                                </h6>
                              </div>
                            </div>
                          </div>
                        );
                      } else return "";
                    })}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${style.ads} mt-5 p-2 bg-white`}>
              <div className="a">
                <div className="mb-0">ads here...</div>
                <Image
                  src={ads}
                  className={`img-fluid w-100`}
                  priority={true}
                  alt=""
                />
              </div>
              <div className="a">
                <div className="mb-0">ads here...</div>
                <Image
                  src={ads}
                  className={`img-fluid w-100`}
                  priority={true}
                  alt=""
                />
              </div>
              <div className="a">
                <div className="mb-0">ads here...</div>
                <Image
                  src={ads}
                  className={`img-fluid w-100`}
                  priority={true}
                  alt=""
                />
              </div>
              <div className="a">
                <div className="mb-0">ads here...</div>
                <Image
                  src={ads}
                  className={`img-fluid w-100`}
                  priority={true}
                  alt=""
                />
              </div>
              <div className={`${style.b}`}>
                <div className="mb-0">ads here...</div>
                <Image
                  src={ads}
                  className={`img-fluid w-100`}
                  priority={true}
                  alt=""
                />
              </div>
              <div className={`${style.b}`}>
                <div className="mb-0">ads here...</div>
                <Image
                  src={ads}
                  className={`img-fluid w-100`}
                  priority={true}
                  alt=""
                />
              </div>
              <div className={`${style.b}`}>
                <div className="mb-0">ads here...</div>
                <Image
                  src={ads}
                  className={`img-fluid w-100`}
                  priority={true}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await store.dispatch(getTrending());
  const trending = store.getState().trendingSlice.trending;
  console.log(trending);

  return {
    props: {
      trending,
    },
  };
}
