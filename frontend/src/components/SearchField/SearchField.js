import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { withRouter, Redirect } from 'react-router-dom';

function SearchField({ placeholder, path }) {
  const [value, setValue] = useState('');
  const [shouldRedirect, setRedirect] = useState(false);

  function handleClick() {
    setRedirect(true);
  }

  useEffect(() => {
    setRedirect(false);
  }, [shouldRedirect]);

  // console.log('rendering SearchField, shouldRedirect: ' + `${shouldRedirect}`);

  return (
    <>
      {shouldRedirect && <Redirect to={`/${path}/${value}`} />}
      <Form>
        <Form.Row>
          <Col>
            <Form.Control
              type='text'
              placeholder={placeholder}
              onChange={e => setValue(e.target.value)}
            />
          </Col>
          <Col>
            <Button variant='outline-success' onClick={handleClick}>
              Искать
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  );
}

export default withRouter(SearchField);
