$(document).on("click", "ul li", function () {
  $(this).addClass("active").siblings().removeClass("active");
});

$(document).on("click", "ul li", function () {
  $(this).addClass("active").siblings().removeClass("active");
});

var moreextend = document.getElementById("more-extend");
var morenarrow = document.getElementById("more-narrow");
var sidebar = document.getElementById("sidebar");
var logotext = document.getElementById("logotext");
var logoimage = document.getElementById("logoimage");
var menutext = document.getElementsByClassName("menu-item-text");
var social = document.getElementById("social");

moreextend.addEventListener("click", function (e) {
  if (e.target) {
    sidebar.style.width = "240px";
    sidebar.style.transition = "width 1s";
    moreextend.style.display = "none";
    morenarrow.style.display = "block";
    logoimage.style.display = "none";
    logotext.style.display = "block";
    social.style.display = "block";

    Array.from(menutext).forEach(function (item) {
      item.style.display = "inline-block";
    });
  }
});

morenarrow.addEventListener("click", function (e) {
  if (e.target) {
    sidebar.style.width = "70px";
    sidebar.style.transition = "width 1s";
    moreextend.style.display = "flex";
    morenarrow.style.display = "none";
    logoimage.style.display = "block";
    logotext.style.display = "none";
    social.style.display = "none";

    Array.from(menutext).forEach(function (item) {
      item.style.display = "none";
    });
  }
});

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 80,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 2000,
    reverseDirection: false,
  },
  // onSlideChangeStart: function (s) {
  //   if (s.activeIndex === 3) {
  //     // do something here, 4th slide is active now and so on
  //     console.log("hi! Try to reach 4th slides");
  //     s.startAutoplay(); // calling autoplay on 4th slides.
  //   }
  // },
});

$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myList li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

$("#home").click(function () {
  setTimeout(location.reload.bind(location), 800);
  $("#boxhome").slideDown ();
  $("#boxchart").hide();
  $("#boxvideo").hide();
  $("#boxsinger").hide();
});

$("#chart").click(function () {
  $("#boxchart").slideDown ();
  $("#boxhome").hide();
  $("#boxvideo").hide();
  $("#boxsinger").hide();
});

$("#video").click(function () {
  $("#boxvideo").slideDown ();
  $("#boxchart").hide();
  $("#boxhome").hide();
  $("#boxsinger").hide();
});

$("#boxsinger").click(function () {
  $("#boxsinger").slideDown ();
  $("#boxchart").hide();
  $("#boxvideo").hide();
  $("#boxhome").hide();
});

$("#sign-up").click(function () {
  $("#id01").show();
  // $("#main").hide();
  // $("#sidebar").hide();
});

$("#login").click(function () {
  $("#id02").show();
  // $("#main").hide();
  // $("#sidebar").hide();
});



let playing = true;
let random = false;
const playButton = document.querySelector(".player-play");
const nextButton = document.querySelector(".player-next");
const prevButton = document.querySelector(".player-prev");
const thumbnail = document.querySelector(".player-image");
const song = document.querySelector("#song");
const songList = document.querySelectorAll(".song");
const songArtist = document.querySelector(".player-author");
const songTitle = document.querySelector(".player-title");
const progressBar = document.querySelector("#progress-bar");

let songIndex = 0;
let songs = [
  "./files/holo.mp3",
  "./files/home.mp3",
  "./files/spark.mp3",
  "./files/summer.mp3",
];
let thumbnails = [
  "https://cdn.dribbble.com/users/3960463/screenshots/13952774/media/1083c2b91054c7d7ee7c0bd47d60d5e0.png?compress=1&resize=800x600",
  "https://cdn.dribbble.com/users/3960463/screenshots/14808856/media/09a06e9c0d0f897dd9ea1f038541c495.png?compress=1&resize=1000x750",
  "https://cdn.dribbble.com/users/3960463/screenshots/14630140/media/c79331860d7ca1b97430a4888617f428.png?compress=1&resize=1000x750",
  "https://cdn.dribbble.com/users/3960463/screenshots/14516886/media/bc272ecce9bec415eb28b7fe65e99117.png?compress=1&resize=1000x750",
];
let songArtists = ["Pop King", "Pop King", "Pop King", "Pop King"];
let songTitles = ["Ampyx Holo", "Ampyx Home", "Ampyx Spark", "Last Summer"];
let timer;
function handleClickEachSong(e) {
  const index = parseInt(e.target.dataset.index);
  nextSong(index);
}
function playPause() {
  if (playing) {
    const song = document.querySelector("#song");
    song.play();
    thumbnail.classList.add("is-playing");
    playButton.classList.add("fa-pause");

    playing = false;
  } else {
    thumbnail.classList.remove("is-playing");
    playButton.classList.remove("fa-pause");
    song.pause();
    playing = true;
    clearInterval(timer);
  }
}

function nextSong(index = -1) {
  if (index >= 0) {
    songIndex = index;
  } else {
    songIndex++;
  }
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];

  songArtist.innerHTML = songArtists[songIndex];
  songTitle.innerHTML = songTitles[songIndex];

  playing = true;
  playPause();
}
function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = 1;
  }
  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];
  songArtist.innerHTML = songArtists[songIndex];
  songTitle.innerHTML = songTitles[songIndex];

  playing = true;
  playPause();
}

function updateProgressValue() {
  progressBar.max = song.duration;
  progressBar.value = song.currentTime;
  document.querySelector(".player-remaining").innerHTML = formatTime(
    Math.floor(song.currentTime)
  );
  if (document.querySelector(".player-duration").innerHTML === "NaN:NaN") {
    document.querySelector(".player-duration").innerHTML = "0:00";
  } else {
    document.querySelector(".player-duration").innerHTML = formatTime(
      Math.floor(song.duration)
    );
  }
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}
timer = setInterval(updateProgressValue, 500);
function changeProgressBar() {
  song.currentTime = progressBar.value;
}
progressBar.addEventListener("change", changeProgressBar);
playButton.addEventListener("click", playPause);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", previousSong);
song.addEventListener("ended", function () {
  nextSong();
});

songList.forEach((el) => el.addEventListener("click", handleClickEachSong));
