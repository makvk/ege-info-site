// validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;


    const messageField = document.getElementById('message');
    const charCountSpan = document.getElementById('charCount');

    if (messageField && charCountSpan) {
        messageField.addEventListener('input', function() {
            const remaining = 500 - this.value.length;
            charCountSpan.textContent = remaining >= 0 ? remaining : 0;
            
            if (this.value.length > 500) {
                this.value = this.value.substring(0, 500);
                charCountSpan.textContent = 0;
            }
        });
    }


    const clearErrorsOnInput = (inputId, errorId) => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
                const errorDiv = document.getElementById(errorId);
                if (errorDiv) errorDiv.textContent = '';
            });
        }
    };

    clearErrorsOnInput('fullname', 'fullnameError');
    clearErrorsOnInput('phone', 'phoneError');
    clearErrorsOnInput('email', 'emailError');
    clearErrorsOnInput('subject', 'subjectError');
    clearErrorsOnInput('message', 'messageError');

    const agreement = document.getElementById('agreement');
    if (agreement) {
        agreement.addEventListener('change', function() {
            const errorDiv = document.getElementById('agreementError');
            if (errorDiv) errorDiv.textContent = '';
        });
    }


    form.addEventListener('submit', function(event) {
        event.preventDefault();

    
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        document.querySelectorAll('.error-feedback').forEach(el => {
            el.textContent = '';
        });

        let isValid = true;

    
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();

        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();

        const email = document.getElementById('email');
        const emailValue = email.value.trim();

        const subject = document.getElementById('subject');
        const subjectValue = subject.value;

        const message = document.getElementById('message');
        const messageValue = message.value.trim();

        const agreement = document.getElementById('agreement');
        const agreementChecked = agreement.checked;

    
        if (fullnameValue === '') {
            showError('fullname', 'fullnameError', 'Введите ФИО');
            isValid = false;
        } else {
            const words = fullnameValue.split(/\s+/).filter(w => w.length > 0);
            if (words.length < 2) {
                showError('fullname', 'fullnameError', 'Введите фамилию и имя (минимум 2 слова)');
                isValid = false;
            }
        }

    
        if (phoneValue === '') {
            showError('phone', 'phoneError', 'Введите номер телефона');
            isValid = false;
        } else {
            const phoneDigits = phoneValue.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                showError('phone', 'phoneError', 'Введите минимум 10 цифр номера');
                isValid = false;
            }
        }

    
        if (emailValue === '') {
            showError('email', 'emailError', 'Введите email');
            isValid = false;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailValue)) {
                showError('email', 'emailError', 'Введите корректный email (пример: name@domain.ru)');
                isValid = false;
            }
        }

    
        if (!subjectValue || subjectValue === '') {
            showError('subject', 'subjectError', 'Выберите тему обращения');
            isValid = false;
        }

    
        if (messageValue.length > 500) {
            showError('message', 'messageError', 'Сообщение не должно превышать 500 символов');
            isValid = false;
        }

        if (!agreementChecked) {
            showError('agreement', 'agreementError', 'Подтвердите согласие на обработку данных');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                subject: subjectValue,
                message: messageValue || '(не заполнено)',
                timestamp: new Date().toLocaleString('ru-RU')
            };


            const formEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(formEvent);


            const alertDiv = document.getElementById('successAlert');
            if (alertDiv) {
                alertDiv.classList.remove('d-none');
                setTimeout(() => {
                    alertDiv.classList.add('d-none');
                }, 5000);
            }

            // Опционально: очистка формы после успешной отправки
            // form.reset();
        }
    });

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            document.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
            document.querySelectorAll('.error-feedback').forEach(el => {
                el.textContent = '';
            });
            if (charCountSpan) charCountSpan.textContent = '500';
            
            // Скрыть alert
            const alertDiv = document.getElementById('successAlert');
            if (alertDiv) alertDiv.classList.add('d-none');
        });
    }

    function showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const errorDiv = document.getElementById(errorId);
        
        if (input) input.classList.add('is-invalid');
        if (errorDiv) errorDiv.textContent = message;
    }
});