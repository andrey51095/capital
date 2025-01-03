import React, {useState} from 'react';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {REGISTER_USER} from '../../gql';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      setUsername('');
      setPassword('');
      navigate('/login');
    },
    onError: err => setError(err.message),
  });

  const handleRegister = () => {
    if (username.length < 3 || username.length > 20) {
      setError('Username must be between 3 and 20 characters.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    registerUser({
      variables: {
        input: {
          username,
          password,
        },
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
      }}
    >
      <h2>Register</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <Input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        clearable
      />
      <Input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        clearable
      />
      <Button onClick={handleRegister}>Register</Button>
      <Button
        onClick={() => {
          navigate('/login');
        }}
      >
        Or Log In
      </Button>
    </div>
  );
};

export default RegisterForm;
