import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import './home.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function Home({ username }) {
  return (
    <div>
      <Alert variant='success' className='text-center'>
        <Alert.Heading>{`Добро пожаловать в личный кабинет, ${username}!`}</Alert.Heading>
      </Alert>
      <div style={{ margin: 'auto', width: '25%' }}>
        <h5>Основные возможности сайта:</h5>
        <ListGroup>
          <LinkContainer to='/add_prediction'>
            <Nav.Link>Добавление прогноза</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/predictions'>
            <Nav.Link>Просмотр списка результатов</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/stats'>
            <Nav.Link>Просмотр личной статистики</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/settings'>
            <Nav.Link>Настройки</Nav.Link>
          </LinkContainer>
        </ListGroup>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  username: state.username
});

export default withRouter(connect(mapStateToProps)(Home));
