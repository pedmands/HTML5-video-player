// Get our elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress__filled')
const progressBar = player.querySelector('.progress')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

let isUpdating = false

// Build our functions
function togglePlay() {
	if(video.paused) {
		video.play()
	} else {
		video.pause()
	}
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚'
	toggle.textContent = icon
}

function skip() {
	console.log(this.dataset.skip)
	video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
	if(!isUpdating) return // flag to update range only when mouse is down.

	video[this.name] = this.value
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100
	progress.style.flexBasis = `${percent}%`
}

function scrub(e) {
	if(!isUpdating) return // flag to scrub only when mouse is down.

	const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration

	video.currentTime = scrubTime
}

// Hook up event listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

// listener for triggering auto progress updating
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip))

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



