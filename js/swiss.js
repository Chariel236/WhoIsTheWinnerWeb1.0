
// =========================================================
// Load Saved Data
// =========================================================

loadSaveData();


// =========================================================
// Load Current Tournament
// =========================================================

loadCurrentTournament();


// =========================================================
// Start Swiss Stage
// =========================================================

function swiss_start() {


    // =====================================================
    // Find SaveData
    // =====================================================

    const saveData =
        saveDataStorage.find(
            saveData =>
                saveData.name ===
                current_tournament_name
        );


    // =====================================================
    // Check SaveData
    // =====================================================

    if (!saveData) {

        alert(
            "Current tournament data could not be found."
        );

        return false;

    }


    // =====================================================
    // Update SaveData
    // =====================================================

    saveData.tournament.start =
        true;

    saveData.tournament.swiss =
        true;


    // =====================================================
    // Update Current Tournament
    // =====================================================

    current_tournament.start =
        true;

    current_tournament.swiss =
        true;


    // =====================================================
    // Set Active Participants
    // =====================================================

    SetActiveParticipants();


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();


    // =====================================================
    // Return Success
    // =====================================================

    return true;

}


// =========================================================
// BU Calculation
// =========================================================
//
// BU = Sum of Points of All Opponents Played
//
// round_opponent stores Opponent Seed
//
// =========================================================

function BUCalculation() {

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
    // Check SaveData
    // =====================================================

    if (!currentSaveData) {

        return;

    }


    // =====================================================
    // Get Participant List
    // =====================================================

    const participantList =
        currentSaveData.participantlist;


    // =====================================================
    // Check Participant List
    // =====================================================

    if (
        !Array.isArray(
            participantList
        )
    ) {

        return;

    }


    // =====================================================
    // Calculate BU
    // =====================================================

    participantList.forEach(
        participant => {

            // =================================================
            // Reset BU
            // =================================================

            participant.swiss.bu =
                0;


            // =================================================
            // Check Round Opponent
            // =================================================

            if (
                !Array.isArray(
                    participant.swiss.round_opponent
                )
            ) {

                return;

            }


            // =================================================
            // Calculate BU
            // =================================================

            participant.swiss.round_opponent.forEach(
                opponentSeed => {

                    // =========================================
                    // Find Opponent
                    // =========================================

                    const opponent =
                        participantList.find(
                            targetParticipant =>
                                targetParticipant.seed ===
                                opponentSeed
                        );


                    // =========================================
                    // Opponent Not Found
                    // =========================================

                    if (!opponent) {

                        return;

                    }


                    // =========================================
                    // Add Opponent Points
                    // =========================================

                    participant.swiss.bu +=
                        opponent.swiss.points;

                }
            );

        }
    );


    // =====================================================
    // Update Current Participant List
    // =====================================================

    current_participant_list =
        participantList;


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
// Swiss Sort
// =========================================================
//
// Ranking Order:
//
// 1. Higher Points
// 2. Higher BU
// 3. Lower Seed
//
// =========================================================

function SwissSort() {

    // =====================================================
    // Check Participant List
    // =====================================================

    if (
        !Array.isArray(
            current_participant_list
        )
    ) {

        return;

    }


    // =====================================================
    // Bubble Sort
    // =====================================================

    for (
        let i = 0;
        i <
        current_participant_list.length - 1;
        i++
    ) {

        for (
            let j = 0;
            j <
            current_participant_list.length - 1 - i;
            j++
        ) {

            const participantA =
                current_participant_list[j];


            const participantB =
                current_participant_list[
                    j + 1
                ];


            // =============================================
            // Points
            // =============================================

            const pointsA =
                participantA.swiss.points;


            const pointsB =
                participantB.swiss.points;


            // =============================================
            // BU
            // =============================================

            const buA =
                participantA.swiss.bu;


            const buB =
                participantB.swiss.bu;


            // =============================================
            // Seed
            // =============================================

            const seedA =
                participantA.seed;


            const seedB =
                participantB.seed;


            // =============================================
            // Check Swap
            // =============================================

            let shouldSwap =
                false;


            // =============================================
            // Higher Points First
            // =============================================

            if (
                pointsA <
                pointsB
            ) {

                shouldSwap =
                    true;

            }


            // =============================================
            // Same Points
            // =============================================

            else if (
                pointsA ===
                pointsB
            ) {

                // =========================================
                // Higher BU First
                // =========================================

                if (
                    buA <
                    buB
                ) {

                    shouldSwap =
                        true;

                }


                // =========================================
                // Same BU
                // =========================================

                else if (
                    buA ===
                    buB
                ) {

                    // =====================================
                    // Lower Seed First
                    // =====================================

                    if (
                        seedA >
                        seedB
                    ) {

                        shouldSwap =
                            true;

                    }

                }

            }


            // =============================================
            // Swap Participants
            // =============================================

            if (
                shouldSwap
            ) {

                const temporary =
                    current_participant_list[j];


                current_participant_list[j] =
                    current_participant_list[
                        j + 1
                    ];


                current_participant_list[
                    j + 1
                ] =
                    temporary;

            }

        }

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
    // Update SaveData
    // =====================================================

    if (
        currentSaveData
    ) {

        currentSaveData.participantlist =
            current_participant_list;

    }


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
// Active Participants
// =========================================================

let assign_participants = [];

let active_participants = [];


// =========================================================
// Set Active Participants
// =========================================================

function SetActiveParticipants() {

    // =====================================================
    // BU Calculation
    // =====================================================

    BUCalculation();


    // =====================================================
    // Swiss Sort
    // =====================================================

    SwissSort();


    // =====================================================
    // Reset Arrays
    // =====================================================

    assign_participants =
        [];

    active_participants =
        [];


    // =====================================================
    // Check Participants
    // =====================================================

    current_participant_list.forEach(
        participant => {

            // =================================================
            // Win Match = 3
            // =================================================

            if (
                participant.swiss.win_match ===
                3
            ) {

                assign_participants.push(
                    participant
                );

                return;

            }


            // =================================================
            // Loss Match = 3
            // =================================================

            if (
                participant.swiss.loss_match ===
                3
            ) {

                assign_participants.push(
                    participant
                );

                return;

            }


            // =================================================
            // Active Participant
            // =================================================

            active_participants.push(
                participant
            );

        }
    );


    // =====================================================
    // Assign Group
    // =====================================================

    AssignGroup();

}


// =========================================================
// Swiss Groups
// =========================================================

let group0 = [];

let group1 = [];

let group2 = [];


// =========================================================
// Assign Group
// =========================================================

function AssignGroup() {

    // =====================================================
    // Reset Groups
    // =====================================================

    group0 =
        [];

    group1 =
        [];

    group2 =
        [];


    // =====================================================
    // Check Active Participants
    // =====================================================

    active_participants.forEach(
        participant => {

            // =================================================
            // Win Match = 0
            // =================================================

            if (
                participant.swiss.win_match ===
                0
            ) {

                group0.push(
                    participant
                );

                return;

            }


            // =================================================
            // Win Match = 1
            // =================================================

            if (
                participant.swiss.win_match ===
                1
            ) {

                group1.push(
                    participant
                );

                return;

            }


            // =================================================
            // Win Match = 2
            // =================================================

            if (
                participant.swiss.win_match ===
                2
            ) {

                group2.push(
                    participant
                );

                return;

            }

        }
    );


    // =====================================================
    // Assign All Opponents
    // =====================================================

    AssignAllOpponent();

}


// =========================================================
// Assign All Opponents
// =========================================================

function AssignAllOpponent() {

    // =====================================================
    // Assign Group 0
    // =====================================================

    AssignOpponent(
        group0
    );


    // =====================================================
    // Clear Group 0
    // =====================================================

    group0 =
        [];


    // =====================================================
    // Assign Group 1
    // =====================================================

    AssignOpponent(
        group1
    );


    // =====================================================
    // Clear Group 1
    // =====================================================

    group1 =
        [];


    // =====================================================
    // Assign Group 2
    // =====================================================

    AssignOpponent(
        group2
    );


    // =====================================================
    // Clear Group 2
    // =====================================================

    group2 =
        [];


    // =====================================================
    // Update Current Participant List
    // =====================================================

    current_participant_list =
        [
            ...assign_participants
        ];


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
    // Check SaveData
    // =====================================================

    if (!currentSaveData) {

        return;

    }


    // =====================================================
    // Update SaveData Participant List
    // =====================================================

    currentSaveData.participantlist =
        [
            ...current_participant_list
        ];


    // =====================================================
    // Swiss Sort
    // =====================================================
    SwissSort();

    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();


    // =====================================================
    // Clear Active Participants
    // =====================================================

    active_participants =
        [];


    // =====================================================
    // Clear Assign Participants
    // =====================================================

    assign_participants =
        [];

}


// =========================================================
// This Group
// =========================================================

let thisgroup = [];


// =========================================================
// Assign Opponent
// =========================================================

function AssignOpponent(
    group
) {

    // =====================================================
    // Check Group
    // =====================================================

    if (
        !Array.isArray(
            group
        )
    ) {

        return;

    }


    // =====================================================
    // Store Group In This Group
    // =====================================================

    thisgroup =
        [
            ...group
        ];


    // =====================================================
    // Check Group Size
    // =====================================================

    if (
        thisgroup.length <
        2
    ) {

        // =================================================
        // One Participant
        // =================================================

        if (
            thisgroup.length ===
            1
        ) {

            assign_participants.push(
                ...thisgroup
            );

        }

        return;

    }


    // =====================================================
    // Current Swiss Round
    // =====================================================

    const round =
        current_tournament.swiss_round;


    // =====================================================
    // Group Size
    // =====================================================

    const groupSize =
        thisgroup.length;


    // =====================================================
    // Small Group
    // =====================================================

    if (
        groupSize <=
        12
    ) {

        // =================================================
        // 1 vs Last
        // 2 vs Second Last
        // 3 vs Third Last
        // =================================================

        const half =
            Math.floor(
                groupSize / 2
            );


        for (
            let index = 0;
            index < half;
            index++
        ) {

            const participantA =
                thisgroup[
                    index
                ];


            const participantB =
                thisgroup[
                    groupSize -
                    1 -
                    index
                ];


            // =============================================
            // Participant A
            // =============================================

            participantA.swiss.round_opponent[
                round
            ] =
                participantB.seed;


            // =============================================
            // Participant B
            // =============================================

            participantB.swiss.round_opponent[
                round
            ] =
                participantA.seed;

        }

    }

    else {

        // =================================================
        // Large Group
        // =================================================
        //
        // Upper Half vs Lower Half
        //
        // 1 vs 17
        // 2 vs 18
        // 3 vs 19
        // ...
        //
        // =================================================

        const half =
            Math.floor(
                groupSize / 2
            );


        for (
            let index = 0;
            index < half;
            index++
        ) {

            const participantA =
                thisgroup[
                    index
                ];


            const participantB =
                thisgroup[
                    index +
                    half
                ];


            // =============================================
            // Participant A
            // =============================================

            participantA.swiss.round_opponent[
                round
            ] =
                participantB.seed;


            // =============================================
            // Participant B
            // =============================================

            participantB.swiss.round_opponent[
                round
            ] =
                participantA.seed;

        }

    }


    // =====================================================
    // Check Duplicate
    // =====================================================

    CheckDuplicate();

}


// =========================================================
// Check Duplicate
// =========================================================

function CheckDuplicate() {

    // =====================================================
    // Variables
    // =====================================================

    let no_duplicate =
        false;


    let opponent_duplicate =
        false;


    let problem_index =
        0;


    let check_opponent =
        0;


    let check_count =
        0;


    const max_check_count =
        1000;


    // =====================================================
    // Get Current Swiss Round
    // =====================================================

    const round =
        current_tournament.swiss_round;


    // =====================================================
    // Check Duplicate Loop
    // =====================================================

    while (
        no_duplicate ===
        false
    ) {

        // =================================================
        // Safety Check
        // =================================================

        check_count++;


        if (
            check_count >
            max_check_count
        ) {

            console.warn(
                "CheckDuplicate reached maximum check count."
            );


            break;

        }


        // =================================================
        // Reset Duplicate
        // =================================================

        opponent_duplicate =
            false;


        // =================================================
        // Check Every Participant
        // =================================================

        for (
            let index = 0;
            index < thisgroup.length;
            index++
        ) {

            // =============================================
            // Set Problem Index
            // =============================================

            problem_index =
                index;


            const problemParticipant =
                thisgroup[
                    problem_index
                ];


            // =============================================
            // Get Current Round Opponent
            // =============================================

            check_opponent =
                problemParticipant
                    .swiss
                    .round_opponent[
                        round
                    ];


            // =============================================
            // Check Invalid Opponent
            // =============================================

            if (
                check_opponent ===
                undefined ||
                check_opponent ===
                null
            ) {

                continue;

            }


            // =============================================
            // Reset Counter
            // =============================================

            let i =
                0;


            // =============================================
            // Check Participant's Previous Opponents
            // =============================================

            for (
                let opponentIndex = 0;
                opponentIndex <
                problemParticipant
                    .swiss
                    .round_opponent
                    .length;
                opponentIndex++
            ) {

                if (
                    problemParticipant
                        .swiss
                        .round_opponent[
                            opponentIndex
                        ] ===
                    check_opponent
                ) {

                    i++;

                }

            }


            // =============================================
            // Duplicate Found
            // =============================================

            if (
                i >
                1
            ) {

                opponent_duplicate =
                    true;


                break;

            }

        }


        // =================================================
        // No Duplicate
        // =================================================

        if (
            opponent_duplicate ===
            false
        ) {

            no_duplicate =
                true;


            break;

        }


        // =================================================
        // Create Temporary Participant List
        // =================================================

        const temp_participant_list =
            [
                ...thisgroup
            ];


        // =================================================
        // Remove Problem Participant
        // =================================================

        temp_participant_list.splice(
            problem_index,
            1
        );


        // =================================================
        // Repeat Search
        // =================================================

        let repeat =
            true;


        while (
            repeat ===
            true
        ) {

            // =============================================
            // Get First Temporary Participant
            // =============================================

            const tempParticipant =
                temp_participant_list[
                    0
                ];


            // =============================================
            // Check Candidate
            // =============================================

            let i =
                0;


            // =============================================
            // Candidate Cannot Be Current Opponent
            // =============================================

            if (
                tempParticipant.seed ===
                check_opponent
            ) {

                i++;

            }


            // =============================================
            // Check Candidate's Previous Opponents
            // =============================================

            for (
                let opponentIndex = 0;
                opponentIndex <
                tempParticipant
                    .swiss
                    .round_opponent
                    .length;
                opponentIndex++
            ) {

                if (
                    tempParticipant
                        .swiss
                        .round_opponent[
                            opponentIndex
                        ] ===
                    check_opponent
                ) {

                    i++;

                }

            }


            // =============================================
            // Get Candidate Current Opponent
            // =============================================

            const candidateOpponent =
                tempParticipant
                    .swiss
                    .round_opponent[
                        round
                    ];


            // =============================================
            // Candidate Cannot Currently Fight
            // Problem Participant
            //
            // Otherwise:
            //
            // A -> B
            // C -> A
            //
            // Swapping could create:
            //
            // A -> A
            // =============================================

            if (
                candidateOpponent ===
                thisgroup[
                    problem_index
                ].seed
            ) {

                i++;

            }


            // =============================================
            // Candidate Already Has Same Opponent
            // =============================================

            if (
                i >
                0
            ) {

                // =========================================
                // Remove Candidate
                // =========================================

                temp_participant_list.splice(
                    0,
                    1
                );


                repeat =
                    true;


                continue;

            }


            // =============================================
            // Find Candidate Inside This Group
            // =============================================

            let swap_index =
                -1;


            for (
                let index = 0;
                index < thisgroup.length;
                index++
            ) {

                if (
                    thisgroup[
                        index
                    ].seed ===
                    tempParticipant.seed
                ) {

                    swap_index =
                        index;


                    break;

                }

            }


            // =============================================
            // Candidate Found
            // =============================================

            if (
                swap_index !==
                -1
            ) {

                const problemParticipant =
                    thisgroup[
                        problem_index
                    ];


                const swapParticipant =
                    thisgroup[
                        swap_index
                    ];


                // =========================================
                // Get Problem Current Opponent
                // =========================================

                const problemOpponentSeed =
                    problemParticipant
                        .swiss
                        .round_opponent[
                            round
                        ];


                // =========================================
                // Get Swap Current Opponent
                // =========================================

                const swapOpponentSeed =
                    swapParticipant
                        .swiss
                        .round_opponent[
                            round
                        ];


                // =========================================
                // Find Problem Opponent
                // =========================================

                let problemOpponentIndex =
                    -1;


                for (
                    let index = 0;
                    index < thisgroup.length;
                    index++
                ) {

                    if (
                        thisgroup[
                            index
                        ].seed ===
                        problemOpponentSeed
                    ) {

                        problemOpponentIndex =
                            index;


                        break;

                    }

                }


                // =========================================
                // Find Swap Opponent
                // =========================================

                let swapOpponentIndex =
                    -1;


                for (
                    let index = 0;
                    index < thisgroup.length;
                    index++
                ) {

                    if (
                        thisgroup[
                            index
                        ].seed ===
                        swapOpponentSeed
                    ) {

                        swapOpponentIndex =
                            index;


                        break;

                    }

                }


                // =========================================
                // Check Both Opponents
                // =========================================

                if (
                    problemOpponentIndex !==
                    -1
                    &&
                    swapOpponentIndex !==
                    -1
                ) {

                    const problemOpponent =
                        thisgroup[
                            problemOpponentIndex
                        ];


                    const swapOpponent =
                        thisgroup[
                            swapOpponentIndex
                        ];


                    // =====================================
                    // New Pair:
                    //
                    // Problem ↔ Swap Opponent
                    // Swap ↔ Problem Opponent
                    // =====================================

                    problemParticipant
                        .swiss
                        .round_opponent[
                            round
                        ] =
                        swapOpponent.seed;


                    swapOpponent
                        .swiss
                        .round_opponent[
                            round
                        ] =
                        problemParticipant.seed;


                    swapParticipant
                        .swiss
                        .round_opponent[
                            round
                        ] =
                        problemOpponent.seed;


                    problemOpponent
                        .swiss
                        .round_opponent[
                            round
                        ] =
                        swapParticipant.seed;

                }


                // =========================================
                // Finish Search
                // =========================================

                repeat =
                    false;

            }

            else {

                // =========================================
                // Candidate Not Found
                // =========================================

                temp_participant_list.splice(
                    0,
                    1
                );


                repeat =
                    true;

            }

        }

    }


    // =====================================================
    // Add Final Group To Assign Participants
    // =====================================================

    assign_participants.push(
        ...thisgroup
    );

}


// =========================================================
// Swiss Other Round
// =========================================================

function SwissOtherRound() {

    // =====================================================
    // Increase Swiss Round
    // =====================================================

    current_tournament.swiss_round++;


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
    // Update SaveData Swiss Round
    // =====================================================

    if (
        currentSaveData
    ) {

        currentSaveData.tournament.swiss_round =
            current_tournament.swiss_round;

    }


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();


    // =====================================================
    // Set Active Participants
    // =====================================================

    SetActiveParticipants();

}


// =========================================================
// Update Swiss Ranking
// =========================================================
//
// 1. Swiss Sort
// 2. Check every participant
// 3. If loss_match == 3,
//    put participant into current_ranking
//    using the same index.
//
// =========================================================

function UpdateSwissRanking() {

    // =====================================================
    // Swiss Sort
    // =====================================================

    SwissSort();


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

    if (!currentSaveData) {

        return;

    }


    // =====================================================
    // Check Participants
    // =====================================================

    for (
        let index = 0;
        index < current_participant_list.length;
        index++
    ) {

        const participant =
            current_participant_list[
                index
            ];


        // =================================================
        // Participant Eliminated
        // =================================================

        if (
            participant.swiss.loss_match ===
            3
        ) {

            current_ranking[
                index
            ] =
                participant;

        }

    }


    // =====================================================
    // Update SaveData Ranking
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