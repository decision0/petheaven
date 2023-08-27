import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { PET_STATUS, PET_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/pets", data);
      queryClient.invalidateQueries(["pets"]);
      toast.success("Pet added successfully ");
      return redirect("all-pets");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddPet = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add pet</h4>
        <div className="form-center">
          <FormRow type="text" name="name" />
          <FormRow type="text" name="age" />
          <FormRow
            type="text"
            labelText="pet breed"
            name="petBreed"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="pet status"
            name="petStatus"
            defaultValue={PET_STATUS.PENDING}
            list={Object.values(PET_STATUS)}
          />
          <FormRowSelect
            labelText="pet type"
            name="petType"
            defaultValue={PET_TYPE.FULL_TIME}
            list={Object.values(PET_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddPet;
