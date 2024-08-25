import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';

const TaskDeadlinesPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(`/deadlines/tasks/${projectId}`);
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch task deadlines');
      navigate('/deadlines');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins p-8">
      <h1 className="text-4xl font-anton mb-8 text-[#6a5fdf]">Task Deadlines</h1>
      <input
        type="text"
        placeholder="Search for a task..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 mb-6 bg-[#10163a] border border-[#6a5fdf] rounded text-white"
      />
      <table className="w-full text-left">
        <thead>
          <tr className="text-[#6a5fdf]">
            <th className="py-2">Task Name</th>
            <th className="py-2">Deadline</th>
            <th className="py-2">Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id} className="hover:bg-[#10163a]">
              <td className="py-2">{task.name}</td>
              <td className="py-2">{new Date(task.deadline).toLocaleDateString()}</td>
              <td className="py-2">
                {task.assignedTo.map((member) => member.name).join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskDeadlinesPage;
