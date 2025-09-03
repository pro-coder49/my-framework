document.addEventListener("DOMContentLoaded", () => {
  const typingEls = document.querySelectorAll("[class*='my-typing']");

  typingEls.forEach(el => {
    const text = el.getAttribute("data-text") || el.innerText; // allow multi-text
    el.innerText = "";

    // Split multi-strings (for multi effect)
    const phrases = text.split("|");
    let i = 0, phraseIndex = 0;
    let cursorChar = "|"; // default cursor
    let cursorSpan = document.createElement("span");
    cursorSpan.classList.add("typing-cursor");
    cursorSpan.innerText = cursorChar;

    // Add cursor if needed
    if (el.classList.contains("my-typing-cursor") || 
        el.classList.contains("my-typing-block-cursor") ||
        el.classList.contains("my-typing-typewriter-classic") ) {
      el.appendChild(cursorSpan);
    }

    // Set typing speed
    let speed = 100;
    if (el.classList.contains("my-typing-slow")) speed = 200;
    if (el.classList.contains("my-typing-fast")) speed = 50;

    const getDelay = () => {
      if (el.classList.contains("my-typing-random")) {
        return Math.floor(Math.random() * 200) + 50; // 50–250ms
      }
      return speed;
    };

    // Play typewriter sound if enabled
    const playSound = () => {
      if (el.classList.contains("my-typing-typewriter-sound") || 
          el.classList.contains("my-typing-typewriter-classic")) {
        let audio = new Audio("https://actions.google.com/sounds/v1/office/typewriter.ogg");
        audio.volume = 0.2;
        audio.play();
      }
    };

    function typeWriter() {
      let phrase = phrases[phraseIndex];
      if (i < phrase.length) {
        let char = phrase.charAt(i);

        // Variation: typing word by word
        if (el.classList.contains("my-typing-word")) {
          const words = phrase.split(" ");
          el.innerHTML = words.slice(0, i+1).join(" ") + " ";
          i++;
          setTimeout(typeWriter, speed*2);
          return;
        }

        // Variation: colors
        if (el.classList.contains("my-typing-color") || el.classList.contains("my-typing-rainbow")) {
          const span = document.createElement("span");
          span.innerText = char;
          span.style.color = el.classList.contains("my-typing-color") 
            ? getRandomColor() 
            : getRainbowColor(i);
          el.insertBefore(span, cursorSpan);
        } 
        else {
          el.innerHTML = el.innerHTML.replace(cursorSpan.outerHTML, "") + char;
          if (cursorSpan.parentNode === el) el.appendChild(cursorSpan);
        }

        // Style variations
        if (el.classList.contains("my-typing-bold")) el.style.fontWeight = "bold";
        if (el.classList.contains("my-typing-underline")) el.style.textDecoration = "underline";
        if (el.classList.contains("my-typing-shadow")) el.style.textShadow = "0px 0px 8px #3490dc";
        if (el.classList.contains("my-typing-fade")) el.style.opacity = 0.8 + (i/phrase.length)*0.2;

        // Bounce effect (CSS animation would be better)
        if (el.classList.contains("my-typing-bounce")) {
          el.style.transform = "scale(1.1)";
          setTimeout(() => { el.style.transform = "scale(1)"; }, 100);
        }

        // Special glitch/matrix effect (temporary random char)
        if (el.classList.contains("my-typing-glitch") || el.classList.contains("my-typing-matrix")) {
          if (Math.random() > 0.7) char = randomChar();
        }

        playSound();
        i++;
        setTimeout(typeWriter, getDelay());
      } else {
        // Looping effects
        if (el.classList.contains("my-typing-loop") || 
            el.classList.contains("my-typing-multi") || 
            el.classList.contains("my-typing-reverse") || 
            el.classList.contains("my-typing-typewriter-classic")) {

          setTimeout(() => {
            deleteText();
          }, 1000);
        }
      }
    }

    function deleteText() {
      if (i > 0) {
        el.innerHTML = el.innerHTML.replace(cursorSpan.outerHTML, "").slice(0, i-1);
        if (cursorSpan.parentNode === el) el.appendChild(cursorSpan);
        i--;
        setTimeout(deleteText, speed/2);
      } else {
        phraseIndex = (phraseIndex+1) % phrases.length;
        setTimeout(typeWriter, 500);
      }
    }

    typeWriter();
  });

  // Helpers
  function getRandomColor() {
    const colors = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];
    return colors[Math.floor(Math.random()*colors.length)];
  }

  function getRainbowColor(i) {
    const rainbow = ["red","orange","yellow","green","blue","indigo","violet"];
    return rainbow[i % rainbow.length];
  }

  function randomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    return chars[Math.floor(Math.random()*chars.length)];
  }
});
