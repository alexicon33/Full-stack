import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import { PORT } from '../../index';
import './register.css';

const welcomeDivStyle = { width: '100%', textAlign: 'center' };

class Register extends React.Component {
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
      if (result.length === 1) {
        alert(
          'Пользователь с таким именем уже зарегистрирован. Пожалуйста, выберите другое.'
        );
        return;
      }
    } else {
      alert('Ошибка HTTP: ' + response.status);
      return;
    }
    response = await fetch(`http://localhost:${PORT}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    });
    if (response.ok) {
      await response.json();
    } else {
      alert('Ошибка HTTP: ' + response.status);
      return;
    }
    this.props.login(this.state.login);
  }

  render() {
    const isValid = !this.validateData();
    if (this.props.isLoggedIn) {
      return <Redirect to='/' />;
    }
    return (
      <div className='div-centered'>
        <div style={welcomeDivStyle}>
          Добро пожаловать! Для регистрации достаточно придумать логин и пароль.
        </div>
        <Form onSubmit={this.handleSubmit} className='form-manual'>
          <Form.Group>
            <Form.Label>Логин</Form.Label>
            <Form.Control
              autoFocus
              type='text'
              value={this.state.login}
              placeholder='Придумайте логин...'
              onChange={e => this.setState({ login: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              placeholder='Придумайте пароль...'
              type='password'
            />
          </Form.Group>
          <Button variant='dark' block disabled={isValid} type='submit'>
            Зарегистрироваться
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
