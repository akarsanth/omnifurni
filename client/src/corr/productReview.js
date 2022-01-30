import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";

////////////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import axios from "axios";

// Component Import

// product review
// const initialStateReviews = {
//   isLoading: false,
//   reviews: [],
//   error: null,
// };
// const reviewsReducer = (state, action) => {
//   switch (action.type) {
//     case "REVIEWS_REQUEST":
//       return { ...state, isLoading: true };

//     case "REVIEWS_SUCCESS":
//       return { ...state, isLoading: false, reviews: action.payload };

//     case "REVIEWS_FAIL":
//       return { ...state, isLoading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

// create review reducer
const initialStateCreateReview = {
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
const ProductReviews = () => {
  // To access id from param
  const params = useParams();

  // For Review Form
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  // reviews reducers
  const [stateReviews, dispatchReviews] = useReducer(
    reviewsReducer,
    initialStateReviews
  );
  const {
    isLoading: isLoadingReviews,
    reviews,
    error: errorReviews,
  } = stateReviews;

  // create review reducer
  const [stateCreate, dispatchCreate] = useReducer(
    createReviewReducer,
    initialStateCreateReview
  );
  const { isLoading: isLoadingCreate, error: errorCreate } = stateCreate;

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

  // Callback
  const [callback, setCallback] = useState(false);
  // useEffect to fetch reviews
  useEffect(() => {
    const getReviews = async () => {
      try {
        dispatchReviews({ type: "REVIEWS_REQUEST" });
        const { data } = await axios.get(
          `/api/v1/products/${params.id}/reviews`
        );

        dispatchReviews({
          type: "REVIEWS_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatchReviews({
          type: "REVIEWS_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
    getReviews();
  }, [params.id, callback]);

  const { token } = useSelector((state) => state.token);

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();

    const review = { rating, comment };

    try {
      dispatchCreate({ type: "CREATE_REVIEW_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`/api/products/${params.id}/reviews`, review, config);

      dispatchCreate({ type: "CREATE_REVIEW_SUCCESS" });

      // to fetch review again
      setCallback(!callback);
    } catch (error) {
      dispatchCreate({
        type: "CREATE_REVIEW_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar
                      sx={{ width: 40, height: 40, fontSize: 15 }}
                    >{`${review.user.first_name[0]}${review.user.last_name[0]}`}</Avatar>
                    <Box>
                      <Typography variant="body1">{`${review.user.first_name} ${review.user.last_name}`}</Typography>
                      <Rating
                        value={review.rating}
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

      {userInfo ? (
        alreadySubmitted ? (
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

            <Button
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
            >
              Submit
            </Button>
          </Box>
        )
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
