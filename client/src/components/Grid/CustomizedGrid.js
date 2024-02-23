import Grid from "@mui/material/Grid";

//////////////////////////////////////
// Styled Components
import styled from "styled-components";

const CustomizedGrid = styled(Grid)`
  .MuiGrid-item {
    padding-top: 0;
  }

  justify-content: space-between;
`;

export default CustomizedGrid;
