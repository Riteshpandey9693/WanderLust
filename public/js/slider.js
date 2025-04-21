document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider-container");
  const next = document.querySelector(".arrow.right");
  const prev = document.querySelector(".arrow.left");
  const taxeShow = document.querySelector(".form-check-input");
  const links = document.querySelectorAll(".slide a");

  let currentIndex = typeof sliderIndex !== "undefined" ? sliderIndex : 0;
  let slideArrowEnd = 2;
  let checkedFilter = typeof selectedFilter !== "undefined" ? selectedFilter : "";

  // Run only if slider and arrows exist
  if (slider && next && prev) {
    function arrowVisbilityFeatures() {
      if (window.innerWidth <= 830) {
        slideArrowEnd = 6;
      } else if (window.innerWidth <= 982) {
        slideArrowEnd = 5;
      } else if (window.innerWidth <= 1114) {
        slideArrowEnd = 3;
      }

      if (currentIndex <= 0) {
        prev.classList.add("hide-arrow");
        next.classList.remove("hide-arrow");
      } else if (currentIndex >= slideArrowEnd) {
        next.classList.add("hide-arrow");
        prev.classList.remove("hide-arrow");
      } else {
        next.classList.remove("hide-arrow");
        prev.classList.remove("hide-arrow");
      }
    }

    window.addEventListener("load", () => {
      arrowVisbilityFeatures();
      slider.style.transition = `transform 0s steps()`;
      slider.style.transform = `translateX(-${currentIndex * 40}%)`;
    });

    function updateSlider() {
      slider.style.transition = `transform 0.5s ease-in-out`;
      slider.style.transform = `translateX(-${currentIndex * 40}%)`;
      arrowVisbilityFeatures();
    }

    next.addEventListener("click", () => {
      currentIndex++;
      updateSlider();
    });

    prev.addEventListener("click", () => {
      currentIndex--;
      updateSlider();
    });
  }

  if (taxeShow) {
    taxeShow.addEventListener("change", () => {
      let taxes = document.querySelectorAll("#taxerate");
      taxes.forEach((taxe) => {
        taxe.classList.toggle("hidetaxes");
      });
    });
  }

  if (links.length > 0) {
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        link.href = `${link.href}/${currentIndex}`;
      });
      if (link.innerText === checkedFilter) {
        let slide = link.parentNode;
        slide.classList.add("seletedFiter");
      }
    });
  }

  // --- Second Slider Section ---
  const secondSlider = document.querySelector("#slider");
  const leftArrow = document.querySelector("#left-arrow");
  const rightArrow = document.querySelector("#right-arrow");

  if (secondSlider && leftArrow && rightArrow) {
    const arrowVisibilityFeatures = () => {
      if (secondSlider.scrollLeft === 0) {
        leftArrow.classList.add("hidden");
      } else {
        leftArrow.classList.remove("hidden");
      }

      if (secondSlider.scrollLeft + secondSlider.offsetWidth >= secondSlider.scrollWidth) {
        rightArrow.classList.add("hidden");
      } else {
        rightArrow.classList.remove("hidden");
      }
    };

    leftArrow.addEventListener("click", () => {
      secondSlider.scrollLeft -= 100;
      arrowVisibilityFeatures();
    });

    rightArrow.addEventListener("click", () => {
      secondSlider.scrollLeft += 100;
      arrowVisibilityFeatures();
    });

    arrowVisibilityFeatures();
  }
});
