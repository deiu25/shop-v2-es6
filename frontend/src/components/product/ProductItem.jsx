import React from "react";
import { Link } from "react-router-dom";

import StarRatings from "react-star-ratings";
import AddToCartButton from "./AddToCartButton";

const ProductItem = ({ product, columnSize }) => {
  const name = product?.name?.length > 86 ? `${product?.name?.substring(0, 86)}...` : product?.name;

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
      <div className="card p-3 rounded">
        <Link to={`/product/${product?._id}`} className="mx-auto">
          <img
            className="card-img-top mx-auto"
            src={
              product?.images[0]
                ? product?.images[0]?.url
                : "/images/default_product.png"
            }
            alt={name}
          />
        </Link>
        <div className="card-body ps-3 d-flex justify-content-center flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product?._id}`}>{name}</Link>
          </h5>
          <div className="ratings mt-auto d-flex">
            <StarRatings
              rating={product?.ratings || 0}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="24px"
              starSpacing="1px"
            />
            <span id="no_of_reviews" className="pt-2 ps-2">
              {" "}
              ({product?.numOfReviews})
            </span>
          </div>
          <div className="price-and-cart-button">
            <p className="card-text mt-2">${product?.price}</p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;