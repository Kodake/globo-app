import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import config from "../config";
import { Claim } from "../types/claim";

const useFetchUser = () => {
  return useQuery<Claim[], AxiosError>("user", () =>
    axios
      .get(`${config.baseApiURL}/account/getuser?slide=false`, {
        withCredentials: true,
      })
      .then((resp) => resp.data)
  );
};

export default useFetchUser;