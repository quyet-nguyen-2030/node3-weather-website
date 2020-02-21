const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const btnSubmitForm = document.querySelector('button');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'Loading...';
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent each time submit the form, browser be reloaded
    const location = searchElement.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const url = 'http://localhost:3000/weather?place=' + encodeURIComponent(location)
    console.log(url);
    fetch('http://localhost:3000/weather?place=' + location)
        .then((response) => {
            response.json() //call json to convert json to JVSCRIPT object :)
                .then((data) => {
                    // JSON.stringify(data);
                    if (data.Error) { 
                        console.log(data);
                        messageOne.textContent = data.Error;
                        weatherForm.reset();
                    }
                    else {
                        console.log(url);
                        console.log(data.location, data);
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.data;
                        weatherForm.reset();
                    }                })        })
});

// FETCH api is only work for client side JavaScript (as it supported by browser)
// fetch('http://puzzle.mead.io/puzzle')
//     .then( (response) => {
//         response.json() //call json to convert json to JVSCRIPT object :)
//             .then((data) => { console.log(data);
//             })
// });

// fetch('http://localhost:3000/weather?place=;') DANGEROURS CODE!
//     .then((response) => {
//         response.json() //call json to convert json to JVSCRIPT object :)
//             .then((data) => {
//                 if (data.error) {
//                     console.log(data.error);
//                 } else {
//                     console.log(data.location, data);
//                 }
//             })
//     });
//     // .catch (err => console.log(err))
