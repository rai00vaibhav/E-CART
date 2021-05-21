import React,{Component} from 'react'
import NavBar from './NavBar';
// import MainContent from './MainContent';
import ShoppingCart from './ShoppingCart';
import Dashboard from './Dashboard';
import Login from './Login';
import NoMatch from './NoMatch';
import SideBar from './SideBar';
import ProductById from './ProductById';
import CustomerList from './CustomerList';
import InsertCustomer from './InsertCustomer';
import UpdateCustomerDetails from './UpdateCustomerDetails';
import Register from './Register';
import {HashRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import UserContext from './UserContext';
// import history from './history';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn:false
        }
    }
    updateLoggedInStatus = (status) => {
        this.setState({isLoggedIn:status})
    }

    render(){
        return(
            <UserContext.Provider value={{}}>
                <HashRouter>
                    <NavBar hasLogin={this.state.isLoggedIn} updateLoggedIn={this.updateLoggedInStatus}/>
                    <div className="container-fluid">
                        <div className="row">
                            {this.state.isLoggedIn ? (
                                <div className="col-lg-3">
                                    <SideBar/>
                                </div>
                            ):""}
                            <div className={this.state.isLoggedIn ? 'col-lg-9' : 'col-lg-12'}>
                                <Switch>
                                    <Route path="/" exact render={(props) => (<Login {...props} updateLoggedIn={this.updateLoggedInStatus}/>)}/>
                                    <Route path="/dashboard" exact component={Dashboard}/>
                                    <Route path="/shop" exact component={ShoppingCart}/>
                                    <Route path="/product/:id" exact component={ProductById}/>
                                    <Route path="/customer" exact component={CustomerList}/>
                                    <Route path="/new-customer" exact component={InsertCustomer}/>
                                    <Route path="/update-customer/:id" exact component={UpdateCustomerDetails}/>
                                    <Route path="/register" exact component={Register}/>
                                    <Route path="/login" exact render={(props) => (<Login {...props} updateLoggedIn={this.updateLoggedInStatus}/>)}/>
                                    <Route path="*" component={NoMatch}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </HashRouter>
            </UserContext.Provider>
        )
    }
}

