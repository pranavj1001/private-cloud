import TreeItem from "./TreeItem";

function Tree({filesAndFolders, treeClickEvent, checkBoxTree}) {
  let id = 0;

  const handleClickEvent = (e) => {
    treeClickEvent(e);
  };

  const renderedTree = filesAndFolders.map((object) => {
    id++;
    return <TreeItem object={object} key={id} treeItemClickEvent={handleClickEvent} showCheckbox={checkBoxTree} />
  });

  return <div>{renderedTree}</div>;
}

export default Tree;