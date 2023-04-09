import { URLS } from "../api";
import {inspect} from "util";

function TreeItem({object, onFolderClicked}) {
  const {name, isDir, fullPath, onlyPath} = object;

  const handleFolderClick = (e) => {
    // console.log(`Folder clicked! ${util.inspect(e.target.dataset.path)}`);
    // console.log(`1 ${inspect(e.currentTarget)}`);
    onFolderClicked(e.currentTarget.dataset.path);
  };

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