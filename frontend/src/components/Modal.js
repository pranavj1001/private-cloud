import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { inspect } from 'util'

function Modal({data, path}) {

  const [isModalActive, toggleModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [files, setFiles] = useState({});

  const submitButtonAction = (e) => {
    console.log('createFolder');
    // createFolder(e);
  };

  const activateModal = () => {
    toggleModal(!isModalActive);
  }

  const handleFolderNameInputChange = (event) => {
    setFolderName(event.target.value)
  }

  const handleFilesInputChange = (event) => {
    console.log(inspect(event.target.files));
    setFiles(event.target.files);
  }

  const renderModalBody = () => {
    switch(data.id) {
      case 1:
        return (<input className="input is-primary" type="text" placeholder="Folder Name" value={folderName} onChange={handleFolderNameInputChange} />);
      case 2:
        return (
          <div className="columns is-centered">
            <div className="file is-medium is-boxed has-name column">
              <label className="file-label">
                <input className="file-input" type="file" name="items" multiple onChange={handleFilesInputChange} />
                <span className="file-cta">
                  <span className="file-icon">
                    <FontAwesomeIcon icon={faUpload} />
                  </span>
                  <span className="file-label">
                    Add your files here
                  </span>
                </span>
                <span className="file-name max-width">
                  Screen Shot 2017-07-29 at 15.54.25.png
                </span>
              </label>
            </div>
          </div>);
    }
  };

  return (
    <div className="column is-2">
      <button className="js-modal-trigger button dark-button" onClick={activateModal}>
        {data.TRIGGER_BUTTON_TEXT}
      </button>
      
      <div className={isModalActive ? "modal is-active" : "modal"} >
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" onClick={activateModal}></button>
          </header>
          <section className="modal-card-body">
          {renderModalBody()}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={submitButtonAction}>{data.SUBMIT_BUTTON_TEXT}</button>
            <button className="button" onClick={activateModal}>Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Modal;