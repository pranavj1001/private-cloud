import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { inspect } from "util";
import Tree from "./Tree";
import { postCreateFolder, putUploadFiles, deletePaths } from "../api";

function Modal({ data, path, updateTree, items }) {
  const [isModalActive, toggleModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [filesName, setFilesName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [files, setFiles] = useState([]);

  const submitButtonAction = (e) => {
    switch (data.id) {
      case 1:
        createFolder();
        break;
      case 2:
        uploadFiles();
        break;
      case 3:
        deleteSelectedItems();
        break;
      default:
        console.log("Modal ID not specified");
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

  const handleItemClicked = (event) => {
    const selectedItemsArray = [...selectedItems];
    const item = selectedItemsArray.find(i => i.index === parseInt(event.currentTarget.dataset.index));
    item.selected = event.currentTarget.checked
    setSelectedItems(selectedItemsArray);
  }

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

  const deleteSelectedItems = () => {
    let itemsToDeleteFound = false;
    for (const item of selectedItems) {
      if (item.selected) {
        itemsToDeleteFound = true;
        break;
      }
    }
    if (!itemsToDeleteFound) {
      console.log("No items to delete!");
      changeModalStatus();
      return;
    }

    deletePaths(path, selectedItems.filter(i => i.selected === true))
      .then((result) => {
        console.log(result);
        if (result?.status === 200) {
          updateTree();
          changeModalStatus();
        } else {
          console.log(`Not able to delete the files. More details ${result}`);
        }
      })
      .catch((err) => {
        console.error(
          `Some Error Occurred while deleting the files ${inspect(err)}`
        );
      });
  };

  useEffect(() => {
    if (data.id === 3) {
      for (const item of items) {
        item.selected = false;
      }
      setSelectedItems(items);
    }
  }, [items, setSelectedItems, data.id]);

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
      case 3:
        return (<Tree filesAndFolders={items} treeClickEvent={handleItemClicked} checkBoxTree={true} />)
      default:
        console.log("Modal ID not specified");
    }
  };

  return (
    <div className="display-inline-block margin-right-20px margin-top-5px">
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
