function syncText() {
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const message = document.getElementById('message').value;

    document.getElementById('previewName').innerText = name || "Ім’я Прізвище";
    document.getElementById('previewPosition').innerText = position || "Посада";
    document.getElementById('previewMessage').innerText = message || "Текст привітання буде тут...";
}

function updateTemplate() {
    const type = document.getElementById('templateType').value;
    const card = document.getElementById('card');
    const title = document.getElementById('title');
    const messageInput = document.getElementById('message');

    const posGroup = document.getElementById('positionGroup'); // Поле вводу посади
    const previewPosition = document.getElementById('previewPosition'); // Текст посади на картці
    const divider = document.getElementById('divider');

    // Видаляємо всі класи режимів перед застосуванням нового
    card.classList.remove('welcome-mode', 'birthday-mode', 'probation-mode');

    // Шаблонний текст для випробувального терміну
    const defaultProbationText = "Дуже раді, що ви стали частиною нашої команди.\n\nЗа цей період Ви продемонстрували сильні сторони: \n[написати сильні сторони]\n\nЗа цей невеликий проміжок часу Ви чудово себе проявили, і ми цінуємо Ваш внесок у спільну роботу, а саме хотіли б виділити: \n[написати досягнення]";

    if (type === 'birthday') {
        card.classList.add('birthday-mode');
        title.innerText = "ВІТАЄМО \n З ДНЕМ НАРОДЖЕННЯ!";
        messageInput.placeholder = "Ваші побажання...";

        // Якщо в полі був текст випробувального терміну, очищаємо його
        if (messageInput.value === defaultProbationText) messageInput.value = "";

    } else if (type === 'probation') {
        card.classList.add('probation-mode');
        title.innerText = "ВІТАЄМО З УСПІШНИМ ПРОХОДЖЕННЯМ\nВИПРОБУВАЛЬНОГО ТЕРМІНУ!";

        // Автоматично підставляємо текст, якщо поле порожнє
        if (!messageInput.value || messageInput.value.trim() === "") {
            messageInput.value = defaultProbationText;
        }

    } else { // welcome mode
        card.classList.add('welcome-mode');
        title.innerText = "ВІТАЄМО В КОМАНДІ!";
        messageInput.placeholder = "Ваші побажання...";

        // Якщо в полі був текст випробувального терміну, очищаємо його
        if (messageInput.value === defaultProbationText) messageInput.value = "";
    }

    // Посада та лінія відображаються для всіх типів
    posGroup.style.display = 'block';
    previewPosition.style.display = 'block';
    if(divider) divider.style.display = 'block';

    syncText();
}

function handlePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function() {
        const img = document.getElementById('previewPhoto');
        img.onload = function() {
            if (img.naturalWidth > img.naturalHeight) {
                img.style.height = '100%';
                img.style.width = 'auto';
            } else {
                img.style.width = '100%';
                img.style.height = 'auto';
            }
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

function download() {
    const card = document.getElementById('card');
    const oldBorder = card.style.borderRadius;
    card.style.borderRadius = "0"; // Прибираємо закруглення для рівного завантаження

    html2canvas(card, {
        scale: 4, // Висока якість (можна змінити на 2 або 3, якщо файли будуть занадто важкими)
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'UMO-Card.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        card.style.borderRadius = oldBorder; // Повертаємо закруглення після генерації
    });
}

// Запуск при завантаженні
updateTemplate();