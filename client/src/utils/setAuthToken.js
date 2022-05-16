import axios from "axios";

const setAuthToken = () => {
  const token = window.localStorage.getItem("lead_token");
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;