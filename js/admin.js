// ==========================================
// GET ELEMENTS
// ==========================================

const loginBtn = document.getElementById("login-btn");

const username = document.getElementById("username");
const password = document.getElementById("password");

const loginMessage = document.getElementById("login-message");

const loginScreen = document.getElementById("login-screen");
const adminDashboard = document.getElementById("admin-dashboard");

const publishBtn = document.getElementById("publish-btn");

const logoutBtn = document.getElementById("logout-btn");


// ==========================================
// AUTO LOGIN CHECK
// ==========================================

if (
    localStorage.getItem("adminLoggedIn") === "true" &&
    adminDashboard
) {

    loginScreen.style.display = "none";
    adminDashboard.style.display = "block";

}


// ==========================================
// LOGIN
// ==========================================

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        if (
            username.value.trim() === "principal" &&
            password.value.trim() === "wis2026"
        ) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            loginScreen.style.display = "none";

            adminDashboard.style.display = "block";


        } else {

            loginMessage.textContent =
            "Incorrect username or password.";

        }

    });

}


// ==========================================
// PUBLISH ANNOUNCEMENT
// ==========================================

if (publishBtn) {

    publishBtn.addEventListener("click", () => {


        const title =
        document.getElementById(
            "announcement-title-input"
        ).value;


        const message =
        document.getElementById(
            "announcement-message-input"
        ).value;


        localStorage.setItem(
            "announcementTitle",
            title
        );


        localStorage.setItem(
            "announcementMessage",
            message
        );


        alert(
            "Announcement published!"
        );


    });

}
// ==========================================
// GALLERY MANAGER
// ==========================================

const addGalleryBtn =
document.getElementById("add-gallery-btn");


if (addGalleryBtn) {


    addGalleryBtn.addEventListener("click", () => {


        const image =
        document.getElementById(
            "gallery-image-input"
        ).value;


        const caption =
        document.getElementById(
            "gallery-caption-input"
        ).value;



        let gallery =
        JSON.parse(
            localStorage.getItem("gallery")
        ) || [];



        gallery.push({

            image: image,
            caption: caption

        });



        localStorage.setItem(
            "gallery",
            JSON.stringify(gallery)
        );



        alert("Image added to gallery!");



    });

}


// ==========================================
// CONTENT EDITOR
// ==========================================

const contentBtn =
document.getElementById("content-btn");


if (contentBtn) {

    contentBtn.addEventListener("click", () => {

        alert("Content Editor coming soon!");

    });

}
