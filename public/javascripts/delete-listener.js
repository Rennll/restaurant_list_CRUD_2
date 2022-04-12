const deleteListener = document.querySelector('#restaurant-list') || document.querySelector('#delete-btn')
const restaurant = document.querySelector('#delete-restaurant-name')
const deleteForm = document.querySelector('#delete-form')

deleteListener.addEventListener('click', function onDeleteClicked (event) {
  restaurant.innerText = event.target.dataset.name
  deleteForm.action = `/restaurants/${event.target.dataset.id}?_method=delete`
})
