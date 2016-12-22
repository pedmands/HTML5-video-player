// Get our elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
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

// Hook up event listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mouseup', () => isUpdating = false))
ranges.forEach(range => range.addEventListener('mousedown', () => isUpdating = true))

