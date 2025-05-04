import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileDetails from "./ProfileDetails";
import UpdateProfile from "./UpdataProfile";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        const accessToken = localStorage.getItem("access");

        if (!storedUserData || !storedUserData.id || !accessToken) {
          setError("User ID or Access Token not found");
          setLoading(false);
          return;
        }

        const userId = storedUserData.id;

        const response = await axios.get(
          `https://job-dorkar.vercel.app/api/accounts/user/${userId}/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );

        setUserData(response.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {" "}
      <ProfileDetails userData={userData} />
      <UpdateProfile />
    </>
  );
};

export default Profile;
