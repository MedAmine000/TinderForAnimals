import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/features/authslice';
import { useNavigate } from "react-router-dom"; // 🚀 Import de useNavigate


const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (token) {
      navigate("/home"); // Redirection vers /home
    }
  }, [token, navigate]);
  

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Connexion...' : 'Se connecter'}</button>
      </form>
    </div>
  );
};

export default Login;
