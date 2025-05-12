import {useEffect, useState} from "react";
import {cartURL, orderURL, productURL} from "../constants.js";
import {useNavigate} from "react-router";

function Home({loggedIn, userID, name, setLoggedIn}) {
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        const test = async () => {
            const allProductsResponse = await fetch(`${productURL}/getAllProducts`)
            const allProductsJson = await allProductsResponse.json();
            setProducts([...allProductsJson]);
        }

        test()
    }, [])

    useEffect(() => {
        if(!loggedIn) {
            navigate("/login");
        }
    }, [loggedIn, navigate]);

    const getCart = async () => {
        const productItems =[]
        if(!cartOpen) {
            let cartPrice =  0;
            const cartResponse = await fetch(`${cartURL}/getUserCart/${userID}`)
            const cartJson = await cartResponse.json();
            const cartItems = cartJson.map(async (item) => {
                const productResponse = await fetch(`${productURL}/getProduct/${item.productID}`)
                const product = await productResponse.json()
                productItems.push(...product)
            })

            await Promise.all(cartItems);
            for (const item of productItems) {
                cartPrice += item.price;
            }

            setTotalPrice(cartPrice.toFixed(2));
            setCart([...productItems])
        }
        setCartOpen(!cartOpen)
    }

    const addToCart =  async (productID, customerID, quantity) => {
        await fetch(`${cartURL}/addItemToCart`, {method: "POST", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({"productID": productID, "customerID": customerID, "quantity": quantity})})
        if(cartOpen) {
            const cartResponse = await fetch(`${cartURL}/getUserCart/${userID}`)
            const cartJson = await cartResponse.json();
            const cartItems = cartJson.map(async (item) => {
                const productResponse = await fetch(`${productURL}/getProduct/${item.productID}`)
                const product = await productResponse.json()
                productItems.push(...product)
            })
            await Promise.all(cartItems);
            setCart([...productItems])
        }
    }

    const getProducts = () => {
        return products.map((item, index) => {
            return(
                <div style={{paddingRight: "10vw"}}>
                    <h3>{item.name}</h3>
                    <h4>{item.description}</h4>
                    <p>${item.price}</p>
                    <button onClick={() => {addToCart(item.productID, userID, 1)}}>add to cart</button>
                </div>
            )
        })
    }

    const removeItemFromCart = (productID, userID) => {
        fetch(`${cartURL}/removeItemFromCart`, {method: "DELETE", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"productID": productID, "customerID": userID})})
    }

    const cartToOrder = async () => {
        const orderResponse = await fetch(`${orderURL}/createOrder`, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"customerID": userID, "orderPrice": parseFloat(totalPrice) })})
        const orderNumber = await orderResponse.text();

        const data = {
            orderID: orderNumber, items: [...cart]
        }

        await fetch(`${orderURL}/addItemsToOrder`, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    }

    return(
        <>
            <div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <h1 style={{marginLeft: "42%"}}>welcome, {name}</h1>
                    <div style={{display:"flex", justifyContent:"center", marginLeft: "auto", paddingTop: "20px"}}>
                        <button style={{height: "40px", width: "70px", marginRight: "15px"}} onClick={() => {getCart()}}> cart </button>
                        <button style={{height: "40px", width: "70px", marginRight: "15px"}} onClick={() => {navigate("/orders")}}> orders </button>
                        <button style={{height: "40px", width: "70px"}} onClick={() => {
                            setLoggedIn(false);
                            navigate("/login")
                        }}> logout </button>
                    </div>
                </div>
                <div style={{display:"flex", width:"100vw"}}>
                    <div style={{width: "10vw"}}>
                    </div>
                    <div style={{width: "80vw", display: "flex", flexDirection: "row"}}>
                        {getProducts()}
                    </div>
                    <div
                        hidden={!cartOpen}
                        style={{ width: "10vw", height: "80vh", position: "sticky", paddingTop: 0}}
                    >
                        {cart.length > 0 ? cart.map((item, index) => {
                            return (<div key={"cartItem"+ index}>
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <button onClick={() => {removeItemFromCart(item.productID, userID)}}>Remove </button>
                            </div>)
                        }) : <h1>empty cart</h1>}
                        {cart.length > 0 ?
                            <div>
                                <p>Total price: ${totalPrice}</p>
                                <button onClick={() => {cartToOrder()}}>order</button>
                            </div> : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;