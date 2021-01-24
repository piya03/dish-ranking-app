import React from "react";
import { navigate } from "@reach/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

import ProductDiscription from "../CommonComponent/ProductDiscription";
import useItemData from "../useItemData";

const ProductDetails = (props) => {
  const { id } = props;
  const itemsData = useItemData();

  function findProduct(passId) {
    return itemsData?.state?.data?.find((element) => {
      if (element.id == passId) {
        return element;
      }
    });
  }
  const selectedProduct = findProduct(id);
  return (
    <div>
      <h3
        className="text-lg ml-6 text-black cursor-pointer font-bold m-3"
        onClick={() => {
          navigate("/");
        }}
      >
        <FontAwesomeIcon icon={faBackward} style={{ fontSize: "22px" }} />
      </h3>
      {itemsData?.state?.data && (
        <ProductDiscription props={props} selectedProduct={selectedProduct} />
      )}
    </div>
  );
};

export default ProductDetails;
