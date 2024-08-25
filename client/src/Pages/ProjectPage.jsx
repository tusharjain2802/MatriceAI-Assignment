import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import ProjectCard from '../Components/ProjectComponents/ProjectCard';
import AddProjectModal from '../Components/ProjectComponents/AddProjectModal';

const ProjectPage = () => {
  const { user, role, isApproved } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

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
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  };

  return (
    <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins p-8">
      <h1 className="text-4xl font-anton mb-8 text-[#6a5fdf]">Projects</h1>

      {role === 'admin' && (
        <button
          onClick={() => setShowAddProjectModal(true)}
          className="bg-[#6a5fdf] text-white py-2 px-4 rounded-lg mb-8 hover:bg-[#10163a] transition duration-300"
        >
          Add Project
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length>0 ? projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            isAdmin={role === 'admin'}
            onRefresh={fetchProjects}
          />
        )) : <>
        No projects to show</>}
      </div>

      {showAddProjectModal && (
        <AddProjectModal
          onClose={() => setShowAddProjectModal(false)}
          onRefresh={fetchProjects}
        />
      )}
    </div>
  );
};

export default ProjectPage;
