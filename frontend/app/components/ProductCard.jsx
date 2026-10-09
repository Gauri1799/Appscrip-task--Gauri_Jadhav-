"use client"
import { useState } from "react"
import { FaHeart } from "react-icons/fa"
import "./productcard.css"

export default function ProductCard({ product }) {
        const[liked, setLiked] = useState(false);
    return (

        <div className="productCard">

            <div className="imgBox">
                <img src={product.image} alt={product.title} />
            </div>

            <div className="productInfo">

                <div className="titleRow">
                    <h4>{product.title}</h4>
                    <h4> Rs {product.price}</h4>
                    <FaHeart className={liked ? "heart active" : "heart"}
                    onClick={()=>setLiked(!liked)} 
                    />
                </div>

                <p className="signin">
                    {product.description}
                </p>

            </div>

        </div>

    )

}