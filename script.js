document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  const cvvInput = document.getElementById("cvv");
  const cardInput = document.getElementById("cardNumber");
  const validThruInput = document.getElementById("validThru");
  const termsCheckbox = document.getElementById("terms");
  const termsModal = document.getElementById("termsModal");
  const closeModal = document.querySelector(".close");

  // Function to switch between tabs
  function switchTabs(e) {
    const targetTab = e.target.dataset.tab;
    tabs.forEach((tab) => tab.classList.remove("active"));
    e.target.classList.add("active");
    contents.forEach((content) => {
      content.classList.remove("active-tab");
      if (content.id === targetTab) {
        content.classList.add("active-tab");
      }
    });
  }

  // Function to format the credit card number
  function formatCardNumber(e) {
    e.target.value = e.target.value
      .replace(/[^\d]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  // Function to limit CVV to 3 digits
  function limitCVV(e) {
    e.target.value = e.target.value.replace(/[^\d]/g, "").slice(0, 3);
  }

  // Function to format "Valid thru" input
  function formatValidThru(e) {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    e.target.value = value;
    // Set validity
    const month = parseInt(value.substring(0, 2), 10);
    if (value.length >= 2 && (month < 1 || month > 12)) {
      e.target.setCustomValidity(
        "Invalid month. Please enter a valid month (01-12)."
      );
    } else {
      e.target.setCustomValidity("");
    }
  }

  // Function to handle form submission
  function submitForm(e) {
    e.preventDefault();
    if (!termsCheckbox.checked) {
      alert("You must accept the Terms and Conditions.");
      return;
    }
    alert("Form is valid, order placed.");
  }

  // Add event listeners to tabs
  tabs.forEach((tab) => tab.addEventListener("click", switchTabs));

  // Add input formatting event listeners
  cardInput.addEventListener("input", formatCardNumber);
  cvvInput.addEventListener("input", limitCVV);
  validThruInput.addEventListener("input", formatValidThru);

  // Add form submission event listener
  document.getElementById("paymentForm").addEventListener("submit", submitForm);

	cvvTooltipTrigger.addEventListener("mouseenter", () => {
    cvvTooltip.style.display = "block";
  });
  cvvTooltipTrigger.addEventListener("mouseleave", () => {
    cvvTooltip.style.display = "none";
  });


  // Open and close terms modal
  document
    .querySelector(".terms-link")
    .addEventListener("click", () => (termsModal.style.display = "block"));
  closeModal.addEventListener(
    "click",
    () => (termsModal.style.display = "none")
  );
  window.addEventListener("click", (e) => {
    if (e.target === termsModal) {
      termsModal.style.display = "none";
    }
  });
});
