import axios from "axios";
import { config } from "./constants.js";

const SERVER_URL = `${config["SERVER_PROTOCOL"]}://${config["SERVER_HOST"]}:${config["SERVER_PORT"]}`;

export const URLS = {
  GET_TREE: `${SERVER_URL}${config["GET_TREE_API_URL"]}`,
  GET_FILE: `${SERVER_URL}${config["GET_FILE_API_URL"]}`,
  POST_CREATEFOLDER: `${SERVER_URL}${config["POST_CREATEFOLDER_API_URL"]}`,
  PUT_FILES: `${SERVER_URL}${config["PUT_UPLOAD_FILES_API_URL"]}`,
};

export const getTree = (path) => {
  return axios.get(URLS["GET_TREE"], { params: { path } });
};

export const postCreateFolder = (path) => {
  console.log(path);
  return axios.post(URLS["POST_CREATEFOLDER"], null, { params: { path } });
};

export const putUploadFiles = (path, files) => {
  return axios.put(URLS["PUT_FILES"], { items: files }, {
    params: { path },
    headers: { "Content-Type": "multipart/form-data" },
  });
};
