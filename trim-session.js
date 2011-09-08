var ss = Components.classes["@mozilla.org/browser/sessionstore;1"].getService(Components.interfaces.nsISessionStore);

var state = JSON.parse(ss.getBrowserState());
/* get rid of closed windows */
state._closedWindows = [];
state.windows.forEach(function(win) {
  /* get rid of closed tabs */
  win._closedTabs = [];
  win.tabs.forEach(function(tab) {
    /* only keep the current entry */
    tab.entries = [tab.entries[tab.index - 1]];
  });
});
ss.setBrowserState(JSON.stringify(state));

