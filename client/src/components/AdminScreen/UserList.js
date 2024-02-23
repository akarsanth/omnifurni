import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

///////////////////////////////////////
// TABLE
import MaterialTable from "@material-table/core";
import tableIcons from "../../tables/IconsProvider";

/////////////////////////////////////////
// ICONS
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

////////////////////////////////////////
// MUI COMPONENTS
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

/////////////////////////////////////////
// Component Import
import UserEditModal from "./UserEditModal";

const initialState = {
  isLoading: false,
  userList: [],
  error: null,
};

const userListReducer = (state, action) => {
  switch (action.type) {
    case "USER_LIST_REQUEST":
      return { ...state, isLoading: true };

    case "USER_LIST_SUCCESS":
      return { ...state, isLoading: false, userList: action.payload };

    case "USER_LIST_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    case "USER_LIST_UPDATE":
      return { ...state, isLoading: false, userList: action.payload };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
};

///////////////////////////////////////
// Table Columns
const columns = [
  {
    title: "User ID",
    field: "user_id",
    filtering: false,
  },

  {
    title: "First Name",
    field: "first_name",
    filtering: false,
  },

  {
    title: "Last Name",
    field: "last_name",
    filtering: false,
  },

  {
    title: "Email",
    field: "email",
    filtering: false,
  },

  {
    title: "Contact Number",
    field: "contact_number",
    filtering: false,
  },

  {
    title: "Is Admin?",

    field: "role",
    lookup: {
      0: "Not Admin",
      1: "Admin",
    },
    render: (rowData) => {
      return rowData.role === 0 ? <CloseIcon /> : <CheckIcon />;
    },
  },
];

////////////////////////////////////////////////
// MAIN COMPONENT
const UserList = () => {
  // reducers
  const [state, dispatch] = useReducer(userListReducer, initialState);
  const { isLoading, userList, error } = state;

  // Save Changes Button Handler
  const { token } = useSelector((state) => state.token);
  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "RESET_STATE" });

        dispatch({ type: "USER_LIST_REQUEST" });

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get("/api/v1/user/allUsersInfo", config);

        dispatch({ type: "USER_LIST_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "USER_LIST_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }

    fetchData();
  }, [token]);

  // User Edit Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Selected (Clicked) Row
  const [rowData, setRowData] = useState({});
  // Edit Action Button Handler
  const handleUserEdit = (rowData) => {
    setRowData(rowData);
    handleOpen();
  };

  // Called from UserEditModal after
  // Successful Edit
  const editUserInState = (editedUser) => {
    const users = userList.map((user) =>
      user.user_id !== editedUser.user_id ? user : editedUser
    );

    dispatch({ type: "USER_LIST_UPDATE", payload: users });
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={userList}
        title="User List"
        options={{
          filtering: true,
          tableLayout: "auto",
          headerStyle: {
            backgroundColor: "#087f5b",
            color: "#FFF",
          },
        }}
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Edit User",
            onClick: (event, rowData) => handleUserEdit(rowData),
          },
        ]}
      />

      {open && (
        <UserEditModal
          open={open}
          handleClose={handleClose}
          rowData={rowData}
          editUserInState={editUserInState}
        />
      )}
    </>
  );
};

export default UserList;

// https://blog.logrocket.com/material-table-react-tutorial-with-examples/
