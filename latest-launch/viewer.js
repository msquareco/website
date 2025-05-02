const viewer = document.getElementById('pdf-viewer');
const buttons = document.querySelectorAll('.toggle-button');

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const pdfPath = 'pdf/' + button.getAttribute('data-pdf');
    viewer.innerHTML = ''; // Clear viewer

    pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const scale = 1.5;
          const viewport = page.getViewport({ scale: scale });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          page.render(renderContext).promise.then(() => {
            viewer.appendChild(canvas);
            if (pageNum === pdf.numPages) {
              const cta = document.createElement('a');
              cta.href = `https://wa.me/971567570905?text=I'm%20interested%20in%20${encodeURIComponent(button.textContent)}%20launch`;
              cta.textContent = "📩 Connect on WhatsApp";
              cta.className = "inline-cta";
              cta.target = "_blank";
              viewer.appendChild(cta);
            }
          });
        });
      }
    });
  });
});
