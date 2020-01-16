import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { connect } from 'react-redux';
import { saveSettings } from '../../redux/actions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    // надо бы брать из стора
    this.state = {
      navbarDesign: 'dark',
      betView: '%',
      bank: '',
      shouldRedirect: false
    };
  }

  colorsHandleChange = value => {
    this.setState({ navbarDesign: value });
  };

  betViewHandleChange = value => {
    this.setState({ betView: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.saveSettings(this.state);
  };

  render() {
    const design = this.props.settings.navbarDesign;
    return (
      <div className='div-wrapper div-centered'>
        <Form onSubmit={this.handleSubmit} className='w-50'>
          <Form.Group style={{ display: 'flex', flexDirection: 'column' }}>
            <Form.Label>Цветовая схема</Form.Label>
            <ToggleButtonGroup
              type='radio'
              name='colors'
              value={this.state.navbarDesign}
              onChange={this.colorsHandleChange}
            >
              <ToggleButton
                value='dark'
                variant={
                  this.state.navbarDesign === 'light' ? 'light' : 'secondary'
                }
              >
                Тёмная
              </ToggleButton>
              <ToggleButton
                value='light'
                variant={
                  this.state.navbarDesign === 'light' ? 'light' : 'secondary'
                }
              >
                Светлая
              </ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
          <Form.Group style={{ display: 'flex', flexDirection: 'column' }}>
            <Form.Label>Вариант представления сумм ставок</Form.Label>
            <ToggleButtonGroup
              type='radio'
              name='betView'
              value={this.state.betView}
              onChange={this.betViewHandleChange}
            >
              <ToggleButton
                value='%'
                variant={this.state.betView === '%' ? 'secondary' : 'light'}
              >
                В % от начального банка
              </ToggleButton>
              <ToggleButton
                value='$'
                variant={this.state.betView === '%' ? 'secondary' : 'light'}
              >
                В долларах
              </ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Размер начального банка</Form.Label>
            <Form.Control
              value={this.state.bank}
              onChange={e => this.setState({ bank: e.target.value })}
              placeholder='Введите размер начального банка...'
              type='number'
              disabled={this.state.betView === '%'}
            />
          </Form.Group>
          <Button
            variant={design === 'dark' ? 'dark' : 'outline-primary'}
            block
            type='submit'
            onClick={this.handleSubmit}
          >
            Сохранить
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.saveSettings
});

export default connect(mapStateToProps, { saveSettings })(Settings);
