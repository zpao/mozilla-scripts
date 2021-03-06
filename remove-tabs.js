/* TODO: track # of tabs closed per window, limit to max_tabs_undo */

var MATCH_URLS = [/* array of regular expressions */];

var {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");

var removed = [];
var e = Services.wm.getEnumerator("navigator:browser");
while (e.hasMoreElements()) {
  var win = e.getNext();
  var tabs = win.gBrowser.tabs;
  for (var i = tabs.length - 1; i >= 0; i--) {
    var url = tabs[i].linkedBrowser.currentURI.spec;
    if (MATCH_URLS.some(function(re) re.test(url))) {
      win.gBrowser.removeTab(tabs[i]);
      removed.push(url);
    }
  }
}
"removed:\n" + removed.join("\n");
