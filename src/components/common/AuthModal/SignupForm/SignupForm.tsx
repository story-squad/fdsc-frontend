import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Checkbox, Input, Modal } from '../..';
import { Auth } from '../../../../api';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import squadUp from '../../../../assets/img/squad-up.png';
import SignupSuccess from './SignupSuccess';

// Regex to check if a string matches the shape of an email
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const SignupForm = (props: Modal.ModalComponentProps): React.ReactElement => {
  const {
    register,
    errors,
    watch,
    handleSubmit,
    clearErrors,
    setError,
  } = useForm({ mode: 'onChange' });
  const [showModal, setShowModal] = useState(false);

  const onSubmit: SubmitHandler<Auth.SignupFormState> = (data): void => {
    // Format form data for API call body
    const credentials = Auth.formatSignupBody(data);
    Auth.signup(credentials)
      .then(() => {
        clearErrors();
        setShowModal(true);
        props.closeModal();

        // send Convert Kit the email address
        axios.post('https://api.convertkit.com/v3/forms/1903505/subscribe', {
          api_key: process.env.REACT_APP_CONVERTKIT_URL,
          email: credentials.email,
        });
      })
      .catch((err: Auth.AxiosError) => {
        console.log({ err });
        let message: string;
        if (err.response?.data) {
          message = err.response.data.error;
        } else {
          message = 'An unknown error occurred. Please try again.';
        }
        setError('form', { type: 'manual', message });
      });
  };

  return (
    <>
      <div className="landing-form">
        <Modal.Component
          visible={showModal}
          setVisible={setShowModal}
          component={SignupSuccess}
          closable={false}
          centered={true}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="dragon-boi">
            <DragonBoi className="dragon" />
          </div>
          <img src={squadUp} alt="Squad Up!" />
          <p>
            A Story Squad account is free! Please fill out the information below
            to get started.
          </p>
          {errors.form && (
            <div className="server-error">{errors.form.message}</div>
          )}
          <div className="inputs ">
            <Input
              name="username"
              label="codename"
              errors={errors}
              register={register}
              rules={{ required: 'Codename is required!' }}
              placeholder="Enter your codename"
            />
            <Input
              name="email"
              label="Email"
              type="email"
              errors={errors}
              register={register}
              rules={{
                required: 'Email is required!',
                pattern: {
                  // ensures the entered email string matches a valid email address pattern
                  value: emailPattern,
                  message: 'Please enter a valid email address.',
                },
              }}
              placeholder="SuperWriter@storysquad.org"
            />
            <Input
              name="ageStr"
              label="Age"
              errors={errors}
              register={register}
              rules={{
                required: 'Age is required!',
                validate: (value) =>
                  !!parseInt(value) || 'Age must be a number!',
              }}
              placeholder="Enter your age"
            />
            {/* <ul className="text">
              <li>Password requirements:</li>
              <li>Between 8 and 32 characters</li>
              <li>Includes at least 1 Capital</li>
              <li>Includes at least 1 Number</li>
            </ul> */}
            <Input
              name="password"
              label="Password"
              type="password"
              showPassword
              errors={errors}
              register={register}
              rules={{
                required: 'Password is required!',
                validate: {
                  // checks entered password value contains required characters
                  includesCapital: (value) => {
                    const pattern = /[A-Z]/;
                    return (
                      pattern.test(value) ||
                      'Password must include at least 1 capital letter.'
                    );
                  },
                  includesNumber: (value) => {
                    const pattern = /[0-9]/;
                    return (
                      pattern.test(value) ||
                      'Password must include at least 1 number.'
                    );
                  },
                  // checks that entered password value is a minimum of 8 chars
                  checkLength: (value) => {
                    return (
                      (value.length >= 8 && value.length <= 32) ||
                      'Password must be between 8 and 32 characters.'
                    );
                  },
                },
              }}
              placeholder="Create a safe password"
            />
            <Input
              name="confirm"
              label="Confirm Password"
              type="password"
              showPassword
              errors={errors}
              register={register}
              rules={{
                required: 'Password confirmation is required!',
                validate: (value) => {
                  // checks that the values in password and confirm inputs match
                  return (
                    value === watch('password') || "Passwords don't match!"
                  );
                },
              }}
              placeholder="Re-enter your password"
            />

            {/* If the user is younger than 13, require a parent email */}
            {parseInt(watch('ageStr')) < 13 && (
              <Input
                name="parentEmail"
                label="Parent Email"
                errors={errors}
                register={register}
                rules={{
                  validate: {
                    // required field if the entered age is less than 13
                    required: (value) => {
                      if (parseInt(watch('ageStr')) < 13)
                        return value.length > 1 || 'Parent email is required!';
                      else return true;
                    },
                    // checks the email and parent email to make sure they are different
                    differentEmail: (value) => {
                      return (
                        value !== watch('email') ||
                        'Parent email must be different than email!'
                      );
                    },
                  },
                  pattern: {
                    // ensures the entered parent email string matches a valid email address pattern
                    value: emailPattern,
                    message: 'Please enter a valid email address.',
                  },
                }}
                placeholder="ParentSuperWriter@storysquad.org"
              />
            )}
          </div>

          <div className="text change-form">
            <Checkbox
              name="termsCheckbox"
              label={
                <>
                  I have read and agree to the{' '}
                  <Link to="/tos" className="text-button" target="_blank">
                    Terms & Conditions
                  </Link>
                  .
                </>
              }
              errors={errors}
              register={register}
              rules={{ required: 'You must agree to the terms!' }}
            />
          </div>

          <input
            type="submit"
            value="Create Account"
            onClick={() => clearErrors('form')}
          />

          <div className="text change-form">
            Already have an account? <Link to="/login">Click Here</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
