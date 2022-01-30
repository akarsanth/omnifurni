import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

///////////////////////////////////////////////
// MATERIAL UI
import Alert from "@mui/material/Alert";

function ActivationEmail() {
  // token from url
  const { activationToken } = useParams();

  // state for error and success message
  // based on post request response
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/api/v1/auth/activation", {
            activationToken,
          });
          setSuccess(res.data.message);
        } catch (err) {
          err.response.data.message && setError(err.response.data.message);
        }
      };
      activationEmail();
    }
  }, [activationToken]);

  return (
    <div className="active_page">
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
}

export default ActivationEmail;
