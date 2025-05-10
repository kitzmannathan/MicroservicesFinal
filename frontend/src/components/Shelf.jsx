import {useEffect} from "react";

function Shelf({cartOpen, cartProductItems}) {

    useEffect(() => {
        console.log(cartProductItems);
    })

    return (
        <div
            hidden={!cartOpen}
            style={{ width: "250px", height: "80vh", position: "sticky", paddingTop: 0, marginLeft: "auto" }}
        >
            <h1>hello</h1>
            {cartProductItems.map((item, index) => {
                return (<div key={"cartItem" + index}>
                    <p>{item.name}</p>
                </div>)
            })
            }
        </div>
    )
}
export default Shelf;