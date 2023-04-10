import "bulma/css/bulma.min.css";
import { useEffect, useState } from "react";
import { getTree } from "../api";
import Tree from "./Tree";
import Nav from "./Nav";
import Modal from "./Modal";
import "./common.css";
import { MODAL_TYPES } from "../constants";

function App() {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    let ignore = false;
    getTree(path)
      .then((result) => {
        if (result?.status === 200) {
          if (!ignore)
          console.log(result.data["resp"]);
            setFiles(result.data["resp"]);
        } else {
          console.log(`Not able to fetch the tree. More details ${result}`);
          if (!ignore)
            setFiles([]);
        }
      })
      .catch((err) => {
        console.error(`Some Error Occurred while fetching the tree ${err}`);
        if (!ignore)
          setFiles([]);
      });
      return () => ignore = true;
  }, [path]);

  const changeFolder = (path) => {
    // console.log(`Folder Change Asked! ${util.inspect(e.target.dataset.path)}`);
    setPath(path);
  };

  return (
    <div className="container">
      <Nav path={path} onFolderClicked={changeFolder} />
      <div className="columns">
        <Modal data={MODAL_TYPES.CREATE_FOLDER} path={path} />
        <Modal data={MODAL_TYPES.UPLOAD_FILES} path={path} />
      </div>
      <Tree filesAndFolders={files} onFolderClicked={changeFolder} />
    </div>
  )
}

export default App;