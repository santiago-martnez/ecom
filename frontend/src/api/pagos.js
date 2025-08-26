import axios from "./axios";

export const Success = () => {
  return axios.get("/success");
};

export const Failure = () => {
  return axios.get("/failure");
};

export const Pending = () => {
  return axios.get("/pending");
};