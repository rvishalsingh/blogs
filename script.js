const blogFrame = document.getElementById("blog-frame");
const links = document.querySelectorAll(".sidebar a");

function loadBlog(blogFile) {
  blogFrame.src = blogFile;
}

// Adjust iframe height to fit content
blogFrame.onload = function () {
  try {
    const iframeDoc = blogFrame.contentDocument || blogFrame.contentWindow.document;
    blogFrame.style.height = iframeDoc.body.scrollHeight + 30 + "px"; // +30 for padding/margin
  } catch (err) {
    console.warn("Could not access iframe content height:", err);
  }
};

// Handle link clicks
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const blogFile = link.dataset.blog;
    window.location.hash = blogFile.replace(".html", "");
    loadBlog(blogFile);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Load blog based on URL hash
function init() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    const file = `${hash}.html`;
    loadBlog(file);
  }
}

// Handle back/forward buttons
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  if (hash) loadBlog(`${hash}.html`);
});

// Initialize on page load
init();
