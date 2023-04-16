import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faHome } from '@fortawesome/free-solid-svg-icons'

function Nav({path, onFolderClicked}) {
  let id = 0;

  const handleFolderClick = (e) => {
    e.preventDefault();
    // console.log(`navitem ${util.inspect(e.currentTarget)}`)
    onFolderClicked(e.currentTarget.dataset.path);
  }

  const renderedNav = path.split("/").map((folder) => {
    console.log(folder);
    id++;
    const fullPath = path.split("/").slice(0,id).join("/");
    if (id === 1) {
      return (
        <li key={id} data-path={fullPath} onClick={handleFolderClick}>
          <p className="clickable-cursor">
            <span className="icon is-small">
              <FontAwesomeIcon icon={faHome} />
            </span>
            <span>Home &nbsp;</span>
          </p>
        </li>
      );
    } else {
      return (
        <li key={id} data-path={fullPath} onClick={handleFolderClick}>
          <p className="clickable-cursor margin-left-10px">
            <span className="icon is-small">
              <FontAwesomeIcon icon={faFolder} />
            </span>
            <span>{folder} &nbsp;</span>
          </p>
        </li>
      );
    }
  });

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {renderedNav}
      </ul>
    </nav>
  );
}

export default Nav;