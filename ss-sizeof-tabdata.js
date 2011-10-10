var {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/DownloadUtils.jsm");
var ss = Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);

var state = JSON.parse(ss.getBrowserState());
var lines = [];
state.windows.forEach(function(win, windex) {
  lines.push("window " + windex);
  win.tabs.forEach(function(tab) {
    var url = tab.entries[tab.index - 1].url;
    var len = JSON.stringify(tab).length;
    lines.push("\t" + url + " - " + DownloadUtils.convertByteUnits(len).join(""));
  });
});
lines.join("\n");
