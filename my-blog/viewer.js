pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const viewer = document.getElementById('pdf-viewer');
const buttons = document.querySelectorAll('.toggle-button');
const backToTopBtn = document.getElementById('back-to-top');

function createWhatsAppCTA(blogTitle) {
  const encodedTitle = encodeURIComponent(`Hi, I just read your blog: "${blogTitle}" and I’d like to know more.`);
  const cta = document.createElement('a');
  cta.href = `https://wa.me/971567570905?text=${encodedTitle}`;
  cta.target = '_blank';
  cta.className = 'whatsapp-cta';
  cta.textContent = `💬 Connect on WhatsApp about "${blogTitle}"`;
  return cta;
}

async function loadPDF(url, blogTitle) {
  viewer.innerHTML = ''; // Clear old content

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

  // Add WhatsApp CTA at the end
  const cta = createWhatsAppCTA(blogTitle);
  viewer.appendChild(cta);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getBlogTitle(pdfPath) {
  const button = [...buttons].find(btn => btn.dataset.pdf === pdfPath);
  return button ? button.textContent.trim() : 'Dubai Real Estate Blog';
}

// Load first blog on page load
const defaultPath = buttons[0].getAttribute('data-pdf');
loadPDF(defaultPath, getBlogTitle(defaultPath));

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const blogTitle = button.textContent.trim();
    loadPDF(button.getAttribute('data-pdf'), blogTitle);
  });
});

// Show back to top button
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
