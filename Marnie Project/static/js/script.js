document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Optional: Add animation to the menu toggle
        });
    }

    // Currency Converter
    const converterForm = document.getElementById('currency-converter');
    const amountInput = document.getElementById('amount');
    const currencySelect = document.getElementById('currency');
    const convertedAmount = document.getElementById('converted-amount');

    if (converterForm && amountInput && currencySelect && convertedAmount) {
        converterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const amount = parseFloat(amountInput.value);
            const currency = currencySelect.value;

            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount.');
                return;
            }

            try {
                const conversionRate = await getConversionRate(currency);
                const result = amount * conversionRate;
                convertedAmount.textContent = `Converted Amount: ${result.toFixed(2)} ${currency === 'tl' ? 'TRY' : 'AED'}`;
            } catch (error) {
                console.error('Error fetching conversion rate:', error);
                convertedAmount.textContent = 'Unable to fetch conversion rate. Please try again later.';
            }
        });
    }

    // Fetch the conversion rate from an API
    async function getConversionRate(currency) {
        const url = 'https://api.exchangerate-api.com/v4/latest/AED'; // Base currency is AED

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return currency === 'tl' ? data.rates.TRY : 1; // Assuming we are converting from AED to AED for demo purposes
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            throw error;
        }
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Validation for Contact Form
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !subject || !message) {
                e.preventDefault();  // Prevent form from submitting
                alert('Please fill out all fields.');
                return;
            }

            if (!validateEmail(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }

            if (!validatePhone(phone)) {
                e.preventDefault();
                alert('Please enter a valid phone number.');
                return;
            }
        });
    }

    // Email Validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Phone Validation (Basic Example)
    function validatePhone(phone) {
        const re = /^\+?\d{10,15}$/; // Allows for optional leading '+' and 10-15 digits
        return re.test(String(phone));
    }
});
