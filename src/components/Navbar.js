import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  let history = useNavigate();

  function handleClick() {
    localStorage.removeItem("user");
    history("/login");
  }


  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Logo</a>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li className="dropdown">
            <a href="#">Dropdown</a>
            <ul className="dropdown-menu">
              <li style={{marginLeft:0}}><Link to="/payment">Pay</Link></li>
              <li style={{marginLeft:0}}><Link to="/transactions">Transactions</Link></li>
              <li style={{marginLeft:0}}  onClick={handleClick}><Link to="#">Log out</Link></li>
              
            </ul>
          </li>
        </ul>

      </nav>
    </>
  )
}

export default Navbar;

{/* <nav classNameName="navbar">
      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png" alt="Company Logo" />
      <div classNameName="menu-toggle" id="mobile-menu">
        <span classNameName="bar"></span>
        <span classNameName="bar"></span>
        <span classNameName="bar"></span>
      </div>
      <ul classNameName="nav no-search">
        <li classNameName="nav-item text-center"></li>
        <li classNameName="nav-item text-center"></li>
        <li classNameName="nav-item text-center"></li>
        <li classNameName="nav-item text-center"></li>
        <li classNameName="nav-item text-center"><Link to="#">Log out</Link></li>
      </ul>
    </nav> */} 