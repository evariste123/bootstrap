
// simple handler for contact form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value,
        email: form.email.value,
        phone: form.number.value,
        country: form.country.value,
        gender: form.gender.value,
      };
      console.log('Form submitted', data);
      alert('Thank you for contacting us, ' + data.name + '!');
      form.reset();
    });
  }
});