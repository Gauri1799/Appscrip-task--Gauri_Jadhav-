import "./navbar.css"

import { FaSearch, FaHeart, FaShoppingBag, FaBars, FaUser, FaChevronDown } from "react-icons/fa"

export default function Navbar() {

    return (

        <nav className="navbar">

            <div className="topBar">

                <div className="leftIcons">
                    <FaBars />
                </div>

                <div className="logo">
                    LOGO
                </div>

                <div className="rightIcons">
                    <FaSearch />
                    <FaHeart />
                    <FaShoppingBag />
                    <FaUser />
                    <span className="lang">EN<FaChevronDown /></span>
                </div>

            </div>

            <ul className="menu">

                <li>SHOP</li>
                <li>SKILLS</li>
                <li>STORIES</li>
                <li>ABOUT</li>
                <li>CONTACT US</li>

            </ul>

        </nav>

    )

}