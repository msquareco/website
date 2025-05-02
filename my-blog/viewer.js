console.log("Running viewer.js");

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const viewer = document.getElementById('pdf-viewer');
const buttons = document.querySelectorAll('.toggle-button');

function loadPDF(url) {
  viewer.innerHTML = ''; // Clear previous content

  pdfjsLib.getDocument(url).promise.then(pdf => {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      pdf.getPage(pageNum).then(page => {
        const canvas = document.createElement("canvas");
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
        });
      });
    }
  });
}

// Load first PDF by default
loadPDF(buttons[0].getAttribute('data-pdf'));

// Toggle logic
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    loadPDF(button.getAttribute('data-pdf'));
  });
});
