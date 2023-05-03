import store from "@/store";
import { getPerson } from "@/store/personSlice";


export default function details({ person }) {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  console.log(person);
  return (
    <>
      <div className="container my-5">
        <div className="py-4 invisible">dddd</div>
        <div className="row align-items-start">
          <div className="col-md-6">
            <div className="myImage p-5 mt-5">
              <img
                src={baseUrlImg + person.profile_path}
                alt="movie img"
                className="img-fluid rounded-5"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="data">
              <h2 className="text-warning fs-1 fw-bold text-capitalize mb-4">
                Name : {person.name}
              </h2>
              <p className="text-muted">{person.biography}</p>
            </div>
            <span className="me-5 text-capitalize">
              Place Of Birth :{" "}
              <span className="text-warning fw-bold">
                {person.place_of_birth}
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
  const { personDetailsId } = context.params;
  await store.dispatch(getPerson(personDetailsId));
  const person = store.getState().personSlice.person;

  return {
    props: {
      person,
    },
  };
}
