import React, { Component } from 'react';
export default class Login extends Component{


    constructor(props){
        super(props);
        this.state = {
            email:"abc@gmail.com",
            password:"1234",
            message:""
        }
    }
    componentDidMount(){
        document.title = `Login -- E-commerce`
    }
    onFormSubmit = async ()=>{
        const response = await (await fetch(`http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`)).json();
        console.log(response);
        if(response.length > 0){
            this.setState({
                message: <div className="alert alert-success" role="alert" style={{marginTop:'10px'}}>
                Login Successfull
              </div>
            })
            this.props.updateLoggedIn(true);
            this.props.history.replace("/dashboard")
        }
        else{
            this.setState({
                message: <div className="alert alert-danger" role="alert" style={{marginTop:'10px'}}>
                Please enter correct credientials.
              </div>
            })
            this.props.updateLoggedIn(false);
        }
        console.log(this.state)
    }
    render(){
        return(
            <div className="row">
                <h4 className="bg-light p-2 text-darka shadow" style={{textAlign:'center'}}>Login Here</h4>
                <hr/>
                <div className="d-flex justify-content-center">
                    <form className="p-5 bg-light col-lg-6 shadow d-grid gap-2 p-5">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={(event)=>{this.setState({email:event.target.value})}} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={(event)=>{this.setState({password:event.target.value})}} id="exampleInputPassword1"/>
                        </div>
                        <button type="button" onClick={() => this.onFormSubmit()} className="btn btn-primary">Submit</button>
                        {this.state.message}
                    </form>
                </div>
            </div>
        )
    }
}