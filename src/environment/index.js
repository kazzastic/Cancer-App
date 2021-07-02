const axios = require("axios");
let prod = "https://onco-api.herokuapp.com/";
// let local = "http://127.0.0.1:5000/";
export const flaskBackendService = axios.create({
  baseURL: prod
});
