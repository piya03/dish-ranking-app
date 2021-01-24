import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductDiscription = (props) => {
  const {
    name,
    description,
    image,
    price,
    categories,
    randomRatingNum,
  } = props?.selectedProduct;

  return (
    <div className="detailsContainer">
      <div className="product-img-container">
        <img src={image} alt="" className="w-full" />
      </div>
      <div className="text-black">
        <div className="text-sm text-black font-semibold">
          {name ? name : ""}
        </div>
        <div>{price}</div>
        <div>
          {randomRatingNum}
          <FontAwesomeIcon icon={faStar} className="info-icon" />
        </div>
        <div className="categoriesContainer">
          {categories?.map((each) => {
            return (
              <div key={each?.id} className="categories">
                {each?.name}
              </div>
            );
          })}
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default ProductDiscription;
