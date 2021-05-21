import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            fullName:"",
            dob:"",
            gender:"",
            country:"",
            newsletter:false,
            controls:["email","password","fullName","dob","gender","country","newsletter"],
            errors:{
                email:[],
                password:[],
                fullName:[],
                dob:[],
                gender:[],
                country:[],
                newsletter:[]
            },
            dirty:{
                email:false,
                password:false,
                fullName:false,
                dob:false,
                gender:false,
                country:false,
                newsletter:false
            },
            message:""
        }
    }
    onFormSubmit = async() => {
        let dirty = this.state.dirty;
        Object.keys(dirty).map((control) => {
            return dirty[control] = true;
        })
        this.setState({dirty:dirty});
        this.validate();
        if(this.isValid()){
            const user = {
                email:this.state.email,
                password:this.state.password,
                fullName:this.state.fullName,
                dob:this.state.dob,
                newsletter:this.state.newsletter,
                country:this.state.country,
                gender:this.state.gender
            }
            const response = await fetch("http://localhost:5000/users",{
                method:"POST",
                body:JSON.stringify(user),
                headers:{
                    "Content-type":"application/json"
                }
            });
            if(response.ok){
                this.setState({
                    message:<span className="text-success">Registed Successfully!!!</span>
                })
            }
            else{
                this.setState({
                    message:<span className="text-danger">Something went wrong!!!</span>
                })
            }

        }
        else{
            this.setState({message: "Invalid Form"});
            console.log("InValid Form");
        }
    }
    isValid = () =>{
        let valid = true;
        for (const control in this.state.errors) {
           if(this.state.errors[control].length > 0){
               valid = false;
           }
        }
        return valid;
    }
    validate = () => {
        let errors = {};
        const regx = /\S+@\S+\.\S+/;
        const regxPass = /(?=.*[a-z])/;
        this.state.controls.forEach((control) => {
            errors[control] = [];
            switch (control) {
                case "email":
                    if(!this.state[control]){
                        errors[control].push("Please enter email");
                    }
                    if(this.state.email){
                        if(!regx.test(this.state[control])){
                            errors[control].push("Please enter valid email");
                        }
                    }
                    break;
                
                case "password":
                    if(!this.state[control]){
                        errors[control].push("Please enter password");
                    }
                    if(this.state.password){
                        if(!regxPass.test(this.state[control])){
                            errors[control].push("Please enter valid password with atleast one smallcase letter");
                        }
                    }
                    break;
                case "fullName":
                    if(!this.state[control]){
                        errors[control].push("Please enter full name");
                    }
                    break;
                case "dob":
                    if(!this.state[control]){
                        errors[control].push("Please enter date of birth");
                    }
                    break; 
                case "gender":
                    if(!this.state[control]){
                        errors[control].push("Please enter gender info");
                    }
                    break;
                case "country":
                    if(!this.state[control]){
                        errors[control].push("Please select country");
                    }
                    break;                  
                default:
                    break;
            }
        });
        this.setState({errors})
    }
    render() {
        return (
            <div className="row -flex justify-content-center">
                <h4 className="bg-light p-2 text-darka shadow"style={{textAlign:'center'}}>Register Yourself</h4>
                <form className="p-5 bg-light col-lg-6 shadow d-grid gap-2 p-5">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" autoFocus="autofocus" value={this.state.email} 
                        onChange={(event)=>{
                            let dirty = this.state.dirty;
                            dirty.email = true;
                            this.setState({email:event.target.value,dirty:dirty},this.validate)
                            }} 
                        onBlur={() => {
                            let dirty = this.state.dirty;
                            dirty.email = true;
                            this.setState({dirty:dirty},this.validate);
                        }}    
                            id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="text-danger">
                        {(this.state.errors.email[0] && this.state.dirty.email) ? this.state.errors.email : ""}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={(event)=>{
                            let dirty = this.state.dirty;
                            dirty.password = true;
                            this.setState({password:event.target.value,dirty:dirty},this.validate)
                            }} 
                            onBlur={() => {
                                let dirty = this.state.dirty;
                                dirty.password = true;
                                this.setState({dirty:dirty},this.validate);
                            }}    
                            id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" value={this.state.fullName} onChange={(event)=>{
                            let dirty = this.state.dirty;
                            dirty.fullName = true;
                            this.setState({fullName:event.target.value,dirty:dirty},this.validate)
                            }}
                            onBlur={() => {
                                let dirty = this.state.dirty;
                                dirty.fullName = true;
                                this.setState({dirty:dirty},this.validate);
                            }}    
                            />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">DOB</label>
                        <input type="date" className="form-control" value={this.state.dob} onChange={(event)=>{
                            let dirty = this.state.dirty;
                            dirty.dob = true;
                            this.setState({dob:event.target.value,dirty:dirty},this.validate)
                        }}
                        onBlur={() => {
                            let dirty = this.state.dirty;
                            dirty.dob = true;
                            this.setState({dirty:dirty},this.validate);
                        }} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="male" checked={this.state.gender === 'male' ? true: false} onChange={(event) => {
                            let dirty = this.state.dirty;
                            dirty.gender = true;
                            this.setState({gender:event.target.value,dirty:dirty},this.validate)
                        }}
                        onBlur={() => {
                            let dirty = this.state.dirty;
                            dirty.gender = true;
                            this.setState({dirty:dirty},this.validate);
                        }}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Male
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="female" checked={this.state.gender === 'female' ? true: false} onChange={(event) => {
                            let dirty = this.state.dirty;
                            dirty.gender = true;
                            this.setState({gender:event.target.value,dirty:dirty},this.validate)
                        }}
                        onBlur={() => {
                            let dirty = this.state.dirty;
                            dirty.gender = true;
                            this.setState({dirty:dirty},this.validate);
                        }}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Female
                        </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Country</label>
                        <select className="form-select" aria-label="Default" value={this.state.country} onChange={(event) => {
                            let dirty = this.state.dirty;
                            dirty.country = true;
                            this.setState({country:event.target.value,dirty:dirty},this.validate)
                        }}
                        onBlur={() => {
                            let dirty = this.state.dirty;
                            dirty.country = true;
                            this.setState({dirty:dirty});
                        }}
                        >
                            <option value="">Please select country</option>
                            <option value="India">India</option>
                            <option value="US">US</option>
                            <option value="France">France</option>
                            <option value="China">China</option>
                        </select>
                    </div>    
                    <div className="mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="true" checked={this.state.newsletter} id="flexCheckDefault" onChange={(event) => {
                                let dirty = this.state.dirty;
                                dirty.newsletter = true;
                                this.setState({newsletter:event.target.checked,dirty:dirty},this.validate)
                            }}
                            onBlur={() => {
                                let dirty = this.state.dirty;
                                dirty.newsletter = true;
                                this.setState({dirty:dirty});
                            }}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Receive NewsLetter
                            </label>
                        </div>
                    </div>    
                    <button type="button" onClick={() => {this.onFormSubmit();this.validate();}} className="btn btn-primary">Register</button>
                    <div>
                        <p className="text-primary">{this.state.message}</p>
                    </div>
                </form>
                <div>
                    <ul className="text-danger">
                        {
                            Object.keys(this.state.errors).map((control) => {
                                if(this.state.dirty[control]){
                                    return this.state.errors[control].map((err) =>{
                                        return(
                                            <li key={err}>{err}</li>
                                        )
                                    })
                                }
                                else{
                                    return "";
                                }
                            })
                        }
                    </ul>
                </div>
                <div>
                   { JSON.stringify(this.state)}
                </div>
            </div>
        )
    }
}
