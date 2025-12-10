document.addEventListener('DOMContentLoaded', function() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      this.classList.toggle('active');

      if (content.style.height && content.style.height !== '0px') {
        // Close
        content.style.height = content.scrollHeight + 'px'; // set to current height for transition
        setTimeout(() => {
          content.style.height = '0px';
        }, 10);
      } else {
        // Open
        content.style.height = content.scrollHeight + 'px';
      }
    });
  });
});

const routes = {
    '/': 'home.html',
    '/services.html': 'services.html',
    '/contact.html': 'contact.html',
    '/gallery.html': 'gallery.html',
    '/booking.html': 'booking.html'
};

function loadPage(url) {
    const path = url === '/' ? '/' : url;
    const file = routes[path] || 'home.html';
    fetch(file)
        .then(res => res.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            initializeAccordion(); // Re-initialize accordion if needed
        });
}

function navigateTo(url) {
    history.pushState(null, null, url);
    loadPage(url);
}

document.addEventListener('DOMContentLoaded', () => {
    // Intercept navigation
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            navigateTo(url);
        });
    });

    // Initial load
    loadPage(location.pathname);

    // Handle browser navigation (back/forward)
    window.addEventListener('popstate', () => {
        loadPage(location.pathname);
    });

    initializeAccordion();
});

