import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function LoginForm() {
  const [emailStored, setEmailStored] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmailStored(storedEmail);
    }
  }, []);

  const validate = (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    const errors: Record<string, string> = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleRememberMe = (remember: boolean, email: string) => {
    if (remember) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  return (
    <Formik
      initialValues={{
        email: emailStored || '',
        password: '',
        rememberMe: !!emailStored,
      }}
      validate={validate}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        handleRememberMe(values.rememberMe, values.email);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          resetForm();
          setSubmitting(false);
        }, 3000);
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form aria-labelledby="login-form">
          {success && (
            <div
              role="alert"
              aria-live="polite"
              style={{ color: 'green', marginBottom: '16px' }}
            >
              Login Successful!
            </div>
          )}

          <div>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              aria-required="true"
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: 'red' }}
              role="alert"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              aria-required="true"
            />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: 'red' }}
              role="alert"
            />
          </div>

          <div className="checkDiv">
            <label htmlFor="rememberMe">Remember Me</label>
            <Field
              type="checkbox"
              name="rememberMe"
              style={{
                marginLeft: 10,
                width: '16px',
                height: '16px',
              }}
              aria-checked={values.rememberMe}
            />
          </div>

          <button
            type="submit"
            aria-label="Submit Login Form"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
