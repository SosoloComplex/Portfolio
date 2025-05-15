// Time-based greeting
function setGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.getElementById('greeting');
    
    if (greetingElement) {
        if (hour < 12) {
            greetingElement.textContent = 'Good Morning! Welcome to My Portfolio';
        } else if (hour < 18) {
            greetingElement.textContent = 'Good Afternoon! Welcome to My Portfolio';
        } else {
            greetingElement.textContent = 'Good Evening! Welcome to My Portfolio';
        }
    }
}

// Dark/Light mode toggle
function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                themeToggle.textContent = 'Dark Mode';
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.textContent = 'Light Mode';
            }
            
            // Save preference to localStorage
            localStorage.setItem('theme', body.getAttribute('data-theme'));
        });
    }
}

// Project details toggle
function setupProjectDetails() {
    const detailButtons = document.querySelectorAll('.details-btn');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const details = e.target.nextElementSibling;
            details.classList.toggle('active');
            
            // Change button text
            e.target.textContent = details.classList.contains('active') 
                ? 'Hide Details' 
                : 'View Details';
        });
    });
}

// Form validation
function validateContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate email
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email.value)) {
                emailError.textContent = 'Please enter a valid email address';
                return;
            } else {
                emailError.textContent = '';
            }
            
            // Validate phone if provided
            const phone = document.getElementById('phone');
            const phoneError = document.getElementById('phone-error');
            
            if (phone.value && !/^\d{3}-\d{3}-\d{4}$/.test(phone.value)) {
                phoneError.textContent = 'Please use format: 123-456-7890';
                return;
            } else {
                phoneError.textContent = '';
            }
            
            // Form is valid - show success message
            contactForm.classList.add('hidden');
            document.getElementById('form-success').classList.remove('hidden');
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted:', {
                name: document.getElementById('name').value,
                email: email.value,
                phone: phone.value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            });
        });
    }
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    toggleTheme();
    setupProjectDetails();
    validateContactForm();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        document.getElementById('theme-toggle').textContent = savedTheme === 'dark' 
            ? 'Light Mode' 
            : 'Dark Mode';
    }
});