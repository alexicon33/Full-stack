import React from 'react';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Prediction from '../Prediction/Prediction';
import SearchField from '../SearchField/SearchField';
import { PORT } from '../../index';

class Predictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { predictions: [] };
    this.loadPredictions = this.loadPredictions.bind(this);
  }

  async loadPredictions() {
    let url = `http://localhost:${PORT}/predictions?_sort=id&_order=desc`;
    if (this.props.location.pathname !== '/predictions') {
      url += `&login=${this.props.location.pathname.split('/').pop()}`;
    }
    let response = await fetch(url);
    if (response.ok) {
      let result = await response.json();
      this.setState({ predictions: result });
    } else {
      alert('HTTP-ошибка: ' + response.status);
    }
  }

  componentDidMount() {
    this.loadPredictions();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.loadPredictions();
    }
  }

  render() {
    // console.log(
    //   'rendering Predictions, location.pathname: ' +
    //     `${this.props.location.pathname}`
    // );
    return (
      <div className='div-wrapper' style={{ width: '85%' }}>
        <SearchField
          placeholder='Введите имя прогнозиста...'
          path='predictions'
          refresh={this.loadPredictions}
        />
        <Table striped bordered hover style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>№</th>
              <th>Матч</th>
              <th>Дата</th>
              <th>Прогноз</th>
              <th>Поставлено</th>
              <th>Коэффициент</th>
              <th>Автор</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {this.state.predictions.map((element, index) => (
              <Prediction
                key={element.id}
                element={element}
                index={index}
                refresh={this.loadPredictions}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.username
});

export default withRouter(connect(mapStateToProps)(Predictions));
