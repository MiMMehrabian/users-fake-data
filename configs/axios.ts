import axios from "axios";
// configure axios instance
const instance = axios.create({
    baseURL: "https://reqres.in/api/",
    timeoutErrorMessage: "check your internet connection.",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
