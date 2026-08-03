// =========================
// Load Existing Save Data
// =========================

loadSaveData();


// =========================
// Participant Count
// =========================

let ownParticipantCountValue = 16;


function changeOwnParticipantCount(direction) {

    if (direction === 1) {

        ownParticipantCountValue = 32;

    }

    else if (direction === -1) {

        ownParticipantCountValue = 16;

    }


    document.getElementById("ownParticipantCount").textContent =
        ownParticipantCountValue;

}


// =========================
// Submit Own Tournament
// =========================

function submitOwnTournament() {

    let tournamentName =
        document.getElementById("ownTournamentName").value;


    // =========================
    // Check Empty Name
    // =========================

    if (tournamentName.trim() === "") {

        alert("Please enter a tournament name.");

        return;

    }


    // =========================
    // Check Tournament Name
    // =========================

    let finalTournamentName =
        tournamentName;

    let number = 2;


    while (
        saveDataStorage.some(
            saveData =>
                saveData.name ===
                finalTournamentName
        )
    ) {

        finalTournamentName =
            tournamentName + number;

        number++;

    }


    // =========================
    // Create Participant Array
    // =========================

    const participantArray = [];


    for (
        let i = 1;
        i <= ownParticipantCountValue;
        i++
    ) {

        const participant =
            new Participant();


        participant.seed =
            i;


        participantArray.push(
            participant
        );

    }


    // =========================
    // Create Ranking Array
    // =========================

    const rankingArray = [];


    // =========================
    // Create SaveData
    // =========================

    const saveData =
        new SaveData();


    saveData.name =
        finalTournamentName;


    saveData.participant_number =
        ownParticipantCountValue;


    saveData.participantlist =
        participantArray;


    saveData.ranking =
        rankingArray;


    // =========================
    // Add SaveData to Storage
    // =========================

    saveDataStorage.push(
        saveData
    );


    // =========================
    // Save to Local Storage
    // =========================

    saveSaveData();


    // =========================
    // Return to Main Menu
    // =========================

    window.location.href =
        "index.html";

}


// =========================
// Cancel
// =========================

function cancelOwnTournament() {

    window.location.href =
        "create-tournament.html";

}