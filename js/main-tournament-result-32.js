
// =========================================================
// MAIN TOURNAMENT RESULT - 32 PARTICIPANTS
// =========================================================


// =========================================================
// Load Current Tournament
// =========================================================

loadCurrentTournament();


// =========================================================
// Get Participant By Slot
// =========================================================

function getParticipantBySlot32(
    location,
    round
) {

    // =====================================================
    // Convert Round To Number
    // =====================================================

    round =
        Number(
            round
        );


    // =====================================================
    // Check Final Match
    // =====================================================

    const isFinalSlot =
        location === "G1" ||
        location === "G2";


    // =====================================================
    // Final Match - Tournament Not Ended
    // =====================================================

    if (
        isFinalSlot &&
        current_tournament.end !== true
    ) {

        return findParticipantFromCurrent32(
            location
        );

    }


    // =====================================================
    // Final Match - Tournament Ended
    // =====================================================

    if (
        isFinalSlot &&
        current_tournament.end === true
    ) {

        return findParticipantFromMemory32(
            location,
            round
        );

    }


    // =====================================================
    // Tournament Has Not Reached Slot Round
    // =====================================================

    if (
        current_tournament.main_round <=
        round
    ) {

        return findParticipantFromCurrent32(
            location
        );

    }


    // =====================================================
    // Tournament Has Passed Slot Round
    // =====================================================

    return findParticipantFromMemory32(
        location,
        round
    );

}


// =========================================================
// Find Participant From Current Main Tournament
// =========================================================

function findParticipantFromCurrent32(
    location
) {

    // =====================================================
    // Check Current Main Tournament Participants
    // =====================================================

    if (
        !Array.isArray(
            current_main_t_participants
        )
    ) {

        return null;

    }


    // =====================================================
    // Find Participant
    // =====================================================

    const participant =
        current_main_t_participants.find(
            participant =>
                participant.main_t_location ===
                location
        );


    // =====================================================
    // Return Participant
    // =====================================================

    if (
        participant
    ) {

        return participant;

    }


    return null;

}


// =========================================================
// Find Participant From Memory
// =========================================================

function findParticipantFromMemory32(
    location,
    round
) {

    // =====================================================
    // Check Main Tournament Memory
    // =====================================================

    if (
        !Array.isArray(
            current_main_tournament_memory
        )
    ) {

        return null;

    }


    // =====================================================
    // Get Memory
    // =====================================================

    const memory =
        current_main_tournament_memory[
            round
        ];


    // =====================================================
    // Memory Does Not Exist
    // =====================================================

    if (
        !memory
    ) {

        return null;

    }


    // =====================================================
    // Check Winner
    // =====================================================

    if (
        memory.winner &&
        memory.winner.main_t_location ===
        location
    ) {

        return memory.winner;

    }


    // =====================================================
    // Check Loser
    // =====================================================

    if (
        memory.loser &&
        memory.loser.main_t_location ===
        location
    ) {

        return memory.loser;

    }


    // =====================================================
    // Participant Not Found
    // =====================================================

    return null;

}


// =========================================================
// Display Participant In Slot
// =========================================================

function displayParticipantInSlot32(
    slot
) {

    // =====================================================
    // Get Location
    // =====================================================

    const location =
        slot.dataset.location;


    // =====================================================
    // Get Round
    // =====================================================

    const round =
        slot.dataset.round;


    // =====================================================
    // Find Participant
    // =====================================================

    const participant =
        getParticipantBySlot32(
            location,
            round
        );


    // =====================================================
    // Display Participant
    // =====================================================

    if (
        participant
    ) {

        slot.textContent =
            participant.name || "";


        // =================================================
        // Set Click Event
        // =================================================

        slot.onclick =
            function() {

                openParticipantURL(
                    participant
                );

            };


        // =================================================
        // Set Cursor
        // =================================================

        slot.style.cursor =
            "pointer";

    }

    else {

        slot.textContent =
            "";


        // =================================================
        // Remove Click Event
        // =================================================

        slot.onclick =
            null;


        slot.style.cursor =
            "default";

    }

}


// =========================================================
// Display Main Tournament Result 32
// =========================================================

function displayMainTournamentResult32() {

    // =====================================================
    // Get All 32 Tournament Slots
    // =====================================================

    const slots =
        document.querySelectorAll(
            ".player-slot-32[data-location]"
        );


    // =====================================================
    // Debug Slot Count
    // =====================================================

    console.log(
        "32 Tournament Slots Found:",
        slots.length
    );


    // =====================================================
    // Display Every Slot
    // =====================================================

    slots.forEach(
        slot => {

            displayParticipantInSlot32(
                slot
            );

        }
    );

}


// =========================================================
// Initialize
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayMainTournamentResult32();
        displayRanking32();

    }
);


// =========================================================
// Open Participant URL
// =========================================================

function openParticipantURL(
    participant
) {

    // =====================================================
    // Check Participant
    // =====================================================

    if (
        !participant
    ) {

        return;

    }


    // =====================================================
    // Check URL
    // =====================================================

    if (
        !participant.url ||
        participant.url.trim() === ""
    ) {

        return;

    }


    // =====================================================
    // Get URL
    // =====================================================

    let url =
        participant.url.trim();


    // =====================================================
    // Add HTTPS If Needed
    // =====================================================

    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {

        url =
            "https://" +
            url;

    }


    // =====================================================
    // Open URL
    // =====================================================

    window.open(
        url,
        "_blank"
    );

}

// =========================================================
// Display Ranking 32
// =========================================================

function displayRanking32() {

    // =====================================================
    // Check Ranking
    // =====================================================

    if (
        !Array.isArray(
            current_ranking
        )
    ) {

        return;

    }


    // =====================================================
    // Get Top 3
    // =====================================================

    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const rankingPlayer =
            document.getElementById(
                "ranking-player-" +
                (i + 1) +
                "-32"
            );


        // =================================================
        // Check HTML Element
        // =================================================

        if (
            !rankingPlayer
        ) {

            continue;

        }


        // =================================================
        // Get Participant
        // =================================================

        const participant =
            current_ranking[i];


        // =================================================
        // Check Participant
        // =================================================

        if (
            !participant
        ) {

            rankingPlayer.textContent =
                "";

            rankingPlayer.onclick =
                null;

            rankingPlayer.style.cursor =
                "default";

            continue;

        }


        // =================================================
        // Display Participant Name
        // =================================================

        rankingPlayer.textContent =
            participant.name || "";


        // =================================================
        // Set Click Event
        // =================================================

        rankingPlayer.onclick =
            function() {

                openParticipantURL(
                    participant
                );

            };


        // =================================================
        // Set Cursor
        // =================================================

        if (
            participant.url &&
            participant.url.trim() !== ""
        ) {

            rankingPlayer.style.cursor =
                "pointer";

        }

        else {

            rankingPlayer.style.cursor =
                "default";

        }

    }

}


// =========================================================
// Go Back
// =========================================================

function goBackToTournamentRoom() {

    window.location.href =
        "tournament-room.html";

}