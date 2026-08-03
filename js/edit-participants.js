// =========================
// Load Saved Data
// =========================

loadSaveData();


// =========================
// Load Current Tournament
// =========================

loadCurrentTournament();


// =========================
// Display Participants
// =========================

function displayParticipants() {

    const container =
        document.getElementById(
            "participantList"
        );


    container.innerHTML = "";


    current_participant_list.forEach(
        participant => {

            // =========================
            // Participant Container
            // =========================

            const participantContainer =
                document.createElement("div");


            participantContainer.className =
                "participant-edit-item";


            // =========================
            // Seed
            // =========================

            const seedLabel =
                document.createElement("div");


            seedLabel.className =
                "participant-seed";


            seedLabel.textContent =
                "Seed " +
                participant.seed;


            // =========================
            // Name
            // =========================

            const nameLabel =
                document.createElement("label");


            nameLabel.textContent =
                "Name";


            const nameInput =
                document.createElement("input");


            nameInput.type =
                "text";


            nameInput.className =
                "participant-edit-input";


            nameInput.value =
                participant.name ||
                "";


            // =========================
            // URL
            // =========================

            const urlLabel =
                document.createElement("label");


            urlLabel.textContent =
                "URL";


            const urlInput =
                document.createElement("input");


            urlInput.type =
                "text";


            urlInput.className =
                "participant-edit-input";


            urlInput.value =
                participant.url ||
                "";


            // =========================
            // Name Changed
            // =========================

            nameInput.addEventListener(
                "input",
                function () {

                    updateParticipantData(
                        participant.seed,
                        nameInput.value,
                        participant.url
                    );

                }
            );


            // =========================
            // URL Changed
            // =========================

            urlInput.addEventListener(
                "input",
                function () {

                    updateParticipantData(
                        participant.seed,
                        participant.name,
                        urlInput.value
                    );

                }
            );


            // =========================
            // Add Elements
            // =========================

            participantContainer.appendChild(
                seedLabel
            );


            participantContainer.appendChild(
                nameLabel
            );


            participantContainer.appendChild(
                nameInput
            );


            participantContainer.appendChild(
                urlLabel
            );


            participantContainer.appendChild(
                urlInput
            );


            container.appendChild(
                participantContainer
            );

        }
    );

}


// =========================================================
// Update Participant Data
// =========================================================
//
// Find Participant By Seed:
//
// 1. current_participant_list
// 2. current_ranking
// 3. current_main_t_participants
// 4. current_main_tournament_memory winner
// 5. current_main_tournament_memory loser
//
// Only update Participant with matching Seed.
//
// =========================================================

function updateParticipantData(
    seed,
    name,
    url
) {

    // =====================================================
    // Update Current Participant List
    // =====================================================

    if (
        Array.isArray(
            current_participant_list
        )
    ) {

        current_participant_list.forEach(
            participant => {

                if (
                    participant.seed ===
                    seed
                ) {

                    participant.name =
                        name;

                    participant.url =
                        url;

                }

            }
        );

    }


    // =====================================================
    // Update Current Ranking
    // =====================================================

    if (
        Array.isArray(
            current_ranking
        )
    ) {

        current_ranking.forEach(
            participant => {

                if (
                    participant &&
                    participant.seed ===
                    seed
                ) {

                    participant.name =
                        name;

                    participant.url =
                        url;

                }

            }
        );

    }


    // =====================================================
    // Update Main Tournament Participants
    // =====================================================

    if (
        Array.isArray(
            current_main_t_participants
        )
    ) {

        current_main_t_participants.forEach(
            participant => {

                if (
                    participant.seed ===
                    seed
                ) {

                    participant.name =
                        name;

                    participant.url =
                        url;

                }

            }
        );

    }


    // =====================================================
    // Update Main Tournament Memory
    // =====================================================

    if (
        Array.isArray(
            current_main_tournament_memory
        )
    ) {

        current_main_tournament_memory.forEach(
            memory => {

                // =================================================
                // Check Memory
                // =================================================

                if (
                    !memory
                ) {

                    return;

                }


                // =================================================
                // Update Winner
                // =================================================

                if (
                    memory.winner &&
                    memory.winner.seed ===
                    seed
                ) {

                    memory.winner.name =
                        name;

                    memory.winner.url =
                        url;

                }


                // =================================================
                // Update Loser
                // =================================================

                if (
                    memory.loser &&
                    memory.loser.seed ===
                    seed
                ) {

                    memory.loser.name =
                        name;

                    memory.loser.url =
                        url;

                }

            }
        );

    }


    // =====================================================
    // Save Participant Changes
    // =====================================================

    saveParticipantChanges();

}


// =========================================================
// Save Participant Changes
// =========================================================

function saveParticipantChanges() {

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

        return;

    }


    // =====================================================
    // Update Participant List
    // =====================================================

    currentSaveData.participantlist =
        current_participant_list;


    // =====================================================
    // Update Ranking
    // =====================================================

    currentSaveData.ranking =
        current_ranking;


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
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();

}


// =========================
// Go Back
// =========================

function goBackToTournamentRoom() {

    window.location.href =
        "tournament-room.html";

}


// =========================
// Initialize
// =========================

displayParticipants();
