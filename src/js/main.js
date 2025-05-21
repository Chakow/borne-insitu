import gsap from "gsap";
// //dégradé

function animateSVGs() {
  const elements = [
    { selector: ".un", freq: 0.0011, amp: 15 },
    { selector: ".deux", freq: 0.0014, amp: 20 },
    { selector: ".trois", freq: 0.0018, amp: 25 },
    { selector: ".quatre", freq: 0.0012, amp: 18 },
  ].map(({ selector, freq, amp }) => ({
    el: document.querySelector(selector), // Sélection de l'élément dans le DOM
    freq, // Fréquence du mouvement
    amp, // Amplitude du mouvement
    rotationOffset: 0, // Rotation de base
    rotationTarget: 0, // Angle de destination
    rotationStartTime: 0, // Temps de début de rotation
    rotationDuration: 0, // Durée de la rotation
    lastSpinTime: 0, // Dernier moment où une rotation a eu lieu
  }));

  // Fonction d'interpolation pour une rotation fluide (accélération/décélération)
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Fonction d'animation appelée à chaque frame
  function animate(time) {
    elements.forEach((obj, i) => {
      if (!obj.el) return; // Si l'élément n'existe pas, on ignore

      const { freq, amp } = obj;

      // --- MOUVEMENT OSCILLATOIRE (position + échelle) ---
      const scale = 1 + Math.sin(time * freq * 0.8 + i * 2) * 0.25;
      const x = Math.cos(time * freq * 0.6 + i) * amp;
      const y = Math.sin(time * freq * 0.5 + i) * amp;

      // --- GESTION DE LA ROTATION ---
      const isRotating = time < obj.rotationStartTime + obj.rotationDuration;

      // Déclenche une nouvelle rotation aléatoire toutes les 5–13 secondes
      if (
        !isRotating &&
        time - obj.lastSpinTime > 5000 + Math.random() * 8000
      ) {
        obj.rotationOffset = obj.rotationTarget; // On part de la rotation actuelle
        obj.rotationTarget += (Math.random() > 0.5 ? 1 : -1) * 360; // Tourne d'un tour complet (dans un sens ou l'autre)
        obj.rotationStartTime = time;
        obj.rotationDuration = 8000 + Math.random() * 8000; // Rotation entre 8 et 16 secondes
        obj.lastSpinTime = time;
      }

      // Calcule la rotation actuelle en fonction du temps
      let rotation = obj.rotationOffset;
      if (obj.rotationDuration > 0) {
        const progress = Math.min(
          1,
          (time - obj.rotationStartTime) / obj.rotationDuration
        );
        rotation =
          obj.rotationOffset +
          (obj.rotationTarget - obj.rotationOffset) * easeInOutCubic(progress);
      }

      // --- APPLICATION DE LA TRANSFORMATION SUR L'ÉLÉMENT ---
      obj.el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
    });

    // Redemande une nouvelle frame pour continuer l'animation
    requestAnimationFrame(animate);
  }

  // Démarre la boucle d'animation
  requestAnimationFrame(animate);
}

// Lancement de l'animation dès le chargement
animateSVGs();

//text interactif

// characters waves

const title = document.querySelectorAll(".title");

title.forEach((title) => {
  const titleString = title.textContent;
  const titleCharacters = titleString.split("");

  title.textContent = "";

  titleCharacters.forEach((character) => {
    title.innerHTML += "<span>" + character + "</span>";
    if (character === " ") {
      title.innerHTML += " ";
    }
  });

  const characters = title.querySelectorAll("span");

  gsap.to(characters, {
    y: -20,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      each: 0.05,
      repeat: -1,
      yoyo: true,
    },
  });
});

// title animation

const titles = document.querySelectorAll(".title");
const numTitles = titles.length;
const moveAmount = 80;
const transitionDuration = 0.3;
const stayDuration = 2;

const tl = gsap.timeline({ repeat: -1, yoyo: true });

for (var i = 0; i < numTitles; i++) {
  tl.to(titles, {
    y: i * moveAmount * -1,
    duration: transitionDuration,
    ease: "power2.inOut",
  });
  if (i == 1) {
    tl.add(() => {}, "+=3");
  } else {
    tl.add(() => {}, "+=1.5");
  }
}
//circle handdssss

import gsap from "gsap";

var hand = document.querySelector(".hand");
var circlesWrapper = document.querySelector(".circles");

function activeHand() {
  pulse.kill();
  circlesWrapper.classList.add("is-active");

  var beatTimings = [0.0, 0.4, 0.8, 1.2, 1.6];

  var tl = gsap.timeline({ defaults: { transformOrigin: "center center" } });

  beatTimings.forEach((delay) => {
    tl.to(
      ".hand",
      {
        scale: 1.15,
        duration: 0.2,
        ease: "power1.out",
      },
      delay
    );

    tl.to(
      ".hand",
      {
        scale: 1.0,
        duration: 0.2,
        ease: "power1.in",
      },
      delay + 0.2
    );
  });

  tl.to(
    ".hand",
    {
      scale: 0,
      duration: 0.6,
      ease: "power2.inOut",
    },
    beatTimings[beatTimings.length - 1] + 1
  );

  tl.to(
    ".screen",
    {
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      onComplete: () => {
        document.querySelector(".screen").style.pointerEvents = "none";
      },
    },
    ">+=0.5"
  ); // start after a short pause
}

hand.addEventListener("click", activeHand);

var pulse = gsap.to(".hand", {
  scale: 1.03,
  duration: 0.6,
  ease: "power1.inOut",
  yoyo: true,
  repeat: -1,
  transformOrigin: "center center",
});

var isFullScreen = false;

document.body.addEventListener("keypress", function (event) {
  if (event.key == " ") {
    if (isFullScreen == false) {
      document.body.requestFullscreen();

      isFullScreen = true;
    } else {
      document.exitFullscreen();
      isFullScreen = false;
    }
  }
});

//disparition de ALL
const all = document.querySelector(".all");

hand.addEventListener("click", () => {
  setTimeout(() => {
    all.classList.add("hidden");
  }, 2800); // Attend 1.6 secondes
});
