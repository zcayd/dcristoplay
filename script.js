// Custom method to parse information from HLS streaming
function extractMeta(data, audio) {
  let startLoc;
  let endLoc;

  // name
  startLoc = data.indexOf("TRSN") + 11;
  endLoc = data.indexOf("TRSO");
  const name = data.substring(startLoc, endLoc);

  // desc
  startLoc = data.indexOf("TRSO") + 11;
  endLoc = data.indexOf("TIT2");
  const desc = data.substring(startLoc, endLoc);

  // artist
  startLoc = data.indexOf("TPE1") + 11;
  endLoc = data.indexOf("TPE2");
  const artist = data.substring(startLoc, endLoc);

  // title
  startLoc = data.indexOf("TIT2") + 11;
  endLoc = data.indexOf("TPE1");
  const title = data.substring(startLoc, endLoc);

  // image
  const image = data.match('(http:\/\/|https:\/\/).*\.(jpg|png|svg)')[0];
  const imageTag = audio.closest('.audio-player').querySelector('.cover');
  imageTag.src = image;
  imageTag.setAttribute('alt', `${title}, by ${artist}`);
}

const player = new OpenPlayerJS('audio', {
   hls: {
    startLevel: -1
  },
  controls: {
    layers: {
      'top-left': ['play', 'time'],
      'left': ['volume'],
      'bottom-middle': ['progress'],
    }
  }
});
player.init();

player.getElement().addEventListener('hlsFragParsingMetadata', event => {
  const parsedTag = [];
  event.detail.samples[0].data.forEach(element => {
      parsedTag.push(String.fromCharCode(element));
  });
  extractMeta(parsedTag.toString().replace(/,/g, ''), player.getElement());
});

const player2 = new OpenPlayerJS('audio-live', {
   hls: {
    startLevel: -1
  },
  controls: {
    layers: {
      'top-left': ['play', 'time'],
      'left': ['volume'],
      'bottom-middle': ['progress'],
    }
  }
});
player2.init();