document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
    setTimeout(() => {
        document.body.classList.add("visible");
    }, 50); //delay to trigger css transition

    //for page buttons
    setTimeout(() => {
        document.body.classList.add("loaded"); 
    }, 500); //matches the fade-in duration of the body (CSS body.fade-in { transition: opacity 2s; }

    //home page buttons
    const links = document.querySelectorAll(".home-buttons a");

    links.forEach(link => {
        link.addEventListener("click", e => {
            //skip links that open in new tab
            if (link.getAttribute("target") === "_blank") return;

            e.preventDefault();

            //fade-out init
            document.body.classList.add("transitioning");

            //wait for fade to finish, then navigate
            const fadeDuration = 1000; //must match your .transition-overlay CSS fade duration
            setTimeout(() => {
                window.location.href = link.href;
            }, fadeDuration);
        });
    });
});