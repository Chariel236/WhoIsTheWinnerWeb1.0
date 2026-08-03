
// =========================================================
// Create Tournament
// =========================================================


// =========================================================
// Load Data
// =========================================================

loadSaveData();

loadDefaultParticipantsList();


// =========================================================
// Dragged Participant List Index
// =========================================================

let draggedParticipantListIndex =
    null;


// =========================================================
// Display Participant List
// =========================================================

function displayParticipantLists() {

    const participantList =
        document.getElementById(
            "participantList"
        );


    const participantListCount =
        document.getElementById(
            "participantListCount"
        );


    // =====================================================
    // Clear Existing List
    // =====================================================

    participantList.innerHTML =
        "";


    // =====================================================
    // Check Data
    // =====================================================

    if (
        !Array.isArray(
            defaultParticipantsListArray
        )
    ) {

        participantListCount.textContent =
            "0 Lists";

        return;

    }


    // =====================================================
    // Display Count
    // =====================================================

    participantListCount.textContent =
        defaultParticipantsListArray.length +
        " Lists";


    // =====================================================
    // Create List Items
    // =====================================================

    defaultParticipantsListArray.forEach(
        (
            defaultList,
            index
        ) => {

            // =================================================
            // Create Item
            // =================================================

            const listItem =
                document.createElement(
                    "div"
                );


            listItem.className =
                "list-item";


            // =================================================
            // Enable Drag
            // =================================================

            listItem.draggable =
                true;


            listItem.dataset.index =
                index;


            // =================================================
            // List Number
            // =================================================

            const listNumber =
                document.createElement(
                    "div"
                );


            listNumber.className =
                "list-number";


            listNumber.textContent =
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                );


            // =================================================
            // List Information
            // =================================================

            const listInformation =
                document.createElement(
                    "div"
                );


            listInformation.className =
                "list-information";


            // =================================================
            // List Name
            // =================================================

            const listName =
                document.createElement(
                    "div"
                );


            listName.className =
                "list-name";


            listName.textContent =
                defaultList.name;


            // =================================================
            // List Description
            // =================================================

            const listDescription =
                document.createElement(
                    "div"
                );


            listDescription.className =
                "list-description";


            listDescription.textContent =
                defaultList.participant_number +
                " Participants";


            // =================================================
            // Add Information
            // =================================================

            listInformation.appendChild(
                listName
            );


            listInformation.appendChild(
                listDescription
            );


            // =================================================
            // Arrow
            // =================================================

            const listArrow =
                document.createElement(
                    "div"
                );


            listArrow.className =
                "list-arrow";


            listArrow.textContent =
                "→";


            // =================================================
            // Add Elements To Item
            // =================================================

            listItem.appendChild(
                listNumber
            );


            listItem.appendChild(
                listInformation
            );


            listItem.appendChild(
                listArrow
            );


            // =================================================
            // Click Event
            // =================================================

            listItem.addEventListener(
                "click",
                function() {

                    selectParticipantList(
                        defaultList
                    );

                }
            );


            // =================================================
            // Drag Start
            // =================================================

            listItem.addEventListener(
                "dragstart",
                function(
                    event
                ) {

                    draggedParticipantListIndex =
                        index;


                    listItem.classList.add(
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

            listItem.addEventListener(
                "dragend",
                function() {

                    listItem.classList.remove(
                        "dragging"
                    );


                    draggedParticipantListIndex =
                        null;

                }
            );


            // =================================================
            // Drag Over
            // =================================================

            listItem.addEventListener(
                "dragover",
                function(
                    event
                ) {

                    event.preventDefault();


                    event.dataTransfer.dropEffect =
                        "move";


                    listItem.classList.add(
                        "drag-over"
                    );

                }
            );


            // =================================================
            // Drag Leave
            // =================================================

            listItem.addEventListener(
                "dragleave",
                function() {

                    listItem.classList.remove(
                        "drag-over"
                    );

                }
            );


            // =================================================
            // Drop
            // =================================================

            listItem.addEventListener(
                "drop",
                function(
                    event
                ) {

                    event.preventDefault();


                    listItem.classList.remove(
                        "drag-over"
                    );


                    // =========================================
                    // Get Original Index
                    // =========================================

                    const sourceIndex =
                        Number(
                            event.dataTransfer.getData(
                                "text/plain"
                            )
                        );


                    // =========================================
                    // Get Target Index
                    // =========================================

                    const targetIndex =
                        index;


                    // =========================================
                    // Check Index
                    // =========================================

                    if (
                        Number.isNaN(
                            sourceIndex
                        )
                    ) {

                        return;

                    }


                    if (
                        sourceIndex < 0 ||
                        sourceIndex >=
                        defaultParticipantsListArray.length
                    ) {

                        return;

                    }


                    if (
                        targetIndex < 0 ||
                        targetIndex >=
                        defaultParticipantsListArray.length
                    ) {

                        return;

                    }


                    // =========================================
                    // Same Position
                    // =========================================

                    if (
                        sourceIndex ===
                        targetIndex
                    ) {

                        return;

                    }


                    // =========================================
                    // Remove Dragged Element
                    // =========================================

                    const draggedList =
                        defaultParticipantsListArray[
                            sourceIndex
                        ];


                    defaultParticipantsListArray.splice(
                        sourceIndex,
                        1
                    );


                    // =========================================
                    // Calculate New Position
                    // =========================================

                    let newIndex =
                        targetIndex;


                    if (
                        sourceIndex <
                        targetIndex
                    ) {

                        newIndex--;

                    }


                    // =========================================
                    // Insert At New Position
                    // =========================================

                    defaultParticipantsListArray.splice(
                        newIndex,
                        0,
                        draggedList
                    );


                    // =========================================
                    // Save New Order
                    // =========================================

                    saveDefaultParticipantsList();


                    // =========================================
                    // Refresh Display
                    // =========================================

                    displayParticipantLists();

                }
            );


            // =================================================
            // Add Item To List
            // =================================================

            participantList.appendChild(
                listItem
            );

        }
    );

}


// =========================================================
// Select Participant List
// =========================================================

function selectParticipantList(
    defaultList
) {

    // =====================================================
    // Check Default List
    // =====================================================

    if (
        !defaultList
    ) {

        console.warn(
            "Default participant list is invalid."
        );

        return;

    }


    // =====================================================
    // Create New SaveData
    // =====================================================

    const saveData =
        new SaveData();


    // =====================================================
    // Check Tournament Name
    // =====================================================

    let finalTournamentName =
        defaultList.name;


    let number =
        1;


    // =====================================================
    // Find Unique Tournament Name
    // =====================================================

    while (
        saveDataStorage.some(
            existingSaveData =>
                existingSaveData.name ===
                finalTournamentName
        )
    ) {

        finalTournamentName =
            defaultList.name +
            number;

        number++;

    }


    // =====================================================
    // Set SaveData Name
    // =====================================================

    saveData.name =
        finalTournamentName;


    // =====================================================
    // Set Participant Number
    // =====================================================

    saveData.participant_number =
        Number(
            defaultList.participant_number
        );


    // =====================================================
    // Create New Participant Array
    // =====================================================

    const participantArray =
        [];


    // =====================================================
    // Check Participant List
    // =====================================================

    if (
        Array.isArray(
            defaultList.participant_list
        )
    ) {

        // =================================================
        // Create Copy Of Participant List
        // =================================================

        const sortedParticipantList =
            [
                ...defaultList.participant_list
            ];


        // =================================================
        // Sort By Seed
        // Smallest Seed -> Largest Seed
        // =================================================

        sortedParticipantList.sort(
            (
                participantA,
                participantB
            ) => {

                const seedA =
                    Number(
                        participantA.seed
                    );

                const seedB =
                    Number(
                        participantB.seed
                    );


                return (
                    seedA -
                    seedB
                );

            }
        );


        // =================================================
        // Create New Participant
        // =================================================

        sortedParticipantList.forEach(
            defaultParticipant => {

                // =============================================
                // Check Participant
                // =============================================

                if (
                    !defaultParticipant
                ) {

                    return;

                }


                // =============================================
                // Create New Participant Object
                // =============================================

                const participant =
                    new Participant();


                // =============================================
                // Copy Seed
                // =============================================

                participant.seed =
                    Number(
                        defaultParticipant.seed
                    );


                // =============================================
                // Copy Name
                // =============================================

                participant.name =
                    defaultParticipant.name ||
                    "";


                // =============================================
                // Copy URL
                // =============================================

                participant.url =
                    defaultParticipant.url ||
                    "";


                // =============================================
                // Add New Participant
                // =============================================

                participantArray.push(
                    participant
                );

            }
        );

    }


    // =====================================================
    // Set Participant List
    // =====================================================

    saveData.participantlist =
        participantArray;


    // =====================================================
    // Create Empty Ranking
    // =====================================================

    saveData.ranking =
        [];


    // =====================================================
    // Add SaveData To Storage
    // =====================================================

    saveDataStorage.push(
        saveData
    );


    // =====================================================
    // Save To Local Storage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Debug
    // =====================================================

    console.log(
        "========================================"
    );


    console.log(
        "Tournament Created"
    );


    console.log(
        "========================================"
    );


    console.log(
        "Tournament Name:",
        saveData.name
    );


    console.log(
        "Participant Number:",
        saveData.participant_number
    );


    console.log(
        "Participant List:",
        saveData.participantlist
    );


    // =====================================================
    // Debug Each Participant
    // =====================================================

    saveData.participantlist.forEach(
        (
            participant,
            index
        ) => {

            console.log(
                "Participant",
                index + 1,
                "| Seed:",
                participant.seed,
                "| Name:",
                participant.name,
                "| URL:",
                participant.url
            );

        }
    );


    console.log(
        "SaveDataStorage:",
        saveDataStorage
    );


    console.log(
        "========================================"
    );


    // =====================================================
    // Return To Main Menu
    // =====================================================

    window.location.href =
        "index.html";

}


// =========================================================
// Upload Participant List
// =========================================================

function uploadParticipantList() {

    window.location.href =
        "upload-participant-list.html";

}


// =========================================================
// Delete Participant List
// =========================================================

function deleteParticipantList() {

    window.location.href =
        "delete-tournament-list.html";

}


// =========================================================
// Go To Create Own Tournament
// =========================================================

function goToCreateOwnTournament() {

    window.location.href =
        "create-own-tournament.html";

}


// =========================================================
// Go Back
// =========================================================

function goBack() {

    window.location.href =
        "index.html";

}


// =========================================================
// Initialize
// =========================================================

displayParticipantLists();