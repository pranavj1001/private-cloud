import "bulma/css/bulma.min.css";
import { useEffect, useState } from "react";
import { getTree } from "../api";
import Tree from "./Tree";

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

  return (
    <div>
      <Tree filesAndFolders={files} />
    </div>
  )
}

export default App;