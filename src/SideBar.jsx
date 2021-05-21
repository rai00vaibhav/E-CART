import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class SideBar extends Component {
    render() {
        return (
            <div className="list-group mt-1" id="list-tab" role="tablist">
                <NavLink to="/dashboard" className="list-group-item list-group-item-action" activeClassName="active" exact>Dashboard</NavLink>
                <NavLink to="/shop" className="list-group-item list-group-item-action" activeClassName="active" exact>Shopping Cart</NavLink>
                <NavLink to="/customer" className="list-group-item list-group-item-action" activeClassName="active" exact>Customer List</NavLink>
            </div>
        )
    }
}
