const MessageSuccess = document.querySelector('.success')
const MessageeError = document.querySelector('.error')
const getdata = (location) => {
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                MessageSuccess.innerHTML='';
                MessageeError.innerHTML = data.error;
            }
            else {
                MessageSuccess.innerHTML = `${data.location}`
                MessageeError.innerHTML = `has weather ${data.forecast} `;
            }
        })
    })
}

const form = document.querySelector('form')
const search = document.querySelector('input');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    getdata(search.value);
})