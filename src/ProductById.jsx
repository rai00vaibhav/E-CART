import React, { Component } from 'react';

export default class ProductById extends Component {
    constructor(props){
        super(props);
        this.state = {
            product:{}
        }
    }
    componentDidMount = async() => {
        const paramId = this.props.match.params.id;
        const response = await (await fetch(`http://localhost:5000/products/${paramId}`)).json();
        if(response){
            this.setState({product:response})
        }
        document.title = `${this.state.product.productName} Detail--E-commerce`;
    }
    onBackClick = () => {
        this.props.history.replace('/shop')
    }
    render() {
        return (
            <div className="col-md-12 mt-1">
                <div className="card border-success ms-1">
                    <div className="card-header border-success bg-success text-white">#{this.state.product.id}</div>
                    <div className="card-body text-success">
                        <h5 className="card-title">{this.state.product.productName}</h5>
                        <p className="card-text">$ {this.state.product.price}</p>
                    </div>
                    <div className="card-footer bg-transparent border-success" style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
                        <button type="button" className="btn btn-success" onClick={this.onBackClick}>Back</button>
                    </div>
                </div>
            </div>
        )
    }
}
