import { URLS } from "../api";

const handleFolderClick = () => {
  console.log(" Folder clicked!");
};

function TreeItem({object}) {
  const {name, isDir, fullPath} = object;
  if (!isDir) {
    return (
      <div>
        <a href={`${URLS['GET_FILE']}/?path=${fullPath}`}>{name}</a>
      </div>
    );
  } else {
    return (
      <div onClick={handleFolderClick}>{name}</div>
    );
  }
}

export default TreeItem;