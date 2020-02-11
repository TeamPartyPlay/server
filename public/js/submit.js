
document.getElementById('create-user-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const { elements } = event.target;
  let formData = {};
  for (let i = 0; i < elements.length; i++) {
    const { name, value } = elements[i];
    formData = { ...formData, [name]: value };
  }
  fetch('api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
});
