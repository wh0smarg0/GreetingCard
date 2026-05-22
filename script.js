function syncText() {
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const message = document.getElementById('message').value;

    document.getElementById('previewName').innerText = name || "Ім’я Прізвище";
    document.getElementById('previewPosition').innerText = position || "Посада";
    document.getElementById('previewMessage').innerText = message || "Текст привітання...";
}

function updateTemplate() {
    const type = document.getElementById('templateType').value;
    const card = document.getElementById('card');
    const title = document.getElementById('title');

    const posGroup = document.getElementById('positionGroup'); // Поле вводу посади
    const previewPosition = document.getElementById('previewPosition'); // Текст посади на картці
    const divider = document.getElementById('divider');

    if (type === 'birthday') {
        card.classList.remove('welcome-mode');
        card.classList.add('birthday-mode');
        title.innerText = "ВІТАЄМО \n З ДНЕМ НАРОДЖЕННЯ!";

        // Ховаємо посаду, але ЗАЛИШАЄМО фото
        posGroup.style.display = 'block';
        previewPosition.style.display = 'block';
        if(divider) divider.style.display = 'block';
    } else {
        card.classList.remove('birthday-mode');
        card.classList.add('welcome-mode');
        title.innerText = "ВІТАЄМО В КОМАНДІ!";

        // Повертаємо посаду
        posGroup.style.display = 'block';
        previewPosition.style.display = 'block';
        if(divider) divider.style.display = 'block';
    }
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
    card.style.borderRadius = "0";

    html2canvas(card, {
        scale: 4,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'UMO-Card.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        card.style.borderRadius = oldBorder;
    });
}

// Запуск при завантаженні
updateTemplate();