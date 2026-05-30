function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.cancion, data.artista]);
  return ContentService.createTextOutput(JSON.stringify({result: "ok"})).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  data.shift();
  var counts = {};
  for (var i = 0; i < data.length; i++) {
    var key = data[i][0] + "|||" + data[i][1];
    counts[key] = (counts[key] || 0) + 1;
  }
  var keys = Object.keys(counts);
  var result = [];
  for (var j = 0; j < keys.length; j++) {
    var parts = keys[j].split("|||");
    result.push({cancion: parts[0], artista: parts[1], votos: counts[keys[j]]});
  }
  result.sort(function(a, b) { return b.votos - a.votos; });
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
