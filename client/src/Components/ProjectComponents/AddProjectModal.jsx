import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';

const AddProjectModal = ({ project, onClose, onRefresh }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [teamLeader, setTeamLeader] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    if (project) {
      // If editing, prefill the form with the project's existing data
      setName(project.name);
      setDescription(project.description);
      setDeadline(project.deadline.split('T')[0]); // Format date for input
      setTeamLeader(project.teamLeader._id);
      setTeamMembers(project.teamMembers.map(member => member._id));
    }
  }, [project]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users/allowed');
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleAddOrEditProject = async () => {
    try {
      if (project) {
        await api.put(`/projects/${project._id}`, {
          name,
          description,
          deadline,
          teamLeader,
          teamMembers,
        });
        toast.success('Project updated successfully');
      } else {
        // Add a new project if no project data is passed
        await api.post('/projects', {
          name,
          description,
          deadline,
          teamLeader,
          teamMembers,
        });
        toast.success('Project added successfully');
      }
      onRefresh();
      onClose();
    } catch (error) {
      toast.error(`Failed to ${project ? 'update' : 'add'} project`);
    }
  };

  const handleAddMember = (memberId) => {
    if (!teamMembers.includes(memberId)) {
      setTeamMembers([...teamMembers, memberId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#262c48] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-anton mb-6 text-[#6a5fdf]">
          {project ? 'Edit Project' : 'Add Project'}
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-[#10163a] border border-[#6a5fdf] rounded text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-[#10163a] border border-[#6a5fdf] rounded text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 bg-[#10163a] border border-[#6a5fdf] rounded text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Team Leader</label>
          <select
            value={teamLeader}
            onChange={(e) => setTeamLeader(e.target.value)}
            className="w-full p-2 bg-[#10163a] border border-[#6a5fdf] rounded text-white"
          >
            <option value="">Select Team Leader</option>
            {users
              .filter((user) => user.designation === 'project manager')
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Team Members</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {teamMembers.map((memberId) => {
              const member = users.find((user) => user._id === memberId);
              return (
                <div key={memberId} className="bg-[#10163a] py-1 px-3 rounded text-white">
                  {member?.name}
                </div>
              );
            })}
          </div>
          <select
            onChange={(e) => handleAddMember(e.target.value)}
            className="w-full p-2 bg-[#10163a] border border-[#6a5fdf] rounded text-white"
          >
            <option value="">Select Team Member</option>
            {users
              .filter((user) => user.designation === 'team member')
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#10163a] text-white py-2 px-4 rounded-lg hover:bg-[#6a5fdf] transition duration-300 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddOrEditProject}
            className="bg-[#6a5fdf] text-white py-2 px-4 rounded-lg hover:bg-[#10163a] transition duration-300"
          >
            {project ? 'Edit Project' : 'Add Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

AddProjectModal.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    teamLeader: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
    teamMembers: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default AddProjectModal;
