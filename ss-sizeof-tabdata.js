function compare(a,b) {
  /* sort by order */
  /* return 0; */
  /* sort by size (low - high) */
  /* return a.size - b.size; */
  /* sort by size (high - low) */
  return b.size - a.size;
  /* sort by url */
  /* return a.url.localeCompare(b.url); */
}

var {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/DownloadUtils.jsm");
var ss = Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);

var state = JSON.parse(ss.getBrowserState());
var lines = [];
state.windows.forEach(function(win, windex) {
  lines.push("window " + windex);
  var tabs = [];
  win.tabs.forEach(function(tab) {
    var url = tab.entries[tab.index - 1].url;
    var len = JSON.stringify(tab).length;
    tabs.push({ url: url, size: len});
  });
  tabs.sort(compare);
  tabs = tabs.map(function(t) {
    return "\t" + t.url + " - " + DownloadUtils.convertByteUnits(t.size).join("");
  });
  lines = lines.concat(tabs);
});
lines.join("\n");
