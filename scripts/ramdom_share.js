document.addEventListener("DOMContentLoaded", function () {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const imageIds = Array.from({ length: 72 }, (_, index) => index + 1);
    shuffleArray(imageIds);

    const imageTable = document.getElementById("imageTable");
    let imageCounter = 0;

    Array.from(imageTable.querySelectorAll("label")).forEach((label) => {
        if (imageCounter < imageIds.length) {
            const imageId = imageIds[imageCounter];

            const imgElement = document.createElement("img");
            imgElement.src = `faces/${imageId}.png`;

            label.dataset.imageId = imageId;
            label.appendChild(imgElement);

            imageCounter++;
        }
    });
});

function saveBoard() {
    const labels = Array.from(document.querySelectorAll("label"));
    const serializedBoard = labels.map((label) => label.dataset.imageId).join(",");
    localStorage.setItem("savedBoard", serializedBoard);

    // Copy to clipboard
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = serializedBoard;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    alert("Plateau sauvegardé et copié dans le presse-papiers !");
}

function loadBoardFromClipboard() {
    navigator.clipboard.readText().then((clipboardData) => {
        loadBoard(clipboardData);
    }).catch((err) => {
        console.error('Erreur lors de la lecture du presse-papiers :', err);
    });
}

function promptLoadBoard() {
    const inputString = prompt("Entrez la chaîne de caractères pour charger le plateau :");
    loadBoard(inputString);
}

function loadBoard(inputString) {
    const savedBoard = inputString.split(",");
    const imageTable = document.getElementById("imageTable");
    const labels = Array.from(imageTable.querySelectorAll("label"));

    savedBoard.forEach((imageId, index) => {
        if (index < labels.length) {
            const imgElement = document.createElement("img");
            imgElement.src = `faces/${imageId}.png`;

            labels[index].dataset.imageId = imageId;
            labels[index].innerHTML = '';
            labels[index].appendChild(imgElement);
        }
    });

    alert("Plateau chargé !");
}