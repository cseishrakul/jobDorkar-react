import React, { useState } from 'react'
import User from './User'
import Shortcuts from './Shortcuts'
import DonutChart from './DonutChart'

const Profile = ({darkMode}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        const response = await fetch("https://job-dorkar.vercel.app/api/accounts/auth/users/me/", {
          headers: {
            "Authorization": `JWT ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading user...</p>;
  return (
    <div
      className={`px-2 py-4 mt-2 rounded-lg w-full lg:w-60 xl:w-80 flex flex-col justify-between gap-4 transition-all duration-300 ${
        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-900'
      }`}
    >
      <User darkMode={darkMode} user={user} />
      <Shortcuts darkMode={darkMode} />
      <DonutChart darkMode={darkMode} />
    </div>
  )
}

export default Profile