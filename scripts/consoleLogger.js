document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;

        console.clear();

        console.log('НОВАЯ ОТПРАВКА ФОРМЫ');
        
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Тема:', formData.subject);
        console.log('Сообщение:', formData.message);
        console.log('Время отправки:', formData.timestamp);
        
        console.log('Данные успешно отправлены');
    });
});