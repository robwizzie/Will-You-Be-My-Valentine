gsap.registerPlugin(ScrollTrigger);

$(document).ready(function() {
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "thumbs",
            "zoom",
            "fullScreen",
            "share",
            "close"
        ],
        loop: false,
        protect: true
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Special heart container animation for a dynamic entrance
    gsap.from(".heart-container", {
        duration: 2,
        scale: 0.5,
        autoAlpha: 0,
        ease: "elastic.out(1, 0.3)",
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1 // Adjust if needed to trigger the animation sooner or later
    });

    // Observe each section
    document.querySelectorAll('.story-section').forEach(section => {
        observer.observe(section);
    });

    // Observe each image within the gallery
    document.querySelectorAll('#imageGallery .card-image img').forEach(image => {
        observer.observe(image);
    });

});

/* function updateCountdown() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 8, 1); // Month is 0-indexed, 8 = September
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.querySelector('.countdown').innerHTML = days + " Days " + "<br>" + hours + " Hours " + "<br>" +
            minutes + " Minutes " + "<br>" + seconds + " Seconds ";
    } else {
        // If the countdown is over
        document.querySelector('.countdown').innerHTML = "The countdown is over!";
    }
} */

const songs = [
    { url: '/music/apocalypse.mp3', title: 'Apocalypse' },
    { url: '/music/lifetime.mp3', title: 'Lifetime' },
    { url: '/music/handsDown.mp3', title: 'Hands Down' },
    { url: '/music/takeMyName.mp3', title: 'Take My Name' },
    { url: '/music/souljaBoy.mp3', title: 'YOUUUUUUUU' }
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].url); // Start with the first song
const songTitleElement = document.getElementById('songTitle');

// Set the initial song title
songTitleElement.textContent = songs[currentSongIndex].title;

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        updatePlayPauseButton(true);
    } else {
        audio.pause();
        updatePlayPauseButton(false);
    }
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    changeSong();
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    changeSong();
}

function changeSong() {
    audio.src = songs[currentSongIndex].url;
    songTitleElement.textContent = songs[currentSongIndex].title;
    audio.play();
    updatePlayPauseButton(true);
}

function updatePlayPauseButton(isPlaying) {
    document.getElementById('playPause').textContent = isPlaying ? '⏸' : '▶️';
}

document.getElementById('playPause').addEventListener('click', togglePlayPause);
document.getElementById('nextSong').addEventListener('click', playNextSong);
document.getElementById('prevSong').addEventListener('click', playPrevSong);

document.getElementById('yesButton').addEventListener('click', function() {
    document.querySelector('#final-question h2').textContent = "YAYAYAYAYAY - My Forever Valentine 🫶";
    // Directly use confetti from the library
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

let noClickCount = 0; // To track the number of times the "No" button has been clicked

document.getElementById('noButton').addEventListener('click', function() {
    noClickCount++;
    if (noClickCount <= 10) {
        // Make the "No" button smaller
        this.style.transform = `scale(${1 - noClickCount * 0.1})`;

        // Make the "Yes" button larger
        document.getElementById('yesButton').style.transform = `scale(${1 + noClickCount * 0.05})`;

        // Change the text to something funny
        const funnyTexts = [
            "Really? Try again...",
            "Are you sure?",
            "You're a Little Toad 🐸",
            "Wrongo!",
            "Nope, that's not the right answer.",
            "I will NOT take no for an answer!",
            "This is getting a bit ridiculous...",
            "Give it another shot!",
            "Seriously?",
            "Last chance... Yes?"
        ];
        document.querySelector('#final-question h2').textContent = funnyTexts[noClickCount - 1] || "YAYAYAYAYAY - My Forever Valentine";
    } else {
        // If clicked more than 10 times, hide the "No" button
        this.style.display = 'none';
    }
});

// Update the countdown every second
//setInterval(updateCountdown, 1000);