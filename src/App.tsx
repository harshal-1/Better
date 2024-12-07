import React from 'react';
import SignUpForm from './components/SignUpForm.tsx';
import LoginForm from './components/LoginForm.tsx';

function App() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />

      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}

export default App;
