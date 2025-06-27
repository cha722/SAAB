// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupLink = document.getElementById('signupLink');
    const loginLink = document.getElementById('loginLink');
    const applicationForm = document.getElementById('applicationForm');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const heroSection = document.querySelector('.hero');
    
    // Admin credentials
    const ADMIN_USER = 'omar';
    const ADMIN_PASS = 'omar1';
    
    // Modal functionality
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    loginBtn.addEventListener('click', () => openModal(loginModal));
    signupBtn.addEventListener('click', () => openModal(signupModal));
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });
    
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === signupModal) closeModal(signupModal);
    });
    
    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Admin login
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            alert('Admin login successful!');
            closeModal(loginModal);
            // Here you would redirect to admin dashboard
        } 
        // Regular user login
        else {
            // In a real app, this would validate against a database
            alert('User login successful!');
            closeModal(loginModal);
        }
    });
    
    // Signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;
        
        // Basic validation
        if (password !== document.getElementById('confirm-password').value) {
            alert('Passwords do not match!');
            return;
        }
        
        // In a real app, this would save to a database
        alert(`Account created for ${fullname}! You can now log in.`);
        closeModal(signupModal);
    });
    
    // Application form submission
    applicationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Check if user is logged in (in a real app)
        const isLoggedIn = false; // This would come from authentication state
        
        if (!isLoggedIn) {
            alert('Please login or sign up to submit an application.');
            openModal(loginModal);
            return;
        }
        
        // Get form data
        const formData = new FormData(applicationForm);
        const position = formData.get('position');
        
        // In a real app, this would upload the CV and send data to the server
        alert(`Application submitted for ${position} position!`);
        applicationForm.reset();
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Hero image change for admin
    heroSection.addEventListener('click', (e) => {
        // This would only be available to admin users in a real implementation
        const isAdmin = false; // Would come from authentication state
        
        if (isAdmin) {
            const newUrl = prompt('Enter new hero image URL:');
            if (newUrl) {
                heroSection.style.backgroundImage = `url(${newUrl})`;
                // In a real app, this would save to JSONBin
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Initialize page
    const savedHeroImage = localStorage.getItem('heroImage');
    if (savedHeroImage) {
        heroSection.style.backgroundImage = `url(${savedHeroImage})`;
    }
});
