let currentPaperIndex = 0; // Start with the first paper
const papers = document.querySelectorAll('.paper');
const confettiContainer = document.getElementById('confetti');

// Hide all papers except the first one
papers.forEach((paper, index) => {
  if (index !== 0) {
    paper.style.display = 'none';
  }
});

papers.forEach((paper, index) => {
  paper.addEventListener('mousedown', onMouseDown);

  function onMouseDown(event) {
    const shiftX = event.clientX - paper.getBoundingClientRect().left;
    const shiftY = event.clientY - paper.getBoundingClientRect().top;

    function moveAt(clientX, clientY) {
      paper.style.left = clientX - shiftX + 'px';
      paper.style.top = clientY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }

    document.addEventListener('mousemove', onMouseMove);

    paper.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      paper.onmouseup = null;
      
      // Lovely confetti effect
      createConfetti(event.clientX, event.clientY);

      // Reveal the next paper
      if (currentPaperIndex < papers.length - 1) {
        currentPaperIndex++;
        papers[currentPaperIndex].style.display = 'block';
      }
    };
  }

  paper.ondragstart = function() {
    return false;
  };
});

function createConfetti(x, y) {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${x + Math.random() * 100 - 50}px`;
    confetti.style.top = `${y + Math.random() * 100 - 50}px`;
    confetti.style.background = `radial-gradient(circle, #ff${Math.floor(Math.random() * 100) + 50}, rgba(255, 255, 255, 0))`;
    confettiContainer.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => confetti.remove(), 1500);
  }
}
