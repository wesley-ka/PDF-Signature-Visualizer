const url = './assets/signed-document.pdf';

const pdfContainer = document.getElementById('pdf-container');
const signatureInfo = document.getElementById('signature-info');
const downloadButton = document.getElementById('download-button');

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

async function renderPDF(url) {
  const loadingTask = pdfjsLib.getDocument(url);
  const pdf = await loadingTask.promise;

  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  pdfContainer.appendChild(canvas);

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await page.render(renderContext);
}

async function loadSignatureInfo(url) {
  // Example placeholder for fetching and displaying signature info
  // Replace with actual logic to read signature using pdf-lib or another solution
  const signatureData = 'Signature: John Doe\nDate: 2025-01-10';
  signatureInfo.innerText = signatureData;
}

function setupDownloadButton(url) {
  downloadButton.addEventListener('click', () => {
    window.open(url, '_blank');
  });
}

renderPDF(url);
loadSignatureInfo(url);
setupDownloadButton(url);
