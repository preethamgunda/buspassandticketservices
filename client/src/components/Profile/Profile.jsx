import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../pages/Footer";

const Profile = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return (
    <>
      <div style={{ marginTop: "100px", height: "300px" }}>
        <h3>User Profile</h3>
        <h1> Name:{user?.result?.name}</h1>
        <h1>Email:{user?.result?.email}</h1>
        <h1>User id:{user?.result?._id}</h1>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
