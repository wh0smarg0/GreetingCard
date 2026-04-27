function generate() {
    const type = document.getElementById("templateType").value;
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const message = document.getElementById("message").value;
    const file = document.getElementById("photo").files[0];

    const card = document.getElementById("card");

    // змінюємо шаблон
    card.classList.remove("welcome", "birthday");
    card.classList.add(type);

    // заголовок
    document.getElementById("title").innerText =
        type === "welcome" ? "ЛАСКАВО ПРОСИМО" : "З ДНЕМ НАРОДЖЕННЯ";

    // текст
    document.getElementById("previewName").innerText = name;
    document.getElementById("previewPosition").innerText = position;
    document.getElementById("previewMessage").innerText = message;

    // фото
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("previewPhoto").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function download() {
    html2canvas(document.getElementById("card")).then(canvas => {
        const link = document.createElement("a");
        link.download = "umo-card.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
