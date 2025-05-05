pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

const canvas = document.getElementById("pdf-canvas");
const context = canvas.getContext("2d");

function renderPDF(url) {
  // Clear canvas visually
  context.clearRect(0, 0, canvas.width, canvas.height);

  pdfjsLib.getDocument(url).promise.then(pdf => {
    console.log("PDF loaded:", url);

    // Load the first page
    return pdf.getPage(1).then(page => {
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      return page.render(renderContext).promise;
    });
  }).catch(err => {
    console.error("Failed to load PDF:", err.message);
    alert("⚠️ Failed to load the PDF. Check file path or name.");
  });
}

document.querySelectorAll(".pdf-button").forEach(button => {
  button.addEventListener("click", () => {
    const file = button.getAttribute("data-pdf");
    renderPDF(file);
  });
});

window.onscroll = function () {
  document.getElementById("topBtn").style.display =
    window.scrollY > 100 ? "block" : "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
