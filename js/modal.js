const modal = document.getElementById("myModal");
const modalButton = document.getElementById("toggleModalButton");

modalButton.addEventListener("click", function () {
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
});

modal.addEventListener("click", () => {
  if ((modal.style.display = "block")) {
    modal.style.display = "none";
  }
});
