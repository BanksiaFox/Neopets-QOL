// ==UserScript==
// @name         [Neopets] Lazy Concerts
// @version      2026-07-20
// @description  Adds buttons to the ticket booth and concert hall to travel between them. Because I'm obsessively neat about my open tabs. Enjoy!
// @author       BanksiaFox
// @updateURL    https://github.com/BanksiaFox/Neopets-QOL/raw/main/lazy-concerts.js
// @match        https://www.neopets.com/prehistoric/ticketbooth.phtml*
// @match        https://www.neopets.com/prehistoric/concerthall*.phtml
// @icon         https://images.neopets.com/images/buddy/aim_aisha_disco.gif
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////////////////
// Next update: Substitute embedded Flash player with conditional rotating band images //
/////////////////////////////////////////////////////////////////////////////////////////

(function() {
    'use strict';

    // copy from existing button
    const currentURL = window.location.href;
    const plateauForm = [...document.forms].find(
        f => f.action && f.action.includes('/prehistoric/plateau.phtml')
    );

    // text and links for new buttons
    function getButtonConfig(url) {
        const overrides = [
            { match: '/ticketbooth', action: '/prehistoric/concerthall.phtml', label: 'Go to the Concert Hall' },
            { match: '/concerthall', action: '/prehistoric/ticketbooth.phtml', label: 'Go to the Ticket Booth' },
        ];

        for (const o of overrides) {
            if (url.includes(o.match)) return { action: o.action, label: o.label };
        }

        return { action: '/prehistoric/concerthall.phtml', label: 'Go to the Concert Hall' };
    }

    const cfg = getButtonConfig(currentURL);

    if (plateauForm) {
        plateauForm.insertAdjacentHTML(
            'beforebegin',
            `<p><form action='${cfg.action}' method='post'><input type='submit' value='${cfg.label}'></form></p>`
        );
    }

    // custom favicon because I have too many pinned tabs :-)
    const newIconURL = 'https://images.neopets.com/images/buddy/aim_krawk_raver.gif';

    function setFavicon(url) {
        document.querySelectorAll('link[rel*="icon"]').forEach(e => e.remove());
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = url;
        document.head.appendChild(link);
    }

    setFavicon(newIconURL);
    window.addEventListener('DOMContentLoaded', () => setFavicon(newIconURL));

})();