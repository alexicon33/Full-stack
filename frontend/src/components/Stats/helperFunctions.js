function prettify(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleTimeString('ru', options);
}

export function getData(predictions, sign, bank) {
  let result = [
    ['x', 'y', { role: 'tooltip', type: 'string' }],
    [0, 0, 'Старт!']
  ];
  let profit = 0;
  predictions.forEach((item, index) => {
    let itemProfit = item.bet * (item.coef - 1);
    if (item.result === 'Минус') {
      itemProfit = -item.bet;
    }
    if (item.result === 'Возврат') {
      itemProfit = 0;
    }
    if (sign === '$') {
      itemProfit *= bank / 100;
    }
    profit += itemProfit;
    result.push([
      index + 1,
      profit,
      `${item.match}\n${prettify(item.date)}\n` +
        `${itemProfit <= 0 ? '' : '+'}${+itemProfit.toFixed(2)} ${sign}`
    ]);
  });
  return result;
}

export function calculateStats(predictions, sign, bank) {
  let result = {
    profit: 0,
    roi: 0,
    turnover: 0,
    predictionsNumber: predictions.length,
    form: { Плюс: 0, Минус: 0, Возврат: 0 },
    maxSlump: 0,
    averageCoef: 0,
    averageBet: 0
  };
  predictions.forEach(item => {
    let itemProfit = item.bet * (item.coef - 1);
    if (item.result === 'Минус') {
      itemProfit = -item.bet;
    }
    if (item.result === 'Возврат') {
      itemProfit = 0;
    }
    if (sign === '$') {
      itemProfit *= bank / 100;
    }
    result.profit += itemProfit;
    result.turnover += item.bet;
    result.form[item.result]++;
    result.maxSlump = Math.min(result.maxSlump, result.profit);
    result.averageCoef += item.coef;
  });
  if (sign === '$') {
    result.turnover *= bank / 100;
  }
  result.averageBet = result.turnover / result.predictionsNumber;
  result.averageCoef /= result.predictionsNumber;
  result.roi = (result.profit / result.turnover) * 100;
  result.maxSlump *= -1;
  return result;
}

export function getColor(profit) {
  if (profit < 0) {
    return 'text-danger';
  }
  if (profit > 0) {
    return 'text-success';
  }
  return 'text-primary';
}

export function prettifyNumber(number, sign) {
  return `${number <= 0 ? '' : sign}${+number.toFixed(2)}`;
}
