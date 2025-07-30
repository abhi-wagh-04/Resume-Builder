import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";

function SignUp({ setCurrentPage }) {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
      setError("Please provide full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the passwoed!!");
      return;
    }

    setError("");
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="Abhi"
            type="text"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="abhi@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already an account?{" "}
            <button
              className="ont-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
