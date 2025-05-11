import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AsideBar from "../others/AsideBar";
import Api from "../others/Api"; // Make sure Api is an axios instance

const Register = () => {
  const [register, setRegister] = useState({
    uname: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { email, password, uname, mobile } = register;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = {};

    if (!uname) {
      validate.uname = "This field is mandatory";
    }

    if (!email) {
      validate.email = "This field is mandatory";
    }

    if (!password) {
      validate.password = "This field is mandatory";
    } else if (password.length < 6) {
      validate.password = "Password should have at least 6 characters";
    }

    if (!mobile) {
      validate.mobile = "This field is mandatory";
    } else if (mobile.length !== 10) {
      validate.mobile = "Mobile should have exactly 10 digits";
    }

    if (Object.keys(validate).length > 0) {
      setErrors(validate);
      return;
    }

    try {
      // Convert mobile to number for backend
      const registerData = {
        ...register,
        mobile: Number(mobile),  // Convert mobile to a number
      };

      const response = await Api.post("/register", registerData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Registered successfully", response.data);
      navigate("/login");  // Navigate after successful registration
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
    } finally {
      setRegister({
        uname: "",
        mobile: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <AsideBar />
      <section className="p-6 max-w-4xl mx-auto space-y-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 ml-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            <u>Registration Form</u>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="uname"
                value={uname}
                onChange={handleChange}
                placeholder="Enter your Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.uname && (
                <span className="text-sm text-red-500 mt-1">{errors.uname}</span>
              )}
            </div>

            {/* Mobile Field */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={handleChange}
                placeholder="Enter your mobile"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.mobile && (
                <span className="text-sm text-red-500 mt-1">{errors.mobile}</span>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <span className="text-sm text-red-500 mt-1">{errors.email}</span>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                minLength={6}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <span className="text-sm text-red-500 mt-1">{errors.password}</span>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
