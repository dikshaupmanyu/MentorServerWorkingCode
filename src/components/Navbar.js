import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg ">
        <div className="collapse navbar-collapse justify-content-md-left"
            id="navbarsExample10">        
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/yourroom" className="nav-link">
                Your Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Invitation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Public Chat
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar