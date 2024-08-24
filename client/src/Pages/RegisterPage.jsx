import { useState } from 'react';
import { register } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    designation: 'team member',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins">
      <main className="flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-anton mb-8 text-[#6a5fdf]">Register</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-[#ffffff]">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-[#10163a] border border-[#6a5fdf] rounded text-[#ffffff]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-[#ffffff]">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-[#10163a] border border-[#6a5fdf] rounded text-[#ffffff]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-[#ffffff]">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-[#10163a] border border-[#6a5fdf] rounded text-[#ffffff]"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="designation" className="block text-sm text-[#ffffff]">Designation</label>
            <select
              name="designation"
              id="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-[#10163a] border border-[#6a5fdf] rounded text-[#ffffff]"
              required
            >
              <option value="admin">Admin</option>
              <option value="project manager">Project Manager</option>
              <option value="team member">Team Member</option>
            </select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-[#6a5fdf] rounded text-[#ffffff] hover:bg-[#10163a] transition duration-300"
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
};

export default RegisterPage;
