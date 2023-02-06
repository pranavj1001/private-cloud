import "bulma/css/bulma.min.css";
import { useEffect, useState } from "react";
import { getTree } from "../api";

function App() {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    let ignore = false;
    getTree(path)
      .then((result) => {
        if (result?.status === 200) {
          if (!ignore)
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
  }, []);

  return (
    <div>{JSON.stringify(files)}</div>
  )
}

export default App;