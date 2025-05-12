import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {orderURL, productURL} from "../constants.js";

function Orders({loggedIn, name, userID, setLoggedIn}) {
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [orderProductInfo, setOrderProductInfo] = useState([]);
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();


    useEffect(() => {
        const getOrdersAndItems = async () => {
            setLoading(true);

            const orderResponse = await fetch(`${orderURL}/getUserOrders/${userID}`)
            const orders = await orderResponse.json();

            setOrders([...orders]);

            const tempOrderItems = []
            const tempItemInfo = []

            for (const order of orders) {
                const orderItemsResponse = await fetch(`${orderURL}/getOrderItems/${order.orderID}`)
                const items = await orderItemsResponse.json();

                tempOrderItems.push(items);
            }

            setOrderItems([...tempOrderItems]);

            for (const items of tempOrderItems) {
                let orderInfo = []
                for (const item of items) {
                    const productsResponse = await fetch(`${productURL}/getProduct/${item.productID}`)
                    const productJson = await productsResponse.json();

                    orderInfo.push({name: productJson[0].name, price: productJson[0].price});
                }
                tempItemInfo.push(orderInfo);
            }

            setOrderProductInfo([...tempItemInfo]);

            setLoading(false)
        }

        if(!loggedIn) {
            navigate("/login");
        } else {
            getOrdersAndItems();
        }
    }, [loggedIn, navigate]);

    return (
        <>
            <div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <h1 style={{marginLeft: "42%"}}>welcome, {name}</h1>
                    <div style={{display:"flex", justifyContent:"center", marginLeft: "auto", paddingTop: "20px"}}>
                        <button style={{height: "40px", width: "70px", marginRight: "15px"}} onClick={() => {navigate("/home")}}> home </button>
                        <button style={{height: "40px", width: "70px"}} onClick={() => {
                            setLoggedIn(false);
                            navigate("/login")
                        }}> logout </button>
                    </div>
                </div>
                <div>
                    {!loading ? (orders.length > 0 && orderItems.length > 0 && orderProductInfo.length > 0 ? orders.map((order, index) => (
                        <>
                            <div key={index} style={{display: "block", justifyContent:"center"}}>
                                <p style={{width: "100vw", textAlign: "center"}}>order #{index+1} Ordered on {order.orderDate}</p>
                                <div>
                                    {orderItems[index].map((item, index2) => {
                                        return (
                                            <div style={{paddingRight: "20px"}}>
                                                <p style={{width: "100vw", textAlign: "center"}}>{orderProductInfo[index][index2].name} ${orderProductInfo[index][index2].price} qt. {item.quantity}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <p style={{width: "100vw", textAlign: "center"}}>total price ${order.orderPrice}</p>
                                {order.shipDate ? <p style={{width: "100vw", textAlign: "center"}}>shipped on {order.shipDate}</p> : <p style={{width: "100vw", textAlign: "center"}}>order not yet shipped</p>}
                            </div>
                            <br/>
                        </>
                    )) : <h1 style={{width: "100vw", textAlign: "center"}}>No order history</h1>) : <h1 style={{width: "100vw", textAlign: "center"}}>Loading...</h1>}
                </div>
            </div>
        </>
    )
}

export default Orders;