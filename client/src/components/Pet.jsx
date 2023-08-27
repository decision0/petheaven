import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Pet";
import PetInfo from "./PetInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Pet = ({ _id, name, age, petBreed, petType, createdAt, petStatus }) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{age.charAt(0)}</div>
        <div className="info">
          <h5>Name: {name}</h5>
          <p>Age: {age}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PetInfo icon={<FaLocationArrow />} text={petBreed} />
          <PetInfo icon={<FaCalendarAlt />} text={date} />
          <PetInfo icon={<MdOutlinePets />} text={petType} />
          <PetInfo icon={<GrStatusInfo />} text={petStatus} />
        </div>
        <footer className="actions">
          <Link to={`../edit-pet/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-pet/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Pet;
