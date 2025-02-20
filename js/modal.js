const modal = document.getElementById("myModal");
const modalButton = document.getElementById("toggleModalButton");
const body = document.body;

modalButton.addEventListener("click", function () {
  if (modal.style.display === "block") {
    modal.style.display = "none";
    body.classList.toggle("no-scroll");
  } else {
    modal.style.display = "block";
    body.classList.toggle("no-scroll");
  }
});

modal.addEventListener("click", () => {
  if ((modal.style.display = "block")) {
    modal.style.display = "none";
    body.classList.remove("no-scroll");
  }
});
