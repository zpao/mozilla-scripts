var ss = Components.classes["@mozilla.org/browser/sessionstore;1"].getService(Components.interfaces.nsISessionStore);

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

