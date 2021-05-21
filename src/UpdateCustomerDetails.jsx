import React, { Component } from 'react';

export default class UpdateCustomerDetails extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name:"",
            phone:"",
            photo:"",
            address:""
        }
    }
    componentDidMount = async() => {
        const paramId = this.props.match.params.id;
        const response = await (await fetch(`http://localhost:5000/customers/${paramId}`)).json();
        if(response){
            this.setState({...response});
        }
    }
    onFormSubmit = async() => {
        const paramId = this.props.match.params.id;
        const customer = {...this.state};
        const response = await (await fetch(`http://localhost:5000/customers/${paramId}`,{
            method:"PUT",
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
                <h4>Update Customer</h4>
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
                    <button type="button" onClick={() => this.onFormSubmit()} className="btn btn-primary">Update</button>
                </form>
            </div>
        )
    }
}
