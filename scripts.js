// Get our elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress__filled')
const progressBar = player.querySelector('.progress')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const fullscreenButton = player.querySelector("[name='fullscreen'")
const ranges = player.querySelectorAll('.player__slider')

let isUpdating = false

// Play/pause on click
function togglePlay() {
	if(video.paused) { video.play() } 
		else { video.pause() }
}

// Toggle play/pause button with any event that toggles the video state
function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚'
	toggle.textContent = icon
}

// Time-skipp buttons
function skip() {
	console.log(this.dataset.skip)
	video.currentTime += parseFloat(this.dataset.skip)
}

// Volume and Speed sliders
function handleRangeUpdate() {
	if(!isUpdating) return // flag to update range only when mouse is down.
	video[this.name] = this.value
}

// Auto-fill progress
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100
	progress.style.flexBasis = `${percent}%`
}

// Scrubbing
function scrub(e) {
	if(!isUpdating) return // flag to scrub only when mouse is down.
	const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration
	video.currentTime = scrubTime
}

function fullscreen() {
	player.classList.toggle('fullscreen')
}


// Hook up event listeners
// Play/pause video on click
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)

// Toggle play/pause button icon
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

// Auto-update progress fill
video.addEventListener('timeupdate', handleProgress)

// Time-skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip))

// Fullscreen button
fullscreenButton.addEventListener('click', fullscreen)

// Volume and Speed sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousedown', () => isUpdating = true))
ranges.forEach(range => range.addEventListener('mouseup', () => isUpdating = false))

// Progress Bar scrubbing
progressBar.addEventListener('click', scrub)
progressBar.addEventListener('mousemove', (e) => isUpdating && scrub(e))
progressBar.addEventListener('mousedown', () => isUpdating = true)
progressBar.addEventListener('mouseup', () => isUpdating = false)



