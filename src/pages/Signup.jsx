import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { getErrorMessage } from "../util/errorUtils.js";
import toast from "react-hot-toast";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import Button from "../components/ui/Button.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      if (!fullName.trim()) {
        setError("Please enter your full name");
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      if (!password.trim()) {
        setError("Please enter your password");
        setIsLoading(false);
        return;
      }

      setError(null);

      try {
        let profileImageUrl = "";
        if (profilePhoto) {
          profileImageUrl = (await uploadProfileImage(profilePhoto)) || "";
        }

        const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
          fullName,
          email,
          password,
          profileImageUrl,
        });

        if (response.status === 201) {
          toast.success("Profile created successfully.");
          navigate("/login");
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    },
    [fullName, email, password, profilePhoto, navigate]
  );

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Start tracking your spending by joining us"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="flex justify-center mb-6">
          <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
            autoComplete="name"
            required
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="name@example.com"
            type="email"
            autoComplete="email"
            required
          />

          <div className="md:col-span-2">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <ErrorAlert message={error} />

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Signing up..."
          variant="primary"
        >
          SIGN UP
        </Button>

        <p className="text-sm text-gray-600 text-center pt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:text-purple-700 underline underline-offset-2 transition-colors"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
