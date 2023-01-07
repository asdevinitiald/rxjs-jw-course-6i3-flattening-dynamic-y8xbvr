import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { concatMap, map } from 'rxjs/operators';

const endpointInput: HTMLInputElement =
  document.querySelector('input#endpoint');
const fetchButton = document.querySelector('button#fetch');

fromEvent(fetchButton, 'click')
  .pipe(
    map(() => endpointInput.value),
    concatMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`)
    )
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (err) => {
      if (err.message === 'ajax error 404') {
        return console.log('Error : Endpoint tidak ditemukan');
      } else {
        console.log('Error : ', err);
      }
    },
  });
