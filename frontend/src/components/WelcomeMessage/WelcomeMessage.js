import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function() {
  return (
    <Alert variant='success' className='text-center'>
      <Alert.Heading>
        Добро пожаловать! Войдите на сайт или зарегистрируйтесь.
      </Alert.Heading>
    </Alert>
  );
}
