const texts = [
  "Computer Scientist",
  "Engineer",
  "Philosopher",
  "Lifelong Learner",
  "Leader",
  "Critical Thinker",
  "Chef",
  "Rock Climber",
  "Traveler",
  "Writer"
];

function initTypewriter(targetId, texts, startDelay = 1000, loop = true, deleteMode = true, typingSpeed = 75){
        
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;

    function type() {
        if (count === texts.length) {
            if (!loop) return;
            count = 0;
        }
        currentText = texts[count];

        if (deleteMode) {
            if (isDeleting) {
                letter = currentText.slice(0, --index);
            } else {
                letter = currentText.slice(0, ++index);
            }
        } else {
            letter = currentText.slice(0, ++index);
        }

        const el = document.getElementById(targetId);
        if (el) el.textContent = letter;

        let speed = typingSpeed;

        const lastChar = letter.slice(-1);
        if (lastChar === ".") {
            speed = 2000; //pause duration after a period
        }

        if (deleteMode) {
            speed = isDeleting ? 30 : typingSpeed;
            if (!isDeleting && letter.length === currentText.length) {
                isDeleting = true;
                speed = 1000; // pause before deleting
            } else if (isDeleting && letter.length === 0) {
                isDeleting = false;
                count++;
                speed = 500; // pause before next
            }
        } else {
            // if only typing forward
            if (letter.length === currentText.length) {
                count++; // move to next sentence
                index = 0;
                speed = 800; // pause before next line
            }
        }

        setTimeout(type, speed);
    }
    setTimeout(type, startDelay);
}

document.addEventListener("DOMContentLoaded", () => {
    initTypewriter("titles", [
        "Computer Scientist",
        "Engineer",
        "Philosopher",
        "Lifelong Learner",
        "Leader",
        "Critical Thinker",
        "Chef",
        "Rock Climber",
        "Traveler",
        "Writer"
    ], 1000, true, true, 75);

    if (document.getElementById("aboutmecontent")) {
        initTypewriter("aboutmecontent", [
            "Hi! I'm Elijah, a lifelong learner who loves combining the study of humans, with the practice of computer science. I strive to bridge the disconnect between technology and humanity, attempting to make things inherently better in their experience and utility. Unfortunately, this means there are so many avenues of interest, that I have a hard time picking just one. But that's okay, because I believe the best innovations come from the intersection of multiple disciplines. Whether it's through coding, writing, cooking, or climbing, I approach each endeavor with curiosity and a desire to understand the world better. Click the dots below to see more about me."
        ], 1500, false, false, 20);
    }
});