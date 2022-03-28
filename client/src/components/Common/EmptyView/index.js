import React from "react";

//////////////////////////////////////////
// MUI Components
import Box from "@mui/material/Box";

///////////////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const EmptyViewWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;

  & img {
    max-width: 200px;
    width: 100%;
  }
`;

const EmptyView = () => (
  <EmptyViewWrapper>
    <img src="/images/gif/empty.gif" alt="" />
    <Typography>No product found!</Typography>
  </EmptyViewWrapper>
);

export default EmptyView;
