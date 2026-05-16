import { useState } from "react";

import api from "../services/api.js";

function Register() {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/blog/auth/register",
        formData
      );

      console.log(response.data);

      alert("User Registered ✅");

    } catch (error) {

      console.log(error);

      alert("Registration Failed ❌");

    }

  };

  return (

    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96 shadow p-6 rounded"
      >

        <h1 className="text-3xl font-bold text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded"
        >
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;