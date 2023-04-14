import { Link, useNavigate } from "react-router-dom";


function Navbar(){
    let history = useNavigate();

    function handleClick(){
        localStorage.removeItem("user");
        history("/login");
    }


    return(
        <><nav className="navbar">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png" alt="Company Logo"/>
        <div className="menu-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="nav no-search">
          <li className="nav-item text-center"><Link to="/">Home</Link></li>
          <li className="nav-item text-center"><Link to="/about">About</Link></li>
          <li className="nav-item text-center"><Link to="/payment">Pay</Link></li>
          <li className="nav-item text-center"><Link to="/transactions">Transactions</Link></li>
          <li className="nav-item text-center" onClick={handleClick}><Link to="#">Log out</Link></li>
        </ul>
      </nav> </>
    )
}

export default Navbar;