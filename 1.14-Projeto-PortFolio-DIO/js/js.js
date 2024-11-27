document.getElementById("skills-button").addEventListener("click", function() {
    toggleVisibility("skills-content");
  });
  document.getElementById("idiomas-button").addEventListener("click", function() {
    toggleVisibility("idiomas-content");
  });
  document.getElementById("portfolio-button").addEventListener("click", function() {
    toggleVisibility("portfolio-content");
  });
  document.getElementById("experiencia-button").addEventListener("click", function() {
    toggleVisibility("experiencia-content");
  });

  function toggleVisibility(elementId) {
    var element = document.getElementById(elementId);
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }