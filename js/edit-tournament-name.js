// =========================
// Load Saved Data
// =========================

loadSaveData();


// =========================
// Load Current Tournament
// =========================

loadCurrentTournament();


// =========================
// Display Current Name
// =========================

function displayCurrentTournamentName() {

    const input =
        document.getElementById(
            "newTournamentName"
        );


    input.value =
        current_tournament_name;

}


// =========================
// Submit
// =========================

function submitNewTournamentName() {

    const input =
        document.getElementById(
            "newTournamentName"
        );


    const newTournamentName =
        input.value.trim();


    // =========================
    // Check Empty Name
    // =========================

    if (newTournamentName === "") {

        alert(
            "Please enter a tournament name."
        );

        return;

    }


    // =========================
    // Same As Current Name
    // =========================

    if (
        newTournamentName ===
        current_tournament_name
    ) {

        window.location.href =
            "tournament-room.html";

        return;

    }


    // =========================
    // Check Duplicate Name
    // =========================

    let finalTournamentName =
        newTournamentName;

    let number = 2;


    while (
        saveDataStorage.some(
            saveData =>
                saveData.name ===
                finalTournamentName
        )
    ) {

        finalTournamentName =
            newTournamentName + number;

        number++;

    }


    // =========================
    // Find Current SaveData
    // =========================

    const currentSaveData =
        saveDataStorage.find(
            saveData =>
                saveData.name ===
                current_tournament_name
        );


    if (!currentSaveData) {

        alert(
            "Current tournament data could not be found."
        );

        return;

    }


    // =========================
    // Update SaveData
    // =========================

    currentSaveData.name =
        finalTournamentName;


    // =========================
    // Update Current Tournament
    // =========================

    current_tournament_name =
        finalTournamentName;


    // =========================
    // Save SaveDataStorage
    // =========================

    saveSaveData();


    // =========================
    // Save Current Tournament
    // =========================

    saveCurrentTournament();


    // =========================
    // Return To Tournament Room
    // =========================

    window.location.href =
        "tournament-room.html";

}


// =========================
// Cancel
// =========================

function cancelEditTournamentName() {

    window.location.href =
        "tournament-room.html";

}


// =========================
// Initialize
// =========================

displayCurrentTournamentName();