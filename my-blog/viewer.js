const url = 'pdf/DXB RE Investment Forecast 2025.pdf'; // Update this for different blogs

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.js';

const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(pdf => {
  const viewer = document.getElementById('pdf-viewer');

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
