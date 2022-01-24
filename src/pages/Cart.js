import {useContext, useEffect, useState} from 'react'
import {CartContext} from '../CartContext'



function Cart() {
    let total = 0;
    const [priceFetched,togglePriceFetched] = useState(false)
    const [products,setProducts] = useState([])
    const {cart,setCart} = useContext(CartContext);

    useEffect(() => {
        if(!cart.items){
            return;
        }
        if(priceFetched){
            return;
        }
        fetch('https://ecom-rest-apis.herokuapp.com/api/products/cart-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ids: Object.keys(cart.items)})
    })
    .then(res => res.json())
    .then(products =>{
        setProducts(products)
        togglePriceFetched(true);
    })
    },[cart,priceFetched]);

    const getQty =(id) =>{
        return cart.items[id]
    }
    const increaseQty =(id) =>{
        const oldQty = cart.items[id];
        const _cart ={...cart};
        _cart.items[id] = oldQty + 1;
        _cart.totalItems += 1;
        setCart(_cart)
    }
    const decreaseQty =(id) =>{
        const oldQty = cart.items[id];
        if(oldQty === 1){
            return;
        }
        const _cart ={...cart};
        _cart.items[id] = oldQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart)
    }
    const getTotal=(id,p)=>{
        const sum = p* getQty(id);
        total += sum;
        return sum;
    }
    const handleDelete =(id)=>{
        const _cart ={...cart};
       const qty = _cart.items[id];
       delete _cart.items[id];
         _cart.totalItems -= qty;
         setCart(_cart);
         setProducts(products.filter(product=>product._id !== id))
    }
    const handleCheckout =()=>{
        window.alert('Thank you for shopping with us!')
        setProducts([]);
        setCart({});    
    }
    return (
        products.length ?
        <div className="container mx-auto lg:w-1/2 w-full pb-24">
            <h1 className="my-12 font-bold text-2xl">Cart Items</h1>
            <ul>
            {products.map(product => {
                return (
                    <li key={product.id} className="mb-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img className="h-16" src={product.image} alt="" />
                            <span className="font-bold ml-4 w-48">{product.name}</span>
                        </div>
                        <div>
                            <button className="bg-yellow-500 px-4 py-2 rounded-full leadinng-none" onClick={()=>{decreaseQty(product._id)}}>-</button>
                            <b className='px-4'>{getQty(product._id)}</b>
                            <button className="bg-yellow-500 px-4 py-2 rounded-full leadinng-none" onClick={()=>{increaseQty(product._id)}}>+</button>
                        </div>
                        <span>$ {getTotal(product._id,product.price)}</span>
                        <button className="bg-red-500 px-4 py-2 rounded-full leadinng-none text-white" onClick={()=>{handleDelete(product._id)}}>Delete</button>
                    </div>
                </li>
                )
            })}
                
            </ul>
            <hr className="my-6" />
            <div className="text-right ">
                <b>total</b>$ {total}
            </div>
            <div className="text-right mt-6">
                <button className="bg-green-500 px-4 py-2 rounded-full leadinng-none text-white" onClick={()=>{handleCheckout()}}>Order Now</button>
            </div>
        </div>
        : 
        <img src='/images/empty-cart.png' alt='empty-cart' className='w-full h-full' />
    )
}

export default Cart
