import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';
import PropTypes from "prop-types";
import AddProjectModal from './AddProjectModal'; 

const ProjectCard = ({ project, isAdmin, onRefresh }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${project._id}`);
      toast.success('Project deleted successfully');
      onRefresh();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="bg-[#10163a] p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-anton mb-2 text-[#6a5fdf]">{project.name}</h2>
      <p className="text-lg mb-2">{project.description}</p>
      <p className="text-sm mb-4">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
      <p className="text-sm mb-4">Team Leader: {project.teamLeader.name}</p>
      <p className="text-sm mb-4">Team Members: {project.teamMembers.map((member) => member.name).join(', ')}</p>

      {isAdmin && (
        <div className="flex justify-between mt-4">
          <button
            className="bg-[#6a5fdf] text-white py-1 px-3 rounded-lg hover:bg-[#10163a] transition duration-300"
            onClick={() => setShowEditModal(true)} // Open the modal with project data
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      {showEditModal && (
        <AddProjectModal
          project={project} // Pass the project data to the modal
          onClose={() => setShowEditModal(false)}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    teamLeader: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    teamMembers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default ProjectCard;
