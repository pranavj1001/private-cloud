import axios from "axios";
import config from "./config.js";

const SERVER_URL = `${config["SERVER_PROTOCOL"]}://${config["SERVER_HOST"]}:${config["SERVER_PORT"]}`;

const URLS = {
  GET_TREE: `${SERVER_URL}${config["GET_TREE_API_URL"]}`,
  GET_FILE: `${SERVER_URL}${config["GET_FILE_API_URL"]}`,
};

export const getTree = (path) => {
  return axios.get(URLS["GET_TREE"], { params: { path } });
};
