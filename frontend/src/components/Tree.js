import TreeItem from "./TreeItem";

function Tree({filesAndFolders, treeClickEvent, checkBoxTree}) {

  const handleClickEvent = (e) => {
    treeClickEvent(e);
  };

  const renderedTree = filesAndFolders.map((object) => {
    return <TreeItem object={object} key={object.index} treeItemClickEvent={handleClickEvent} showCheckbox={checkBoxTree} />
  });

  return <div>{renderedTree}</div>;
}

export default Tree;