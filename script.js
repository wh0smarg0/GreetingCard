// Стан додатку
let employeesData = [{ id: Date.now(), name: '', position: '', message: '', photo: '' }];
let currentMode = 'birthday';

// DOM елементи
const templateSelect = document.getElementById('templateType');
const singleInputsPanel = document.getElementById('singleInputs');
const multiInputsPanel = document.getElementById('multiInputs');
const singlePreviewPanel = document.getElementById('singlePreview');
const multiPreviewPanel = document.getElementById('multiPreview');
const cardElement = document.getElementById('card');
const titleElement = document.getElementById('title');

// Елементи одиночного режиму
const singleNameInput = document.getElementById('name');
const singlePositionInput = document.getElementById('position');
const singleMessageInput = document.getElementById('message');
const singlePhotoInput = document.getElementById('photo');

const previewNameLabel = document.getElementById('previewName');
const previewPositionLabel = document.getElementById('previewPosition');
const previewMessageLabel = document.getElementById('previewMessage');
const previewPhotoImg = document.getElementById('previewPhoto');

// Елементи мульти режиму
const globalMessageInput = document.getElementById('globalMessage');
const footerMessageInput = document.getElementById('footerMessage');
const employeesFormsContainer = document.getElementById('employeesForms');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const previewGridContainer = document.getElementById('previewGrid');
const previewGlobalMessage = document.getElementById('previewGlobalMessage');
const previewFooterMessage = document.getElementById('previewFooterMessage');
const probationTitleInput =
    document.getElementById('probationTitle');

const probationSubtitleInput =
    document.getElementById('probationSubtitle');

const probationSubintroInput =
    document.getElementById('probationSubintro');

const previewProbationTitle =
    document.getElementById('previewProbationTitle');

const previewProbationSubtitle =
    document.getElementById('previewProbationSubtitle');

const previewProbationSubintro =
    document.getElementById('previewProbationSubintro');
const downloadBtn = document.getElementById('downloadBtn');

// Ініціалізація
function initializeApp() {
    templateSelect.addEventListener('change', handleModeChange);

    singleNameInput.addEventListener('input', syncSingleMode);
    singlePositionInput.addEventListener('input', syncSingleMode);
    singleMessageInput.addEventListener('input', syncSingleMode);
    singlePhotoInput.addEventListener('change', handleSinglePhoto);

    globalMessageInput.addEventListener('input', syncMultiMode);
    footerMessageInput.addEventListener('input', syncMultiMode);
    probationTitleInput.addEventListener('input', syncMultiMode);
    probationSubtitleInput.addEventListener('input', syncMultiMode);
    probationSubintroInput.addEventListener('input', syncMultiMode);
    addEmployeeBtn.addEventListener('click', addNewEmployee);
    downloadBtn.addEventListener('click', downloadCard);

    handleModeChange();
}

// Перемикання режимів
function handleModeChange() {
    currentMode = templateSelect.value;

    cardElement.classList.remove('welcome-mode', 'birthday-mode', 'probation-mode');

    if (currentMode === 'probation') {
        cardElement.classList.add('probation-mode');

        singleInputsPanel.style.display = 'none';
        singlePreviewPanel.style.display = 'none';
        multiInputsPanel.style.display = 'block';
        multiPreviewPanel.style.display = 'block';

        // Дефолтні тексти для випробувального терміну
        if (!probationTitleInput.value) {
            probationTitleInput.value = "ВІТАЄМО!";
        }

        if (!probationSubtitleInput.value) {
            probationSubtitleInput.value =
                "з успішним проходженням випробувального терміну";
        }

        if (!probationSubintroInput.value) {
            probationSubintroInput.value =
                "За цей час Ви чудово продемонстрували свої сильні сторони, які б ми хотіли відзначити:";
        }

        if (!globalMessageInput.value) {
            globalMessageInput.value = "Дуже раді, що Ви стали частиною нашої команди!";
        }
        if (!footerMessageInput.value) {
            footerMessageInput.value = "Віримо у подальші спільні успіхи та бажаємо вам професійного зростання й нових досягнень!";
        }

        renderDynamicForms();
        syncMultiMode();
    } else {
        cardElement.classList.add(`${currentMode}-mode`);

        if (currentMode === 'birthday') {
            titleElement.innerText = "ВІТАЄМО \n З ДНЕМ НАРОДЖЕННЯ!";
        } else {
            titleElement.innerText = "ВІТАЄМО!";
        }

        singleInputsPanel.style.display = 'block';
        singlePreviewPanel.style.display = 'block';
        multiInputsPanel.style.display = 'none';
        multiPreviewPanel.style.display = 'none';

        syncSingleMode();
    }
}

// Синхронізація 1 працівника
function syncSingleMode() {
    previewNameLabel.innerText = singleNameInput.value || "Ім’я Прізвище";
    previewPositionLabel.innerText = singlePositionInput.value || "Посада";
    previewMessageLabel.innerText = singleMessageInput.value || "Текст привітання буде тут...";
}

// Фото 1 працівника (З ідеальним збереженням якості та пропорцій)
function handleSinglePhoto(event) {
    const fileNode = event.target.files[0];
    if (!fileNode) return;

    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        // Створюємо об'єкт зображення у пам'яті
        const img = new Image();
        img.onload = function() {
            // 1. Створюємо прихований віртуальний canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 2. Задаємо високу роздільну здатність (наприклад, 1000x1000 px)
            // Це гарантує ідеальну якість при завантаженні картки
            const targetSize = 1000;
            canvas.width = targetSize;
            canvas.height = targetSize;

            // 3. Розраховуємо ідеальний квадрат по центру (аналог object-fit: cover)
            const minDim = Math.min(img.width, img.height);
            const startX = (img.width - minDim) / 2;
            const startY = (img.height - minDim) / 2;

            // 4. Малюємо обрізане фото на наш віртуальний квадрат
            ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, targetSize, targetSize);

            // 5. Генеруємо готову квадратну картинку у високій якості
            const highResSquareDataUrl = canvas.toDataURL('image/png', 1.0);

            // 6. Вставляємо в наш тег <img>
            const previewPhotoImg = document.getElementById('previewPhoto');
            if(previewPhotoImg) {
                previewPhotoImg.src = highResSquareDataUrl;
                previewPhotoImg.style.display = 'block';
                // ВАЖЛИВО: Оскільки фото вже квадратне, воно гарантовано не деформується!
                previewPhotoImg.style.width = '100%';
                previewPhotoImg.style.height = '100%';
                previewPhotoImg.style.objectFit = 'cover'; // залишаємо про всяк випадок
            }

            // Очищаємо фон, який ми додавали в минулому кроці (щоб він не дублювався)
            const photoCircle = document.querySelector('.welcome-mode .photo-circle, .birthday-mode .photo-circle');
            if(photoCircle) {
                photoCircle.style.backgroundImage = 'none';
            }
        };
        img.src = e.target.result;
    };
    fileReader.readAsDataURL(fileNode);
}

// Додати працівника
function addNewEmployee() {
    employeesData.push({ id: Date.now(), name: '', position: '', message: '', photo: '' });
    renderDynamicForms();
    syncMultiMode();
}

// Видалити працівника
function removeEmployeeItem(id) {
    if (employeesData.length <= 1) return;
    employeesData = employeesData.filter(emp => emp.id !== id);
    renderDynamicForms();
    syncMultiMode();
}

// Оновити дані
function updateEmployeeData(id, field, value) {
    const targetEmployee = employeesData.find(e => e.id === id);
    if (targetEmployee) {
        targetEmployee[field] = value;
        syncMultiMode();
    }
}

// Фото в мульти режимі (З ідеальним збереженням якості та пропорцій)
function handleMultiPhoto(id, event) {
    const fileNode = event.target.files[0];
    if (!fileNode) return;

    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        // Створюємо об'єкт зображення у пам'яті
        const img = new Image();
        img.onload = function() {
            // 1. Створюємо прихований віртуальний canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 2. Задаємо високу роздільну здатність (наприклад, 1000x1000 px)
            const targetSize = 1000;
            canvas.width = targetSize;
            canvas.height = targetSize;

            // 3. Розраховуємо ідеальний квадрат по центру
            const minDim = Math.min(img.width, img.height);
            const startX = (img.width - minDim) / 2;
            const startY = (img.height - minDim) / 2;

            // 4. Малюємо обрізане фото на наш віртуальний квадрат
            ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, targetSize, targetSize);

            // 5. Генеруємо готову квадратну картинку у високій якості
            const highResSquareDataUrl = canvas.toDataURL('image/png', 1.0);

            // 6. Знаходимо працівника і зберігаємо ВЖЕ квадратне фото
            const targetEmployee = employeesData.find(emp => emp.id === id);
            if (targetEmployee) {
                targetEmployee.photo = highResSquareDataUrl;
                syncMultiMode(); // Оновлюємо картку
            }
        };
        // Запускаємо процес завантаження картинки
        img.src = e.target.result;
    };
    fileReader.readAsDataURL(fileNode);
}

// Рендер форм
function renderDynamicForms() {
    employeesFormsContainer.innerHTML = '';

    employeesData.forEach((emp, index) => {
        const formContainer = document.createElement('div');
        formContainer.className = 'employee-form-block';

        const deleteBtnHtml = employeesData.length > 1
            ? `<button class="btn-remove" onclick="removeEmployeeItem(${emp.id})">Видалити</button>`
            : '';

        formContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong>Працівник ${index + 1}</strong>
                ${deleteBtnHtml}
            </div>
            
            <div class="form-group">
                <label>Ім'я та Прізвище:</label>
                <input type="text" value="${emp.name}" placeholder="Копичко Ілля" oninput="updateEmployeeData(${emp.id}, 'name', this.value)">
            </div>
            
            <div class="form-group">
                <label>Посада:</label>
                <input type="text" value="${emp.position}" placeholder="менеджер з маркетингу" oninput="updateEmployeeData(${emp.id}, 'position', this.value)">
            </div>

            <div class="form-group">
                <label>Досягнення (кожен рядок з нового абзацу):</label>
                <textarea rows="3" placeholder="стратегічне мислення\nаналітичні навички" oninput="updateEmployeeData(${emp.id}, 'message', this.value)">${emp.message}</textarea>
            </div>

            <div class="form-group">
                <label>Фото співробітника:</label>
                <input type="file" accept="image/*" onchange="handleMultiPhoto(${emp.id}, event)">
            </div>
        `;
        employeesFormsContainer.appendChild(formContainer);
    });
}

// Синхронізація мульти режиму
function syncMultiMode() {

    previewProbationTitle.innerText =
        probationTitleInput.value || "ВІТАЄМО!";

    previewProbationSubtitle.innerText =
        probationSubtitleInput.value ||
        "з успішним проходженням випробувального терміну";

    previewProbationSubintro.innerText =
        probationSubintroInput.value ||
        "За цей час Ви чудово продемонстрували свої сильні сторони, які б ми хотіли відзначити:";

    previewGlobalMessage.innerText =
        globalMessageInput.value;

    previewFooterMessage.innerText =
        footerMessageInput.value;

    previewGridContainer.innerHTML = '';

    employeesData.forEach(emp => {
        const gridBox = document.createElement('div');
        gridBox.className = 'preview-employee-item horizontal-item';

        // ЗМІНЕНО: Використовуємо background-image замість <img>
        const photoHtml = emp.photo
            ? `<div class="photo-circle"><img src="${emp.photo}" alt="Фото" style="width:100%; height:100%; object-fit:cover;"></div>`
            : `<div class="photo-circle placeholder-circle"></div>`;

        // Перетворюємо абзаци тексту на список з дефісами
        const bulletsHtml = emp.message
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => `<div class="bullet-item">${line}</div>`)
            .join('');

        gridBox.innerHTML = `
            ${photoHtml}
            <h3 class="emp-name">${emp.name || 'Ім’я Прізвище'}</h3>
            <p class="emp-position">(${emp.position || 'посада'})</p>
            <div class="emp-bullets">
                ${bulletsHtml}
            </div>
        `;
        previewGridContainer.appendChild(gridBox);
    });

    previewGridContainer.classList.toggle(
        "six-items",
        employeesData.length === 6
    );
}

// Завантаження
function downloadCard() {
    const originalBorder = cardElement.style.borderRadius;
    cardElement.style.borderRadius = "0";

    html2canvas(cardElement, {
        scale: 4,
        useCORS: true,
        backgroundColor: null
    }).then(generatedCanvas => {
        const downloadLink = document.createElement('a');
        downloadLink.download = 'UMO-Card.png';
        downloadLink.href = generatedCanvas.toDataURL('image/png', 1.0);
        downloadLink.click();
        cardElement.style.borderRadius = originalBorder;
    });
}

initializeApp();
