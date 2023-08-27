import Pet from "./Pet";
import Wrapper from "../assets/wrappers/PetsContainer";
import { useAllPetsContext } from "./AllPets";
import PageBtnContainer from "./PageBtnContainer";
const PetsContainer = () => {
  const { data } = useAllPetsContext();

  const { pets, totalPets, numOfPages } = data;
  if (pets.length === 0) {
    return (
      <Wrapper>
        <h2>No pets to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalPets} pet{pets.length > 1 && "s"} found
      </h5>
      <div className="pets">
        {pets.map((pet) => {
          return <Pet key={pet._id} {...pet} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default PetsContainer;
