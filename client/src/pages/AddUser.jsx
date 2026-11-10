import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'technician',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  // Submit form
 const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess('');
  setError('');
  setLoading(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("DATA:", data);

    if (!response.ok) {
      setError(data.message || "Failed to add user");
      return;
    }

    setSuccess("User added successfully!");
    setTimeout(() => {
    setSuccess('');
    }, 3000);
    setForm({
      name: '',
      email: '',
      role: 'technician',
      password: ''
    });

  } catch (err) {
    setError("Network error");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="p-8 flex justify-center items-center min-h-screen bg-slate-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-black mb-6 text-center">
          Add Staff
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
            <div className="bg-green-100 text-green-600 p-2 rounded mb-4 text-sm">
            {success}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="technician">Technician</option>
            <option value="service_center">Service Staff</option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add User"}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            className="w-full text-sm text-slate-500 hover:text-blue-600"
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddUser;