import React from "react";
import AccountPage from "../pages/AccountPage/AccountPage";

const UserLayout = ({ children }) => {
  return (
    <>
      <AccountPage />
      {children}
    </>
  );
};

export default UserLayout;
