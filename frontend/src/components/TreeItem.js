import { URLS } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons'

function TreeItem({object, treeItemClickEvent, showCheckbox}) {
  const {index, name, isDir, fullPath} = object;

  const handleClickEvent = (e) => {
    if (showCheckbox) {
      return treeItemClickEvent(e);
    }
    treeItemClickEvent(e.currentTarget.dataset.path);
  };

  if (showCheckbox) {
    return (
      <div>
        <input type="checkbox" id={name} name={name} data-index={index} onChange={handleClickEvent} /> &nbsp;
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
      <div className="clickable-cursor" onClick={handleClickEvent} data-path={fullPath}>{name}</div>
    );
  }
}

export default TreeItem;