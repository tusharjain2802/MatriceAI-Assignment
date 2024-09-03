import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/redux/slices/authSlice';
import { toast } from 'react-hot-toast';

const Header = () => {
  const { user, isApproved } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="bg-[#10163a] text-[#ffffff] flex justify-between items-center p-4">
      <Link to="/">
        <div className="text-3xl font-anton text-white">
          ProManage
        </div>
      </Link>
      <nav className="flex space-x-8">
        {isApproved && (
          <>
            <Link to="/projects" className="font-poppins hover:text-[#6a5fdf]">Projects</Link>
            <Link to="/tasks" className="font-poppins hover:text-[#6a5fdf]">Tasks</Link>
            <Link to="/deadlines" className="font-poppins hover:text-[#6a5fdf]">Deadlines</Link>
          </>
        )}
      </nav>
      <div className="relative">
        {user ? (
          <>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-poppins text-[#ffffff] focus:outline-none"
            >
              {user}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-[#10163a] rounded-lg shadow-xl z-20">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-white hover:bg-[#6a5fdf] w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className='flex gap-6'>
          <Link
            to="/login"
            className="font-poppins text-[#6a5fdf] hover:text-[#ffffff] transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-poppins text-[#6a5fdf] hover:text-[#ffffff] transition duration-300"
          >
            Register
          </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
