// DOM Elements
const whatsappBtn = document.getElementById('whatsappBtn');
const tabBtns = document.querySelectorAll('.tab-btn');
const servicesContents = document.querySelectorAll('.services-content');
const quoteForm = document.getElementById('quoteForm');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.getElementById('navToggle');
const navList = document.querySelector('.nav-list');
const submitBtn = document.getElementById('submitBtn');
const formSpinner = document.getElementById('formSpinner');
const formMessage = document.getElementById('formMessage');

// WhatsApp Button Functionality
whatsappBtn.addEventListener('click', function() {
    const phoneNumber = "+15551234567"; // Replace with actual number
    const message = "Hello WA/E BUILDER INC, I'm interested in your construction services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
    this.innerHTML = navList.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navList.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Services Tabs Functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        servicesContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show corresponding content
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form Submission with EmailJS
quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    submitBtn.disabled = true;
    formSpinner.classList.remove('hidden');
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    // Prepare template parameters for EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone || 'Not provided',
        service: service,
        message: message,
        to_email: 'info@waebuilder.com', // Your email address
        date: new Date().toLocaleDateString()
    };
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            formMessage.textContent = 'Thank you! Your quote request has been submitted. We\'ll contact you within 24 hours.';
            formMessage.classList.add('success');
            
            // Reset form
            quoteForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
            formMessage.classList.add('error');
        })
        .finally(() => {
            // Reset button state
            submitBtn.disabled = false;
            formSpinner.classList.add('hidden');
            
            // Set focus back to name field
            document.getElementById('name').focus();
        });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Scroll to top on page refresh
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

// Add active class to nav link based on scroll position
window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY + 100;
    
    // Loop through sections to check which one is in view
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Close mobile menu when scrolling
    if (window.innerWidth <= 768 && navList.classList.contains('active')) {
        navList.classList.remove('active');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Add some interactive effects to service cards and work cards
const serviceCards = document.querySelectorAll('.service-card');
const workCards = document.querySelectorAll('.work-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderBottom = `4px solid ${getComputedStyle(document.documentElement).getPropertyValue('--secondary-color')}`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderBottom = '4px solid transparent';
    });
});

workCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const category = this.querySelector('.work-category');
        category.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
        category.style.color = 'white';
    });
    
    card.addEventListener('mouseleave', function() {
        const category = this.querySelector('.work-category');
        category.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        category.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set first tab as active by default
    document.querySelector('.tab-btn[data-tab="interior"]').classList.add('active');
    document.getElementById('interior').classList.add('active');
    
    // Set first nav link as active
    document.querySelector('.nav-link[href="#home"]').classList.add('active');
    
    // Add animation to hero text on load
    const heroTitles = document.querySelectorAll('.hero-title');
    heroTitles.forEach((title, index) => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
    
    // Animate hero message lines
    const messageLines = document.querySelectorAll('.message-line');
    messageLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 800 + (index * 200));
    });
    
    console.log('WA/E BUILDER INC website loaded successfully!');
    console.log('Note: To enable EmailJS functionality, you need to:');
    console.log('1. Sign up at https://www.emailjs.com/');
    console.log('2. Create a service and template');
    console.log('3. Update the EmailJS initialization in the HTML head with your Public Key');
    console.log('4. Update the emailjs.send() call in script.js with your Service ID and Template ID');
});