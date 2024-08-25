import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';

const AddTaskModal = ({ task, onClose, onRefresh }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [project, setProject] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersAndProjects();
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setDeadline(task.deadline.split('T')[0]); // Format date for input
      setProject(task.project._id);
      setAssignedTo(task.assignedTo.map(member => member._id));
    }
  }, [task]);

  const fetchUsersAndProjects = async () => {
    try {
      const { data: usersData } = await api.get('/admin/users/allowed');
      setUsers(usersData);

      const { data: projectsData } = await api.get('/projects');
      setProjects(projectsData);
    } catch (error) {
      toast.error('Failed to fetch data');
    }
  };

  const handleAddOrEditTask = async () => {
    try {
      if (task) {
        // Update the task if task data is passed
        await api.put(`/tasks/${task._id}`, {
          name,
          description,
          deadline,
          project,
          assignedTo,
        });
        toast.success('Task updated successfully');
      } else {
        // Add a new task if no task data is passed
        await api.post('/tasks', {
          name,
          description,
          deadline,
          project,
          assignedTo,
        });
        toast.success('Task added successfully');
      }
      onRefresh();
      onClose();
    } catch (error) {
      toast.error(`Failed to ${task ? 'update' : 'add'} task`);
    }
  };

  const handleAddMember = (memberId) => {
    if (!assignedTo.includes(memberId)) {
      setAssignedTo([...assignedTo, memberId]);
    }
  };

  const filteredMembers = project
  ? projects.find((proj) => proj._id === project)?.teamMembers || []
  : [];


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#262c48] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-anton mb-6 text-[#6a5fdf]">
          {task ? 'Edit Task' : 'Add Task'}
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Task Name</label>
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
          <label className="block text-sm mb-1">Project</label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="w-full p-2 bg-[#10163a] border border-[#6a5fdf] rounded text-white"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Assigned To</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {assignedTo.map((memberId) => {
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
            {filteredMembers
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
            onClick={handleAddOrEditTask}
            className="bg-[#6a5fdf] text-white py-2 px-4 rounded-lg hover:bg-[#10163a] transition duration-300"
          >
            {task ? 'Edit Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

AddTaskModal.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    project: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
    assignedTo: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default AddTaskModal;
