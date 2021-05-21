import React, { Component } from 'react';

export default class InsertCustomer extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name:"",
            phone:"",
            photo:"",
            address:""
        }
    }
    onFormSubmit = async() => {
        const customer = {...this.state};
        console.log(customer);
        const response = await (await fetch("http://localhost:5000/customers",{
            method:"POST",
            body:JSON.stringify(customer),
            headers:{
                "Content-type":"application/json"
            }
        })).json();
        if(response){
            this.props.history.replace("/customer")
        }
        console.log(response);
    }
    render() {
        return (
            <div>
                <h4>Register Customer</h4>
                 <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={(event)=>{this.setState({name:event.target.value})}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value={this.state.phone} onChange={(event)=>{this.setState({phone:event.target.value})}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Photo</label>
                        <input type="text" className="form-control" value={this.state.photo} onChange={(event)=>{this.setState({photo:event.target.value})}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={this.state.address} onChange={(event)=>{this.setState({address:event.target.value})}}/>
                    </div>
                    <button type="button" onClick={() => this.onFormSubmit()} className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
