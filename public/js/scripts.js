// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     }) ;
// });

const searchForm = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    // console.log(input.value);
    fetch('/weather?location=' + input.value).then((response) => {
    response.json().then((data) => {
        // console.log(data);
        if (data.error) {
            msg1.textContent = data.message;
            msg2.textContent = '';
        } else {
            msg1.textContent = data.forecast;
            msg2.textContent = data.location;
        }
        input.value = '';
    });
})

});




