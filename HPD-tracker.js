// ==UserScript==
// @name         [Neopets] Half Price Day Tracker
// @version      2026-03-16
// @description  Adds text to restocking pages with a countdown to the next half price day.
// @author       BanksiaFox
// @downloadURL  https://github.com/BanksiaFox/Neopets-QOL/raw/main/HPD-tracker.js
// @match        https://www.neopets.com/objects.phtml?obj_type=*&type=shop
// @match        https://www.neopets.com/objects.phtml?type=shop&obj_type=*
// @icon         https://images.neopets.com/images/buddy/aim_aisha_chocolate.gif
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////
// Next update: Add a toggle for the embedded image so users can disable //
///////////////////////////////////////////////////////////////////////////

// Array of image URLs
const imageURL = [
  "https://images.neopets.com/new_shopkeepers/t_952.gif",
  "https://images.neopets.com/new_shopkeepers/t_974.gif",
  "https://images.neopets.com/new_shopkeepers/t_1078.gif",
  "https://images.neopets.com/new_shopkeepers/t_978.gif",
  "https://images.neopets.com/new_shopkeepers/t_1259.gif",
  "https://images.neopets.com/new_shopkeepers/t_1305.gif"
];

// Calculate the next half price day
function calculateDaysToHPD() {
  const NST = 'America/Los_Angeles';
  const today = new Date(new Intl.DateTimeFormat('en-US', { timeZone: NST }).format());
  const HPD_DATE = 3;
  let hpd = new Date(today.getFullYear(), today.getMonth(), HPD_DATE);

  if (today > hpd) {
    hpd.setMonth(hpd.getMonth() + 1);
  }

  const timeDiff = hpd - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

function getRandomImageURL() {
  return imageURL[Math.floor(Math.random() * imageURL.length)];
}

// Append after inflation paragraph
(function () {
  function addHPDTracker() {
    const ps = document.querySelectorAll("p.shop-info");
    if (ps.length < 2) return false;

    const target = ps[1]; // second <p class="shop-info"> not the first instance

    const daysToHPD = calculateDaysToHPD();
    // ONLY FOR TESTING HPD
    // const daysToHPD = 0;
    const randomImage = getRandomImageURL();
    const HPDtext = daysToHPD === 0
      ? `<table style="margin: 0 auto;"><tr><td><img src="${randomImage}"></td><td>Today is <u>half price day!</u><br>Everything is 50% off.</td></tr></table>`
      : `The next half price day is <b>${daysToHPD}</b> days away...`;

    target.appendChild(document.createElement("span"));
    target.insertAdjacentHTML("beforeend", HPDtext);

    return true;
  }

  if (!addHPDTracker()) {
    const observer = new MutationObserver(() => {
      if (addHPDTracker()) observer.disconnect();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
