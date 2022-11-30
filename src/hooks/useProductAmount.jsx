import axios from "axios";
import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
// import { ProductListApi } from "../apis/dataApi";

export const useProductAmount = (product) => {
  const [qwe, setQwe] = useState([]);
  const currentOrder = useSelector((state) => state.user.order);
  const currentBasket = useSelector((state) => state.user.basket);

  const ProductListApi = async () => {
    return currentBasket?.map(
      async (asd) =>
        await axios
          .get(`http://localhost:4000/productListData/${asd.product}`)
          .then((asd) => {
            const clone = cloneDeep(asd?.data);
            setQwe((prev) => [...prev, clone]);
            console.log({ ...clone, amount: clone?.amount - 1 });
          })
    );

    // return await axios.get(`http://localhost:4000/productListData/6`);
  };

  const ProductListApis = () => {
    axios
      .all(
        currentBasket.map((asd) =>
          axios.get(`http://localhost:4000/productListData/${asd.product}`)
        )
      )
      // .then(
      //   axios.spread((...allData) => {
      //     console.log(allData);
      //   })
      // );
      .then((a) =>
        a.map((asd) => {
          return asd.data;
        })
      );
  };

  // const ProductListApiss = () => {
  //   axios
  //     .all(
  //       currentBasket.map((asd) =>
  //         axios.put(`http://localhost:4000/productListData/${asd.product}`)
  //       )
  //     )
  //     .then((a) =>
  //       a.map((asd) => {
  //         console.log(asd.data);
  //         return asd.data;
  //       })
  //     );
  // };

  const ProductListApiss = async () => {
    return currentOrder?.map(
      async (asd) =>
        await axios
          .put(`http://localhost:4000/productListData/${asd.product}`)
          .then((asd) => {
            const clone = cloneDeep(asd?.data);
            console.log("싸발");
            console.log("2", { ...clone, amount: clone?.amount - 1 });
            // mutate({ ...clone, amount: clone?.amount - 1 });
          })
    );

    // return await axios.get(`http://localhost:4000/productListData/6`);
  };

  const { data } = useQuery("cart", ProductListApi, {
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation(ProductListApiss);

  useEffect(() => {
    console.log(...qwe);
    // const clone = cloneDeep(data?.data);
    // console.log({ ...clone, amount: clone?.amount - 1 });
  }, [data, qwe]);
};
