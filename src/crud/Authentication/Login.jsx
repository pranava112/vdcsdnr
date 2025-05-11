import React, {  useEffect, useState } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Api from "../others/Api";
import "./styles.css"; // Ensure this file includes styles for the cracker animation

const Login = () => {
  const [login, setLogin] = useState({
    uname: "",
    mobile: "",
    email: "",
    password: "",
    token: uuidv4(),
  });

  const [showPortal, setShowPortal] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const { uname, mobile, email, password, token } = login;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.get(`/register`);
      const data = response.data; // Access data from the response

      const filteredValue = data.filter(
        (user) => user.email === email && user.password === password
      );

      if (filteredValue.length > 0) {
        localStorage.setItem("TOKEN", token);

        // Store user details in localStorage
        localStorage.setItem(
          "USER_DATA",
          JSON.stringify({ token, uname, mobile, email })
        );

        setWelcomeMessage(`Welcome, ${uname}!`);
        setShowPortal(true);

        // Close portal after 3 seconds
        setTimeout(() => {
          setShowPortal(false);
          navigate("/");
        }, 3000);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong. Please try again.");
    }
    finally{
      setLogin({
      uname: "",
      mobile: "",
      email: "",
      password: "",
     } )
    }
  };

  return (
    <>
      <section className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name" id="data"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="uname"
                onChange={handleChange}
                value={uname}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile" id="data"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                onChange={handleChange}
                value={mobile}
                placeholder="Enter your mobile number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email" id="data"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={email}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password" id="data"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={password}
                placeholder="Enter your password"
                minLength={6}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Portal for Welcome Message */}
      {showPortal &&
        ReactDOM.createPortal(
          <div className="portal">
            <div className="message">
              <h1>{welcomeMessage}</h1>
              <div className="crackers"></div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Login;
