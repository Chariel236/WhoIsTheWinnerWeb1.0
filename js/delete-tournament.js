// =========================
// Load Saved Data
// =========================

loadSaveData();


// =========================
// Display Saved Tournaments
// =========================

function displaySavedTournaments() {

    const container =
        document.getElementById(
            "deleteTournamentList"
        );


    container.innerHTML = "";


    saveDataStorage.forEach(
        (saveData, index) => {

            const tournamentButton =
                document.createElement("button");


            tournamentButton.className =
                "tournament-list-item";


            tournamentButton.innerHTML = `

                <div class="tournament-number">

                    ${String(index + 1).padStart(2, "0")}

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

                    ×

                </div>

            `;


            // =========================
            // Button Click
            // =========================

            tournamentButton.onclick =
                function () {

                    deleteTournament(
                        index
                    );

                };


            container.appendChild(
                tournamentButton
            );

        }
    );

}


// =========================
// Delete Tournament
// =========================

function deleteTournament(index) {

    const tournamentName =
        saveDataStorage[index].name;


    // const confirmDelete =
    //     confirm(
    //         "Delete Tournament?\n\n" +
    //         tournamentName
    //     );


    // if (!confirmDelete) {

    //     return;

    // }


    // Remove SaveData

    saveDataStorage.splice(
        index,
        1
    );


    // Save Updated Storage

    saveSaveData();


    // Refresh List

    displaySavedTournaments();

}


// =========================
// Go Back
// =========================

function goBackToMainMenu() {

    window.location.href =
        "index.html";

}


// =========================
// Initialize
// =========================

displaySavedTournaments();