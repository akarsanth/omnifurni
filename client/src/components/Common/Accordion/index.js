////////////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/////////////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

export const ExpandMoreIconCust = styled(ExpandMoreIcon)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  borderRadius: "50%",
}));

export const AccordionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));
