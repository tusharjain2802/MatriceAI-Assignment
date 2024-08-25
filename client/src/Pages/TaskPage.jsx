import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import TaskCard from '../Components/TaskComponents/TaskCard';
import AddTaskModal from '../Components/TaskComponents/AddTaskModal';

const TaskPage = () => {
  const { user, isApproved, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to access this page');
      navigate('/login');
    } else if (!isApproved) {
      toast.error('Your account is not approved');
      navigate('/');
    } else {
      fetchTasks();
    }
  }, [user, navigate]);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  return (
    <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins p-8">
      <h1 className="text-4xl font-anton mb-8 text-[#6a5fdf]">Tasks</h1>

      {(role === 'admin' || role === 'project managerr') && (
        <button
          onClick={() => setShowAddTaskModal(true)}
          className="bg-[#6a5fdf] text-white py-2 px-4 rounded-lg mb-8 hover:bg-[#10163a] transition duration-300"
        >
          Add Task
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            isAdmin={role === 'admin'}
            isTeamLeader={role === 'project manager'}
            onRefresh={fetchTasks}
          />
        ))}
      </div>

      {showAddTaskModal && (
        <AddTaskModal
          onClose={() => setShowAddTaskModal(false)}
          onRefresh={fetchTasks}
        />
      )}
    </div>
  );
};

export default TaskPage;
