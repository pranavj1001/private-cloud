import TreeItem from "./TreeItem";

function Tree({filesAndFolders}) {
  const renderedTree = filesAndFolders.map((object) => {
    console.log(object);
    return <TreeItem object={object} />
  });
  // console.log(`Tree ${filesAndFolders} ${renderedTree}`);

  return <div>{renderedTree}</div>;
}

export default Tree;