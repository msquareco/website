const viewer = document.getElementById("pdf-viewer");
const buttons = document.querySelectorAll(".toggle-button");

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const file = button.getAttribute("data-pdf");
    const url = `pdf/${file}`;
    viewer.innerHTML = "";

    pdfjsLib.getDocument(url).promise.then(pdf => {
      const renderPage = (pageNum) => {
        pdf.getPage(pageNum).then(page => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          const fixedWidth = 800;
          const viewport = page.getViewport({ scale: 1 });
          const scale = fixedWidth / viewport.width;
          const scaledViewport = page.getViewport({ scale });

          canvas.width = scaledViewport.width;
          canvas.height = scaledViewport.height;

          page.render({
            canvasContext: context,
            viewport: scaledViewport
          }).promise.then(() => {
            viewer.appendChild(canvas);
            if (pageNum < pdf.numPages) {
              renderPage(pageNum + 1);
            } else {
              const cta = document.createElement("a");
              cta.href = `https://wa.me/971567570905?text=I'm%20interested%20in%20the%20project:%20${encodeURIComponent(file)}`;
              cta.target = "_blank";
              cta.className = "inline-cta";
              cta.innerHTML = "📩 Connect on WhatsApp";
              viewer.appendChild(cta);
            }
          });
        });
      };

      renderPage(1);
    });
  });
});
