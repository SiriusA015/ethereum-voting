import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from "rimble-ui";

class Navbar extends Component {
    render() {
        return (
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Agora</Link>
                <div className="collapsed navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                        
                        <li className="navbar-item">
                            <Link to="/createElection" className="nav-link">New</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/active" className="nav-link">Active</Link>
                        </li>
                    </ul>

                    <ul className = "nav navbar-nav navbar-right navright">
                        <li className="navbar-item">
                        <Link to="/" className="nav-link">{this.props.account}</Link>
                        </li>
                        <li className = "">
                            <Avatar size = "2.5rem" src = "https://www.w3schools.com/howto/img_avatar.png" />
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}

export default Navbar;