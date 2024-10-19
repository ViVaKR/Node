import { useState } from 'react';
import PropTypes from 'prop-types';

export function Login({ onSubmit }) {
  const [username, setUsername] = useState('');

  return (
    <>
      <h1>Login</h1>
      <p>What shoudl people call you?</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username);
        }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
