// ==========================================
// FIREBASE IMPORTS
// ==========================================

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
// ELEMENTS
// ==========================================

const loginBtn = document.getElementById("login-btn");

const username = document.getElementById("username");

const password = document.getElementById("password");

const loginMessage = document.getElementById("login-message");

const loginScreen = document.getElementById("login-screen");

const adminDashboard = document.getElementById("admin-dashboard");

const logoutBtn = document.getElementById("logout-btn");


// ==========================================
// AUTH STATE CHECK
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
// LOGIN SYSTEM
// ==========================================

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {


        const email = username.value.trim();

        const pass = password.value.trim();


        if (!email || !pass) {

            loginMessage.textContent =
            "Please enter email and password.";

            return;

        }


        try {


            await signInWithEmailAndPassword(

                auth,

                email,

                pass

            );


            loginMessage.textContent =
            "Login successful!";


        } catch (error) {


            console.error(
                "Login Error:",
                error
            );


            loginMessage.textContent =
            "Incorrect email or password.";

        }


    });

}


// ==========================================
// LOGOUT SYSTEM
// ==========================================

if (logoutBtn) {


    logoutBtn.addEventListener("click", async () => {


        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );


        if (!confirmLogout) return;


        try {


            await signOut(auth);


            alert(
                "Logged out successfully!"
            );


            window.location.href =
            "admin.html";


        } catch (error) {


            console.error(
                "Logout Error:",
                error
            );


            alert(
                "Logout failed."
            );


        }


    });


}
// ==========================================
// ANNOUNCEMENT SYSTEM
// ==========================================

const publishBtn =
document.getElementById("publish-btn");


if (publishBtn) {


    publishBtn.addEventListener("click", () => {


        const title =
        document.getElementById(
            "announcement-title-input"
        ).value.trim();


        const message =
        document.getElementById(
            "announcement-message-input"
        ).value.trim();



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
// GALLERY ELEMENTS
// ==========================================

const galleryAddBtn =
document.getElementById("gallery-add-btn");


const galleryStatus =
document.getElementById("gallery-status");


const galleryList =
document.getElementById("gallery-list");


// ==========================================
// ADD GALLERY IMAGE
// ==========================================

if (galleryAddBtn) {


    galleryAddBtn.addEventListener(
    "click",
    async () => {


        const imageUrl =
        document.getElementById(
            "gallery-url"
        ).value.trim();


        const title =
        document.getElementById(
            "gallery-title"
        ).value.trim();


        const description =
        document.getElementById(
            "gallery-description"
        ).value.trim();



        if (!imageUrl || !title) {


            galleryStatus.textContent =
            "Please enter image URL and title.";


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
            "Image added successfully ✓";



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


            console.error(
                "Gallery Error:",
                error
            );


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


        const snapshot =
        await getDocs(
            collection(db, "gallery")
        );



        snapshot.forEach((item) => {


            const data =
            item.data();



            galleryList.innerHTML += `

            <div class="gallery-item">


                <h3>
                    ${data.title}
                </h3>


                <img
                src="${data.imageUrl}"
                style="
                width:100%;
                border-radius:12px;
                margin:10px 0;
                ">


                <p>
                    ${data.description || ""}
                </p>



                <button
                class="btn delete-gallery"
                data-id="${item.id}">

                    🗑 Delete

                </button>


            </div>

            <br>

            `;


        });



        const deleteButtons =
        document.querySelectorAll(
            ".delete-gallery"
        );



        deleteButtons.forEach((button) => {


            button.addEventListener(
            "click",
            async () => {


                const confirmDelete =
                confirm(
                    "Delete this image?"
                );



                if (!confirmDelete)
                return;



                try {


                    await deleteDoc(

                        doc(

                            db,

                            "gallery",

                            button.dataset.id

                        )

                    );



                    loadGallery();



                } catch(error) {


                    console.error(
                        "Delete Error:",
                        error
                    );


                    alert(
                        "Failed to delete image."
                    );


                }


            });


        });



    } catch(error) {


        console.error(
            "Load Gallery Error:",
            error
        );


        galleryList.innerHTML =
        "<p>Failed to load gallery.</p>";


    }


}


// ==========================================
// PAGE READY
// ==========================================

window.addEventListener(
"DOMContentLoaded",
() => {


    loadGallery();


});
