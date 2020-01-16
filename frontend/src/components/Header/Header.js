import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import HomeLogoDark from './home dark.svg';
import HomeLogoLight from './home light.svg';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';

const divHeaderStyle = {
  display: 'flex'
};

const navHeaderStyle = {
  justifyContent: 'space-between',
  width: '100%',
  marginLeft: '0',
  marginRight: '10rem'
};

class Header extends React.Component {
  handleClick = event => {
    if (this.props.isLoggedIn) {
      event.preventDefault();
      this.props.logout();
    }
  };

  render() {
    const registerButton = (
      <LinkContainer to='/register'>
        <Nav.Link> Регистрация </Nav.Link>
      </LinkContainer>
    );
    const design = this.props.settings.navbarDesign;
    return (
      <Navbar bg={design} variant={design}>
        <LinkContainer to='/' style={{ marginLeft: '10rem' }}>
          <Navbar.Brand>
            <img
              alt=''
              src={design === 'dark' ? HomeLogoDark : HomeLogoLight}
              width='30'
              height='30'
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
        </LinkContainer>
        <Nav style={navHeaderStyle}>
          <div style={divHeaderStyle}>
            <LinkContainer to='/' exact={true}>
              <Nav.Link> Главная </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/predictions'>
              <Nav.Link> Прогнозы </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/add_prediction'>
              <Nav.Link> Добавить </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/stats'>
              <Nav.Link> Статистика </Nav.Link>
            </LinkContainer>
          </div>
          <div style={divHeaderStyle}>
            <LinkContainer to='/settings'>
              <Nav.Link> Настройки </Nav.Link>
            </LinkContainer>
            {!this.props.isLoggedIn && registerButton}
            <LinkContainer to='/login'>
              <Nav.Link onClick={this.handleClick}>
                {this.props.isLoggedIn ? 'Выход' : 'Вход'}
              </Nav.Link>
            </LinkContainer>
          </div>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  settings: state.saveSettings
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
