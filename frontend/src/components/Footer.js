import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer class="footer main-footer">
      <div class="content has-text-centered">
        <p>Developed with &nbsp;<FontAwesomeIcon icon={faHeart} color='red' />&nbsp; by Pranav Jain </p>
      </div>
    </footer>
  );
}

export default Footer;