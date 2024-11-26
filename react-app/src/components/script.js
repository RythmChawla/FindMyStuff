document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const email = form.querySelector('input[type="email"]');
            const password = form.querySelector('input[type="password"]');

            if (!email.value.includes('@')) {
                alert('Please enter a valid email address.');
                event.preventDefault();
            }

            if (password.value.length < 6) {
                alert('Password must be at least 6 characters long.');
                event.preventDefault();
            }
        });
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const email = form.querySelector('input[type="email"]');
            const password = form.querySelector('input[type="password"]');
            const image = form.querySelector('input[type="file"]');
            
            if (email && !email.value.includes('@')) {
                alert('Please enter a valid email address.');
                event.preventDefault();
            }

            if (password && password.value.length < 6) {
                alert('Password must be at least 6 characters long.');
                event.preventDefault();
            }

            if (image && image.files.length === 0) {
                alert('Please upload an image.');
                event.preventDefault();
            }
        });
    });
});

function toggleAccordion(button) {
    const accordionItem = button.parentElement.parentElement;
    const accordionBody = accordionItem.querySelector('.accordion-body');

    if (accordionBody.style.maxHeight) {
        accordionBody.style.maxHeight = null;
    } else {
        accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
    }
}

