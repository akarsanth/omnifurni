import MaterialTable from "@material-table/core";
import tableIcons from "./IconsProvider.js";
import Delete from "@mui/icons-material/Delete";

const data = [
  { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
  { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
  { name: "Mehme", surname: "Baran", birthYear: 1987, birthCity: 63 },
];

const columns = [
  {
    title: "Adı",
    field: "name",
    render: (rowData) => {
      return rowData.name === "Mehmet" && <Delete />;
    },
  },
  { title: "Soyadı", field: "surname" },
  { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
  {
    title: "Doğum Yeri",
    field: "birthCity",
    lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
  },
];

const BasicTable = () => {
  return (
    <MaterialTable
      icons={tableIcons}
      columns={columns}
      data={data}
      title="Demo Title"
      actions={[{ icon: tableIcons.Delete, tooltip: "Delete User" }]}
    />
  );
};

export default BasicTable;
