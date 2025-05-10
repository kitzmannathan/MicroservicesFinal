import viteLogo from "../assets/react.svg";
import reactLogo from "../assets/react.svg";
import {useEffect, useState} from "react";
import {cartURL, productURL} from "../constants.js";
import {useNavigate} from "react-router";

function Home({loggedIn}) {
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
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
            const cartResponse = await fetch(`${cartURL}/getUserCart/1`)
            const cartJson = await cartResponse.json();
            const cartItems = cartJson.map(async (item) => {
                const productResponse = await fetch(`${productURL}/getProduct/${item.productID}`)
                const product = await productResponse.json()
                productItems.push(...product)
            })

            await Promise.all(cartItems);
            setCart([...productItems])
        }
        setCartOpen(!cartOpen)
    }

    const addToCart =  async (productID, customerID, quantity) => {
        const cartResponse = await fetch(`${cartURL}/addItemToCart`, {method: "POST", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({"productID": productID, "customerID": customerID, "quantity": quantity})})
        if(cartOpen) {
            const cartResponse = await fetch(`${cartURL}/getUserCart/1`)
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
                    <button onClick={() => {addToCart(item.productID, 1, 1)}}>add to cart</button>
                </div>
            )
        })
    }

    return(
        <>
            <div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <h1 style={{marginLeft: "45%"}}>welcome</h1>
                    <div style={{display:"flex", justifyContent:"center", marginLeft: "auto", paddingTop: "20px"}}>
                        <button style={{height: "40px", width: "70px"}} onClick={() => {getCart()}}> cart </button>
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
                            </div>)
                        }) : <h1>empty cart</h1>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;