// ==UserScript==
// @name         [Neopets] Half Price Day Tracker
// @version      0.1
// @description  Adds text to the top of restocking pages with a countdown to the next half price day.
// @author       BanksiaFox
// @match        https://www.neopets.com/objects.phtml?obj_type=*&type=shop
// @match        https://www.neopets.com/objects.phtml?type=shop&obj_type=*
// @icon         https://www.neopets.com//favicon.ico
// ==/UserScript==

// Array of image URLs
const imageURL = [
  "https://images.neopets.com/new_shopkeepers/t_952.gif",
  "https://images.neopets.com/new_shopkeepers/t_974.gif",
  "https://images.neopets.com/new_shopkeepers/t_1078.gif",
  "https://images.neopets.com/new_shopkeepers/t_978.gif",
  "https://images.neopets.com/new_shopkeepers/t_1259.gif",
  "https://images.neopets.com/new_shopkeepers/t_1305.gif"
];

// Function to calculate the next half price day
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

(function addHPDTracker() {
  'use strict';
  const tracker = document.querySelector('p.shop-info');

  if (tracker) {
    const daysToHPD = calculateDaysToHPD();
    const randomImage = getRandomImageURL();
    const hpdText = daysToHPD === 0
      ? `<table><tr><td><img src="${randomImage}"></td><td>Today is <u>half price day!</u><br>Everything is 50% off.</td></tr></table>`
      : `<i>The next half price day is <b>${daysToHPD}</b> days away.</i>`;

    tracker.innerHTML = `<center>${hpdText}</center>`;
  }
})();
