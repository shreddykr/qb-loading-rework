const { ref } = Vue

const load = Vue.createApp({
  setup () {
    return {
      CarouselText1: 'Looking for a job they come in many shapes and sizes',
      CarouselSubText1: 'Photos captured by: @shreddykr',
      CarouselText2: 'Looking for a quick way around the map travel to 4 different airfields.',
      CarouselSubText2: 'Photos captured by: @shreddykr',
      CarouselText3: 'From Los Santos to Roxwood something awaits, but dont spend too much or youll be homeless.',
      CarouselSubText3: 'Photos captured by: @shreddykr',
      CarouselText4: 'For additional support please make a ticket.',
      CarouselSubText4: 'Photos captured by: @shreddykr',

      DownloadTitle: 'Downloading HiddenWIKI Server',
      DownloadDesc: "Hold tight while we begin downloading all the resources/assets required to play on this Server. \n\nAfter download has been finished successfully, you'll be placed into the server and this screen will disappear. Please don't leave or turn off your PC. ",

      SettingsTitle: 'Settings',
      AudioTrackDesc1: 'When disabled the current audio-track playing will be stopped.',
      AutoPlayDesc2: 'When disabled carousel images will stop cycling and remain on the last shown.',
      PlayVideoDesc3: 'When disabled video will stop playing and remain paused.',

      // Autoplay timing (ms)
      firstap: 6000,   // background 1..8 with fade
      secondap: 5000,  // text carousel

      firstslide: ref(1),
      secondslide: ref('1'),
      audioplay: ref(true),
      playvideo: ref(true),
      download: ref(true),
      settings: ref(false),
    }
  }
})

load.use(Quasar, { config: {} })
load.mount('#loading-main')

// Audio controls
var audio = document.getElementById("audio");
if (audio) {
  audio.volume = 0.05;
}

function audiotoggle() {
  var audio = document.getElementById("audio");
  if (!audio) return;
  if (audio.paused) audio.play(); else audio.pause();
}

function videotoggle() {
  var video = document.getElementById("video");
  if (!video) return;
  if (video.paused) video.play(); else video.pause();
}

// Loader progress handlers
let count = 0;
let thisCount = 0;

const handlers = {
  startInitFunctionOrder(data) {
    count = data.count;
  },
  initFunctionInvoking(data) {
    const el = document.querySelector(".thingy");
    if (!el) return;
    el.style.left = "0%";
    el.style.width = (data.idx / count) * 100 + "%";
  },
  startDataFileEntries(data) {
    count = data.count;
  },
  performMapLoadFunction(data) {
    ++thisCount;
    const el = document.querySelector(".thingy");
    if (!el) return;
    el.style.left = "0%";
    el.style.width = (thisCount / count) * 100 + "%";
  },
};

window.addEventListener("message", function (e) {
  (handlers[e.data.eventName] || function () {})(e.data);
});
