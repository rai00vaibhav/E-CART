import React,{useEffect,useState, useCallback} from 'react';
import Order from './Order'
import {OrderService, ProductApiService} from './Service';

const Dashboard = () => {
    const [orders,setOrders] = useState([]);

    const loadDataFromDatabase = useCallback(async() => {
        const response = await ProductApiService.getOrderByUserId(1);
        if(response.ok){
            const responseOrders = await response.json();

            // Get all the products
            const responseProduct = await ( await ProductApiService.getProductList()).json();
            responseOrders.forEach(order => {
                order.product = responseProduct.find((prod) => prod.id === order.id) 
            });
            setOrders(responseOrders);
        }
    },[])
    useEffect(() => {
        document.title = `Dashboard -- E-commerce`;
        loadDataFromDatabase();
       
    }, [loadDataFromDatabase]);
    const onClickBuyNow = useCallback(
        async(orderId,productId,quantity) => {
            const payload = {
                "id":orderId,
                "userId":1,
                "productId":productId,
                "quantity":quantity,
                "isPaymentCompleted":true
            }
            const responseProduct = await ProductApiService.orderPlace(payload);
            if(responseProduct.ok){
                loadDataFromDatabase()
            }
    
            console.log(responseProduct);
        },[loadDataFromDatabase]
    )
    const onClickDelete = useCallback( 
        async(orderId,productId,quantity) => {
            const payload = {
                "id":orderId,
                "userId":1,
                "productId":productId,
                "quantity":quantity,
                "isPaymentCompleted":false
            }
            const responseProduct = await ProductApiService.removeCartItem(payload);
            if(responseProduct.ok){
                loadDataFromDatabase()
            }

            console.log(responseProduct);
        },[loadDataFromDatabase]
    )
    return (
        <div>
            <h4 className="bg-light p-2 text-darka shadow">Dashboard  &nbsp;&nbsp;
            <button type="button" onClick={loadDataFromDatabase} className="btn btn-light">Refresh</button>
            </h4>
            <div className="row">
                <div className="col-lg-6">
                    <h6>Previous Order ({OrderService.getPreviousOrder(orders).length})</h6>
                    <hr/>
                    {
                        OrderService.getPreviousOrder(orders).length === 0 ?
                        (
                            <div>
                                <p className="text-light bg-dark p-1">No Previous Orders</p>
                            </div>
                        ) : ""
                    }
                    <div>
                    {
                        OrderService.getPreviousOrder(orders).map((order) => {
                            return <Order key={order.id} orderId={order.id} isPaymentCompleted={order.isPaymentCompleted} productId={order.productId} quantity={order.quantity} productName={order.product.productName} price={order.product.price} onClickBuyNow={onClickBuyNow} onClickDelete={onClickDelete}/>
                        })
                    }
                    </div>
                </div>
                <div className="col-lg-6">
                    <h6>Cart Order ({OrderService.getCart(orders).length})</h6>
                    <hr/>
                    <div>
                    {
                        OrderService.getCart(orders).map((order) => {
                            return <Order key={order.id} orderId={order.id} isPaymentCompleted={order.isPaymentCompleted} productId={order.productId} quantity={order.quantity} productName={order.product.productName} price={order.product.price} onClickBuyNow={onClickBuyNow} onClickDelete={onClickDelete}/>
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;
