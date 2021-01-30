import React from "react";
import { navigate } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

import ProductDiscription from "../CommonComponent/ProductDiscription";
import useItemData from "../useItemData";

const ProductDetails = (props) => {
  const itemsData = useSelector((state) => {
    return {
      state,
    };
  });
  console.log("itemsData", itemsData);
  const itemsData2 = useItemData();

  const { id } = props;
  //const itemsData = useItemData();

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
      {/* {itemsData?.state?.data && (
        <ProductDiscription props={props} selectedProduct={selectedProduct} />
      )} */}
      {itemsData?.state?.data === null && itemsData2?.state?.data ? (
        <ProductDiscription props={props} selectedProduct={selectedProduct} />
      ) : (
        itemsData?.state?.data && (
          <ProductDiscription props={props} selectedProduct={selectedProduct} />
        )
      )}
    </div>
  );
};

export default ProductDetails;
