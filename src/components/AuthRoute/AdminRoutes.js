import React from "react";

const AdminRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin ? true : false;
  if (!isAdmin) return <h1>Your Are Not Admin</h1>;

  return <>{children}</>;
};

export default AdminRoutes;
