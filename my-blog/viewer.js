console.log("Running viewer.js");

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const viewer = document.getElementById('pdf-viewer');
const buttons = document.querySelectorAll('.toggle-button');

async function loadPDF(url) {
  viewer.innerHTML = ''; // Clear existing pages

  const pdf = await pdfjsLib.getDocument(url).promise;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext('2d');

    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    viewer.appendChild(canvas);
  }
}

// Load first PDF initially
loadPDF(buttons[0].getAttribute('data-pdf'));

// Toggle functionality
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    loadPDF(button.getAttribute('data-pdf'));
  });
});
