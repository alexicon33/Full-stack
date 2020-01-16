export function getColor(status) {
  switch (status) {
    case 'Плюс': {
      return 'text-success';
    }
    case 'Минус': {
      return 'text-danger';
    }
    default:
      return 'text-primary';
  }
}

export function prettify(dateString) {
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

export function checkUser(pathname, username) {
  return pathname.split('/').pop() === username;
}
