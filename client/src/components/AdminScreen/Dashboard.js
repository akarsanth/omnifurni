import React from "react";
import { useSelector } from "react-redux";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const { first_name, last_name } = useSelector(
    (state) => state.authUser.userInfo
  );

  return (
    <div>
      <Typography sx={{ pb: 2 }}>
        Hello{" "}
        <span style={{ fontWeight: 700 }}>{`${first_name} ${last_name}!`}</span>
      </Typography>

      <Typography variant="body2">
        From this admin page you can view products, categories, users, and
        orders.
      </Typography>
    </div>
  );
};

export default Dashboard;
