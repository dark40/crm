import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import './style.css'
import { useStoreContext } from '../../utils/GlobalState';



function AppHeader() {

  const [, dispatch] = useStoreContext();

  const handleLoggedOut = () => {
      Auth.logout()

      dispatch({
        isLoggedIn: false
      })
  }


  function showHeader() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            {/* <Link to="/myProfile">
              My Profile
            </Link> */}
          </li>
          <li className="mx-1">
            <a href="/" onClick={handleLoggedOut}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header>
      <nav>
        {showHeader()}
      </nav>
    </header>
  )
}

export default AppHeader