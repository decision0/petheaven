import { toast } from "react-toastify";
import { PetsContainer, SearchContainer } from ".";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allPetsQuery = (params) => {
  const { search, petStatus, petType, sort, page } = params;
  return {
    queryKey: [
      "pets",
      search ?? "",
      petStatus ?? "all",
      petType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/pets", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allPetsQuery(params));
    return { searchValues: { ...params } };
  };

const AllPetsContext = createContext();
const AllPets = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allPetsQuery(searchValues));
  return (
    <AllPetsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <PetsContainer />
    </AllPetsContext.Provider>
  );
};

export const useAllPetsContext = () => useContext(AllPetsContext);

export default AllPets;
