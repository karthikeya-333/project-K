import { Link, useNavigate } from "react-router-dom";


function AdminNav(){


    return(
        <><nav className="navbar">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png" alt="Company Logo"/>
        <div className="menu-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="nav no-search">
          <li className="nav-item text-center"><Link to="/admin">Home</Link></li>
          <li className="nav-item text-center"><Link to="/admin/transactions">Transaction</Link></li>
          <li className="nav-item text-center"><Link to="/admin/menu">Menu</Link></li>
          {/* <li className="nav-item text-center"><Link to="/transactions">Transactions</Link></li>
          <li className="nav-item text-center" onClick={handleClick}><Link to="#">Log out</Link></li> */}
        </ul>
      </nav> </>
    )
}

export default AdminNav;