import TreeItem from "./TreeItem";

function Tree({filesAndFolders, onFolderClicked}) {
  let id = 0;

  const sendFolderClickedToParent = (e) => {
    onFolderClicked(e);
  };

  const renderedTree = filesAndFolders.map((object) => {
    console.log(object);
    id++;
    return <TreeItem object={object} key={id} onFolderClicked={sendFolderClickedToParent} />
  });

  return <div>{renderedTree}</div>;
}

export default Tree;