const viewer = document.getElementById("pdf-viewer");
const ctaContainer = document.getElementById("cta-container");

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

function renderPDF(url, title) {
  viewer.innerHTML = "";
  ctaContainer.innerHTML = "";

  pdfjsLib.getDocument(url).promise.then(pdf => {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      pdf.getPage(pageNum).then(page => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({ canvasContext: context, viewport }).promise.then(() => {
          viewer.appendChild(canvas);
        });
      });
    }

    // CTA after rendering
    const encoded = encodeURIComponent(`Hi, I’m interested in the launch: ${title}`);
    const cta = document.createElement("a");
    cta.href = `https://wa.me/971567570905?text=${encoded}`;
    cta.className = "cta-bubble";
    cta.textContent = "Connect on WhatsApp";
    cta.target = "_blank";
    ctaContainer.appendChild(cta);
  });
}

// Toggle event
document.querySelectorAll(".launch-btn").forEach(button => {
  button.addEventListener("click", () => {
    const file = button.getAttribute("data-pdf");
    const title = button.textContent.trim();
    renderPDF(file, title);
  });
});
// Show/hide scroll to top button
window.onscroll = function () {
  document.getElementById("topBtn").style.display = window.scrollY > 100 ? "block" : "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
