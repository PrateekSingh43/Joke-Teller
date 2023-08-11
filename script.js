let url = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Spooky";
const button = document.querySelector(".button");
const audioElement = document.querySelector(".audio");
const jokeText = document.getElementById("result");

// disable/enable Toggle button
function toggleButton() {
  button.disabled = !button.disabled;
}

// passing the joke to voiceRSS API
function tellMe(joke) {
  console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "68c8d137187141a1b54f0d76e3aaebf7",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  let joke = "";
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // text to speech
    // Display the joke text
    jokeText.innerText = data.setup;
    setTimeout(() => {
      jokeText.innerText = data.delivery; // Display the punchline
    }, 5000);
    // passing the joke to voiceRSS API
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    console.log("Sorry!", error, "Try again later");
  }
}

// Event listeners

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
