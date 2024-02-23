import fetch from "node-fetch";
import axios from "axios";

import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

// @desc    Called from onSuccess for server to server verification
// @route   GET /api/v1/khalti/verify/:token/:amount
// @access  Public
// const verifyKhalti = asyncHandler(async (req, res) => {
//   let data = {
//     token: req.params.token,
//     amount: req.params.amount,
//   };

//   let options = {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//     },
//   };

//   try {
//     const fetch_response = await fetch(
//       "https://khalti.com/api/v2/payment/verify/",
//       options
//     );

//     const text = await fetch_response.text();

//     console.log(text);

//     res.send(text);
//   } catch (error) {
//     console.log(error);
//   }
// });

const verifyKhalti = asyncHandler(async (req, res) => {
  let data = {
    token: req.params.token,
    amount: req.params.amount,
  };

  let config = {
    headers: {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    },
  };

  axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

export { verifyKhalti };
