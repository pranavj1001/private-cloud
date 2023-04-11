export const config = {
  SERVER_HOST: "localhost",
  SERVER_PORT: "3690",
  SERVER_PROTOCOL: "http",
  GET_TREE_API_URL: "/gettree",
  GET_FILE_API_URL: "/file",
  POST_CREATEFOLDER_API_URL: "/createfolder",
  PUT_UPLOAD_FILES_API_URL: "/files",
};

export const MODAL_TYPES = {
  CREATE_FOLDER: {
    id: 1,
    MODAL_TITLE: "Modal to create new folder",
    TRIGGER_BUTTON_TEXT: "Create Folder",
    SUBMIT_BUTTON_TEXT: "Create Folder"
  },
  UPLOAD_FILES: {
    id: 2,
    MODAL_TITLE: "Modal to upload new files",
    TRIGGER_BUTTON_TEXT: "Upload Files",
    SUBMIT_BUTTON_TEXT: "Upload Files"
  }
};