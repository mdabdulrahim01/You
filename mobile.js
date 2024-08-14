let highestZ = 1;
let currentPaperIndex = 0;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper, index) {
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;

      // Reveal the next paper
      if (index === currentPaperIndex) {
        currentPaperIndex++;
        if (papers[currentPaperIndex]) {
          papers[currentPaperIndex].classList.remove('hidden');
          papers[currentPaperIndex].classList.add('show');
        }
      }
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();

      if (!this.rotating) {
        this.touchMoveX = e.touches[0].clientX;
        this.touchMoveY = e.touches[0].clientY;

        this.currentPaperX += this.touchMoveX - this.prevTouchX;
        this.currentPaperY += this.touchMoveY - this.prevTouchY;

        this.prevTouchX = this.touchMoveX;
        this.prevTouchY = this.touchMoveY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

// Initialize the papers
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper, index) => {
  const p = new Paper();
  p.init(paper, index);
});
