/////////////////////////////////////
// MUI IMPORTS
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";

/////////////////////////////////////
// Styled
import { styled } from "@mui/material/styles";

export const Separator = styled(Box)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.grey[300]}`,
  height: "100%",
  left: "50%",
  textAlign: "center",
}));

export const CustTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.grey[300],
}));

export const TableCellBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;
