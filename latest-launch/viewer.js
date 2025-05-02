const viewer = document.getElementById("pdf-viewer");
const buttons = document.querySelectorAll(".toggle-button");

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const file = button.getAttribute("data-pdf");
    const url = `pdf/${file}`;

    viewer.innerHTML = ""; // Clear previous

    pdfjsLib.getDocument(url).promise.then(pdf => {
      for (let i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(page => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          page.render({
            canvasContext: context,
            viewport: viewport
          }).promise.then(() => {
            viewer.appendChild(canvas);
          });
        });
      }
    });
  });
});

