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

// Завантаження фотографії
function handlePhoto(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const img = document.getElementById('previewPhoto');
        img.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Генерація та завантаження PNG
function download() {
    const card = document.getElementById('card');
    
    // Тимчасово прибираємо заокруглення для ідеального зрізу картинки
    card.style.borderRadius = "0";

    html2canvas(card, {
        scale: 4,               // Зберігаємо 4х якість
        useCORS: true,          
        backgroundColor: null,  
        logging: false          
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'UMO-Greeting-Card.png';
        link.href = canvas.toDataURL('image/png', 1.0); 
        link.click();
        
        card.style.borderRadius = "15px";
    });
}

// Ініціалізація
updateTemplate();
