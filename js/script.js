// ==========================================
// HERO SLIDESHOW
// ==========================================

const slides =
document.querySelectorAll(".slide");


let currentSlide = 0;


function showSlide(index) {


    slides.forEach((slide) => {

        slide.classList.remove("active");

    });


    if (slides[index]) {

        slides[index].classList.add("active");

    }


}



if (slides.length > 0) {


    showSlide(currentSlide);


    setInterval(() => {


        currentSlide++;


        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }


        showSlide(currentSlide);


    }, 4000);


}


// ==========================================
// ANNOUNCEMENT DISPLAY
// ==========================================

const announcementTitle =
document.getElementById(
    "announcement-title"
);


const announcementMessage =
document.getElementById(
    "announcement-message"
);



const savedTitle =
localStorage.getItem(
    "announcementTitle"
);



const savedMessage =
localStorage.getItem(
    "announcementMessage"
);



if (savedTitle && announcementTitle) {


    announcementTitle.textContent =
    savedTitle;


}



if (savedMessage && announcementMessage) {


    announcementMessage.textContent =
    savedMessage;


}



// ==========================================
// DARK MODE
// ==========================================

const themeToggle =
document.getElementById(
    "theme-toggle"
);



const themeSwitch =
document.getElementById(
    "theme-toggle-switch"
);



function applyTheme(isDark) {


    if (isDark) {


        document.body.classList.add(
            "dark-mode"
        );


    } else {


        document.body.classList.remove(
            "dark-mode"
        );


    }


}



const savedTheme =
localStorage.getItem(
    "darkMode"
);



applyTheme(
    savedTheme === "true"
);



if (themeToggle) {


    themeToggle.addEventListener(
    "click",
    () => {


        const dark =
        document.body.classList.toggle(
            "dark-mode"
        );


        localStorage.setItem(
            "darkMode",
            dark
        );


        if (themeSwitch) {

            themeSwitch.checked = dark;

        }


    });


}



if (themeSwitch) {


    themeSwitch.addEventListener(
    "change",
    () => {


        const dark =
        themeSwitch.checked;


        applyTheme(dark);


        localStorage.setItem(
            "darkMode",
            dark
        );


    });


}



// ==========================================
// ACCENT COLOR SYSTEM
// ==========================================

const accentSelect =
document.getElementById(
    "accent-color"
);



function applyAccent(color) {


    document.body.dataset.accent =
    color;


}



const savedAccent =
localStorage.getItem(
    "accentColor"
);



if (savedAccent) {


    applyAccent(savedAccent);


    if (accentSelect) {

        accentSelect.value =
        savedAccent;

    }


}



if (accentSelect) {


    accentSelect.addEventListener(
    "change",
    () => {


        const color =
        accentSelect.value;


        applyAccent(color);


        localStorage.setItem(
            "accentColor",
            color
        );


    });


}
// ==========================================
// PREFERENCES PANEL
// ==========================================

const preferencesBtn =
document.getElementById(
    "preferences-btn"
);


const preferencesPanel =
document.getElementById(
    "preferences-panel"
);


const closePreferences =
document.getElementById(
    "close-preferences"
);



if (preferencesBtn) {


    preferencesBtn.addEventListener(
    "click",
    () => {


        preferencesPanel.classList.add(
            "active"
        );


    });


}



if (closePreferences) {


    closePreferences.addEventListener(
    "click",
    () => {


        preferencesPanel.classList.remove(
            "active"
        );


    });


}



// ==========================================
// FONT SIZE CONTROL
// ==========================================

const fontSize =
document.getElementById(
    "font-size"
);



function applyFontSize(size) {


    document.documentElement.style
    .setProperty(
        "--font-scale",
        size + "px"
    );


}



const savedFont =
localStorage.getItem(
    "fontSize"
);



if (savedFont) {


    applyFontSize(savedFont);


    if (fontSize) {

        fontSize.value =
        savedFont;

    }


}



if (fontSize) {


    fontSize.addEventListener(
    "input",
    () => {


        const size =
        fontSize.value;


        applyFontSize(size);


        localStorage.setItem(
            "fontSize",
            size
        );


    });


}



// ==========================================
// SCROLL SPEED CONTROL
// ==========================================

const scrollSpeed =
document.getElementById(
    "scroll-speed"
);



const savedScroll =
localStorage.getItem(
    "scrollSpeed"
);



if (savedScroll && scrollSpeed) {


    scrollSpeed.value =
    savedScroll;


}



if (scrollSpeed) {


    scrollSpeed.addEventListener(
    "input",
    () => {


        localStorage.setItem(
            "scrollSpeed",
            scrollSpeed.value
        );


    });


}



// ==========================================
// RESET PREFERENCES
// ==========================================

const resetBtn =
document.getElementById(
    "reset-preferences"
);



if (resetBtn) {


    resetBtn.addEventListener(
    "click",
    () => {


        localStorage.removeItem(
            "darkMode"
        );


        localStorage.removeItem(
            "accentColor"
        );


        localStorage.removeItem(
            "fontSize"
        );


        localStorage.removeItem(
            "scrollSpeed"
        );



        document.body.classList.remove(
            "dark-mode"
        );


        document.body.dataset.accent =
        "plum";



        if (accentSelect) {

            accentSelect.value =
            "plum";

        }



        if (fontSize) {

            fontSize.value =
            "16";

        }



        if (themeSwitch) {

            themeSwitch.checked =
            false;

        }



        alert(
            "Preferences restored!"
        );


    });


}



// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backTop =
document.getElementById(
    "back-to-top"
);



if (backTop) {


    backTop.addEventListener(
    "click",
    () => {


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    });


}



// ==========================================
// SCROLL BUTTON VISIBILITY
// ==========================================

window.addEventListener(
"scroll",
() => {


    if (!backTop)
    return;



    if (window.scrollY > 300) {


        backTop.style.display =
        "flex";


    } else {


        backTop.style.display =
        "none";


    }


});
