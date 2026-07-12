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


// ==========================================
// LOGIN
// ==========================================

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        if (
            username.value.trim() === "principal" &&
            password.value.trim() === "wis2026"
        ) {

            loginScreen.style.display = "none";
            adminDashboard.style.display = "block";

        } else {

            loginMessage.textContent =
            "Incorrect username or password.";

        }

    });

}


// ==========================================
// ANNOUNCEMENTS
// ==========================================

if (publishBtn) {

    publishBtn.addEventListener("click", () => {

        const title =
        document.getElementById("announcement-title-input").value;

        const message =
        document.getElementById("announcement-message-input").value;


        localStorage.setItem(
            "announcementTitle",
            title
        );


        localStorage.setItem(
            "announcementMessage",
            message
        );


        alert("Announcement published!");

    });

}