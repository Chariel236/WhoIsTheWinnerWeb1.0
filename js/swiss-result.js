// =========================================================
// Load Current Tournament
// =========================================================

loadCurrentTournament();


// =========================================================
// Find Participant By Seed
// =========================================================

function findParticipantBySeed(
    seed
) {

    const targetSeed =
        Number(seed);


    if (
        !Array.isArray(
            current_participant_list
        )
    ) {

        return null;

    }


    return current_participant_list.find(
        participant =>
            Number(
                participant.seed
            ) ===
            targetSeed
    );

}


// =========================================================
// Get Round Result
// =========================================================

function getRoundResult(
    participant,
    round
) {

    // =====================================================
    // Check Participant
    // =====================================================

    if (
        !participant ||
        !participant.swiss
    ) {

        return null;

    }


    // =====================================================
    // Check Round Result Array
    // =====================================================

    if (
        !Array.isArray(
            participant.swiss.round_result
        )
    ) {

        return null;

    }


    const result =
        participant.swiss.round_result[
            round
        ];


    // =====================================================
    // No Result
    // =====================================================

    if (
        result === undefined ||
        result === null
    ) {

        return null;

    }


    // =====================================================
    // Return Boolean Result
    // =====================================================

    return result;

}


// =========================================================
// Get Round Opponent
// =========================================================

function getRoundOpponent(
    participant,
    round
) {

    // =====================================================
    // Check Participant
    // =====================================================

    if (
        !participant ||
        !participant.swiss
    ) {

        return null;

    }


    // =====================================================
    // Check Round Opponent Array
    // =====================================================

    if (
        !Array.isArray(
            participant.swiss.round_opponent
        )
    ) {

        return null;

    }


    const opponentSeed =
        participant.swiss.round_opponent[
            round
        ];


    // =====================================================
    // No Opponent
    // =====================================================

    if (
        opponentSeed === undefined ||
        opponentSeed === null ||
        opponentSeed === ""
    ) {

        return null;

    }


    return opponentSeed;

}


// =========================================================
// Create Participant Link
// =========================================================

function createParticipantLink(
    participant,
    className
) {

    const link =
        document.createElement(
            "button"
        );


    link.className =
        className;


    // =====================================================
    // Display Name
    // =====================================================

    link.textContent =
        participant.name || "";


    // =====================================================
    // Open Participant URL
    // =====================================================

    link.addEventListener(
        "click",
        function() {

            if (
                participant.url &&
                participant.url.trim() !== ""
            ) {

                window.open(
                    participant.url,
                    "_blank"
                );

            }

        }
    );


    return link;

}


// =========================================================
// Create Round Cell
// =========================================================

function createRoundCell(
    participant,
    round
) {

    const cell =
        document.createElement(
            "div"
        );


    cell.className =
        "swiss-round";


    // =====================================================
    // Get Round Result
    // =====================================================

    const result =
        getRoundResult(
            participant,
            round
        );


    // =====================================================
    // Get Round Opponent
    // =====================================================

    const opponentSeed =
        getRoundOpponent(
            participant,
            round
        );


    // =====================================================
    // Find Opponent
    // =====================================================

    const opponent =
        findParticipantBySeed(
            opponentSeed
        );


    // =====================================================
    // Display Opponent
    // =====================================================

    if (
        opponent
    ) {

        const opponentLink =
            createParticipantLink(
                opponent,
                "swiss-opponent-link"
            );


        cell.appendChild(
            opponentLink
        );

    }


    // =====================================================
    // Result Background
    // =====================================================

    if (
        result === true
    ) {

        cell.classList.add(
            "round-win"
        );

    }

    else if (
        result === false
    ) {

        cell.classList.add(
            "round-loss"
        );

    }


    return cell;

}


// =========================================================
// Display Swiss Result
// =========================================================

function displaySwissResult() {

    const container =
        document.getElementById(
            "swissResultList"
        );


    // =====================================================
    // Check Container
    // =====================================================

    if (!container) {

        return;

    }


    // =====================================================
    // Clear Existing Rows
    // =====================================================

    container.innerHTML =
        "";


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
    // Display Participants
    // =====================================================

    current_participant_list.forEach(
        (
            participant,
            index
        ) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "swiss-result-row";


            // =================================================
            // Number
            // =================================================

            const number =
                document.createElement(
                    "div"
                );


            number.className =
                "swiss-number";


            number.textContent =
                index + 1;


            // =================================================
            // Name
            // =================================================

            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "swiss-name";


            const nameLink =
                createParticipantLink(
                    participant,
                    "swiss-name-link"
                );


            name.appendChild(
                nameLink
            );


            // =================================================
            // BU
            // =================================================

            const bu =
                document.createElement(
                    "div"
                );


            bu.className =
                "swiss-bu";


            if (
                participant.swiss &&
                typeof participant.swiss.bu ===
                "number"
            ) {

                bu.textContent =
                    participant.swiss.bu;

            }

            else {

                bu.textContent =
                    "";

            }


            // =================================================
            // Add Basic Information
            // =================================================

            row.appendChild(
                number
            );


            row.appendChild(
                name
            );


            row.appendChild(
                bu
            );


            // =================================================
            // Add Five Rounds
            // =================================================

            for (
                let round = 0;
                round < 5;
                round++
            ) {

                const roundCell =
                    createRoundCell(
                        participant,
                        round
                    );


                row.appendChild(
                    roundCell
                );

            }


            // =================================================
            // Add Row
            // =================================================

            container.appendChild(
                row
            );

        }
    );

}


// =========================================================
// Go Back To Tournament Room
// =========================================================

function goBackToTournamentRoom() {

    window.location.href =
        "tournament-room.html";

}


// =========================================================
// Initialize
// =========================================================

displaySwissResult();
