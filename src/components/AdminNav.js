import { Link, useNavigate } from "react-router-dom";


function AdminNav(){

  let history = useNavigate();

  function handleClick() {
    localStorage.removeItem("user");
    history("/login");
  }


    return(
      <>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Logo</a>
        </div>
        <ul className="navbar-links">
          <li><Link to="/admin">Home</Link></li>
          <li><Link to="/admin/transactions">Transactions</Link></li>
          <li className="dropdown">
            <a href="#">Dropdown</a>
            <ul className="dropdown-menu">
              <li style={{marginLeft:0}}><Link to="/admin/menu">Menu</Link></li>
              <li style={{marginLeft:0}}><Link to="/admin/stats">Stats</Link></li>
              <li style={{marginLeft:0}}  onClick={handleClick}><Link to="#">Log out</Link></li>
              
            </ul>
          </li>
        </ul>

      </nav>
    </>
    )
}

export default AdminNav;