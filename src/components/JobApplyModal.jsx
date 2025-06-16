import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const JobApplyModal = ({ job, onClose }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!resume) {
      Swal.fire({
        icon: "warning",
        title: "Resume Required",
        text: "Please upload your resume.",
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("job", job.id);
    formData.append("resume", resume);
    formData.append("cover_letter", coverLetter);

    try {
      const token = localStorage.getItem("access");
      const response = await axios.post(
        "https://job-dorkar.vercel.app/api/jobs/applications/",
        formData,
        {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Application submitted successfully!",
      });

      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to apply. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Apply for {job.title}</h2>

        <label className="block mb-2">Upload Resume (PDF, DOC):</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="mb-4"
        />

        <label className="block mb-2">Cover Letter:</label>
        <textarea
          rows={5}
          className="w-full p-2 border rounded mb-4"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplyModal;
