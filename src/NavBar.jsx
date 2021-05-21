import React,{Component} from 'react'
import {NavLink} from 'react-router-dom';

export default class NavBar extends Component{

    onLogOut = (event) => {
        event.preventDefault();
        this.props.updateLoggedIn(false);
        document.location.hash = "/";
    }
    render(){
        return(
            <div>
               <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/#">E-Commerce</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {this.props.hasLogin ? (
                                <>
                                    <li className="nav-item">
                                        <a href="/#" className="nav-link" onClick={this.onLogOut}>Logout</a>
                                    </li>
                                </>
                            ):
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" activeClassName="active" exact href="/#">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link" activeClassName="active" exact href="/#">Register</NavLink>
                                </li>
                            </>
                            }
                        </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}