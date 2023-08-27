import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { PET_STATUS, PET_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const singlePetQuery = (id) => {
  return {
    queryKey: ["pet", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/pets/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singlePetQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-pets");
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/pets/${params.id}`, data);
      queryClient.invalidateQueries(["pets"]);

      toast.success("Pet edited successfully");
      return redirect("/dashboard/all-pets");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditPet = () => {
  const id = useLoaderData();

  const {
    data: { pet },
  } = useQuery(singlePetQuery(id));

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit pet</h4>
        <div className="form-center">
          <FormRow type="text" name="name" defaultValue={pet.name} />
          <FormRow type="text" name="age" defaultValue={pet.age} />
          <FormRow
            type="text"
            name="petBreed"
            labelText="pet location"
            defaultValue={pet.petBreed}
          />
          <FormRowSelect
            name="petStatus"
            labelText="pet status"
            defaultValue={pet.petStatus}
            list={Object.values(PET_STATUS)}
          />
          <FormRowSelect
            name="petType"
            labelText="pet type"
            defaultValue={pet.petType}
            list={Object.values(PET_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditPet;
