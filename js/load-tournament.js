// =========================================================
// Load Saved Data
// =========================================================

loadSaveData();


// =========================================================
// Dragged Tournament Index
// =========================================================

let draggedTournamentIndex = null;


// =========================================================
// Display Saved Tournaments
// =========================================================

function displaySavedTournaments() {

    const container =
        document.getElementById(
            "loadTournamentList"
        );


    if (!container) {

        return;

    }


    // =====================================================
    // Clear Existing List
    // =====================================================

    container.innerHTML = "";


    // =====================================================
    // Check SaveDataStorage
    // =====================================================

    if (
        !Array.isArray(
            saveDataStorage
        )
    ) {

        return;

    }


    // =====================================================
    // Create Tournament Slots
    // =====================================================

    saveDataStorage.forEach(
        (
            saveData,
            index
        ) => {

            // =================================================
            // Create Tournament Button
            // =================================================

            const tournamentButton =
                document.createElement(
                    "button"
                );


            tournamentButton.className =
                "tournament-list-item";


            // =================================================
            // Allow Drag
            // =================================================

            tournamentButton.draggable =
                true;


            // =================================================
            // Store Index
            // =================================================

            tournamentButton.dataset.index =
                index;


            // =================================================
            // Tournament Content
            // =================================================

            tournamentButton.innerHTML = `

                <div class="tournament-number">

                    ${String(
                        index + 1
                    ).padStart(
                        2,
                        "0"
                    )}

                </div>


                <div class="tournament-information">

                    <span class="tournament-name">

                        ${saveData.name}

                    </span>


                    <span class="tournament-participants">

                        ${saveData.participant_number}
                        Participants

                    </span>

                </div>


                <div class="tournament-arrow">

                    →

                </div>

            `;


            // =================================================
            // Button Click
            // =================================================

            tournamentButton.onclick =
                function () {

                    loadSelectedTournament(
                        saveData
                    );

                };


            // =================================================
            // Drag Start
            // =================================================

            tournamentButton.addEventListener(
                "dragstart",
                function (
                    event
                ) {

                    draggedTournamentIndex =
                        index;


                    tournamentButton.classList.add(
                        "dragging"
                    );


                    event.dataTransfer.effectAllowed =
                        "move";


                    event.dataTransfer.setData(
                        "text/plain",
                        index
                    );

                }
            );


            // =================================================
            // Drag End
            // =================================================

            tournamentButton.addEventListener(
                "dragend",
                function () {

                    tournamentButton.classList.remove(
                        "dragging"
                    );


                    draggedTournamentIndex =
                        null;

                }
            );


            // =================================================
            // Drag Over
            // =================================================

            tournamentButton.addEventListener(
                "dragover",
                function (
                    event
                ) {

                    event.preventDefault();


                    event.dataTransfer.dropEffect =
                        "move";


                    tournamentButton.classList.add(
                        "drag-over"
                    );

                }
            );


            // =================================================
            // Drag Leave
            // =================================================

            tournamentButton.addEventListener(
                "dragleave",
                function () {

                    tournamentButton.classList.remove(
                        "drag-over"
                    );

                }
            );


            // =================================================
            // Drop
            // =================================================

            tournamentButton.addEventListener(
                "drop",
                function (
                    event
                ) {

                    event.preventDefault();


                    tournamentButton.classList.remove(
                        "drag-over"
                    );


                    const targetIndex =
                        Number(
                            event.dataTransfer.getData(
                                "text/plain"
                            )
                        );


                    // =========================================
                    // Invalid Index
                    // =========================================

                    if (
                        Number.isNaN(
                            targetIndex
                        )
                    ) {

                        return;

                    }


                    // =========================================
                    // Same Position
                    // =========================================

                    if (
                        targetIndex ===
                        index
                    ) {

                        return;

                    }


                    // =========================================
                    // Check Index
                    // =========================================

                    if (
                        targetIndex < 0 ||
                        targetIndex >=
                        saveDataStorage.length
                    ) {

                        return;

                    }


                    // =========================================
                    // Move Tournament
                    // =========================================

                    const draggedTournament =
                        saveDataStorage[
                            targetIndex
                        ];


                    saveDataStorage.splice(
                        targetIndex,
                        1
                    );


                    saveDataStorage.splice(
                        index,
                        0,
                        draggedTournament
                    );


                    // =========================================
                    // Save New Order
                    // =========================================

                    saveSaveData();


                    // =========================================
                    // Refresh List
                    // =========================================

                    displaySavedTournaments();

                }
            );


            // =================================================
            // Add To Container
            // =================================================

            container.appendChild(
                tournamentButton
            );

        }
    );

}


// =========================================================
// Load Selected Tournament
// =========================================================

function loadSelectedTournament(
    saveData
) {

    // =====================================================
    // Check SaveData
    // =====================================================

    if (
        !saveData
    ) {

        return;

    }


    // =====================================================
    // Copy SaveData → Current Data
    // =====================================================

    current_tournament_name =
        saveData.name;


    current_participant_number =
        saveData.participant_number;


    current_participant_list =
        saveData.participantlist;


    current_tournament =
        saveData.tournament;


    current_ranking =
        saveData.ranking;


    current_main_t_participants =
        saveData.MainTParticipants;


    current_main_tournament_memory =
        saveData.MainTournamentsMemory;


    // =====================================================
    // Save Current Data
    // =====================================================

    saveCurrentTournament();


    // =====================================================
    // Go To Tournament Room
    // =====================================================

    window.location.href =
        "tournament-room.html";

}


// =========================================================
// Go Back
// =========================================================

function goBackToMainMenu() {

    window.location.href =
        "index.html";

}


// =========================================================
// Initialize
// =========================================================

displaySavedTournaments();