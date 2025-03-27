document.addEventListener("DOMContentLoaded", function () {
    const frameSelector = document.getElementById("frameSelector");
    const uploadPhoto = document.getElementById("uploadPhoto");
    const canvas = document.getElementById("photoCanvas");
    const ctx = canvas.getContext("2d");
    const downloadBtn = document.getElementById("downloadBtn");

    // Tetapan awal saiz canvas
    canvas.width = 1080;
    canvas.height = 1080;

    let selectedFrame = "assets/rayaframe1.png";
    let uploadedImage = null;

    // Fungsi untuk kemaskini paparan
    function updatePreview() {
        const frameImage = new Image();
        frameImage.src = selectedFrame;
        frameImage.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (uploadedImage) {
                ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        };
    }

    // Tukar bingkai bila dropdown berubah
    frameSelector.addEventListener("change", function () {
        selectedFrame = "assets/" + frameSelector.value;
        updatePreview();
    });

    // Muat naik gambar
    uploadPhoto.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                uploadedImage = new Image();
                uploadedImage.src = e.target.result;
                uploadedImage.onload = function () {
                    updatePreview();
                };
            };
            reader.readAsDataURL(file);
        }
    });

    // Fungsi untuk muat turun gambar
    downloadBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "photo_with_frame.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });

    updatePreview(); // Pastikan frame awal dipaparkan
});
