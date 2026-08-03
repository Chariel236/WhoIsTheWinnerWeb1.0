// =========================================================
// Main Tournament 32
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

let locationA32 = "";

let locationB32 = "";


// =========================================================
// Main Tournament 32
// =========================================================


// =========================================================
// Main Tournament Structure
// =========================================================

class MainTournamentMatch32 {

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
// Main Tournament - 32 Participants
// =========================================================

const main_tournament_match_32 = [

    new MainTournamentMatch32(
        0,
        "Lower Bracket Round 1",
        "L1",
        "L2"
    ),

    new MainTournamentMatch32(
        1,
        "Lower Bracket Round 1",
        "L3",
        "L4"
    ),

    new MainTournamentMatch32(
        2,
        "Lower Bracket Round 2",
        "L5",
        "L6"
    ),

    new MainTournamentMatch32(
        3,
        "Lower Bracket Round 2",
        "L7",
        "L8"
    ),

    new MainTournamentMatch32(
        4,
        "Medium Bracket Round 1",
        "M1",
        "M2"
    ),

    new MainTournamentMatch32(
        5,
        "Medium Bracket Round 1",
        "M3",
        "M4"
    ),

    new MainTournamentMatch32(
        6,
        "Lower Bracket Round 3",
        "L9",
        "L10"
    ),

    new MainTournamentMatch32(
        7,
        "Lower Bracket Round 3",
        "L11",
        "L12"
    ),

    new MainTournamentMatch32(
        8,
        "Medium Bracket Round 2",
        "M5",
        "M6"
    ),

    new MainTournamentMatch32(
        9,
        "Medium Bracket Round 2",
        "M7",
        "M8"
    ),

    new MainTournamentMatch32(
        10,
        "Lower Bracket Round 4",
        "L13",
        "L14"
    ),

    new MainTournamentMatch32(
        11,
        "Lower Bracket Round 4",
        "L15",
        "L16"
    ),

    new MainTournamentMatch32(
        12,
        "Upper Bracket Semifinals",
        "U1",
        "U2"
    ),

    new MainTournamentMatch32(
        13,
        "Upper Bracket Semifinals",
        "U3",
        "U4"
    ),

    new MainTournamentMatch32(
        14,
        "Medium Bracket Quarterfinals",
        "M9",
        "M10"
    ),

    new MainTournamentMatch32(
        15,
        "Medium Bracket Quarterfinals",
        "M11",
        "M12"
    ),

    new MainTournamentMatch32(
        16,
        "Lower Bracket Round 5",
        "L17",
        "L18"
    ),

    new MainTournamentMatch32(
        17,
        "Lower Bracket Round 5",
        "L19",
        "L20"
    ),

    new MainTournamentMatch32(
        18,
        "Lower Bracket Quarterfinal",
        "L21",
        "L22"
    ),

    new MainTournamentMatch32(
        19,
        "Medium Bracket Semifinal",
        "M13",
        "M14"
    ),

    new MainTournamentMatch32(
        20,
        "Lower Bracket Semifinal",
        "L23",
        "L24"
    ),

    new MainTournamentMatch32(
        21,
        "Upper Bracket Final",
        "U5",
        "U6"
    ),

    new MainTournamentMatch32(
        22,
        "Medium Bracket Final",
        "M15",
        "M16"
    ),

    new MainTournamentMatch32(
        23,
        "Lower Bracket Final",
        "L25",
        "L26"
    ),

    new MainTournamentMatch32(
        24,
        "Semifinal",
        "S1",
        "S2"
    ),

    new MainTournamentMatch32(
        25,
        "Grand Final",
        "G1",
        "G2"
    )

];


// =========================================================
// Main Tournament 32
// =========================================================

function MainTournament32() {

    // =====================================================
    // Get Current Main Tournament Round
    // =====================================================

    const currentRound =
        current_tournament.main_round;


    // =====================================================
    // Find Matching Main Tournament Match
    // =====================================================

    const currentMatch =
        main_tournament_match_32.find(
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
            "Main Tournament 32 match not found for round:",
            currentRound
        );

        return;

    }


    // =====================================================
    // Set Current Match Locations
    // =====================================================

    locationA32 =
        currentMatch.locationA;


    locationB32 =
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
        locationA32
    );

    console.log(
        "Location B:",
        locationB32
    );

}


// =========================================================
// Main Tournament 32 Set Upper
// =========================================================

function MainTournament32SetUp() {

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
    // Check Main Tournament Participant Number
    // =====================================================

    if (
        current_main_t_participants.length !==
        16
    ) {

        console.warn(
            "Main Tournament 32 requires 16 participants."
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


    // =====================================================
    // Initialize Main Tournament 32 Locations
    // =====================================================

    InitializeLocation32();


    // =====================================================
    // Start Main Tournament 32
    // =====================================================

    MainTournament32();

}


// =========================================================
// Initialize Location 32
// =========================================================

function InitializeLocation32() {

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
        16
    ) {

        console.warn(
            "Main Tournament requires 16 participants."
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
        "U3";


    // =====================================================
    // Index 2
    // =====================================================

    current_main_t_participants[2]
        .main_t_location =
        "U4";


    // =====================================================
    // Index 3
    // =====================================================

    current_main_t_participants[3]
        .main_t_location =
        "U2";


    // =====================================================
    // Index 4
    // =====================================================

    current_main_t_participants[4]
        .main_t_location =
        "M7";


    // =====================================================
    // Index 5
    // =====================================================

    current_main_t_participants[5]
        .main_t_location =
        "M5";


    // =====================================================
    // Index 6
    // =====================================================

    current_main_t_participants[6]
        .main_t_location =
        "M1";


    // =====================================================
    // Index 7
    // =====================================================

    current_main_t_participants[7]
        .main_t_location =
        "M3";
    
        // =====================================================
    // Index 8
    // =====================================================

    current_main_t_participants[8]
        .main_t_location =
        "M4";


    // =====================================================
    // Index 9
    // =====================================================

    current_main_t_participants[9]
        .main_t_location =
        "M2";


    // =====================================================
    // Index 10
    // =====================================================

    current_main_t_participants[10]
        .main_t_location =
        "L7";


    // =====================================================
    // Index 11
    // =====================================================

    current_main_t_participants[11]
        .main_t_location =
        "L5";


    // =====================================================
    // Index 12
    // =====================================================

    current_main_t_participants[12]
        .main_t_location =
        "L1";


    // =====================================================
    // Index 13
    // =====================================================

    current_main_t_participants[13]
        .main_t_location =
        "L3";


    // =====================================================
    // Index 14
    // =====================================================

    current_main_t_participants[14]
        .main_t_location =
        "L4";


    // =====================================================
    // Index 15
    // =====================================================

    current_main_t_participants[15]
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
// Winner Relocate 32
// =========================================================

function WinnerRelocate32(
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
                "L6";

            break;


        case 1:

            currentWinner.main_t_location =
                "L8";

            break;


        case 2:

            currentWinner.main_t_location =
                "L10";

            break;


        case 3:

            currentWinner.main_t_location =
                "L12";

            break;


        case 4:

            currentWinner.main_t_location =
                "M6";

            break;


        case 5:

            currentWinner.main_t_location =
                "M8";

            break;


        case 6:

            currentWinner.main_t_location =
                "L14";

            break;


        case 7:

            currentWinner.main_t_location =
                "L16";

            break;


        case 8:

            currentWinner.main_t_location =
                "M10";

            break;


        case 9:

            currentWinner.main_t_location =
                "M12";

            break;


        case 10:

            currentWinner.main_t_location =
                "L18";

            break;


        case 11:

            currentWinner.main_t_location =
                "L20";

            break;


        case 12:

            currentWinner.main_t_location =
                "U5";

            break;


        case 13:

            currentWinner.main_t_location =
                "U6";

            break;


        case 14:

            currentWinner.main_t_location =
                "M13";

            break;


        case 15:

            currentWinner.main_t_location =
                "M14";

            break;


        case 16:

            currentWinner.main_t_location =
                "L21";

            break;


        case 17:

            currentWinner.main_t_location =
                "L22";

            break;


        case 18:

            currentWinner.main_t_location =
                "L24";

            break;


        case 19:

            currentWinner.main_t_location =
                "M16";

            break;


        case 20:

            currentWinner.main_t_location =
                "L26";

            break;


        case 21:

            currentWinner.main_t_location =
                "G1";

            break;


        case 22:

            currentWinner.main_t_location =
                "S1";

            break;


        case 23:

            currentWinner.main_t_location =
                "S2";

            break;


        case 24:

            currentWinner.main_t_location =
                "G2";

            break;


        case 25:

            // =================================================
            // Grand Final Winner
            // =================================================

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
    // Save Current Data
    // =====================================================

    saveMainTournament32Data();

}


// =========================================================
// Loser Relocate 32
// =========================================================

function LoserRelocate32(
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
            
            current_ranking[14] =
                currentLoser;

            break;


        case 1:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[15] =
                currentLoser;

            break;


        case 2:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[12] =
                currentLoser;

            break;


        case 3:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[13] =
                currentLoser;

            break;


        case 4:

            currentLoser.main_t_location =
                "L9";

            break;


        case 5:

            currentLoser.main_t_location =
                "L11";

            break;


        case 6:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[10] =
                currentLoser;

            break;


        case 7:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[11] =
                currentLoser;

            break;


        case 8:

            currentLoser.main_t_location =
                "L15";

            break;


        case 9:

            currentLoser.main_t_location =
                "L13";

            break;


        case 10:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[8] =
                currentLoser;

            break;


        case 11:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[9] =
                currentLoser;

            break;


        case 12:

            currentLoser.main_t_location =
                "M9";

            break;


        case 13:

            currentLoser.main_t_location =
                "M11";

            break;


        case 14:

            currentLoser.main_t_location =
                "L17";

            break;


        case 15:

            currentLoser.main_t_location =
                "L19";

            break;


        case 16:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[6] =
                currentLoser;

            break;


        case 17:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[7] =
                currentLoser;

            break;


        case 18:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[5] =
                currentLoser;

            break;


        case 19:

            currentLoser.main_t_location =
                "L23";

            break;


        case 20:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[4] =
                currentLoser;

            break;


        case 21:

            currentLoser.main_t_location =
                "M15";

            break;


        case 22:

            currentLoser.main_t_location =
                "L25";

            break;


        case 23:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[3] =
                currentLoser;

            break;


        case 24:

            currentLoser.main_t_location =
                "Lose";
            
            current_ranking[2] =
                currentLoser;

            break;


        case 25:

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
    // Save Current Data
    // =====================================================

    saveMainTournament32Data();

}


// =========================================================
// Save Main Tournament 32 Data
// =========================================================

function saveMainTournament32Data() {

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
// Match Handler 32
// =========================================================

function MatchHandler32(
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

    WinnerRelocate32(
        winner
    );


    // =====================================================
    // Loser Relocate
    // =====================================================

    LoserRelocate32(
        loser
    );


    // =====================================================
    // Check Last Main Tournament Round
    // =====================================================

    if (
        round ===
        main_tournament_match_32.length - 1
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

        MainTournament32();


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