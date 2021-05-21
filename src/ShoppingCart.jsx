import React,{Component} from 'react';
import Product from './Product';
export default class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            products:[]
        }
        console.log("Contructor Method");
    }
    componentDidMount = async() => {
        const response = await (await fetch("http://localhost:5000/products")).json();
        this.setState({products:response});
        document.title = `Shopping Cart -- E-commerce`
    }
    handleProductIncrement = (product) => {
        let allProducts = [...this.state.products];
        let index = allProducts.indexOf(product);
        allProducts[index].quantity++;
        this.setState({product:allProducts});
    }
    handleProductDecrement = (product) => {
        let allProducts = [...this.state.products];
        let index = allProducts.indexOf(product);
        allProducts[index].quantity--;
        this.setState({product:allProducts});
    }
    render(){
        console.log("Render Method");
        return(
            <>
                <h4 className="bg-light p-2 text-darka shadow">Shopping Cart</h4>
                <div className="row">
                    {
                        this.state.products.map((product) =>{
                            return (
                            <Product key={product.id} product={product} onProductIncrement={this.handleProductIncrement} onProductDecrement={this.handleProductDecrement}>
                                <button type="button" className="btn btn-primary">Buy Now</button>
                            </Product>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}