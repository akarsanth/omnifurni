import axios from "axios";

import { replaceCart } from "./cart-slice";

export const fetchCartData = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/v1/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // data
    // {card_id: 3, user_id: 29, products: []}

    // console.log(data);

    try {
      dispatch(replaceCart(data));
    } catch (error) {}
  };
};
