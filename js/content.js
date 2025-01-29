document.addEventListener("DOMContentLoaded", () => {
  const ingredients = [
    {
      icon: "icon-biotech",
      name: "Siarczan glukozaminy",
      quantity: "650 mg",
      description:
        "Glukozamina jest naturalnym składnikiem chrząstki. Dodatek glukozaminy przyczynia się do zwiększenia produkcji glikozaminoglikanów (m.in. siarczanu keratanu, heparanu, kwasu hialuronowego), które pomagają w odbudowie chrząstki, co jest szczególnie korzystne dla zwierząt ze zmianami zwyrodnieniowymi stawów.",
    },
    {
      icon: "icon-grass",
      name: "Czarci pazur",
      quantity: "250 mg",
      description:
        "Czarci pazur jest rośliną, która ma właściwości przeciwzapalne i przeciwbólowe. Może to pomóc zwierzętom, które doświadczają bólu i stanu zapalnego związanego z problemami ze stawami.",
    },
    {
      icon: "icon-biotech",
      name: "Siarczan chondroityny",
      quantity: "300 mg",
      description:
        "Chondroityna, podobnie jak glukozamina, jest składnikiem chrząstki. Chondroityna pomaga zwalczać enzymy, które niszczą chrząstkę, a także pomaga chrząstce zatrzymać wodę, co jest ważne dla jej sprężystości i absorpcji wstrząsów.",
    },
    {
      icon: "icon-C",
      name: "Witamina C",
      quantity: "50 mg",
      description:
        "Witamina C jest potężnym przeciwutleniaczem, który może pomóc w ochronie stawów poprzez neutralizację wolnych rodników, które mogą uszkadzać chrząstkę. Ponadto, witamina C odgrywa ważną rolę w produkcji kolagenu, kluczowego składnika chrząstki.",
    },
    {
      icon: "icon-science",
      name: "Kwas hialuronowy",
      quantity: "50 mg",
      description:
        "Kwas hialuronowy jest kluczowym składnikiem płynu stawowego, który działa jak smar i amortyzator dla stawów. Suplementacja kwasem hialuronowym może pomóc w utrzymaniu prawidłowej objętości i konsystencji płynu stawowego.",
    },
    {
      icon: "icon-device_hub",
      name: "MSM",
      quantity: "250 mg",
      description:
        "Metylosulfonylometan, czyli MSM, to naturalny związek siarki, który pomaga w utrzymaniu zdrowych stawów poprzez zmniejszenie stanu zapalnego i bólu. MSM może również pomagać w produkcji kolagenu, co przyczynia się do zdrowia chrząstki stawowej.",
    },
    {
      icon: "icon-opacity",
      name: "Syrop glukozowo - fruktozowy",
      quantity: "250 mg",
      description: "",
    },
  ];

  const ingredientList = document.querySelector(".ingredients");

  const effectsHTML = `
    <img src="./images/effects/effect3.png" width="140" height="190" alt="efekt tła" class="effect3" />
    <img src="./images/effects/effect4.png" width="140" height="190" alt="efekt tła" class="effect4" />
  `;

  const fragment = document.createDocumentFragment();
  ingredients.forEach((ingredient, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("ingredient-item");
    let iconElement;
    if (window.innerWidth >= 768) {
      iconElement = `<div class="icon-circle" role="img" aria-label="${ingredient.name} icon"></div>`;
    } else {
      iconElement = `
                  <svg width="40px" height="40px" role="img" aria-label="${ingredient.name} icon">
                    <use
                      class="mobile-menu--icon-close"
                      href="./images/icons/icons.svg#${ingredient.icon}"
                    ></use>
                  </svg>
                `;
    }

    listItem.innerHTML = `
  
                 ${iconElement}
              <h3>${ingredient.name}</h3>
              <p>${ingredient.quantity}</p>
              <p>${ingredient.description}</p>
              ${effectsHTML}
              `;

    fragment.appendChild(listItem);
  });
  ingredientList.appendChild(fragment);

  // Dodatkowo dodajemy event listener, aby dynamicznie dostosować ikonę przy zmianie rozmiaru okna
  window.addEventListener(
    "resize",
    debounce(() => {
      const ingredientItems = document.querySelectorAll(".ingredient-item");
      const isDesktop = window.innerWidth >= 768;

      ingredientItems.forEach((item, index) => {
        const iconElement = item.querySelector(".icon-circle, svg");
        const shouldUpdateIcon =
          (isDesktop && iconElement?.tagName !== "DIV") ||
          (!isDesktop && iconElement?.tagName !== "SVG");

        if (shouldUpdateIcon) {
          const iconHTML = isDesktop
            ? `<div class="icon-circle" role="img" aria-label="${ingredients[index].name} icon"></div>`
            : `<svg width="40px" height="40px" role="img" aria-label="${ingredients[index].name} icon">
              <use href="./images/icons/icons.svg#${ingredients[index].icon}"></use>
            </svg>`;

          // Aktualizuj tylko ikonę, zachowując resztę contentu
          const currentContent = item.innerHTML;
          item.innerHTML = currentContent.replace(
            /<div class="icon-circle">.*?<\/div>|<svg.*?<\/svg>/,
            iconHTML
          );
        }
      });
    }, 250)
  );
});

// Funkcja debounce do ograniczenia liczby wywołań
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
