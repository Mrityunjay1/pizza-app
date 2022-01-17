import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function SingleProduct() {
    const [product,setProduct]=useState([]);
    const params = useParams();
    const history =useHistory()
    useEffect(()=>{
        fetch(`https://ecom-rest-apis.herokuapp.com/api/products/${params._id}`)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data)
        })
    },[params._id])

    return (
        <div className="conatiner mx-auto mt-12">

            <button type="button" className="mb-12 font-bold" onClick={() =>{history.goBack()}}>Back</button>
            <div className="flex">
                <img src={product.image} alt="" />
                <div className="ml-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-sm">{product.size}</p>
                    <p className="text-sm">${product.price}</p>
                    <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
