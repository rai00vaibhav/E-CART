import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
export default class Product extends Component{
    state = {
        product: this.props.product
    }
    render(){
        console.log(this.state.product);
        return(
            <div className="col-md-6 mt-4">
                <div className="card border-success ms-1">
                    <div className="card-header border-success bg-success text-white">#{this.state.product.id}</div>
                    <div className="card-body text-success">
                        <h5 className="card-title">{this.state.product.productName}</h5>
                        <p className="card-text">$ {this.state.product.price}</p>
                    </div>
                    <div className="card-footer bg-transparent border-success" style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <div>
                                {this.state.product.quantity}
                            </div> &nbsp;&nbsp;
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-success" onClick={() => this.props.onProductIncrement(this.state.product)}>+</button>
                                <button type="button" className="btn btn-danger" onClick={() => this.props.onProductDecrement(this.state.product)}>-</button>
                            </div>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <NavLink className="link-primary" to={`product/${this.state.product.id}`}>Details</NavLink> &nbsp;&nbsp;
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}