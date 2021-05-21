import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class CustomerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers:[]
        }
    }

    componentDidMount = async() =>{
        this.getCustomerData();
        document.title = `Customer List -- E-commerce`
    }

    getCustomerData = async() => {
        const response = await (await fetch("http://localhost:5000/customers")).json();
        this.setState({customers:response});
    }

    handleDelete = async(id) => {
        const response = await fetch(`http://localhost:5000/customers/${id}`,{
            method:"DELETE"
        });
        if(response.ok){
            this.getCustomerData();
        }
    }
    
    render() {
        return (
            <div>
                <h4 className="bg-light p-2 text-darka shadow">Customer List</h4>
                <div>
                    <NavLink to="/new-customer" className="nav-link" activeClassName="active" exact>New Customer</NavLink>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Picture</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.customers.map((customer) => {
                                return(
                                    <tr className="table-active" key={customer.id}>
                                        <th scope="col">{customer.id}</th>
                                        <th scope="col">
                                            <img src={customer.photo} width="50px" alt="Profile pic"/>
                                        </th>
                                        <th scope="col">{customer.name}</th>
                                        <th scope="col">{customer.phone}</th>
                                        <th scope="col">{customer.address}</th>
                                        <th scope="col">
                                        <NavLink className="btn btn-primary" to={`/update-customer/${customer.id}`}>Edit</NavLink> &nbsp;&nbsp;
                                        <button type="button" className="btn btn-danger" onClick={() =>{this.handleDelete(customer.id)}}>Delete</button>
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
            </div>
        )
    }
}
