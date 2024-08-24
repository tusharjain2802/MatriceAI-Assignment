import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingUsers } from '../utils/redux/slices/adminSlice';
import api from '../utils/api';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pendingUsers, isLoading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  const approveUser = async (userId) => {
    try {
      await api.put(`/admin/users/approve/${userId}`);
      dispatch(fetchPendingUsers()); // Refresh the list after approval
    } catch (err) {
      console.error('Error approving user:', err);
    }
  };

  const removeUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      dispatch(fetchPendingUsers()); // Refresh the list after removal
    } catch (err) {
      console.error('Error removing user:', err);
    }
  };

  return (
    <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins p-8">
      <h1 className="text-4xl font-anton mb-8 text-[#6a5fdf]">Admin Dashboard</h1>
      <section>
        <h2 className="text-2xl font-anton mb-4">Pending User Approvals</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {pendingUsers.length > 0 ? (
          <ul>
            {pendingUsers.map((user) => (
              <li key={user._id} className="mb-4">
                <p>{user.name} ({user.email}) - {user.designation}</p>
                <button onClick={() => approveUser(user._id)} className="mr-2 p-2 bg-[#6a5fdf] text-white rounded">Approve</button>
                <button onClick={() => removeUser(user._id)} className="p-2 bg-red-500 text-white rounded">Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending users</p>
        )}
      </section>
      {/* Add more sections for projects and tasks */}
    </div>
  );
};

export default AdminDashboard;
