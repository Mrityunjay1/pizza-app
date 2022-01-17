import { Link } from "react-router-dom"
import {useContext, useState} from 'react'
import {CartContext} from '../CartContext'



function Product({product}) {
    const[isAdding,setAdding] =useState(false)
    const {cart,setCart}=useContext(CartContext)

    const addToCart = (event, product) => {
        event.preventDefault();
        let _cart = {...cart}; // { items: {}}
        if (!_cart.items) {
            _cart.items = {}
        }
        if (_cart.items[product._id]) {
            _cart.items[product._id] += 1;
        } else {
            _cart.items[product._id] = 1;
        }

        if(!_cart.totalItems) {
            _cart.totalItems = 0;
        }
        _cart.totalItems += 1;
        setCart(_cart);
        setAdding(true);
        setTimeout(() => {
            setAdding(false);
        },1000);

    }
    return (
        <div>
            <div>
                <Link to={`/products/${product._id}`}>
                    <img src={product.image} alt="peproni"  />
                </Link>
                    <div className="text-center">
                    <h2 className="text-xl font-bold py-2">{product.name}</h2>
                    <span className="bg-gray-200 rounded-full text-sm px-4">{product.size}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="">${product.price}</span>
                        <button disabled={isAdding} className={`${ isAdding ? 'bg-green-500': 'bg-yellow-500' } py-1 px-4 rounded-full font-bold`} onClick={(e)=>{addToCart(e,product)}}>ADD{isAdding ? 'ED' :''}</button>
                    </div>
                </div>
        </div>
    )
}

export default Product
