import React, { useState, useEffect, useReducer } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import axios from "axios";

////////////////////////////////////////
// Redux Related
import { useDispatch, useSelector } from "react-redux";
import { updateSuccessMessage } from "../../app/features/message/message-slice";

////////////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

// create review reducer
const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

const createReviewReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REVIEW_REQUEST":
      return { ...state, isLoading: true };

    case "CREATE_REVIEW_SUCCESS":
      return { ...state, isLoading: false, success: true };

    case "CREATE_REVIEW_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

// Rating Labels
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

////////////////////////////////////////
// MAIN COMPONENT
const ProductReviews = (props) => {
  const dispatchRedux = useDispatch();
  const { reviews, reviewUpdated } = props;

  // To access id from param
  const params = useParams();

  // For Review Form
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  // create review reducer
  const [state, dispatch] = useReducer(createReviewReducer, initialState);
  const { isLoading, error } = state;

  // For Rating
  const [hover, setHover] = React.useState(-1);

  // To Check if user is logged in
  const { userInfo } = useSelector((state) => state.authUser);

  // To check if the user has already submitted review
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // useEffect to evaluate reviews
  useEffect(() => {
    let result;
    if (userInfo) {
      result = reviews.some(
        (review) => review.user.user_id === userInfo.user_id
      );
    }

    // if submitted
    if (result) {
      setAlreadySubmitted(true);
    } else {
      setAlreadySubmitted(false);
    }
  }, [reviews, userInfo, setAlreadySubmitted]);

  const { token } = useSelector((state) => state.token);
  const reviewSubmitHandler = async (e) => {
    e.preventDefault();

    const review = { rating, comment };

    try {
      dispatch({ type: "CREATE_REVIEW_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`/api/v1/products/${params.id}/reviews`, review, config);

      dispatchRedux(updateSuccessMessage("Review added successfully!"));

      dispatch({ type: "CREATE_REVIEW_SUCCESS" });

      reviewUpdated();
    } catch (error) {
      dispatch({
        type: "CREATE_REVIEW_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const [userHasBought, setUserHasBought] = useState(null);
  useEffect(() => {
    const check = async () => {
      const { data } = await axios.get(`/api/v1/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(data);

      let result = false;
      data.forEach((order) => {
        if (order.status === "Delivered") {
          order.products.forEach((product) => {
            if (product.product_id === parseInt(params.id)) {
              result = true;
              return;
            }
          });
        }
      });

      console.log(result);

      setUserHasBought(result ? result : false);
    };

    if (token) {
      check();
    }
  }, [token, params.id]);

  return (
    <>
      <Box sx={{ backgroundColor: "grey.200", p: 2, mt: 1 }}>
        {reviews.length === 0 ? (
          <>
            <Typography variant="body2" sx={{ mb: 2 }}>
              No review found for this item.
            </Typography>
            <Typography variant="body2">Be the first to review.</Typography>
          </>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
            {reviews.map((review) => {
              return (
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  key={review.review_id}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar
                      sx={{ width: 40, height: 40, fontSize: 15 }}
                    >{`${review.user.first_name[0]}${review.user.last_name[0]}`}</Avatar>
                    <Box>
                      <Typography variant="body1">{`${review.user.first_name} ${review.user.last_name}`}</Typography>
                      <Rating
                        value={parseFloat(review.rating)}
                        size="small"
                        precision={0.5}
                        readOnly
                      ></Rating>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {review.comment}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {userInfo && userInfo.isAdmin === false ? (
        <>
          {userHasBought === null ? (
            <></>
          ) : userHasBought === false ? (
            <Alert severity="info" sx={{ mt: 3 }}>
              You have not bought this product!
            </Alert>
          ) : alreadySubmitted ? (
            <Alert severity="info" sx={{ mt: 3 }}>
              You have already submitted a review!
            </Alert>
          ) : (
            <Box sx={{ backgroundColor: "grey.200", p: 2, mt: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 2 }}>
                Write a review:
              </Typography>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Rating
                  value={rating}
                  precision={0.5}
                  size="large"
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />

                {rating !== null && (
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : rating]}
                  </Typography>
                )}
              </Box>

              <TextField
                placeholder="Write something...."
                multiline
                rows={4}
                sx={{ background: "#fff", mb: 2 }}
                fullWidth
                size="small"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />

              <LoadingButton
                color="primary"
                endIcon={<KeyboardArrowRightIcon />}
                disableElevation
                variant="contained"
                sx={{
                  alignSelf: "flex-start",
                  px: 6,
                  py: 1,
                }}
                size="small"
                onClick={reviewSubmitHandler}
                loading={isLoading}
              >
                Submit
              </LoadingButton>

              {error && (
                <Alert severity="error" sx={{ my: 2 }}>
                  {error}
                </Alert>
              )}
            </Box>
          )}
        </>
      ) : (
        <Alert severity="info" sx={{ mt: 3 }}>
          You need to
          <Link
            to="/login"
            component={RouterLink}
            underline="hover"
            sx={{ fontSize: 16, fontWeight: 600, color: "text.primary" }}
          >
            {" Login "}
          </Link>
          to write a review!
        </Alert>
      )}
    </>
  );
};

export default ProductReviews;
