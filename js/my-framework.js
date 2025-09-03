
document.addEventListener("DOMContentLoaded", () => {
  const typingEls = document.querySelectorAll("[class*='my-typing']");

  typingEls.forEach(el => {
    const text = el.innerText;
    el.innerText = "";

    let i = 0;
    let speed = 100; // default speed

    // 🔹 Variation: Speed
    if (el.classList.contains("my-typing-slow")) speed = 200;
    if (el.classList.contains("my-typing-fast")) speed = 50;

    // 🔹 Variation: Random speed
    const getDelay = () => {
      if (el.classList.contains("my-typing-random")) {
        return Math.floor(Math.random() * 200) + 50; // 50–250ms
      }
      return speed;
    };

    function typeWriter() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, getDelay());
      } else if (el.classList.contains("my-typing-loop")) {
        // Loop effect: reset and start again
        setTimeout(() => {
          el.innerHTML = "";
          i = 0;
          typeWriter();
        }, 1000);
      }
    }
    typeWriter();
  });
});
