import React, { useState } from "react";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
// import { SidebarData } from "./SidebarData";
// import "./Navbar.css";
// import { IconContext } from "react-icons";
// import styles from "./AccountPage.module.css";
import "./AccountPage.css";

function Navi() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <box-icon
              name="cart"
              type="solid"
              size="md"
              onClick={showSidebar}
            ></box-icon>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="/" className="menu-bars">
                {/* <AiIcons.AiOutlineClose /> */}
                <box-icon name="cart" type="solid" size="md"></box-icon>
              </Link>
            </li>
            <li className="nav-text">asdasdasd</li>
            <li className="nav-text">asdasd</li>
          </ul>
        </nav>
      </>
    </>
  );
}

export default Navi;
