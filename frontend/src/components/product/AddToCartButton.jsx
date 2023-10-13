import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "react-hot-toast";
import { setCartItem } from '../../redux/features/cartSlice';
import { FaCartPlus } from 'react-icons/fa';

const AddToCartButton = ({ product }) => {
    const dispatch = useDispatch();

    const setItemToCart = () => {
        const cartItem = {
            product: product?._id,
            name: product?.name,
            price: product?.price,
            image: product?.images[0]?.url,
            stock: product?.stock,
            quantity: 1, // set quantity to 1 as default quantity
        };

        dispatch(setCartItem(cartItem));
        toast.success("Item added to Cart");
    };

    return (
        <button
            type="button"
            id="cart_btn"
            className="cart_btn btn btn-primary"
            disabled={product.stock <= 0}
            onClick={setItemToCart}
        >
            <FaCartPlus />
        </button>
    );
}

export default AddToCartButton;