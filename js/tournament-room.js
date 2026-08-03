// =========================
// Load Saved Data
// =========================

loadSaveData();


// =========================
// Load Current Tournament
// =========================

loadCurrentTournament();


// =========================
// Display Tournament Name
// =========================

function displayCurrentTournamentName() {

    const tournamentName =
        document.getElementById(
            "currentTournamentName"
        );


    tournamentName.textContent =
        current_tournament_name;

}


// =========================
// Go To Main Menu
// =========================

function goToMainMenu() {

    window.location.href =
        "index.html";

}


// =========================
// Initialize
// =========================

displayCurrentTournamentName();

function goToEditTournamentName() {

    window.location.href =
        "edit-tournament-name.html";

}

function goToEditParticipants() {

    window.location.href =
        "edit-participants.html";

}

function goToRanking() {

    window.location.href =
        "ranking.html";

}

function goToSwissResult() {

    window.location.href =
        "swiss-result.html";

}

// =========================================================
// Go To Fight
// =========================================================

function goToFight() {

    // =====================================================
    // Tournament Has Ended
    // =====================================================

    if (
        current_tournament.end ===
        true
    ) {

        // =================================================
        // 16 Participants
        // =================================================

        if (
            current_participant_number ===
            16
        ) {

            window.location.href =
                "main-tournament-result-16.html";

            return;

        }


        // =================================================
        // 32 Participants
        // =================================================

        if (
            current_participant_number ===
            32
        ) {

            window.location.href =
                "main-tournament-result-32.html";

            return;

        }


        // =================================================
        // Invalid Participant Number
        // =================================================

        console.warn(
            "Unsupported participant number:",
            current_participant_number
        );

        return;

    }


    // =====================================================
    // Tournament Has Not Ended
    // =====================================================

    // =====================================================
    // Check Tournament Start
    // =====================================================

    if (
        current_tournament.start !==
        true
    ) {

        const started =
            swiss_start();


        if (
            !started
        ) {

            return;

        }

    }


    // =====================================================
    // Go To Fight
    // =====================================================

    window.location.href =
        "fight.html";

}

function goToMainTournamentResult() {

    if (current_participant_number === 16) {

        window.location.href =
            "main-tournament-result-16.html";

    }

    else if (current_participant_number === 32) {

        window.location.href =
            "main-tournament-result-32.html";

    }

}