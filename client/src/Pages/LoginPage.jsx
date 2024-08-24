import { useState } from 'react';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to log in. Please try again.');
    }
  };

  return (
    <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins">
      <main className="flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-anton mb-8 text-[#6a5fdf]">Login</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-[#ffffff]">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 bg-[#10163a] border border-[#6a5fdf] rounded text-[#ffffff]"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-[#ffffff]">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-[#10163a] border border-[#6a5fdf] rounded text-[#ffffff]"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-[#6a5fdf] rounded text-[#ffffff] hover:bg-[#10163a] transition duration-300"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
