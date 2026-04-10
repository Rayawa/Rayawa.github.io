(function() {
    var modal = document.getElementById('pdfModal');
    if (!modal) return;

    var canvas = document.getElementById('pdfCanvas');
    var ctx = canvas.getContext('2d');
    var currentPage = 1;
    var totalPages = 1;
    var pdfDoc = null;
    var scale = 1.5;
    var rendering = false;

    var titleEl = document.getElementById('pdfModalTitle');
    var currentEl = document.getElementById('pdfCurrentPage');
    var totalEl = document.getElementById('pdfTotalPages');
    var downloadEl = document.getElementById('pdfDownload');

    function renderPage(num) {
        if (!pdfDoc || rendering) return;
        rendering = true;
        pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport({ scale: scale });
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            var renderCtx = { canvasContext: ctx, viewport: viewport };
            page.render(renderCtx).promise.then(function() {
                rendering = false;
                currentEl.textContent = num;
            });
        });
    }

    function openPdf(url, title) {
        titleEl.textContent = title || '';
        downloadEl.href = url;
        downloadEl.download = url.split('/').pop();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        pdfjsLib.getDocument(url).promise.then(function(pdf) {
            pdfDoc = pdf;
            totalPages = pdf.numPages;
            totalEl.textContent = totalPages;
            currentPage = 1;
            renderPage(currentPage);
        }).catch(function(err) {
            console.error('PDF load error:', err);
            window.open(url, '_blank');
            closePdf();
        });
    }

    function closePdf() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        pdfDoc = null;
        currentPage = 1;
    }

    document.getElementById('pdfClose').addEventListener('click', closePdf);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) closePdf();
    });

    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('is-open')) return;
        if (e.key === 'Escape') closePdf();
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentPage > 1) { currentPage--; renderPage(currentPage); }
        }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentPage < totalPages) { currentPage++; renderPage(currentPage); }
        }
    });

    document.getElementById('pdfPrev').addEventListener('click', function() {
        if (currentPage > 1) { currentPage--; renderPage(currentPage); }
    });

    document.getElementById('pdfNext').addEventListener('click', function() {
        if (currentPage < totalPages) { currentPage++; renderPage(currentPage); }
    });

    document.getElementById('pdfZoomIn').addEventListener('click', function() {
        scale = Math.min(scale + 0.3, 4);
        renderPage(currentPage);
    });

    document.getElementById('pdfZoomOut').addEventListener('click', function() {
        scale = Math.max(scale - 0.3, 0.5);
        renderPage(currentPage);
    });

    document.querySelectorAll('.pdf-viewer-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var pdfUrl = btn.getAttribute('data-pdf');
            var pdfTitle = btn.closest('.thesis-card, .doc-card')?.querySelector('h3')?.textContent || '';
            if (pdfUrl) openPdf(pdfUrl, pdfTitle);
        });
    });
})();
