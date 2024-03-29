import "bulma/css/bulma.min.css";
import { useEffect, useState } from "react";
import { getTree } from "../api";
import Tree from "./Tree";
import Nav from "./Nav";
import Modal from "./Modal";
import Footer from "./Footer";
import "./common.css";
import { MODAL_TYPES } from "../constants";

function App() {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState([]);

  const loadTree = (ignore = false) => {
    getTree(path)
      .then((result) => {
        if (result?.status === 200) {
          if (!ignore) {
            let index = 0;
            for (const file of result.data["resp"]) {
              file.index = index;
              index++;
            }
            setFiles(result.data["resp"]);
          }
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
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore)
      loadTree(ignore);
    return () => ignore = true;
  }, [path]);

  const changeFolder = (path) => {
    // console.log(`Folder Change Asked! ${util.inspect(e.target.dataset.path)}`);
    setPath(path);
  };

  return (
    <div className="container hero is-fullheight max-width">
      <div className="margin-left-20px margin-right-20px margin-top-20px">
        <Nav path={path} onFolderClicked={changeFolder} />
        <hr className="solid" />
        <div>
          <Modal data={MODAL_TYPES.CREATE_FOLDER} path={path} updateTree={loadTree} />
          <Modal data={MODAL_TYPES.UPLOAD_FILES} path={path} updateTree={loadTree} />
          <Modal data={MODAL_TYPES.DELETE_CONTENTS} path={path} updateTree={loadTree} items={files} />
        </div>
        <hr className="solid" />
        <Tree filesAndFolders={files} treeClickEvent={changeFolder} checkBoxTree={false} />
      </div>
      <Footer />
    </div>
  )
}

export default App;