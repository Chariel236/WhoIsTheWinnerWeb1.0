// =========================================================
// Load Saved Data
// =========================================================

loadSaveData();


// =========================================================
// Load Current Tournament
// =========================================================

loadCurrentTournament();


// =========================================================
// Load Current Ranking
// =========================================================

function loadCurrentRanking() {

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

        console.warn(
            "Current tournament SaveData not found."
        );

        return;

    }


    // =====================================================
    // Check Ranking
    // =====================================================

    if (
        !Array.isArray(
            currentSaveData.ranking
        )
    ) {

        console.warn(
            "Current tournament ranking is not an array."
        );

        return;

    }


    // =====================================================
    // Update Current Ranking
    // =====================================================

    current_ranking =
        currentSaveData.ranking;

}


// =========================================================
// Display Ranking
// =========================================================

function displayRanking() {

    const container =
        document.getElementById(
            "rankingList"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    // =====================================================
    // Check Ranking
    // =====================================================

    if (
        !Array.isArray(
            current_ranking
        )
    ) {

        console.warn(
            "current_ranking is not an array:",
            current_ranking
        );

        return;

    }


    // =====================================================
    // Display Ranking
    // =====================================================

    current_ranking.forEach(
        (participant, index) => {

            // =============================================
            // Skip Empty Ranking Slot
            // =============================================

            if (
                !participant
            ) {

                return;

            }


            // =============================================
            // Create Row
            // =============================================

            const rankingRow =
                document.createElement(
                    "div"
                );


            rankingRow.className =
                "ranking-row";


            // =============================================
            // Rank
            // =============================================

            const rank =
                document.createElement(
                    "div"
                );


            rank.className =
                "ranking-rank";


            rank.textContent =
                index + 1;


            // =============================================
            // Participant Button
            // =============================================

            const participantButton =
                document.createElement(
                    "button"
                );


            participantButton.className =
                "ranking-participant-button";


            participantButton.textContent =
                participant.name || "";


            // =============================================
            // Open Participant URL
            // =============================================

            participantButton.addEventListener(
                "click",
                function () {

                    if (
                        participant.url &&
                        typeof participant.url ===
                        "string" &&
                        participant.url.trim() !== ""
                    ) {

                        window.open(
                            participant.url,
                            "_blank"
                        );

                    }

                }
            );


            // =============================================
            // Add Rank
            // =============================================

            rankingRow.appendChild(
                rank
            );


            // =============================================
            // Add Participant
            // =============================================

            rankingRow.appendChild(
                participantButton
            );


            // =============================================
            // Add Row
            // =============================================

            container.appendChild(
                rankingRow
            );

        }
    );

}


// =========================================================
// Go Back
// =========================================================

function goBackToTournamentRoom() {

    window.location.href =
        "tournament-room.html";

}


// =========================================================
// Initialize
// =========================================================

loadCurrentRanking();

displayRanking();