const { ref, watch } = Vue

const load = Vue.createApp({
  
  setup() {
    // --- toggles
    const audioplay = ref(true)
    const playvideo = ref(true)
    const autoplayEnabled = ref(true)

    // --- autoplay intervals (ms or false)
    const firstap  = ref(6000)  // background photos
    const secondap = ref(5000)  // top-left text

    // keep both carousels in sync with the one Auto-Play switch
    function applyAutoplay(on) {
      firstap.value  = on ? 6000 : false
      secondap.value = on ? 5000 : false
    }
    watch(autoplayEnabled, (on) => applyAutoplay(on), { immediate: true })

    // handlers
    function toggleAudio() {
      audioplay.value = !audioplay.value
      const audio = document.getElementById("audio")
      if (audio) (audioplay.value ? audio.play() : audio.pause())
    }
    function toggleAutoplay() { autoplayEnabled.value = !autoplayEnabled.value }
    function toggleVideo() {
      playvideo.value = !playvideo.value
      const video = document.getElementById("video")
      if (video) (playvideo.value ? video.play() : video.pause())
    }

    return {
      // copy
      CarouselText1: 'Looking for a job they come in many shapes and sizes.',
      CarouselSubText1: 'Photos captured by: @shreddykr',
      CarouselText2: 'Looking for a quick way around the map travel to 4 different airfields.',
      CarouselSubText2: 'Photos captured by: @shreddykr',
      CarouselText3: 'From Los Santos to Roxwood something awaits, but dont spend too much or youll be homeless.',
      CarouselSubText3: 'Photos captured by: @shreddykr',
      CarouselText4: 'For additional support please make a ticket.',
      CarouselSubText4: 'Photos captured by: @shreddykr',

      DownloadTitle: 'Downloading HiddenWIKI Server',
      DownloadDesc: "Hold tight while we begin downloading all the resources/assets required to play on this Server.\n\nAfter download has been finished successfully, you'll be placed into the server and this screen will disappear. Please don't leave or turn off your PC.",

      SettingsTitle: 'Settings',

      // carousels
      firstap,                 // background carousel now reactive
      secondap,
      firstslide: ref(1),
      secondslide: ref('1'),

      // ui state
      audioplay,
      playvideo,
      autoplayEnabled,
      download: ref(true),
      settings: ref(false),

      // handlers
      toggleAudio,
      toggleAutoplay,
      toggleVideo,
    }
  }
})

load.use(Quasar, { config: {} })
load.mount('#loading-main')

// audio volume
const audio = document.getElementById("audio")
if (audio) audio.volume = 0.05

// loader progress
let count = 0, thisCount = 0
const handlers = {
  startInitFunctionOrder(data){ count = data.count },
  initFunctionInvoking(data){
    const el = document.querySelector(".thingy"); if (!el) return
    el.style.width = (data.idx / count) * 100 + "%"
  },
  startDataFileEntries(data){ count = data.count },
  performMapLoadFunction(data){
    ++thisCount
    const el = document.querySelector(".thingy"); if (!el) return
    el.style.width = (thisCount / count) * 100 + "%"
  },
}
window.addEventListener("message", e => { (handlers[e.data.eventName] || (()=>{}))(e.data) })
