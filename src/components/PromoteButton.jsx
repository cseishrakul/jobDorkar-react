import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PromoteButton = ({ jobId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromoteClick = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("access");

    try {
      const response = await axios.post(
        "https://job-dorkar.vercel.app/api/jobs/payment/initiate/",
        { JobId: jobId },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      window.location.href = response.data.payment_url;
    } catch (error) {
      setError("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePromoteClick}
        className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Processing..." : "Promote"}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
};

export default PromoteButton;
