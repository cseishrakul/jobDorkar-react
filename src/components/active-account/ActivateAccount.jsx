import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(
        "https://job-dorkar.vercel.app/api/accounts/auth/users/activation/",
        { uid, token }
      )
      .then((res) => {
        setMessage("Account activate successfully!");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => setError(JSON.stringify()));
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-bage-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold">Account Activation</h2>
        {message && <p className="">{message}</p>}
        {error && <p className="">{error}</p>}
      </div>
    </div>
  );
};

export default ActivateAccount;
