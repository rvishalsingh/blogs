// === Script to dynamically load blog content ===

const blogSection = document.getElementById("blog-section");
const links = document.querySelectorAll("#relevant-blogs a");

// Load blog content
async function loadBlog(blogFile) {
  try {
    blogSection.innerHTML = "<p>Loading...</p>";
    const res = await fetch(`blogs/${blogFile}`);
    if (!res.ok) throw new Error("Blog not found");
    const html = await res.text();
    blogSection.innerHTML = html;
  } catch (err) {
    blogSection.innerHTML = "<p>Sorry, this blog could not be loaded.</p>";
  }
}

// Load default or hash blog on page load
function init() {
  const hash = window.location.hash.substring(1);
  const defaultBlog = "blog1.html";
  loadBlog(hash ? `${hash}.html` : defaultBlog);
}

// Listen for clicks on relevant blog links
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const blogFile = link.dataset.blog;
    window.location.hash = blogFile.replace(".html", ""); // update hash
    loadBlog(blogFile);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Handle browser back/forward buttons
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  if (hash) loadBlog(`${hash}.html`);
});

// Initialize on first load
init();
