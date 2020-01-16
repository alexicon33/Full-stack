import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import { PORT } from '../../index';

const welcomeDivStyle = { width: '100%', textAlign: 'center' };

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateData() {
    return this.state.login.length > 0 && this.state.password.length > 0;
  }

  async handleSubmit(event) {
    event.preventDefault();
    let response = await fetch(
      `http://localhost:${PORT}/users?login=${this.state.login}`
    );
    if (response.ok) {
      let result = await response.json();
      if (result.length === 1 && result[0].password === this.state.password) {
        this.props.login(this.state.login);
      } else {
        alert('Увы, пользователь с такими данными в системе не найден.');
      }
    } else {
      alert('Ошибка HTTP: ' + response.status);
    }
    // послать запрос к бэку
  }

  render() {
    const isValid = !this.validateData();
    if (this.props.isLoggedIn) {
      return <Redirect to='/' />;
    }
    return (
      <div className='div-centered'>
        <div style={welcomeDivStyle}>Добро пожаловать!</div>
        <Form onSubmit={this.handleSubmit} className='form-manual'>
          <Form.Group>
            <Form.Label>Логин</Form.Label>
            <Form.Control
              autoFocus
              type='text'
              value={this.state.login}
              placeholder='Введите ваш логин...'
              onChange={e => this.setState({ login: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              placeholder='Введите ваш пароль...'
              type='password'
            />
          </Form.Group>
          <Button variant='dark' block disabled={isValid} type='submit'>
            Войти
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
