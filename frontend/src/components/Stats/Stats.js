import React from 'react';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';
import {
  getData,
  calculateStats,
  getColor,
  prettifyNumber
} from './helperFunctions';
import './stats.css';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { PORT } from '../../index';

const loader = (
  <div style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem' }}>
    <Spinner animation='border' variant='dark' />
    {'   Загружаем данные...'}
  </div>
);

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { predictions: [], dataLoaded: false };
    this.loadPredictions = this.loadPredictions.bind(this);
  }

  async loadPredictions() {
    let url = `http://localhost:${PORT}/predictions?_sort=id&_order=asc`;
    url += `&login=${this.props.username.split('/').pop()}`;
    let response = await fetch(url);
    if (response.ok) {
      let result = await response.json();
      this.setState({ predictions: result, dataLoaded: true });
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
    if (!this.state.dataLoaded) {
      return loader;
    }
    if (this.state.predictions.length === 0) {
      return (
        <Alert variant='primary' className='text-center'>
          У вас пока ещё нет прогнозов — поэтому нет и статистики:(
        </Alert>
      );
    }
    const betView = this.props.settings.betView;
    const prettyData = getData(
      this.state.predictions,
      betView,
      this.props.settings.bank
    );
    const dataStats = calculateStats(
      this.state.predictions,
      betView,
      this.props.settings.bank
    );
    return (
      <div id='div-chart-wrapper'>
        <Chart
          style={{ height: '30rem' }}
          chartType='LineChart'
          loader={loader}
          data={prettyData}
          options={{
            hAxis: {
              title: 'Прогнозы\n'
            },
            vAxis: {
              title: '\nПрибыль'
            },
            legend: {
              position: 'none'
            },
            title:
              'Общая прибыль/убыток за всё время ' +
              `${
                betView === '%'
                  ? 'в процентах от начального банка (100%)'
                  : 'в долларах (USD)'
              }`
          }}
        />
        <Table striped bordered hover style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Чистая прибыль</th>
              <th>ROI</th>
              <th>Оборот</th>
              <th>Всего прогнозов</th>
              <th>Форма</th>
              <th>Максимальная просадка</th>
              <th>Средний коэффициент</th>
              <th>Средний размер ставки</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={getColor(dataStats.profit)}>
                {prettifyNumber(dataStats.profit, '+')} {betView}
              </td>
              <td className={getColor(dataStats.roi)}>
                {prettifyNumber(dataStats.roi, '+')} %
              </td>
              <td className='text-dark'>
                {`${dataStats.turnover}`} {betView}
              </td>
              <td className='text-dark'>{dataStats.predictionsNumber}</td>
              <td>
                <span className='text-success'>
                  {`+${dataStats.form['Плюс']} `}
                </span>
                <span className='text-danger'>
                  {`-${dataStats.form['Минус']} `}
                </span>
                <span className='text-dark'>
                  {`=${dataStats.form['Возврат']}`}
                </span>
              </td>
              <td className='text-danger'>
                {prettifyNumber(dataStats.maxSlump, '')} {betView}
              </td>
              <td className='text-dark'>{dataStats.averageCoef.toFixed(2)}</td>
              <td className='text-dark'>
                {prettifyNumber(dataStats.averageBet, '')} {betView}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
  settings: state.saveSettings
});

export default connect(mapStateToProps)(Stats);
