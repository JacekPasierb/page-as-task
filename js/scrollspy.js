const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const links = document.querySelectorAll(`a[href="#${entry.target.id}"]`);

      links.forEach((link) => {
        if (entry.isIntersecting) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });
  },
  {
    threshold: 0.3,
  }
);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});
