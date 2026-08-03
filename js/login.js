
// =========================================================
// Login
// =========================================================


// =========================================================
// API
// =========================================================

const LOGIN_API =
    "http://localhost:3000/api/users/login";


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

                        saveUsername(
                            data.username
                        );

                    }

                    else {

                        console.warn(
                            "saveUsername() is not available."
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


                    // =================================================
                    // Clear Previous User SaveData
                    // =================================================

                    localStorage.removeItem(
                        "saveDataStorage"
                    );


                    // =================================================
                    // Clear Previous User Default Participants
                    // =================================================

                    localStorage.removeItem(
                        "defaultParticipantsListArray"
                    );


                    // =================================================
                    // Clear Previous User Current Tournament
                    // =================================================

                    localStorage.removeItem(
                        "currentTournamentData"
                    );


                    // =================================================
                    // Load Current User SaveData
                    // =================================================

                    if (
                        typeof loadSaveDataFromDatabase ===
                        "function"
                    ) {

                        console.log(
                            "Loading current user SaveData from database..."
                        );


                        const databaseLoaded =
                            await loadSaveDataFromDatabase();


                        if (
                            databaseLoaded
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

                        console.warn(
                            "loadSaveDataFromDatabase() is not available."
                        );

                    }


                    // =================================================
                    // Load Current User Default Participants List
                    // =================================================

                    if (
                        typeof loadDefaultParticipantsList ===
                        "function"
                    ) {

                        console.log(
                            "Loading current user Default Participants List from database..."
                        );


                        const defaultParticipantsLoaded =
                            await loadDefaultParticipantsList();


                        if (
                            defaultParticipantsLoaded
                        ) {

                            console.log(
                                "Current user Default Participants List loaded successfully."
                            );

                        }

                        else {

                            console.warn(
                                "Current user Default Participants List could not be loaded from database."
                            );

                        }

                    }

                    else {

                        console.warn(
                            "loadDefaultParticipantsList() is not available."
                        );

                    }


                    // =================================================
                    // Debug Login Information
                    // =================================================

                    console.log(
                        "Login successful."
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
                        "JWT Token saved."
                    );


                    console.log(
                        "User SaveData loaded."
                    );


                    console.log(
                        "User Default Participants List loaded."
                    );


                    // =================================================
                    // Login Success
                    // =================================================

                    message.textContent =
                        data.message ||
                        "Login successful.";


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