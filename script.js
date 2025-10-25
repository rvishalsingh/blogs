const blogFrame = document.getElementById("blog-frame");
const links = document.querySelectorAll(".sidebar a");

function loadBlog(blogFile) {
  blogFrame.src = blogFile;
}

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const blogFile = link.dataset.blog;
    window.location.hash = blogFile.replace(".html", "");
    loadBlog(blogFile);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function init() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    const file = `${hash}.html`;
    loadBlog(file);
  }
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  if (hash) loadBlog(`${hash}.html`);
});

init();
