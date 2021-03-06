var {classes: Cc, interfaces: Ci, utils: Cu} = Components;
var ss = Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);

var state = JSON.parse(ss.getBrowserState());
/* get rid of closed windows */
state._closedWindows = [];
state.windows.forEach(function(win) {
  /* get rid of closed tabs */
  win._closedTabs = [];
  win.tabs.forEach(function(tab) {
    /* only keep the current entry */
    tab.entries = [tab.entries[tab.index - 1]];
    /* the index will be wrong as is now, so reset it */
    tab.index = 1;
  });
});
ss.setBrowserState(JSON.stringify(state));

