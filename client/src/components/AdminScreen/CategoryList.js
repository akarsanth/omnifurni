import React, { useState, useEffect } from "react";
import axios from "axios";

///////////////////////////////
// Redux Related
import { updateSuccessMessage } from "../../app/features/message/message-slice";
import {
  categoryAdded,
  categoryDeleted,
  categoryEdited,
} from "../../app/features/category/categoryList-slice";
import { useDispatch, useSelector } from "react-redux";

//////////////////////////////////////
// TABLE
import MaterialTable from "@material-table/core";
import tableIcons from "../../tables/IconsProvider";

/////////////////////////////////////////
// MUI COMPONENTS
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

///////////////////////////////////////
import CategoryAddEditModal from "./CategotyAddEditModal";

//////////////////////////////////////
// MUI Components
import Alert from "@mui/material/Alert";

///////////////////////////////////////
// Table Columns
const columns = [
  {
    title: "Category ID",
    field: "category_id",
    filtering: false,
  },

  {
    title: "Category Name",
    field: "name",
    filtering: false,
  },

  {
    title: "Desciption",
    field: "description",
    filtering: false,
  },
];

////////////////////////////////////////////
// MAIN COMPONENT
const CategoryList = () => {
  const dispatchRedux = useDispatch();

  // Category List Global Reducer
  const { categories } = useSelector((state) => state.categoryList);
  // As Material Table is not working
  // as expected with Redux
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    setCategoryList(categories);
  }, [categories]);

  // Category Add / Edit Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Selected (Clicked) Row
  const [rowData, setRowData] = useState({});
  const [actionType, setActionType] = useState("");
  const handleCategoryEdit = (rowData) => {
    setRowData(rowData);
    setActionType("Edit");
    handleOpen();
  };

  const handleCategoryAdd = () => {
    setActionType("Add");
    setRowData({});
    handleOpen();
  };

  // Handle Delete
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.token);
  const [deleteState, setDeleteState] = useState({
    continueDeleting: false,
    deletingCategory: {},
  });

  // Dialog Modal
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (action) => {
    if (action === "yes") {
      setDeleteState((prev) => ({ ...prev, continueDeleting: true }));
    }
    setOpenDialog(false);
  };

  const handleDelete = async (category) => {
    setDeleteState({
      continueDeleting: false,
      deletingCategory: category,
    });

    handleOpenDialog();
  };

  useEffect(() => {
    const deleteCategory = async ({ category_id, imagePath }) => {
      try {
        setError("");

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.delete(
          `/api/v1/categories/${category_id}`,
          config
        );

        console.log(imagePath);
        // To delete image
        await axios.post("/api/v1/upload/delete", {
          imagePath,
        });

        // To display message
        dispatchRedux(updateSuccessMessage(data.message));
        // To remove the deleted category from state
        dispatchRedux(categoryDeleted(category_id));
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    };
    if (deleteState.deletingCategory !== {} && deleteState.continueDeleting) {
      deleteCategory(deleteState.deletingCategory);
    }
  }, [deleteState, dispatchRedux, token]);

  // Called from CategoryAddEditModal
  const editCateInState = (editedCategory) => {
    dispatchRedux(categoryEdited(editedCategory));
  };

  const addCateInState = (newCategory) => {
    dispatchRedux(categoryAdded(newCategory));
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleCategoryAdd}
        >
          Add Category
        </Button>
      </Box>

      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={categoryList}
        title="Category List"
        options={{
          filtering: true,
          pageSize: 10,
          tableLayout: "auto",
          headerStyle: {
            backgroundColor: "#087f5b",
            color: "#FFF",
          },
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Edit Category",
            onClick: (event, rowData) => handleCategoryEdit(rowData),
          },

          {
            icon: tableIcons.Delete,
            tooltip: "Delete Category",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
      />

      <Dialog
        open={openDialog}
        onClose={() => handleCloseDialog("no")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete category?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleCloseDialog("no")}>NO</Button>
          <Button onClick={() => handleCloseDialog("yes")} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {open && (
        <CategoryAddEditModal
          open={open}
          handleClose={handleClose}
          rowData={rowData}
          actionType={actionType}
          editCateInState={editCateInState}
          addCateInState={addCateInState}
        />
      )}
    </>
  );
};

export default CategoryList;
