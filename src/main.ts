import { DotLottie } from "@lottiefiles/dotlottie-web";

const passageEl = document.getElementById("passage")!;
const verseEl = document.getElementById("verse")!;
const greetEl = document.getElementById("greeting")!;
const canvas = <HTMLCanvasElement> document.getElementById("dotlottie-canvas")!;

interface Data {
  bookname: string;
  chapter: string;
  verse: string;
  text: string;
}
let data: Data;

const dotLottie = new DotLottie({
  speed: 0.5,
  autoplay: true,
  canvas,
  src: "https://lottie.host/56033638-4bd2-4dc1-8e12-c7817e56b773/J2JxSCVQEl.lottie",
});



// get time
const currentHour = new Date().getHours();
const greetingMessage =
  currentHour >= 4 && currentHour < 12 
    ? "Good morning."
    : currentHour >= 12 && currentHour <= 17 
    ? "Good afternoon."
    : currentHour > 17 || currentHour < 4
    ? "Good evening."
    : "Welcome";


getVerse();

function getVerse() {
  fetch(`https://labs.bible.org/api/?passage=random&type=json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((adv) => {
      data = adv[0];
      console.log(adv[0])
      passageEl.innerHTML = `${adv[0].text}`;
      verseEl.textContent = `${adv[0].bookname} ${adv[0].chapter}:${data.verse}`;

      
    }).catch((error) => {
      passageEl.innerHTML = `<b>Sorry for this.</b> some error occured`;
      verseEl.textContent = `try to reload :D`
      console.log(error + "yyk")
    });;

    canvas.style.transform = "none";
      setTimeout(() => {
        passageEl.style.opacity = "1";
        passageEl.style.maxHeight = "50vh"
        verseEl.style.opacity = "1";
      }, 300);
}

// function isCanvasBlank(canvas: { getContext: (arg0: string) => any; width: any; height: any; }) {
//   const context = canvas.getContext('2d');

//   const pixelBuffer = new Uint32Array(
//     context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
//   );

//   return !pixelBuffer.some(color => color !== 0);
// }

// even listener

canvas.addEventListener("click", () => {

  passageEl.textContent = "";
  verseEl.textContent = "";
  passageEl.style.opacity = "0";
  verseEl.style.opacity = "0";

  getVerse();
  dotLottie.play();
});

canvas

window.onload = function () {
  greetEl.textContent = greetingMessage;

  canvas.style.opacity = "1";
};
