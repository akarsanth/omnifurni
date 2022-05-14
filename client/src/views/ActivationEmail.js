import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import axios from "axios";

///////////////////////////////////////////
// Redux
import { useDispatch } from "react-redux";
// To display success message
import {
  updateSuccessMessage,
  updateErrorMessage,
} from "../app/features/message/message-slice";

///////////////////////////////////////////////
// MATERIAL UI
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";

/////////////////////////////////////////////
// Custom Component
import FormContainer, { FormLink } from "../components/FormsUI/FormContainer";

function ActivationEmail() {
  const dispatch = useDispatch();
  // token from url
  const { activationToken } = useParams();

  // state for error and success message
  // based on post request response
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.post("/api/v1/user/activation", {
            activationToken,
          });

          setIsLoading(false);
          setSuccess(data.message);
          dispatch(updateSuccessMessage(data.message));
        } catch (err) {
          setIsLoading(false);
          if (err.response.data.message) {
            dispatch(updateErrorMessage(err.response.data.message));
            setError(err.response.data.message);
          }
        }
      };
      activationEmail();
    }
  }, [activationToken, dispatch]);

  return (
    <FormContainer>
      <Typography sx={{ mb: 2 }} variant="h6">
        User Activation
      </Typography>
      <Fade
        in={isLoading}
        style={{
          transitionDelay: isLoading ? "0s" : "0ms",
        }}
        unmountOnExit
      >
        <CircularProgress sx={{ mt: 1 }} />
      </Fade>

      <Box sx={{ my: 2 }}>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body2">Go to Login?</Typography>
        <FormLink to="/login" component={RouterLink} underline="none">
          <Typography variant="body2">Login!</Typography>
        </FormLink>
      </Box>
    </FormContainer>
  );
}

export default ActivationEmail;
