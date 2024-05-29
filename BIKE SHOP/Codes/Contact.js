document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        fetch('http://yourserver.com/send-email', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Email sent successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send email.');
        });
    });
});