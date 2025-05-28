import data from './config.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', () => {
  document.title = `${data.name}'s Page`;
});
