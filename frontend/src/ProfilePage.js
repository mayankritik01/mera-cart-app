import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './context/AuthContext';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [orders, setOrders] = useState([]);

  const { userInfo, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      // User ki profile details fetch karein
      const fetchUserProfile = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.get('/api/users/profile', config);
        //   console.log('Fetched Profile Data:', data); // <-- YEH LINE ADD KAREIN
          setName(data.name);
          setEmail(data.email);
        } catch (error) {
          setMessage('Could not fetch profile details.');
        }
      };

      // User ke orders fetch karein
      const fetchUserOrders = async () => {
        try {
            const config = {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            };
            const { data } = await axios.get('/api/orders/myorders', config);
            setOrders(data);
        } catch (error) {
            setMessage('Could not fetch orders.');
        }
      };

      fetchUserProfile();
      fetchUserOrders();
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.put('/api/users/profile', { name, email, password }, config);
        login(data); // Context aur localStorage ko nayi details se update karein
        setMessage('Profile Updated Successfully!');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        setMessage(error.response?.data?.message || 'Update failed.');
      }
    }
  };

  return (
    <div className="container">
      <div className="profile-grid">
        <div className="profile-form">
          <h2>User Profile</h2>
          {message && <p className={message.includes('Success') ? 'message success' : 'message error'}>{message}</p>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn-checkout">Update</button>
          </form>
        </div>
        <div className="profile-orders">
          <h2>My Orders</h2>
          {orders.length === 0 ? <p>You have no orders.</p> : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.substring(0, 10)}...</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>₹{order.totalPrice.toFixed(2)}</td>
                    <td>{order.isPaid ? 'Yes' : 'No'}</td>
                    <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;