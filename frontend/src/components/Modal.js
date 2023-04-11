import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { inspect } from "util";
import { postCreateFolder, putUploadFiles } from "../api";

function Modal({ data, path, updateTree, items }) {
  const [isModalActive, toggleModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [filesName, setFilesName] = useState("");
  const [files, setFiles] = useState([]);

  const submitButtonAction = (e) => {
    switch (data.id) {
      case 1:
        createFolder();
        break;
      case 2:
        uploadFiles();
        break;
    }
  };

  const changeModalStatus = () => {
    toggleModal(!isModalActive);
  };

  const handleFolderNameInputChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleFilesInputChange = (event) => {
    let name = "";
    for (const file of event.target.files) {
      name += `${file.name}, `
    }
    setFilesName(name);
    setFiles(event.target.files);
  };

  const createFolder = () => {
    postCreateFolder(`${path}/${folderName}`)
      .then((result) => {
        if (result?.status === 200) {
          updateTree();
          changeModalStatus();
          setFolderName("");
        } else {
          console.log(`Not able to create the folder. More details ${result}`);
        }
      })
      .catch((err) => {
        console.error(
          `Some Error Occurred while creating the folder ${inspect(err)}`
        );
      });
  };

  const uploadFiles = () => {
    putUploadFiles(path, files)
      .then((result) => {
        if (result?.status === 200) {
          updateTree();
          changeModalStatus();
          setFiles([]);
        } else {
          console.log(`Not able to upload the files. More details ${result}`);
        }
      })
      .catch((err) => {
        console.error(
          `Some Error Occurred while uploading the files ${inspect(err)}`
        );
      });
  };

  const renderModalBody = () => {
    switch (data.id) {
      case 1:
        return (
          <input
            className="input is-primary"
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={handleFolderNameInputChange}
          />
        );
      case 2:
        return (
          <div className="columns is-centered">
            <div className="file is-medium is-boxed has-name column">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="items"
                  multiple
                  onChange={handleFilesInputChange}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <FontAwesomeIcon icon={faUpload} />
                  </span>
                  <span className="file-label">Add your files here</span>
                </span>
                { (filesName !== "") && <span className="file-name max-width-30em">{filesName}</span> }
                <span className="file-name max-width-30em">
                  Files Count: {files.length}
                </span>
              </label>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="column is-2">
      <button
        className="js-modal-trigger button dark-button"
        onClick={changeModalStatus}
      >
        {data.TRIGGER_BUTTON_TEXT}
      </button>

      <div className={isModalActive ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{data.MODAL_TITLE}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={changeModalStatus}
            ></button>
          </header>
          <section className="modal-card-body">{renderModalBody()}</section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={submitButtonAction}>
              {data.SUBMIT_BUTTON_TEXT}
            </button>
            <button className="button" onClick={changeModalStatus}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Modal;
