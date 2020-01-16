import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerLocale } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import 'react-datepicker/dist/react-datepicker.css';
import { getElements, setBetValue } from './helperFunctions';
import { PORT } from '../../index';

import ru from 'date-fns/locale/ru';
import { Redirect } from 'react-router-dom';
registerLocale('ru', ru);

class AddPrediction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: '',
      date: new Date(),
      prediction: '',
      bet: '',
      coef: '',
      result: 'Плюс',
      showModal: false,
      shouldRedirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  validateData() {
    return (
      this.state.match.length > 0 &&
      this.state.prediction.length > 0 &&
      Number(this.state.bet) > 0 &&
      Number(this.state.coef) > 1
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ showModal: true });
  }

  async handleModalSubmit(event) {
    event.preventDefault();
    let response = await fetch(`http://localhost:${PORT}/predictions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...this.state,
        bet: Number(
          setBetValue(
            this.state.bet,
            this.props.settings.betView,
            this.props.settings.bank
          )
        ),
        coef: Number(this.state.coef),
        login: this.props.username
      })
    });
    if (response.ok) {
      await response.json();
      this.setState({ showModal: false, shouldRedirect: true });
    } else {
      alert('Ошибка HTTP: ' + response.status);
      return;
    }
  }

  handleModalClose(event) {
    if (event !== undefined) event.preventDefault();
    this.setState({ showModal: false });
  }

  render() {
    const isValid = this.validateData();
    const design = this.props.settings.navbarDesign;
    const betView = this.props.settings.betView;
    const bank = this.props.settings.bank;
    if (this.state.shouldRedirect) return <Redirect to={`/predictions`} />;
    return (
      <>
        <div className='div-wrapper div-centered'>
          <Form onSubmit={this.handleSubmit} className='w-50'>
            <Form.Group>
              <Form.Label>Событие</Form.Label>
              <Form.Control
                autoFocus
                type='text'
                value={this.state.match}
                placeholder='Введите событие'
                onChange={e => this.setState({ match: e.target.value })}
              />
            </Form.Group>
            <Form.Group style={{ display: 'flex', flexDirection: 'column' }}>
              <Form.Label>Дата и время</Form.Label>
              <DatePicker
                className='form-control'
                locale='ru'
                selected={this.state.date}
                onChange={date => this.setState({ date })}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='Время'
                dateFormat='HH:mm dd.MM.yyyy'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Прогноз</Form.Label>
              <Form.Control
                value={this.state.prediction}
                onChange={e => this.setState({ prediction: e.target.value })}
                placeholder='Введите ваш прогноз'
                type='text'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Размер ставки {betView === '%' ? '(в % от банка)' : '(в $)'}
              </Form.Label>
              <Form.Control
                value={this.state.bet}
                onChange={e => this.setState({ bet: e.target.value })}
                placeholder='Введите размер ставки'
                type='number'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Коэффициент</Form.Label>
              <Form.Control
                value={this.state.coef}
                onChange={e => this.setState({ coef: e.target.value })}
                placeholder='Введите коэффициент'
                type='number'
                step='0.01'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Результат</Form.Label>
              <Form.Control
                as='select'
                value={this.state.result}
                onChange={e => this.setState({ result: e.target.value })}
              >
                <option>Плюс</option>
                <option>Минус</option>
                <option>Возврат</option>
              </Form.Control>
            </Form.Group>
            <Button
              variant={design === 'dark' ? 'dark' : 'outline-primary'}
              block
              disabled={!isValid}
              type='submit'
            >
              Добавить
            </Button>
          </Form>
        </div>

        <ModalWrapper
          show={this.state.showModal}
          handleModalSubmit={this.handleModalSubmit}
          handleModalClose={this.handleModalClose}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            Проверьте введённые данные:
            {getElements(this.state, betView, bank)}
          </div>
        </ModalWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  username: state.username,
  settings: state.saveSettings
});

export default connect(mapStateToProps)(AddPrediction);
