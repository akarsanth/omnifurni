import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "80%",
    md: "55%",
    lg: "45%",
  },
  bgcolor: "background.paper",
  border: "2px solid #999",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  maxHeight: "100vh",
};

const ModalWrapper = (props) => {
  const { open, handleClose, children } = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export default ModalWrapper;
