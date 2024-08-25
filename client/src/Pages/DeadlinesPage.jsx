import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const DeadlinesPage = () => {
  const { user, isApproved } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to access this page');
      navigate('/login');
    } else if (!isApproved) {
      toast.error('Your account is not approved');
      navigate('/');
    } else {
      fetchProjects();
    }
  }, [user, navigate]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/deadlines/projects');
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch deadlines');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (projectId) => {
    navigate(`/taskDeadlines/${projectId}`);
  };

  return (
    <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins p-8">
      <h1 className="text-4xl font-anton mb-8 text-[#6a5fdf]">Project Deadlines</h1>
      <input
        type="text"
        placeholder="Search for a project..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 mb-6 bg-[#10163a] border border-[#6a5fdf] rounded text-white"
      />
      <table className="w-full text-left">
        <thead>
          <tr className="text-[#6a5fdf]">
            <th className="py-2">Project Name</th>
            <th className="py-2">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr
              key={project._id}
              className="hover:bg-[#10163a] cursor-pointer"
              onClick={() => handleProjectClick(project._id)}
            >
              <td className="py-2">{project.name}</td>
              <td className="py-2">{new Date(project.deadline).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeadlinesPage;
