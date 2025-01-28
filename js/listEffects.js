document.addEventListener("DOMContentLoaded", () => {
  const effects = [
    "Wsparcie rozwoju chrząstki stawowej",
    "Działanie chondroprotekcyjne",
    "Zmniejszenie stanu zapalnego i bólu",
    "Wzmocnienie stawów",
    "Ochrona przed mikrourazami",
    "Regeneracja po urazach i zabiegach ortopedycznych",
    "Poprawa jakości życia",
  ];

  const effectList = document.querySelector(".effect__list");

  effects.forEach((effect, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
              <div class="number-box"><p>${index + 1}</p></div>
              <p>${effect}</p>
            `;

    effectList.appendChild(listItem);
  });
});
