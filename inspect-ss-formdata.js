var {classes: Cc, interfaces: Ci, utils: Cu} = Components;
var ss = Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);

var data = {};
var state = JSON.parse(ss.getBrowserState());
state.windows.forEach(function(win) {
  win.tabs.forEach(function(tab) {
    var entry = tab.entries[tab.index - 1];
    if (entry.formdata && Object.keys(entry.formdata).length)
      data[entry.url] = entry.formdata;
  });
});
JSON.stringify(data, null, 2);

