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
    const posGroup = document.getElementById('positionGroup');
    const photoGroup = document.getElementById('photoGroup');

    if (type === 'birthday') {
        card.classList.remove('welcome-mode');
        card.classList.add('birthday-mode');
        title.innerText = "З ДНЕМ НАРОДЖЕННЯ!";
        posGroup.style.display = 'none';
        photoGroup.style.display = 'none';
    } else {
        card.classList.remove('birthday-mode');
        card.classList.add('welcome-mode');
        title.innerText = "ВІТАЄМО В КОМАНДІ!";
        posGroup.style.display = 'block';
        photoGroup.style.display = 'block';
    }
    syncText();
}

function handlePhoto(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('previewPhoto');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function download() {
    const card = document.getElementById('card');
    
    // Тимчасово прибираємо заокруглення кутів для чистого PNG
    card.style.borderRadius = "0";

    html2canvas(card, {
        scale: 2, // Висока якість
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'UMO-Greeting-Card.png';
        link.href = canvas.toDataURL();
        link.click();
        
        // Повертаємо кути назад
        card.style.borderRadius = "10px";
    });
}

// Ініціалізація
updateTemplate();
