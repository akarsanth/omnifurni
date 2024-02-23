import bcrypt from "bcryptjs";

const users = [
  {
    first_name: "Admin",
    last_name: "User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    contact_number: "9806769514",
    role: 1,
  },

  {
    first_name: "Luka",
    last_name: "Modric",
    email: "luka@example.com",
    contact_number: "9806769514",
    password: bcrypt.hashSync("123456", 10),
  },

  {
    first_name: "Toni",
    last_name: "Kroos",
    email: "toni@example.com",
    contact_number: "9806769514",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
