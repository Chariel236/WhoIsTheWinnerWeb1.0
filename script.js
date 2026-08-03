
// =========================================================
// Create Tournament
// =========================================================


// =========================================================
// Load Data
// =========================================================

loadSaveData();

loadDefaultParticipantsList();


// =========================================================
// Login Status
// =========================================================

let is_user_logged_in =
    false;


// =========================================================
// Check Login Status
// =========================================================

function checkLoginStatus() {

    // =====================================================
    // Check Username Function
    // =====================================================

    if (
        typeof loadUsername !==
        "function"
    ) {

        console.error(
            "loadUsername() is not available."
        );

        is_user_logged_in =
            false;

        return;

    }


    // =====================================================
    // Load Username
    // =====================================================

    const usernameLoaded =
        loadUsername();


    // =====================================================
    // Check Username
    // =====================================================

    if (
        usernameLoaded &&
        typeof current_username !==
        "undefined" &&
        current_username !== ""
    ) {

        is_user_logged_in =
            true;

    }

    else {

        is_user_logged_in =
            false;

    }


    // =====================================================
    // Update Username Display
    // =====================================================

    updateUsernameDisplay();


    // =====================================================
    // Debug
    // =====================================================

    console.log(
        "Current Username:",
        typeof current_username !==
        "undefined"
            ? current_username
            : ""
    );

    console.log(
        "Login Status:",
        is_user_logged_in
    );

}


// =========================================================
// Update Username Display
// =========================================================

function updateUsernameDisplay() {

    const usernameElement =
        document.getElementById(
            "currentUsername"
        );


    // =====================================================
    // Check Element
    // =====================================================

    if (
        !usernameElement
    ) {

        return;

    }


    // =====================================================
    // Display Username
    // =====================================================

    if (
        is_user_logged_in &&
        typeof current_username !==
        "undefined"
    ) {

        usernameElement.textContent =
            current_username;

    }

    else {

        usernameElement.textContent =
            "Guest";

    }

}


// =========================================================
// Logout User
// =========================================================

function logoutUser() {

    // =====================================================
    // Check Delete Function
    // =====================================================

    if (
        typeof deleteUsername ===
        "function"
    ) {

        deleteUsername();

    }


    // =====================================================
    // Update Login Status
    // =====================================================

    is_user_logged_in =
        false;


    // =====================================================
    // Update Display
    // =====================================================

    updateUsernameDisplay();


    // =====================================================
    // Go To Login
    // =====================================================

    window.location.href =
        "login.html";

}


// =========================================================
// Check User Login
// =========================================================

function checkUserLogin() {

    // =====================================================
    // Check Load Function
    // =====================================================

    if (
        typeof loadUsername !==
        "function"
    ) {

        console.error(
            "loadUsername() is not available."
        );

        return false;

    }


    // =====================================================
    // Load Username
    // =====================================================

    const usernameLoaded =
        loadUsername();


    // =====================================================
    // Check Username
    // =====================================================

    if (
        usernameLoaded &&
        typeof current_username !==
        "undefined" &&
        current_username !== ""
    ) {

        return true;

    }


    return false;

}


// =========================================================
// Go To Create Tournament
// =========================================================

function goToCreateTournament() {

    console.log(
        "New Tournament clicked."
    );


    if (
        !checkUserLogin()
    ) {

        console.log(
            "User is not logged in. Going to login.html"
        );

        window.location.href =
            "login.html";

        return;

    }


    window.location.href =
        "create-tournament.html";

}


// =========================================================
// Go To Load Tournament
// =========================================================

function goToLoadTournament() {

    console.log(
        "Load Tournament clicked."
    );


    if (
        !checkUserLogin()
    ) {

        console.log(
            "User is not logged in. Going to login.html"
        );

        window.location.href =
            "login.html";

        return;

    }


    window.location.href =
        "load-tournament.html";

}


// =========================================================
// Go To Delete Tournament
// =========================================================

function goToDeleteTournament() {

    console.log(
        "Delete Tournament clicked."
    );


    if (
        !checkUserLogin()
    ) {

        console.log(
            "User is not logged in. Going to login.html"
        );

        window.location.href =
            "login.html";

        return;

    }


    window.location.href =
        "delete-tournament.html";

}


// =========================================================
// Go Back
// =========================================================

function goBack() {

    window.location.href =
        "index.html";

}


// =========================================================
// Button Click
// =========================================================

function buttonClick(
    name
) {

    alert(
        name +
        " Clicked"
    );

}

// =========================================================
// Go To Community
// =========================================================

function goToCommunity() {

    window.location.href =
        "community.html";

}

// =========================================================
// Initialize
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        checkLoginStatus();

    }
);