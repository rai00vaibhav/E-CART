export const OrderService = {
    getPreviousOrder: (ordersList) =>{
        return ordersList.filter((order) => order.isPaymentCompleted)
    },
    getCart: (ordersList) =>{
        return ordersList.filter((order) => !order.isPaymentCompleted)
    }
};

export const ProductApiService = {
    getOrderByUserId:(id) =>{
        const response = fetch(`http://localhost:5000/orders?userId=${id}`);
        return response;
    },
    getProductList:() => {
        const response = fetch(`http://localhost:5000/products`);
        return response;
    },
    orderPlace:(payload) => {
        const response = fetch(`http://localhost:5000/orders/${payload.id}`,
        {
            method:"PUT",
            body:JSON.stringify(payload),
            headers:{
                "Content-type":"application/json"
            }
        });
        return response;
    },
    removeCartItem:(payload) => {
        const response = fetch(`http://localhost:5000/orders/${payload.id}`,
        {
            method:"DELETE",
        });
        return response;
    }
}