import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function SignUpForm() {
  const [success, setSuccess] = useState(false);

  const validate = (values: { name: string; email: string; password: string }) => {
    const errors: Record<string, string> = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validate={validate}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          resetForm();
          setSubmitting(false);
        }, 3000);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form aria-labelledby="signup-form">
          {success && (
            <div
              role="alert"
              aria-live="polite"
              style={{ color: 'green', marginBottom: '16px' }}
            >
              Sign Up Successful!
            </div>
          )}

          <div>
            <label htmlFor="name">Name</label>
            <Field
              id="name"
              name="name"
              placeholder="Enter your name"
              aria-required="true"
            />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: 'red' }}
              role="alert"
            />
          </div>

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
              aria-describedby="password-strength"
            />
            <div id="password-strength">
              Password Strength:{' '}
              {values.password.length >= 8
                ? 'Strong'
                : values.password.length >= 4
                ? 'Medium'
                : 'Weak'}
            </div>
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: 'red' }}
              role="alert"
            />
          </div>

          <button type="submit" aria-label="Submit Sign Up Form" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
