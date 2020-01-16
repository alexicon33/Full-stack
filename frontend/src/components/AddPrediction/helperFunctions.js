import React from 'react';

export const keysInRussian = {
  match: 'Событие',
  date: 'Дата и время',
  prediction: 'Прогноз',
  bet: 'Размер ставки (в % от банка)',
  coef: 'Коэффициент',
  result: 'Результат'
};

export function stateToShow(state) {
  let stateCopy = {
    ...state,
    bet: Number(state.bet),
    coef: Number(state.coef)
  };
  delete stateCopy.showModal;
  delete stateCopy.shouldRedirect;
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  stateCopy.date = stateCopy.date.toLocaleTimeString('ru', options);
  return stateCopy;
}

export function setBetValue(bet, sign, bank) {
  if (sign === '%') {
    return bet;
  }
  let result = (bet / bank) * 100;
  return result.toFixed(2);
}

export function getElements(state, sign, bank) {
  let stateCopy = stateToShow(state);
  let result = [];
  for (let key in stateCopy) {
    if (key === 'bet' && sign === '$') {
      result.push(<div key={key}>{`Размер ставки: ${stateCopy[key]} $`}</div>);
    } else {
      result.push(
        <div key={key}>{`${keysInRussian[key]}: ${stateCopy[key]}`}</div>
      );
    }
  }
  return result;
}
