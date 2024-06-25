const body = document.querySelector("body");
const headerNav = document.querySelector(".header__nav");
const logo = document.querySelector(".logo");
const navLinks = document.querySelectorAll(".header__nav-link");
const burgerBtn = document.querySelector(".burger-btn");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("burger-btn--active");
  headerNav.classList.toggle("active");
  body.classList.toggle("disable-scroll");
});

function deactivationMenu() {
  body.classList.remove("disable-scroll");
  burgerBtn.classList.remove("burger-btn--active");
  headerNav.classList.remove("active");
}

logo.addEventListener("click", () => {
  deactivationMenu();
});

function moveElementAfter(elementSelector, targetSelector, conditionWidth) {
  const element = document.querySelector(elementSelector);
  const targetElement = document.querySelector(targetSelector);

  if (!element || !targetElement) {
    console.error("No elements found");
    return;
  }

  if (!element.originalParent) {
    element.originalParent = element.parentNode;
  }

  const originalParent = element.originalParent;

  if (window.innerWidth <= conditionWidth) {
    targetElement.parentNode.insertBefore(element, targetElement.nextSibling);
  } else {
    originalParent.appendChild(element);
  }
}

function moveElementBefore(elementSelector, targetSelector, conditionWidth) {
  const element = document.querySelector(elementSelector);
  const targetElement = document.querySelector(targetSelector);

  if (!element || !targetElement) {
    console.error("No elements found");
    return;
  }

  if (!element.originalParent) {
    element.originalParent = element.parentNode;
    element.originalNextSibling = element.nextSibling;
  }

  const originalParent = element.originalParent;
  const originalNextSibling = element.originalNextSibling;

  if (window.innerWidth <= conditionWidth) {
    targetElement.parentNode.insertBefore(element, targetElement);
  } else {
    if (originalNextSibling) {
      originalParent.insertBefore(element, originalNextSibling);
    } else {
      originalParent.appendChild(element);
    }
  }
}

moveElementBefore(".header__nav-actions", ".burger-btn", 1120);

window.addEventListener("resize", () => {
  moveElementBefore(".header__nav-actions", ".burger-btn", 1120);
});

moveElementAfter(".actions", ".header__nav-list", 1120);

window.addEventListener("resize", () => {
  moveElementAfter(".actions", ".header__nav-list", 1120);
});

function scrollToEnd() {
  const scrollableElement = document.querySelector(".breadcrumbs__list");
  scrollableElement.scrollLeft = scrollableElement.scrollWidth;
}

scrollToEnd();

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    deactivationMenu();
  });
});

window.addEventListener("resize", () => {
  scrollToEnd();
  if (window.innerWidth > 992) {
    deactivationMenu();
  }
});

const digestSlider = new Swiper(".digest__slider", {
  enabled: false,
  slidesPerView: "auto",
  spaceBetween: 0,
  initialSlide: 0,
  keyboard: {
    enabled: true,
  },

  direction: "horizontal",
  enabled: true,
  spaceBetween: 10,
});

const tabsSlider = new Swiper(".tab-buttons", {
  enabled: false,
  slidesPerView: "auto",
  spaceBetween: 0,
  initialSlide: 1,
  keyboard: {
    enabled: true,
  },

  direction: "horizontal",
  enabled: true,
});

const tabButtons = document.querySelectorAll(".tab-buttons__btn");
const tabs = document.querySelectorAll(".tabs__item");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.getAttribute("data-tab");

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    tabs.forEach((tab) => {
      if (tab.getAttribute("data-tab") === tabName) {
        tab.style.display = "block";
      } else {
        tab.style.display = "none";
      }
    });
  });
});

document.getElementById("month-select").addEventListener("change", function () {
  const selectedMonth = this.value;
  const rows = document.querySelectorAll("#table-body tr");
  const mobileDataContainer = document.getElementById("mobile-table");
  mobileDataContainer.innerHTML = "";

  rows.forEach((row) => {
    if (row.getAttribute("data-month") === selectedMonth) {
      mobileDataContainer.innerHTML = `
							<div class="mobile-table__wrapper">
									<div class="mobile-table__item"><div class="mobile-table__item-title">Minimum Price</div><div class="mobile-table__item-value">${row.cells[1].innerText}</div></div>
										<div class="mobile-table__item"><div class="mobile-table__item-title">Maximum Price</div><div class="mobile-table__item-value">${row.cells[2].innerText}</div></div>
											<div class="mobile-table__item"><div class="mobile-table__item-title">Average Price</div><div class="mobile-table__item-value">${row.cells[3].innerText}</div></div>
							</div>
					`;
    }
  });
});

// Trigger change event on page load to show data for the first month
document.getElementById("month-select").dispatchEvent(new Event("change"));

var historicalData = [24000, 28000, 25000, 32000, 44000, 51000, 65000];
var forecastedData = [
  null,
  null,
  null,
  null,
  null,
  null,
  65000,
  72000,
  72000,
  79000,
  76000,
  76000,
  79000,
];

var months = [
  "12/23",
  "01/24",
  "02/24",
  "03/24",
  "04/24",
  "05/24",
  "06/24",
  "07/24",
  "08/24",
  "09/24",
  "10/24",
  "11/24",
  "12/24",
];

var ctx = document.getElementById("myChart").getContext("2d");

var gradientHistorical = ctx.createLinearGradient(0, 0, 0, 400);
gradientHistorical.addColorStop(0, "rgba(24, 115, 235, 0.35)");
gradientHistorical.addColorStop(1, "rgba(24, 115, 235, 0)");

var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: months,
    datasets: [
      {
        label: "Historical",
        data: historicalData,
        borderColor: "#1873EB",
        backgroundColor: gradientHistorical,
        borderWidth: 3,
        pointRadius: 0,
        fill: true,
        lineTension: 0,
      },
      {
        label: "Forecasted",
        data: forecastedData,
        borderColor: "#9C4FFF",
        backgroundColor: "#FFFFFF",
        borderWidth: 3,
        pointRadius: 0,
        borderDash: [5, 5],
        fill: false,
        lineTension: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: true,
          autoSkipPadding: 20,
          fontSize: 12,
        },
      },
      y: {
        // beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          font: {
            size: 14,
            lineHeight: 30,
            weight: "600",
          },
          color: "#4F4F4F",
          boxWidth: 16,
          boxHeight: 16,
          padding: 16,
        },
      },

      annotation: {
        annotations: {
          line1: {
            type: "line",
            xMin: "06/24",
            xMax: "06/24",
            borderColor: "#4D4D4D",
            borderWidth: 1,
            borderDash: [5, 5],
          },
        },
      },
    },
  },
});
