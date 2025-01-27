// Inicjalizacja IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`a[href="#${entry.target.id}"]`);
      
      // Jeżeli sekcja jest widoczna
      if (entry.isIntersecting) {
        link.classList.add('active'); // Dodaj klasę 'active'
      } else {
        link.classList.remove('active'); // Usuń klasę 'active'
      }
    });
  }, {
    threshold: 0.1 // Sekcja musi być widoczna w 10% w oknie, aby była uznana za aktywną
  });
  
  // Obserwowanie każdej sekcji
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  