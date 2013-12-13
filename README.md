greyspot-new
============

bind(eventName, listener) — adds a listener function for the specified eventName. See below for the list of possible event names.
unbind(eventName) — removes all listener functions previously added for the specified eventName. See below for the list of possible event names.
load(url, options) — reloads the iframe element with a new widget specified by the url. All previously added event listeners will continue working. options is an object which allows you to define all possible widget parameters as well as a callback function which will be executed as soon as new widget is ready. See below for detailed list of widget parameters.
play() — plays the sound.
pause() — pauses the sound.
toggle() — toggles the sound.
seekTo(milliseconds) — jumps to a certain position in a sound.
setVolume(volume) — sets the widget volume to a certain value in the range 0-100.
next() — skips to the next sound (only if the widget contains multiple sounds).
prev() — skips to the previous sound (only if the widget contains multiple sounds).
skip(soundIndex) — jumps to the soundIndex sound, starting from 0 (only if the widget contains multiple sounds).

getVolume(callback) — returns the current volume, in the range of [0, 100].
getDuration(callback) — returns current sound duration in milliseconds.
getPosition(callback) — returns current sound position in milliseconds.
getSounds(callback) — returns the list of sound objects.
getCurrentSound(callback) — returns current sound object.
getCurrentSoundIndex(callback) — returns the index of current sound.
isPaused(callback) — whether the widget is paused.

SC.Widget.Events.LOAD_PROGRESS — fired periodically while the sound is loading.
SC.Widget.Events.PLAY_PROGRESS — fired periodically while the sound is playing.
SC.Widget.Events.PLAY — fired when the sound begins to play.
SC.Widget.Events.PAUSE — fired when the sound pauses.
SC.Widget.Events.FINISH — fired when the sound finishes.
SC.Widget.Events.SEEK — fired when the user seeks.

SC.Widget.Events.READY — fired when the widget has loaded its data and is ready to accept external calls.
SC.Widget.Events.CLICK_DOWNLOAD — Fired when the user clicks the download button.
SC.Widget.Events.CLICK_BUY — Fired when the user clicks the buy button.
SC.Widget.Events.OPEN_SHARE_PANEL — Fired when the share panel is opened. This happens when the user clicks the "Share" button, and at the end of the last sound.
SC.Widget.Events.ERROR — Fired when an error message is displayed.
