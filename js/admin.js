
import { db, auth } from "./firebase-config.js";

import {
    collection,
    addDoc,
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
// GALLERY MANAGER DEMO
// ==========================================

const galleryFile =
document.getElementById("gallery-file");

const galleryPreview =
document.getElementById("gallery-preview");

const galleryAddBtn =
document.getElementById("gallery-add-btn");

const galleryStatus =
document.getElementById("gallery-status");



let selectedImage = "";


// IMAGE PREVIEW

if (galleryFile) {

    galleryFile.addEventListener("change", () => {


        const file =
        galleryFile.files[0];


        if (file) {


            const reader =
            new FileReader();


            reader.onload = function(e) {


                selectedImage =
                e.target.result;


                galleryPreview.src =
                selectedImage;


                galleryPreview.style.display =
                "block";


                galleryStatus.textContent =
                "Image selected ✓";


            };


            reader.readAsDataURL(file);


        }


    });

}



// ADD IMAGE

if (galleryAddBtn) {

    galleryAddBtn.addEventListener("click", () => {


        const title =
        document.getElementById(
            "gallery-title"
        ).value;


        const description =
        document.getElementById(
            "gallery-description"
        ).value;



        if (!selectedImage) {


            galleryStatus.textContent =
            "Please select an image first.";


            return;


        }



        let gallery =
        JSON.parse(
            localStorage.getItem("demoGallery")
        ) || [];



        gallery.push({

            image: selectedImage,
            title: title,
            description: description

        });



        localStorage.setItem(
            "demoGallery",
            JSON.stringify(gallery)
        );



        galleryStatus.textContent =
        "Image added successfully ✓";


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
