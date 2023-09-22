function displayResizedEventImg() {
    const imageInput = document.getElementById('event-img-input');
    const canvas = document.getElementById('event-img-preview');
    const ctx = canvas.getContext('2d');

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;

            // 원하는 크기로 이미지를 조절
            const maxWidth = 300; // 변경할 최대 너비
            const maxHeight = 300; // 변경할 최대 높이

            img.onload = function() {
                let newWidth = img.width;
                let newHeight = img.height;

                // 이미지 크기 조절
                if (img.width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = (img.height * maxWidth) / img.width;
                }

                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = (img.width * maxHeight) / img.height;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(img, 0, 0, newWidth, newHeight);
            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(imageInput.files[0]);
    }
}

function displayResizedEventDetailImg() {
    const imageInput = document.getElementById('event-detail-img-input');
    const canvas = document.getElementById('event-detail-img-preview');
    const ctx = canvas.getContext('2d');

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;

            // 원하는 크기로 이미지를 조절
            const maxWidth = 300; // 변경할 최대 너비
            const maxHeight = 300; // 변경할 최대 높이

            img.onload = function() {
                let newWidth = img.width;
                let newHeight = img.height;

                // 이미지 크기 조절
                if (img.width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = (img.height * maxWidth) / img.width;
                }

                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = (img.width * maxHeight) / img.height;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(img, 0, 0, newWidth, newHeight);
            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(imageInput.files[0]);
    }
}