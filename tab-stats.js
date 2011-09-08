/* Run this in your error console */
var wc=0, tc=0, tgc=0;
var {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/DownloadUtils.jsm");
var wm = Services.wm;
var ss = Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);
var e = wm.getEnumerator("navigator:browser");
var uc = { };
while (e.hasMoreElements()) {
  var win = e.getNext();
  var tabs = win.gBrowser.tabs;
  wc+=1;
  tc += tabs.length;
  var gd = ss.getWindowValue(win, "tabview-group");
  tgc += gd ? Object.keys(JSON.parse(gd)).length : 1;
  Array.forEach(tabs, function(t) {
    var url = t.linkedBrowser.currentURI.spec;
    if (!(url in uc)) {
      uc[url] = 0;
    }
    uc[url]++;
  });
}
var ssFile = Services.dirsvc.get("ProfD", Ci.nsILocalFile);
ssFile.append("sessionstore.js");
var stream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
stream.init(ssFile, 0x01, 0, 0);
var cvstream = Cc["@mozilla.org/intl/converter-input-stream;1"].createInstance(Ci.nsIConverterInputStream);
var fs = stream.available();
var s = "Open windows: " + wc +
        "\nOpen tabs: " + tc +
        "\nTab Groups: " + tgc +
        "\nsessionstore.js file size: " + DownloadUtils.convertByteUnits(fs).join("");
var s2 = "";
for ([u,c] in Iterator(uc)) {
  if (c > 1) {
    s2 += "  " + c + " - " + u + "\n";
  }
}
if (s2) {
  s += "\nDuplicated urls:\n" + s2;
}
s;
