import { useContext, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { getErrorMessage } from "../util/errorUtils.js";
import { AppContext } from "../context/AppContext.jsx";
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import Button from "../components/ui/Button.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

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
        const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
          email,
          password,
        });
        const { accessToken, user } = response.data;
        if (accessToken) {
          localStorage.setItem("token", accessToken);
          setUser(user);
          navigate("/dashboard");
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, setUser, navigate]
  );

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Please enter your details to sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="name@example.com"
          type="email"
          autoComplete="email"
          required
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="••••••••"
          type="password"
          autoComplete="current-password"
          required
        />

        <ErrorAlert message={error} />

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Logging in..."
          variant="primary"
        >
          LOGIN
        </Button>

        <p className="text-sm text-gray-600 text-center pt-4">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-purple-600 hover:text-purple-700 underline underline-offset-2 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
