window.onload = function() {

  var socket = io.connect(window.location.hostname);
  var statsDiv = document.getElementById("stats");

  socket.on('newstats', function (data) {
    if(data.stat && data.ip) {
      if(data.ip === window.ip) {
        var stat = StatsRequest(data.stat);
        var html = document.createElement('div');
        var content = document.createElement('p');
        content.innerHTML = stat.type + ' ' + stat.raw;
        html.appendChild(content);
        statsDiv.appendChild(html);
      }
    } else {
      console.log("There is a problem:", data);
    }
  });

}

function StatsRequest(request) {
  if(request.indexOf('/o.gif') === 0)
    return IStatsRequest(request);

  if(request.indexOf('/bbc/int/s') === 0 || request.indexOf('/bbc/bbc/s') === 0)
    return DaxRequest(request);

  if(request.indexOf('/e/') === 0)
    return RdotRequest(request);

  return BasicRequest(request);
}

function BasicRequest(request) {
  return {
    type: 'unknown',
    raw: request
  }
}

function IStatsRequest(request) {
  return {
    type: 'iStats',
    raw: request
  }
}

function DaxRequest(request) {
  return {
    type: 'DAx',
    raw: request
  }
}

function RdotRequest(request) {
  return {
    type: 'Rdot',
    raw: request
  }
}