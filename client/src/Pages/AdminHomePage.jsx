import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../utils/api';
import { fetchPendingUsers, fetchAllowedUsers } from '../utils/redux/slices/adminSlice';

const AdminHomePage = () => {
  const [showAllowedUsers, setShowAllowedUsers] = useState(false);
  const dispatch = useDispatch();
  const { pendingUsers, allowedUsers, isLoading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (showAllowedUsers) {
      dispatch(fetchAllowedUsers());
    } else {
      dispatch(fetchPendingUsers());
    }
  }, [dispatch, showAllowedUsers]);

  const approveUser = async (userId) => {
    try {
      await api.put(`/admin/users/approve/${userId}`);
      dispatch(fetchPendingUsers());
    } catch (err) {
      console.error('Error approving user:', err);
    }
  };

  const denyUser = async (userId) => {
    try {
      await api.put(`/admin/users/deny/${userId}`);
      dispatch(fetchAllowedUsers());
    } catch (err) {
      console.error('Error denying user:', err);
    }
  };

  return (
    <div className="bg-[#262c48] min-h-screen text-[#ffffff] font-poppins p-8">
      <h1 className="text-4xl font-anton mb-8 text-[#6a5fdf]">Admin Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-anton">
          {showAllowedUsers ? 'Allowed Users' : 'Pending User Approvals'}
        </h2>
        <button
          onClick={() => setShowAllowedUsers(!showAllowedUsers)}
          className="bg-[#6a5fdf] text-white py-2 px-4 rounded-lg hover:bg-[#10163a] transition duration-300"
        >
          {showAllowedUsers ? 'Show Pending Users' : 'Show Allowed Users'}
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!isLoading && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#10163a] rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-[#ffffff] font-semibold uppercase">Name</th>
                <th className="py-3 px-6 text-left text-[#ffffff] font-semibold uppercase">Email</th>
                <th className="py-3 px-6 text-left text-[#ffffff] font-semibold uppercase">Designation</th>
                <th className="py-3 px-6 text-left text-[#ffffff] font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(showAllowedUsers ? allowedUsers : pendingUsers).map((user) => (
                <tr key={user._id} className="border-b border-[#6a5fdf]">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.designation}</td>
                  <td className="py-3 px-6">
                    {showAllowedUsers ? (
                      <button
                        onClick={() => denyUser(user._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                      >
                        Deny Access
                      </button>
                    ) : (
                      <button
                        onClick={() => approveUser(user._id)}
                        className="bg-[#6a5fdf] text-white py-1 px-3 rounded-lg hover:bg-[#10163a] transition duration-300"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;
