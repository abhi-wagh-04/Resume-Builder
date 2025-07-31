import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

function CreateResumeForms() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  console.log(title);
  // Handle Create Resume
  const handleCreateResume = async (e) => {
    e.preventDefault();
    console.log(title);
    if (!title) {
      setError("Please resume title");
    }

    setError("");

    // Create Resume API Call
    try {
      const res = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });
      if (res.data?.newResume?._id) {
        navigate(`/resume/${res.data.newResume._id}`);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something Went wrong. Please try again");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[70vh] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create New Resume</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Give your resume a title to get started. You can edit all details later.
      </p>
      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Resume Title"
          placeholder="Eg: Mike's Resume"
          type="text"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          Create Resume
        </button>
      </form>
    </div>
  );
}

export default CreateResumeForms;
