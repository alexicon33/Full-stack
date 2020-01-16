import React from 'react';
import Button from 'react-bootstrap/Button';
import { getColor, prettify, checkUser } from './helperFunctions';
import { connect } from 'react-redux';
import { PORT } from '../../index';

function Prediction({ element, index, username, refresh }) {
  async function handleClose() {
    let response = await fetch(
      `http://localhost:${PORT}/predictions/${element.id}`,
      {
        method: 'DELETE'
      }
    );
    if (response.ok) {
      await response.json();
    } else {
      alert('Ошибка HTTP: ' + response.status);
      return;
    }
    refresh();
  }

  return (
    <tr className={getColor(element.result)}>
      <td>{index + 1}</td>
      <td>{element.match}</td>
      <td>{prettify(element.date)}</td>
      <td>{element.prediction}</td>
      <td>{`${element.bet}%`}</td>
      <td>{element.coef}</td>
      <td>{element.login}</td>
      <td>
        {checkUser(element.login, username) && (
          <Button aria-label='Close' onClick={handleClose} variant='danger'>
            &times;
          </Button>
        )}
      </td>
    </tr>
  );
}

const mapStateToProps = state => ({ username: state.username });

export default connect(mapStateToProps)(Prediction);
