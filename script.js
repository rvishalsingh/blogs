// === Script to dynamically load blog content ===

const blogSection = document.getElementById("blog-section");
const links = document.querySelectorAll("#relevant-blogs a");

// Load the selected blog into the main section
async function loadBlog(blogFile) {
  try {
    blogSection.style.opacity = "0.5";
    blogSection.innerHTML = "<p>Loading...</p>";

    const res = await fetch(blogFile);
    if (!res.ok) throw new Error("Blog not found");

    const html = await res.text();
    blogSection.innerHTML = html;
  } catch (err) {
    blogSection.innerHTML = "<p>Sorry, this blog could not be loaded.</p>";
  } finally {
    blogSection.style.opacity = "1";
  }
}

// On first page load
function init() {
  const hash = window.location.hash.substring(1);
  const defaultBlog = "blog1.html";
  const blogToLoad = hash ? `${hash}.html` : defaultBlog;
  loadBlog(blogToLoad);
}

// When user clicks on a relevant blog link
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const blogFile = link.dataset.blog;
    window.location.hash = blogFile.replace(".html", ""); // update hash in URL
    loadBlog(blogFile);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Handle browser back/forward button navigation
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  if (hash) loadBlog(`${hash}.html`);
});

// Initialize
init();
