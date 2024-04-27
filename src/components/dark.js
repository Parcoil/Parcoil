document.addEventListener("astro:page-load", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check if theme preference is stored in local storage
  const currentTheme = localStorage.getItem("theme");

  // Apply theme from local storage if available
  if (currentTheme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
  }

  // Toggle theme
  themeToggle.addEventListener("click", function () {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });
});
