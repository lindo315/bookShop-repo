document.addEventListener("DOMContentLoaded", function () {
  // Slider functionality
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  let currentSlide = 0;

  function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (prevButton && nextButton) {
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
  }

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Add to quote functionality
  const addToQuoteButtons = document.querySelectorAll(".add-to-quote");
  addToQuoteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const book = this.getAttribute("data-book");
      localStorage.setItem("selectedBook", book);
      window.location.href = "quote.html";
    });
  });

  // Preview functionality
  const previewButtons = document.querySelectorAll(".preview");
  previewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const previewType = this.textContent;
      const book = this.closest(".book").querySelector("h3").textContent;
      alert(`Opening ${previewType} for ${book}`);
      // In a real application, you would open a preview modal or page here
    });
  });

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // In a real application, you would send this data to a server
      console.log("Form submitted:", { name, email, message });
      alert("Thank you for your message. We will get back to you soon!");
      this.reset();
    });
  }

  // Quote page functionality
  const quoteForm = document.getElementById("quoteForm");
  const selectedBookInfo = document.getElementById("selected-book-info");
  const bookInput = document.getElementById("bookInput");

  if (quoteForm && selectedBookInfo && bookInput) {
    const selectedBook = localStorage.getItem("selectedBook");
    if (selectedBook) {
      selectedBookInfo.textContent = `Selected Book: ${selectedBook}`;
      bookInput.value = selectedBook;
    } else {
      selectedBookInfo.textContent =
        "No book selected. Please go back and select a book.";
      quoteForm.style.display = "none";
    }

    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const name = formData.get("name");
      const surname = formData.get("surname");
      const email = formData.get("email");
      const book = formData.get("book");

      // In a real application, you would send this data to a server or email service
      console.log("Quote request submitted:", { name, surname, email, book });
      alert("Thank you for your quote request. We will get back to you soon!");
      localStorage.removeItem("selectedBook");
      window.location.href = "index.html";
    });
  }
});
