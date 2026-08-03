// =========================================================
// Main Tournament 16
// =========================================================


// =========================================================
// Load Saved Data
// =========================================================

loadSaveData();


// =========================================================
// Load Current Tournament
// =========================================================

loadCurrentTournament();


// =========================================================
// Current Main Tournament Match Location
// =========================================================

let locationA16 = "";

let locationB16 = "";

// =========================================================
// Main Tournament 16
// =========================================================

// =========================================================
// Main Tournament Structure
// =========================================================


class MainTournamentMatch16 {

    constructor(
        round,
        stage,
        locationA,
        locationB
    ) {

        this.round =
            round;

        this.stage =
            stage;

        this.locationA =
            locationA;

        this.locationB =
            locationB;

    }

}


// =========================================================
// Main Tournament - 16 Participants
// =========================================================

const main_tournament_match_16 = [

    new MainTournamentMatch16(
        0,
        "Lower Bracket Round 1",
        "L1",
        "L2"
    ),

    new MainTournamentMatch16(
        1,
        "Lower Bracket Round 2",
        "L3",
        "L4"
    ),

    new MainTournamentMatch16(
        2,
        "Medium Bracket Quarterfinal",
        "M1",
        "M2"
    ),

    new MainTournamentMatch16(
        3,
        "Lower Bracket Quarterfinal",
        "L5",
        "L6"
    ),

    new MainTournamentMatch16(
        4,
        "Medium Bracket Semifinal",
        "M3",
        "M4"
    ),

    new MainTournamentMatch16(
        5,
        "Lower Bracket Semifinal",
        "L7",
        "L8"
    ),

    new MainTournamentMatch16(
        6,
        "Upper Bracket Final",
        "U1",
        "U2"
    ),

    new MainTournamentMatch16(
        7,
        "Medium Bracket Final",
        "M5",
        "M6"
    ),

    new MainTournamentMatch16(
        8,
        "Lower Bracket Final",
        "L9",
        "L10"
    ),

    new MainTournamentMatch16(
        9,
        "Semifinal",
        "S1",
        "S2"
    ),

    new MainTournamentMatch16(
        10,
        "Grand Final",
        "G1",
        "G2"
    )

];

// =========================================================
// Main Tournament 16
// =========================================================

function MainTournament16() {

    // =====================================================
    // Get Current Main Tournament Round
    // =====================================================

    const currentRound =
        current_tournament.main_round;


    // =====================================================
    // Find Matching Main Tournament Match
    // =====================================================

    const currentMatch =
        main_tournament_match_16.find(
            match =>
                match.round ===
                currentRound
        );


    // =====================================================
    // Check Match
    // =====================================================

    if (
        !currentMatch
    ) {

        console.warn(
            "Main Tournament 16 match not found for round:",
            currentRound
        );

        return;

    }


    // =====================================================
    // Set Current Match Locations
    // =====================================================

    locationA16 =
        currentMatch.locationA;


    locationB16 =
        currentMatch.locationB;


    // =====================================================
    // Debug
    // =====================================================

    console.log(
        "Main Tournament Round:",
        currentRound
    );

    console.log(
        "Location A:",
        locationA16
    );

    console.log(
        "Location B:",
        locationB16
    );

}


// =========================================================
// Main Tournament 16 Set Upper
// =========================================================

function MainTournament16SetUp() {

    // =====================================================
    // Reset Main Tournament Participants
    // =====================================================

    current_main_t_participants =
        [];


    // =====================================================
    // Check Current Participant List
    // =====================================================

    if (
        !Array.isArray(
            current_participant_list
        )
    ) {

        return;

    }


    // =====================================================
    // Find Current SaveData
    // =====================================================

    const currentSaveData =
        saveDataStorage.find(
            saveData =>
                saveData.name ===
                current_tournament_name
        );


    // =====================================================
    // Check Current SaveData
    // =====================================================

    if (
        !currentSaveData
    ) {

        console.warn(
            "Current SaveData not found."
        );

        return;

    }


    // =====================================================
    // Find Participants With 3 Wins
    // =====================================================

    current_participant_list.forEach(
        participant => {

            // =================================================
            // Check Swiss Win Match
            // =================================================

            if (
                participant.swiss.win_match ===
                3
            ) {

                current_main_t_participants.push(
                    participant
                );

            }

        }
    );


    // =====================================================
    // Save Main Tournament Participants
    // Into SaveDataStorage
    // =====================================================

    currentSaveData.MainTParticipants =
        current_main_t_participants;


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();

    // =====================================================
    // Initialize Main Tournament 16 Locations
    // =====================================================

    InitializeLocation16();


    // =====================================================
    // Start Main Tournament 16
    // =====================================================

    MainTournament16();

}

// =========================================================
// Initialize Location 16
// =========================================================

function InitializeLocation16() {

    // =====================================================
    // Check Main Tournament Participants
    // =====================================================

    if (
        !Array.isArray(
            current_main_t_participants
        )
    ) {

        console.warn(
            "Current Main Tournament Participants is invalid."
        );

        return;

    }


    // =====================================================
    // Check Participant Number
    // =====================================================

    if (
        current_main_t_participants.length <
        8
    ) {

        console.warn(
            "Main Tournament requires 8 participants."
        );

        return;

    }


    // =====================================================
    // Assign Participant Location
    // =====================================================

    // =====================================================
    // Index 0
    // =====================================================

    current_main_t_participants[0]
        .main_t_location =
        "U1";


    // =====================================================
    // Index 1
    // =====================================================

    current_main_t_participants[1]
        .main_t_location =
        "U2";


    // =====================================================
    // Index 2
    // =====================================================

    current_main_t_participants[2]
        .main_t_location =
        "M3";


    // =====================================================
    // Index 3
    // =====================================================

    current_main_t_participants[3]
        .main_t_location =
        "M1";


    // =====================================================
    // Index 4
    // =====================================================

    current_main_t_participants[4]
        .main_t_location =
        "M2";


    // =====================================================
    // Index 5
    // =====================================================

    current_main_t_participants[5]
        .main_t_location =
        "L3";


    // =====================================================
    // Index 6
    // =====================================================

    current_main_t_participants[6]
        .main_t_location =
        "L1";


    // =====================================================
    // Index 7
    // =====================================================

    current_main_t_participants[7]
        .main_t_location =
        "L2";


    // =====================================================
    // Find Current SaveData
    // =====================================================

    const currentSaveData =
        saveDataStorage.find(
            saveData =>
                saveData.name ===
                current_tournament_name
        );


    // =====================================================
    // Check Current SaveData
    // =====================================================

    if (
        !currentSaveData
    ) {

        console.warn(
            "Current SaveData not found."
        );

        return;

    }


    // =====================================================
    // Save Main Tournament Participants
    // =====================================================

    currentSaveData.MainTParticipants =
        current_main_t_participants;


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();

}

// =========================================================
// Winner Relocate 16
// =========================================================

function WinnerRelocate16(
    winner
) {

    // =====================================================
    // Get Current Main Tournament Round
    // =====================================================

    const round =
        current_tournament.main_round;


    // =====================================================
    // Find Winner In Current Participant List
    // =====================================================

    const currentWinner =
        current_main_t_participants.find(
            participant =>
                participant.seed ===
                winner.seed
        );


    // =====================================================
    // Check Winner
    // =====================================================

    if (
        !currentWinner
    ) {

        console.warn(
            "Winner not found in current participant list:",
            winner.seed
        );

        return;

    }


    // =====================================================
    // Winner Relocate
    // =====================================================

    switch (
        round
    ) {

        case 0:

            currentWinner.main_t_location =
                "L4";

            break;


        case 1:

            currentWinner.main_t_location =
                "L6";

            break;


        case 2:

            currentWinner.main_t_location =
                "M4";

            break;


        case 3:

            currentWinner.main_t_location =
                "L8";

            break;


        case 4:

            currentWinner.main_t_location =
                "M6";

            break;


        case 5:

            currentWinner.main_t_location =
                "L10";

            break;


        case 6:

            currentWinner.main_t_location =
                "G1";

            break;


        case 7:

            currentWinner.main_t_location =
                "S1";

            break;


        case 8:

            currentWinner.main_t_location =
                "S2";

            break;


        case 9:

            currentWinner.main_t_location =
                "G2";

            break;


        case 10:

            currentWinner.main_t_location =
                "Win";

            current_ranking[0] =
                currentWinner;

            break;


        default:

            console.warn(
                "Invalid Main Tournament Round:",
                round
            );

            return;

    }


    // =====================================================
    // Find Current SaveData
    // =====================================================

    const currentSaveData =
        saveDataStorage.find(
            saveData =>
                saveData.name ===
                current_tournament_name
        );


    // =====================================================
    // Check Current SaveData
    // =====================================================

    if (
        !currentSaveData
    ) {

        console.warn(
            "Current SaveData not found."
        );

        return;

    }


    // =====================================================
    // Update Participant List
    // =====================================================

    currentSaveData.participantlist =
        current_participant_list;


    // =====================================================
    // Update Main Tournament Participants
    // =====================================================

    currentSaveData.MainTParticipants =
        current_main_t_participants;


    // =====================================================
    // Update Ranking
    // =====================================================

    currentSaveData.ranking =
        current_ranking;


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();

}


// =========================================================
// Loser Relocate 16
// =========================================================

function LoserRelocate16(
    loser
) {

    // =====================================================
    // Get Current Main Tournament Round
    // =====================================================

    const round =
        current_tournament.main_round;


    // =====================================================
    // Find Loser In Current Participant List
    // =====================================================

    const currentLoser =
        current_main_t_participants.find(
            participant =>
                participant.seed ===
                loser.seed
        );


    // =====================================================
    // Check Loser
    // =====================================================

    if (
        !currentLoser
    ) {

        console.warn(
            "Loser not found in current participant list:",
            loser.seed
        );

        return;

    }


    // =====================================================
    // Loser Relocate
    // =====================================================

    switch (
        round
    ) {

        case 0:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[7] =
                currentLoser;

            break;


        case 1:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[6] =
                currentLoser;

            break;


        case 2:

            currentLoser.main_t_location =
                "L5";

            break;


        case 3:

            currentLoser.main_t_location =
                "Lose";

            current_ranking[5] =
                currentLoser;

            break;


        case 4:

            currentLoser.main_t_location =
                "L7";

            break;


        case 5:

            currentLoser.main_t_location =
                "Lose";

            current_ranking[4] =
                currentLoser;   

            break;


        case 6:

            currentLoser.main_t_location =
                "M5";

            break;


        case 7:

            currentLoser.main_t_location =
                "L9";

            break;


        case 8:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[3] =
                currentLoser;   

            break;


        case 9:

            currentLoser.main_t_location =
                "Lose";

            current_ranking[2] =
                currentLoser;

            break;


        case 10:
        
            currentLoser.main_t_location =
                "Lose";

            current_ranking[1] =
                currentLoser;

            break;


        default:

            console.warn(
                "Invalid Main Tournament Round:",
                round
            );

            return;

    }


    // =====================================================
    // Find Current SaveData
    // =====================================================

    const currentSaveData =
        saveDataStorage.find(
            saveData =>
                saveData.name ===
                current_tournament_name
        );


    // =====================================================
    // Check Current SaveData
    // =====================================================

    if (
        !currentSaveData
    ) {

        console.warn(
            "Current SaveData not found."
        );

        return;

    }


    // =====================================================
    // Update Participant List
    // =====================================================

    currentSaveData.participantlist =
        current_participant_list;


    // =====================================================
    // Update Main Tournament Participants
    // =====================================================

    currentSaveData.MainTParticipants =
        current_main_t_participants;


    // =====================================================
    // Update Ranking
    // =====================================================

    currentSaveData.ranking =
        current_ranking;


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();

}


// =========================================================
// Match Handler 16
// =========================================================

function MatchHandler16(
    winner,
    loser
) {

    // =====================================================
    // Get Current Main Tournament Round
    // =====================================================

    const round =
        current_tournament.main_round;


    // =====================================================
    // Check Winner
    // =====================================================

    if (
        !winner
    ) {

        console.warn(
            "Winner is invalid."
        );

        return;

    }


    // =====================================================
    // Check Loser
    // =====================================================

    if (
        !loser
    ) {

        console.warn(
            "Loser is invalid."
        );

        return;

    }


    // =====================================================
    // Create Main Tournament Memory
    // =====================================================

    const matchMemory =
        new MainTournamentsMemory();


    // =====================================================
    // Set Match Round
    // =====================================================

    matchMemory.round =
        round;


    // =====================================================
    // Save Winner Snapshot
    // =====================================================

    // Clone Winner
    // Prevent Winner Relocate from changing Memory

    matchMemory.winner =
        structuredClone(
            winner
        );


    // =====================================================
    // Save Loser Snapshot
    // =====================================================

    // Clone Loser
    // Prevent Loser Relocate from changing Memory

    matchMemory.loser =
        structuredClone(
            loser
        );


    // =====================================================
    // Save Match Memory
    // =====================================================

    current_main_tournament_memory[
        round
    ] =
        matchMemory;


    // =====================================================
    // Winner Relocate
    // =====================================================

    WinnerRelocate16(
        winner
    );


    // =====================================================
    // Loser Relocate
    // =====================================================

    LoserRelocate16(
        loser
    );


    // =====================================================
    // Check Last Main Tournament Round
    // =====================================================

    if (
        round ===
        main_tournament_match_16.length - 1
    ) {

        // =================================================
        // Tournament End
        // =================================================

        current_tournament.end =
            true;

    }

    else {

        // =================================================
        // Next Main Tournament Round
        // =================================================

        current_tournament.main_round +=
            1;


        // =================================================
        // Initialize Next Match
        // =================================================

        MainTournament16();


        // =================================================
        // Decide Next Match
        // =================================================

        DecideMatch();

    }


    // =====================================================
    // Find Current SaveData
    // =====================================================

    const currentSaveData =
        saveDataStorage.find(
            saveData =>
                saveData.name ===
                current_tournament_name
        );


    // =====================================================
    // Check Current SaveData
    // =====================================================

    if (
        !currentSaveData
    ) {

        console.warn(
            "Current SaveData not found."
        );

        return;

    }


    // =====================================================
    // Update Tournament
    // =====================================================

    currentSaveData.tournament =
        current_tournament;


    // =====================================================
    // Update Main Tournament Participants
    // =====================================================

    currentSaveData.MainTParticipants =
        current_main_t_participants;


    // =====================================================
    // Update Main Tournament Memory
    // =====================================================

    currentSaveData.MainTournamentsMemory =
        current_main_tournament_memory;


    // =====================================================
    // Update Ranking
    // =====================================================

    currentSaveData.ranking =
        current_ranking;


    // =====================================================
    // Update Participant List
    // =====================================================

    currentSaveData.participantlist =
        current_participant_list;


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();

}
