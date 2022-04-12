const form = document.querySelector('form')
const submitButton = document.querySelector('form button')

form.addEventListener('submit', function onFormSubmitted (event) {
  if (!form.checkValidity()) {
    event.stopPropagation()
    event.preventDefault()
  }
})

submitButton.addEventListener('click', function onSubmitClicked (event) {
  form.classList.add('was-validated')
})
