const { ipcRenderer } = require('electron');

class Pages {
    // { id: {onShow, onHide} }
    static knownPages = { };
    // { id: id, onHide: onHide }
    static currentPage = null;
    // { id: {onHide, hideByShow} }
    static shownPopups = {};

    // Sets ID to display as 'block', and registers ID with onHideEvent

    // Sets ID to display as 'block'
    static SetVisByID(id = '', show = true) {
        const element = document.getElementById(id);
        element.style.display = show ? 'block':'none';
    }

    // Adds ID and events to known pages
    static LinkPage(id = '', onShowEvent = () => {}, onHideEvent = () => {}) {
        Pages.knownPages[id] = { onShow: onShowEvent, onHide: onHideEvent };
        Pages.SetVisByID(id, false);
    }

    // Displays a Popup
    static ShowPopup(id = '', onShowEvent = () => {}, onHideEvent = () => {}, hideOtherPopups = true, hideByOtherPopups = true) {
        if (hideOtherPopups) Pages.HideAllPopups();
        Pages.shownPopups[id] = { hideEvent: onHideEvent, hideByShow: hideByOtherPopups };
        Pages.SetVisByID(id, true);
        if (onShowEvent) onShowEvent();
    }

    // Displays a Page
    static ShowPage(id = '') {
        Pages._HideAll();
        if (id in Pages.knownPages) {
            const page = Pages.knownPages[id];
            Pages.currentPage = { id, onHide: page.onHide };
            Pages.SetVisByID(id, true);
            page.onShow();
            return;
        }
        throw new Error('Page ' + id + ' has not been linked!');
    } 

    // Hides a Popup
    static HidePopup(id) {
        if (id in Pages.shownElements) {
            const popup = Pages.shownElements[id];
            popup.onHide();
            Pages.SetVisByID(id, false);
            delete Pages.shownPopups[id];
        }
    }

    // Hides all weak Popups
    static HidePopups() {
        for (const id in Pages.shownPopups) {
            const popup = Pages.shownPopups[id];
            if (popup.hideByShow) {
                popup.onHide();
                Pages.SetVisByID(id, false);
                delete Pages.shownPopups[id];
            }
        }
    }

    // Hides all popups and current page
    static _HideAll() {
        for (const id in Pages.shownPopups) {
            const popup = Pages.shownPopups[id];
            popup.onHide();
            Pages.SetVisByID(id, false);
            delete Pages.shownPopups[id];
        }
        if (Pages.currentPage) {
            const p = Pages.currentPage;
            p.onHide();
            Pages.SetVisByID(p.id, false);
            Pages.currentPage = null;
        }
    }
}

ipcRenderer.on('showPage', (event, page) => {
    Pages.ShowPage(page);
} );

ipcRenderer.on('showPopup', (event, popup) => {
    Pages.ShowPopup(popup);
} );

module.exports = Pages;