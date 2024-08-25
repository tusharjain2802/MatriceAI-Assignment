import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AdminHomePage from './AdminHomePage';

const Home = () => {
  const { user, role, isApproved } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to access the dashboard');
      navigate('/login');
    }
  }, [user, navigate]);

  if (role === 'admin') {
    return <AdminHomePage />;
  }

  if (!isApproved) {
    return (
      <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins p-8 flex justify-center items-center">
        <h1 className="text-4xl font-anton text-[#6a5fdf]">
          Your request is pending. Please visit later.
        </h1>
      </div>
    );
  }


  return (
    <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins p-8">
      <h1 className="text-4xl font-anton mb-8 text-[#6a5fdf]">Welcome to Matrice AI</h1>
      <p className="text-lg">
        This is your project dashboard. You will be able to see the projects and tasks assigned to you and the deadlines over here.
      </p>
    </div>
  );
};

export default Home;
