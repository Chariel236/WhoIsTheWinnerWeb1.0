// =========================================================
// Upload Participant List
// =========================================================


// =========================================================
// Load SaveData
// =========================================================

loadSaveData();


// =========================================================
// Load Default Participant List
// =========================================================

loadDefaultParticipantsList();


// =========================================================
// Display SaveData List
// =========================================================

function displaySaveDataList() {

    const saveDataList =
        document.getElementById(
            "saveDataList"
        );


    const saveDataCount =
        document.getElementById(
            "saveDataCount"
        );


    // =====================================================
    // Clear Existing List
    // =====================================================

    saveDataList.innerHTML = "";


    // =====================================================
    // Check SaveDataStorage
    // =====================================================

    if (
        !Array.isArray(
            saveDataStorage
        )
    ) {

        saveDataCount.textContent =
            "0 Lists";

        return;

    }


    // =====================================================
    // Display Count
    // =====================================================

    saveDataCount.textContent =
        saveDataStorage.length +
        " Lists";


    // =====================================================
    // Create SaveData Items
    // =====================================================

    saveDataStorage.forEach(
        (
            saveData,
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
            // SaveData Name
            // =================================================

            const listName =
                document.createElement(
                    "div"
                );


            listName.className =
                "list-name";


            listName.textContent =
                saveData.name;


            // =================================================
            // SaveData Participant Number
            // =================================================

            const listDescription =
                document.createElement(
                    "div"
                );


            listDescription.className =
                "list-description";


            listDescription.textContent =
                saveData.participant_number +
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

                    selectSaveData(
                        saveData
                    );

                }
            );


            // =================================================
            // Add Item To List
            // =================================================

            saveDataList.appendChild(
                listItem
            );

        }
    );

}


// =========================================================
// Select SaveData
// =========================================================

function selectSaveData(
    saveData
) {

    // =====================================================
    // Check SaveData
    // =====================================================

    if (
        !saveData
    ) {

        console.warn(
            "SaveData is invalid."
        );

        return;

    }


    // =====================================================
    // Create Default Participants List
    // =====================================================

    const defaultList =
        new DefaultParticipantsList();


    // =====================================================
    // Copy Name
    // =====================================================

    defaultList.name =
        saveData.name;


    // =====================================================
    // Copy Participant Number
    // =====================================================

    defaultList.participant_number =
        saveData.participant_number;


    // =====================================================
    // Initialize Participant List
    // =====================================================

    defaultList.participant_list =
        [];


    // =====================================================
    // Check SaveData Participant List
    // =====================================================

    if (
        Array.isArray(
            saveData.participantlist
        )
    ) {

        saveData.participantlist.forEach(
            participant => {

                // =============================================
                // Create New Participant
                // =============================================

                const newParticipant =
                    new Participant();


                // =============================================
                // Copy Seed
                // =============================================

                newParticipant.seed =
                    participant.seed;


                // =============================================
                // Copy Name
                // =============================================

                newParticipant.name =
                    participant.name;


                // =============================================
                // Copy URL
                // =============================================

                newParticipant.url =
                    participant.url;


                // =============================================
                // Add Participant
                // =============================================

                defaultList.participant_list.push(
                    newParticipant
                );

            }
        );

    }


    // =====================================================
    // User Can Delete
    // =====================================================

    defaultList.can_delete_by_user =
        true;


    // =====================================================
    // Add To Default Participant List Array
    // =====================================================

    defaultParticipantsListArray.push(
        defaultList
    );


    // =====================================================
    // Save To Local Storage
    // =====================================================

    saveDefaultParticipantsList();


    // =====================================================
    // Debug
    // =====================================================

    console.log(
        "Default Participant List Added:"
    );

    console.log(
        defaultList
    );


    console.log(
        "defaultParticipantsListArray:"
    );

    console.log(
        defaultParticipantsListArray
    );


    // =====================================================
    // Go Back To Create Tournament
    // =====================================================

    window.location.href =
        "create-tournament.html";

}


// =========================================================
// Go Back
// =========================================================

function goBack() {

    window.location.href =
        "create-tournament.html";

}


// =========================================================
// Initialize
// =========================================================

displaySaveDataList();