document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("letterModal");
  const letterCard = document.getElementById("letterCard");
  const openLetterBtn = document.getElementById("wishButton");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const audio = document.getElementById("backgroundMusic");

  // Open Letter Modal
  openLetterBtn.addEventListener("click", openModal);

  // Close Letter Modal
  closeModalBtn.addEventListener("click", closeModal);

  function openModal() {
      modal.style.display = "flex";
      letterCard.innerHTML = ""; // Reset previous content
      audio.play(); // Start music again

      // Ye ensure karega ki text properly dobara likha jaye
      setTimeout(() => {
          typeWriter(letterCard, getMessage(), 0, addGalleryButton);
      }, 100);

      gsap.from(".modal-content", {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power3.out",
      });
  }

  function closeModal() {
      audio.pause(); // Stop music when modal is closed
      audio.currentTime = 0; // Reset music to start

      gsap.to(".modal-content", {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
              modal.style.display = "none";
              letterCard.innerHTML = ""; // Reset text properly
          }
      });
  }

  function typeWriter(element, text, index, callback) {
      if (index < text.length) {
          if (text.charAt(index) === "<") {
              let endIndex = text.indexOf(">", index);
              element.innerHTML += text.substring(index, endIndex + 1);
              index = endIndex + 1;
          } else {
              const span = document.createElement("span");
              span.textContent = text.charAt(index);
              element.appendChild(span);
              index++;
          }

          setTimeout(() => typeWriter(element, text, index, callback), 50);
      } else if (callback) {
          setTimeout(callback, 500);
      }
  }

  function addGalleryButton() {
      // Ensure button is not duplicated
      if (!document.querySelector(".gallery-button")) {
          const galleryButton = document.createElement("button");
          galleryButton.textContent = "View Gallery";
          galleryButton.className = "gallery-button";
          galleryButton.onclick = () => window.location.href = "gallery.html";

          letterCard.appendChild(document.createElement("br"));
          letterCard.appendChild(galleryButton);

          gsap.from(galleryButton, {
              y: 50,
              opacity: 0,
              duration: 0.5,
              ease: "power3.out",
          });
      }
  }

  function getMessage() {
      return `🌸 Happy Holi, My Dear Friend! 🎨🎉<br><br>
      Rangon ki yeh bahaar, khushiyon ki yeh bauchar,<br>
      Holi ka tyohaar laaye dher saari muskurahat aur pyaar! 💖🎊`;
  }
});
