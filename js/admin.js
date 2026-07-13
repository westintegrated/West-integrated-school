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

const loginBtn =
document.getElementById("login-btn");

const username =
document.getElementById("username");

const password =
document.getElementById("password");

const loginMessage =
document.getElementById("login-message");

const loginScreen =
document.getElementById("login-screen");

const adminDashboard =
document.getElementById("admin-dashboard");

const publishBtn =
document.getElementById("publish-btn");

const logoutBtn =
document.getElementById("logout-btn");

const galleryAddBtn =
document.getElementById("gallery-add-btn");

const galleryStatus =
document.getElementById("gallery-status");

const galleryList =
document.getElementById("gallery-list");

// ==========================================
// AUTH STATE
// ==========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        loginScreen.style.display = "none";
        adminDashboard.style.display = "block";

        loadGallery();

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

            console.error(error);

            loginMessage.textContent =
            "Incorrect email or password.";

        }

    });

}

// ==========================================
// ANNOUNCEMENTS
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
// ADD GALLERY IMAGE
// ==========================================

if (galleryAddBtn) {

    galleryAddBtn.addEventListener("click", async () => {

        const imageUrl =
        document.getElementById("gallery-url")
        .value.trim();

        const title =
        document.getElementById("gallery-title")
        .value.trim();

        const description =
        document.getElementById("gallery-description")
        .value.trim();

        if (!imageUrl || !title) {

            galleryStatus.textContent =
            "Please enter an image URL and title.";

            return;

        }

        try {

            await addDoc(

                collection(db, "gallery"),

                {

                    imageUrl,

                    title,

                    description,

                    createdAt:
                    serverTimestamp()

                }

            );

            galleryStatus.textContent =
            "Image added successfully! ✓";

            document.getElementById(
                "gallery-url"
            ).value = "";

            document.getElementById(
                "gallery-title"
            ).value = "";

            document.getElementById(
                "gallery-description"
            ).value = "";

            loadGallery();

        } catch (error) {

            console.error(error);

            galleryStatus.textContent =
            "Failed to add image.";

        }

    });

    }
// ==========================================
// LOAD GALLERY
// ==========================================

async function loadGallery() {

    if (!galleryList) return;

    galleryList.innerHTML = "";

    try {

        const querySnapshot =
        await getDocs(
            collection(db, "gallery")
        );

        querySnapshot.forEach((galleryDoc) => {

            const data =
            galleryDoc.data();

            galleryList.innerHTML += `

                <div class="gallery-item">

                    <h3>${data.title}</h3>

                    <img
                    src="${data.imageUrl}"
                    style="width:100%;border-radius:12px;margin:10px 0;">

                    <p>${data.description}</p>

                    <button
                    class="btn delete-gallery"
                    data-id="${galleryDoc.id}">

                        🗑 Delete

                    </button>

                </div>

                <br>

            `;

        });

        // ==========================================
        // DELETE BUTTONS
        // ==========================================

        const deleteButtons =
        document.querySelectorAll(".delete-gallery");

        deleteButtons.forEach((button) => {

            button.addEventListener("click", async () => {

                const confirmDelete =
                confirm(
                    "Delete this gallery image?"
                );

                if (!confirmDelete) return;

                try {

                    await deleteDoc(

                        doc(
                            db,
                            "gallery",
                            button.dataset.id
                        )

                    );

                    loadGallery();

                } catch (error) {

                    console.error(error);

                    alert(
                        "Failed to delete image."
                    );

                }

            });

        });

    } catch (error) {

        console.error(error);

        galleryList.innerHTML =

        "<p>Failed to load gallery.</p>";

    }

}

// ==========================================
// LOAD WHEN PAGE OPENS
// ==========================================

window.addEventListener(

    "DOMContentLoaded",

    () => {

        loadGallery();

    }

);

// ==========================================
// CONTENT EDITOR
// ==========================================

const contentBtn =
document.getElementById("content-btn");

if (contentBtn) {

    contentBtn.addEventListener("click", () => {

        alert(
            "Content Editor coming soon!"
        );

    });

}


// ==========================================
// LOGOUT SYSTEM
// ==========================================



const logoutBtn = document.getElementById("logout-btn");


if(logoutBtn){

    logoutBtn.addEventListener("click", () => {


        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );


        if(confirmLogout){

            signOut(auth)

            .then(() => {

                alert("Logged out successfully!");

                window.location.href = "index.html";

            })


            .catch((error) => {

                console.error(
                    "Logout error:",
                    error
                );

                alert(
                    "Logout failed. Please try again."
                );

            });

        }


    });

}
