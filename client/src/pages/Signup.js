import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import './Login.css'; 

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="sc-login">
      <div className="container my-1">
        <Link to="/login">← Go to Login</Link>
        <div className="login-content">
          <h2 className="login-title">Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-element">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                placeholder="First"
                name="firstName"
                type="text"
                id="firstName"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-element">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                placeholder="Last"
                name="lastName"
                type="text"
                id="lastName"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-element">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-element">
              <label htmlFor="pwd" className="form-label">
                Password:
              </label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="flex-row flex-end">
              <button type="submit" className="btn-login">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
