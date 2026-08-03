
// =========================================================
// Login
// =========================================================


// =========================================================
// API
// =========================================================

const LOGIN_API =
    "https://who-is-the-winner-imdt.onrender.com/api/users/login";


// =========================================================
// Login Form
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // =====================================================
        // Get Login Form
        // =====================================================

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        // =====================================================
        // Check Login Form
        // =====================================================

        if (
            !loginForm
        ) {

            console.error(
                "loginForm not found."
            );

            return;

        }


        console.log(
            "LOGIN JS LOADED"
        );


        // =====================================================
        // Submit Login
        // =====================================================

        loginForm.addEventListener(
            "submit",
            async function(event) {

                // =================================================
                // Prevent Page Refresh
                // =================================================

                event.preventDefault();


                console.log(
                    "Sending login request..."
                );


                // =================================================
                // Get Username
                // =================================================

                const usernameElement =
                    document.getElementById(
                        "username"
                    );


                // =================================================
                // Get Password
                // =================================================

                const passwordElement =
                    document.getElementById(
                        "password"
                    );


                // =================================================
                // Get Message
                // =================================================

                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                // =================================================
                // Check Elements
                // =================================================

                if (
                    !usernameElement ||
                    !passwordElement ||
                    !message
                ) {

                    console.error(
                        "Login form elements are missing."
                    );

                    return;

                }


                // =================================================
                // Get Values
                // =================================================

                const username =
                    usernameElement.value.trim();


                const password =
                    passwordElement.value;


                // =================================================
                // Debug API
                // =================================================

                console.log(
                    "API:",
                    LOGIN_API
                );


                // =================================================
                // Clear Message
                // =================================================

                message.textContent =
                    "";


                // =================================================
                // Check Username
                // =================================================

                if (
                    username === ""
                ) {

                    message.textContent =
                        "Username is required.";

                    return;

                }


                // =================================================
                // Check Password
                // =================================================

                if (
                    password === ""
                ) {

                    message.textContent =
                        "Password is required.";

                    return;

                }


                // =================================================
                // Send Login Request
                // =================================================

                try {

                    const response =
                        await fetch(
                            LOGIN_API,
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify({

                                        username:
                                            username,

                                        password:
                                            password

                                    })

                            }
                        );


                    // =================================================
                    // Read Response
                    // =================================================

                    const data =
                        await response.json();


                    console.log(
                        "Server Response:",
                        data
                    );


                    // =================================================
                    // Login Failed
                    // =================================================

                    if (
                        !response.ok
                    ) {

                        message.textContent =
                            data.message ||
                            "Invalid username or password.";

                        return;

                    }


                    // =================================================
                    // Check Username
                    // =================================================

                    if (
                        !data.username
                    ) {

                        message.textContent =
                            "Login successful, but username was not returned.";

                        console.error(
                            "Username was not returned by server."
                        );

                        return;

                    }


                    // =================================================
                    // Check Token
                    // =================================================

                    if (
                        !data.token
                    ) {

                        message.textContent =
                            "Login successful, but authentication token was not returned.";

                        console.error(
                            "JWT token was not returned by server."
                        );

                        return;

                    }


                    // =================================================
                    // Check User ID
                    // =================================================

                    if (
                        !data.userId
                    ) {

                        message.textContent =
                            "Login successful, but user ID was not returned.";

                        console.error(
                            "User ID was not returned by server."
                        );

                        return;

                    }


                    // =================================================
                    // Save Username
                    // =================================================

                    if (
                        typeof saveUsername ===
                        "function"
                    ) {

                        const usernameSaved =
                            saveUsername(
                                data.username
                            );


                        if (
                            !usernameSaved
                        ) {

                            console.error(
                                "Failed to save username."
                            );

                            return;

                        }

                    }

                    else {

                        console.warn(
                            "saveUsername() is not available. Using localStorage directly."
                        );


                        localStorage.setItem(
                            "currentUsername",
                            data.username
                        );

                    }


                    // =================================================
                    // Save JWT Token
                    // =================================================

                    localStorage.setItem(
                        "token",
                        data.token
                    );


                    // =================================================
                    // Save User ID
                    // =================================================

                    localStorage.setItem(
                        "userId",
                        data.userId
                    );


                    console.log(
                        "Login credentials saved."
                    );


                    console.log(
                        "Username:",
                        data.username
                    );


                    console.log(
                        "User ID:",
                        data.userId
                    );


                    // =================================================
                    // Clear Previous User SaveData
                    // =================================================

                    localStorage.removeItem(
                        "saveDataStorage"
                    );


                    // =================================================
                    // Clear Previous User Current Tournament
                    // =================================================

                    localStorage.removeItem(
                        "currentTournamentData"
                    );


                    // =================================================
                    // DO NOT REMOVE
                    //
                    // defaultParticipantsListArray_Username
                    //
                    // The cache is username-specific.
                    //
                    // loadDefaultParticipantsList() will:
                    //
                    // 1. Load username-specific cache.
                    // 2. Get latest data from Database.
                    // 3. Replace cache with Database data.
                    //
                    // =================================================


                    // =================================================
                    // Load Current User SaveData
                    // =================================================

                    let saveDataLoaded =
                        false;


                    if (
                        typeof loadSaveDataFromDatabase ===
                        "function"
                    ) {

                        console.log(
                            "========================================"
                        );


                        console.log(
                            "Loading current user SaveData from database..."
                        );


                        saveDataLoaded =
                            await loadSaveDataFromDatabase();


                        if (
                            saveDataLoaded
                        ) {

                            console.log(
                                "Current user SaveData loaded successfully."
                            );

                        }

                        else {

                            console.warn(
                                "Current user SaveData could not be loaded from database."
                            );

                        }

                    }

                    else {

                        console.error(
                            "loadSaveDataFromDatabase() is not available."
                        );

                    }


                    // =================================================
                    // Load Current User Default Participants List
                    // =================================================

                    let defaultParticipantsLoaded =
                        false;


                    if (
                        typeof loadDefaultParticipantsList ===
                        "function"
                    ) {

                        console.log(
                            "========================================"
                        );


                        console.log(
                            "Loading current user Default Participants List from database..."
                        );


                        defaultParticipantsLoaded =
                            await loadDefaultParticipantsList();


                        if (
                            defaultParticipantsLoaded
                        ) {

                            console.log(
                                "Current user Default Participants List loaded successfully."
                            );


                            console.log(
                                "Default Participants:",
                                defaultParticipantsListArray
                            );

                        }

                        else {

                            console.warn(
                                "Current user Default Participants List could not be loaded from database."
                            );


                            console.warn(
                                "Current Local Default Participants:",
                                defaultParticipantsListArray
                            );

                        }

                    }

                    else {

                        console.error(
                            "loadDefaultParticipantsList() is not available."
                        );

                    }


                    // =================================================
                    // Final Login Debug
                    // =================================================

                    console.log(
                        "========================================"
                    );


                    console.log(
                        "LOGIN COMPLETE"
                    );


                    console.log(
                        "Username:",
                        data.username
                    );


                    console.log(
                        "User ID:",
                        data.userId
                    );


                    console.log(
                        "JWT Token saved:",
                        true
                    );


                    console.log(
                        "SaveData loaded from database:",
                        saveDataLoaded
                    );


                    console.log(
                        "Default Participants loaded from database:",
                        defaultParticipantsLoaded
                    );


                    console.log(
                        "Current Default Participants:",
                        defaultParticipantsListArray
                    );


                    console.log(
                        "========================================"
                    );


                    // =================================================
                    // Login Success Message
                    // =================================================

                    if (
                        defaultParticipantsLoaded
                    ) {

                        message.textContent =
                            data.message ||
                            "Login successful.";

                    }

                    else {

                        message.textContent =
                            "Login successful, but Default Participants could not be loaded.";

                    }


                    // =================================================
                    // Go To Main Menu
                    // =================================================

                    setTimeout(
                        function() {

                            window.location.href =
                                "index.html";

                        },
                        1000
                    );

                }

                catch (
                    error
                ) {

                    // =================================================
                    // Debug
                    // =================================================

                    console.error(
                        "Login Error:",
                        error
                    );


                    console.error(
                        "Login Error Message:",
                        error.message
                    );


                    // =================================================
                    // Connection Error
                    // =================================================

                    message.textContent =
                        "Unable to connect to server.";

                }

            }
        );

    }
);


// =========================================================
// Go To Register
// =========================================================

function goToRegister() {

    window.location.href =
        "register.html";

}


// =========================================================
// Back To Main Menu
// =========================================================

function goBackToMainMenu() {

    window.location.href =
        "index.html";

}