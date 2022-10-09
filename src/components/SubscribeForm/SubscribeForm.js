/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import styles from './SubscribeForm.module.scss';

const SubscribeForm = () => {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const FORM_URL = `https://app.convertkit.com/forms/1275610/subscriptions`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    try {
      const response = await fetch(FORM_URL, {
        method: 'post',
        body: data,
        headers: {
          accept: 'application/json',
        },
      });

      setEmail('');
      const json = await response.json();

      if (json.status === 'success') {
        setStatus('SUCCESS');
        return;
      }
    } catch (err) {
      setStatus('ERROR');
      console.log(err);
    }
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  return (
    <div className={styles.container}>
      {status === 'SUCCESS' && (
        <>
          <h2>
            Welcome aboard{name ? `, ${name}` : ''}{' '}
            <span role="img" aria-label="Ship">
              🚢
            </span>
          </h2>

          <h2> Please check your inbox to confirm the subscription!</h2>
        </>
      )}
      {status === 'ERROR' && (
        <>
          <h2>Oops, something went wrong...</h2>
    
          <h2>
            Please, <div className={styles.tryAgain} onClick={() => setStatus(null)}>try again.</div>
          </h2>
        </>
      )}
      {status === "" && (
        <>
          <div className={styles.intro}>
            <h2>Join the newsletter!</h2>
            <p>
              Subscribe to get latest content by email and to become a fellow pineapple{' '}
              <span role="img" aria-label="Pineapple">
                🍍
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              aria-label="Your first name"
              name="fields[first_name]"
              placeholder="Your first name"
              type="text"
              onChange={handleNameChange}
              value={name}
            />
            <input
              aria-label="Your email address"
              name="email_address"
              placeholder="Your email address"
              required
              type="email"
              onChange={handleEmailChange}
              value={email}
            />
            <button type='submit' className={styles.submit}>SUBSCRIBE</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SubscribeForm;
