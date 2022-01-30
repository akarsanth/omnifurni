import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

////////////////////////////////////////
// MUI Components
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

/////////////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const ExpandMoreIconCust = styled(ExpandMoreIcon)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  borderRadius: "50%",
}));

const AccordionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

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

// product review
const initialState = {
  isLoading: false,
  product: { reviews: [], category: {} },
  error: null,
};

const productDetailsReducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { ...state, isLoading: true };

    case "PRODUCT_DETAILS_SUCCESS":
      return { ...state, isLoading: false, product: action.payload };

    case "PRODUCT_DETAILS_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

const ProductAccordion = (props) => {
  const { description, rating, comment, reviews } = props;

  // For Rating
  const [hover, setHover] = React.useState(-1);

  // To Check if user is logged in
  const { userInfo } = useSelector((state) => state.authUser);

  // To check if the user has already submitted review
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    let result;
    if (userInfo) {
      result = reviews.some(
        (review) => review.user.user_id == userInfo.user_id
      );
    }

    // if submitted
    if (result) {
      setAlreadySubmitted(true);
    } else {
      setAlreadySubmitted(false);
    }
  }, [reviews, userInfo, setAlreadySubmitted]);

  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIconCust />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderLeft: 4, borderColor: "primary.main" }}
        >
          <AccordionHeader>Product Description</AccordionHeader>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: 1, borderColor: "grey.100", py: 3 }}>
          <Typography variant="body2">{description}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIconCust />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ borderLeft: 4, borderColor: "primary.main" }}
        >
          <AccordionHeader>Reviews</AccordionHeader>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: 1, borderColor: "grey.100" }}>
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
                    >
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
                    value={props.rating}
                    precision={0.5}
                    size="large"
                    onChange={(event, newValue) => {
                      props.setRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />

                  {props.rating !== null && (
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
                  onChange={(event) => props.setComment(event.target.value)}
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProductAccordion;
