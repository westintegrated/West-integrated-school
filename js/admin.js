
import { db, auth } from "./firebase-config.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {

    if (user) {

        loginScreen.style.display = "none";

        adminDashboard.style.display = "block";

    } else {

        loginScreen.style.display = "block";

        adminDashboard.style.display = "none";

    }

});

// ==========================================
// LOGIN
// ==========================================

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        try {

            await signInWithEmailAndPassword(

                auth,

                username.value.trim(),

                password.value.trim()

            );

        } catch (error) {

            loginMessage.textContent =
            "Incorrect email or password.";

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

const galleryAddBtn =
document.getElementById("gallery-add-btn");

const galleryStatus =
document.getElementById("gallery-status");

const galleryList =
document.getElementById("gallery-list");

if (galleryAddBtn) {

    galleryAddBtn.addEventListener("click", async () => {

        const imageUrl =
        document.getElementById("gallery-url").value.trim();

        const title =
        document.getElementById("gallery-title").value.trim();

        const description =
        document.getElementById("gallery-description").value.trim();

        if (!imageUrl || !title) {

            galleryStatus.textContent =
            "Please enter an image URL and title.";

            return;

        }

        try {

            await addDoc(
                collection(db, "gallery"),
                {
                    imageUrl: imageUrl,
                    title: title,
                    description: description,
                    createdAt: serverTimestamp()
                }
            );

            galleryStatus.textContent =
            "Image added successfully! ✓";

            document.getElementById("gallery-url").value = "";

            document.getElementById("gallery-title").value = "";

            document.getElementById("gallery-description").value = "";

        } catch (error) {

            console.error(error);

            galleryStatus.textContent =
            "Failed to add image.";

        }

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
