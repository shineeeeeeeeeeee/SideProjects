
document.getElementById('generate-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    const spinner = document.getElementById('spinner');
    const qrcodeDiv = document.getElementById('qrcode');
    const downloadContainer = document.getElementById('download-container');
    const downloadLink = document.getElementById('download-link');
    
    // clear existing QR code
    qrcodeDiv.innerHTML = '';
    downloadContainer.classList.add('hidden');
    
    // show the spinner
    spinner.classList.remove('hidden');
    
    // simulate QR Code generation delay
    setTimeout(() => {
        spinner.classList.add('hidden');
        
        // generate QR code
        const qrcode = new QRCode(qrcodeDiv, {
            text: url,
            width: parseInt(size),
            height: parseInt(size),
        });

        // extract the QR code as an image
        setTimeout(() => {
            const canvas = qrcodeDiv.querySelector('canvas');
            if (canvas) {
                const imgData = canvas.toDataURL('image/png');
                downloadLink.href = imgData;
                downloadContainer.classList.remove('hidden');
            }
        }, 100);
    }, 2000);
});
