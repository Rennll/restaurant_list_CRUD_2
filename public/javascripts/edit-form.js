const form = document.querySelector('#edit_form')
const submitButton = document.querySelector('#edit_form #submit-btn')

form.addEventListener('submit', function onFormSubmitted (event) {
  if (!form.checkValidity()) {
    event.stopPropagation()
    event.preventDefault()
  }
})

submitButton.addEventListener('click', function onSubmitClicked (event) {
  form.classList.add('was-validated')
})
