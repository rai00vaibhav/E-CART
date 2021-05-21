import React from 'react';

const Order = (props) => {
    console.log("Order renderd>>>>>", props);
    return (
        <div>
            <div className="card mb-3 shadow">
                <div className="card-header text-white bg-success">
                    #{props.orderId} &nbsp;&nbsp;
                    {
                        !props.isPaymentCompleted ? (
                            <>
                            <button type="button" className="btn btn-light btn-sm" onClick={() => {props.onClickBuyNow(props.orderId,props.productId, props.quantity, props.productName)}}>Buy</button> &nbsp;
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => {props.onClickDelete(props.orderId,props.productId, props.quantity, props.productName)}}>Del</button>
                            </>
                        ):""
                    }

                </div>
                    <div className="card-body">
                        <h5 className="card-title">{props.productName}</h5>
                        <p className="card-text d-flex justify-content-between align-items-center">
                            <span>
                                Quantity: {props.quantity}
                            </span>
                            <span>
                                Price: {props.price}
                            </span>
                        </p>
                    </div>
            </div>
        </div>
    )
}
//React memo works by passing separate value to the props;
export default React.memo(Order);