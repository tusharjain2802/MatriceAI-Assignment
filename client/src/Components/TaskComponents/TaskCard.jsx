import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';
import PropTypes from "prop-types";
import AddTaskModal from './AddTaskModal';

const TaskCard = ({ task, isAdmin, isTeamLeader, onRefresh }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success('Task deleted successfully');
      onRefresh();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="bg-[#10163a] p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-anton mb-2 text-[#6a5fdf]">{task.name}</h2>
      <p className="text-lg mb-2">Project: {task.project.name}</p>
      <p className="text-sm mb-4">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      <p className="text-sm mb-4">Assigned To: {task.assignedTo.map((member) => member.name).join(', ')}</p>

      {(isAdmin || isTeamLeader) && (
        <div className="flex justify-between mt-4">
          <button
            className="bg-[#6a5fdf] text-white py-1 px-3 rounded-lg hover:bg-[#10163a] transition duration-300"
            onClick={() => setShowEditModal(true)}
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
        <AddTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    project: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    assignedTo: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isTeamLeader: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default TaskCard;
