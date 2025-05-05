// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

// Get DOM elements
const viewer = document.getElementById("pdf-viewer") || document.getElementById("pdf-canvas")?.parentElement;
const ctaContainer = document.getElementById("cta-container");

// Main PDF rendering function
function renderPDF(url, title) {
  viewer.innerHTML = "";
  if (ctaContainer) ctaContainer.innerHTML = "";

  pdfjsLib.getDocument(url).promise.then(async (pdf) => {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
      viewer.appendChild(canvas);
    }

    // CTA after rendering (optional)
    if (ctaContainer) {
      const encoded = encodeURIComponent(`Hi, I’m interested in the launch: ${title}`);
      const cta = document.createElement("a");
      cta.href = `https://wa.me/971567570905?text=${encoded}`;
      cta.className = "cta-bubble";
      cta.textContent = "Connect on WhatsApp";
      cta.target = "_blank";
      ctaContainer.appendChild(cta);
    }
  });
}

// Toggle event
document.querySelectorAll(".pdf-button").forEach((button) => {
  button.addEventListener("click", () => {
    const file = button.getAttribute("data-pdf");
    const title = button.textContent.trim();
    renderPDF(file, title);
  });
});

// Scroll-to-top behavior
window.onscroll = function () {
  const btn = document.getElementById("topBtn");
  if (btn) btn.style.display = window.scrollY > 100 ? "block" : "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
