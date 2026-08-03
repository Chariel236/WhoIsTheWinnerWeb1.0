
// =========================================================
// Delete Tournament List
// =========================================================


// =========================================================
// Load Data
// =========================================================

loadDefaultParticipantsList();


// =========================================================
// Display Participant Lists
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

    participantList.innerHTML = "";


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
    // No List
    // =====================================================

    if (
        defaultParticipantsListArray.length === 0
    ) {

        const emptyMessage =
            document.createElement(
                "div"
            );


        emptyMessage.className =
            "empty-list-message";


        emptyMessage.textContent =
            "No participant lists available.";


        participantList.appendChild(
            emptyMessage
        );


        return;

    }


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
                "list-item delete-list-item";


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
                defaultList.name ||
                "Unnamed List";


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
                Number(
                    defaultList.participant_number
                ) +
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
            // Delete Button
            // =================================================

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.className =
                "delete-list-button";


            deleteButton.type =
                "button";


            deleteButton.textContent =
                "×";


            deleteButton.title =
                "Delete Participant List";


            // =================================================
            // Prevent Item Click
            // =================================================

            deleteButton.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();


                    deleteParticipantList(
                        index
                    );

                }
            );


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
                deleteButton
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
// Delete Participant List
// =========================================================

function deleteParticipantList(
    index
) {

    // =====================================================
    // Check Index
    // =====================================================

    if (
        index < 0 ||
        index >=
        defaultParticipantsListArray.length
    ) {

        console.warn(
            "Invalid participant list index:",
            index
        );

        return;

    }


    // =====================================================
    // Get Selected List
    // =====================================================

    const selectedList =
        defaultParticipantsListArray[
            index
        ];


    // =====================================================
    // Get Name
    // =====================================================

    const listName =
        selectedList.name ||
        "Unnamed List";


    // =====================================================
    // Confirm Delete
    // =====================================================

    const confirmDelete =
        confirm(
            'Delete "' +
            listName +
            '"?'
        );


    if (
        !confirmDelete
    ) {

        return;

    }


    // =====================================================
    // Delete Element
    // =====================================================

    defaultParticipantsListArray.splice(
        index,
        1
    );


    // =====================================================
    // Save Updated List
    // =====================================================

    saveDefaultParticipantsList();


    // =====================================================
    // Debug
    // =====================================================

    console.log(
        "Deleted Participant List:",
        listName
    );


    console.log(
        "Remaining Participant Lists:",
        defaultParticipantsListArray
    );


    // =====================================================
    // Refresh Display
    // =====================================================

    displayParticipantLists();

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

displayParticipantLists();