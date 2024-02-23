import React, { useState } from "react";

///////////////////////////////////////
// Redux
import { useSelector } from "react-redux";

///////////////////////////////////////
import AddressAddEditModal from "./AddressAddEditModal";

//////////////////////////////////////
// MUI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const AddressTitle = styled("span")({
  fontWeight: 700,
});

//////////////////////////////////////
// MAIN COMPONENT
const Address = () => {
  const { default_address: address } = useSelector(
    (state) => state.authUser.userInfo
  );

  // Address Add / Edit Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Selected (Clicked) Row
  const [actionType, setActionType] = useState("");

  const handleEdit = (data) => {
    setActionType("Edit");
    handleOpen();
  };

  const handleAdd = () => {
    setActionType("Add");
    handleOpen();
  };

  return (
    <>
      <Box>
        <Typography variant="body2">
          The following address will be used on the checkout page by default.
        </Typography>
        <Box sx={{ my: 3 }}>
          {address ? (
            <Box
              sx={{
                border: 2,
                borderColor: "#eee",
                display: "inline-block",
                p: 3,
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography>
                  <AddressTitle>City: </AddressTitle>
                  {address.city}
                </Typography>
                <Typography>
                  <AddressTitle>Postal Code: </AddressTitle>
                  {address.postal_code}
                </Typography>
                <Typography>
                  <AddressTitle>Street Address: </AddressTitle>
                  {address.street}
                </Typography>
                <Typography>
                  <AddressTitle>Province: </AddressTitle>
                  {address.province}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit Address
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                No default address found !
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={handleAdd}
              >
                Add Address
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {open && (
        <AddressAddEditModal
          open={open}
          handleClose={handleClose}
          address={address}
          actionType={actionType}
        />
      )}
    </>
  );
};

export default Address;
