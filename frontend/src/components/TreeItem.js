import { URLS } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons'

function TreeItem({object, onFolderClicked, showCheckbox}) {
  const {name, isDir, fullPath} = object;

  const handleFolderClick = (e) => {
    onFolderClicked(e.currentTarget.dataset.path);
  };

  if (showCheckbox) {
    return (
      <div>
        <input type="checkbox" id={name} name={name} value={name} /> &nbsp;
        <FontAwesomeIcon icon={isDir ? faFolder : faFile} /> &nbsp;
        <label htmlFor={name}>{name}</label>
      </div>);
  }

  if (!isDir) {
    return (
      <div>
        <a href={`${URLS['GET_FILE']}/?path=${fullPath}`}>{name}</a>
      </div>
    );
  } else {
    return (
      <div className="clickable-cursor" onClick={handleFolderClick} data-path={fullPath}>{name}</div>
    );
  }
}

export default TreeItem;