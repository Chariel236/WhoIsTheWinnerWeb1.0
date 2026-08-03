
// =========================================================
// Upload Tournament Page
// =========================================================


// =========================================================
// API
// =========================================================

const COMMUNITY_API =
    "http://localhost:3000/api/community/";


// =========================================================
// Selected SaveData
// =========================================================

let selectedSaveDataIndex =
    -1;


// =========================================================
// DOM Loaded
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "UPLOAD JS LOADED"
        );


        // =====================================================
        // Load Username
        // =====================================================

        if (
            typeof loadUsername ===
            "function"
        ) {

            loadUsername();

        }


        // =====================================================
        // Load SaveDataStorage
        // =====================================================

        if (
            typeof loadSaveData ===
            "function"
        ) {

            loadSaveData();

        }


        // =====================================================
        // Render SaveData
        // =====================================================

        renderSaveDataStorage();


        // =====================================================
        // Upload Button
        // =====================================================

        const uploadButton =
            document.getElementById(
                "uploadTournamentButton"
            );


        if (
            uploadButton
        ) {

            uploadButton.disabled =
                true;


            uploadButton.addEventListener(
                "click",
                function() {

                    uploadSelectedTournament();

                }
            );

        }

    }

);


// =========================================================
// Render SaveData Storage
// =========================================================

function renderSaveDataStorage() {

    const list =
        document.getElementById(
            "uploadTournamentList"
        );


    const emptyMessage =
        document.getElementById(
            "uploadEmptyMessage"
        );


    // =====================================================
    // Check List
    // =====================================================

    if (
        !list
    ) {

        console.error(
            "uploadTournamentList not found."
        );

        return;

    }


    // =====================================================
    // Clear List
    // =====================================================

    list.innerHTML =
        "";


    // =====================================================
    // Reset Selection
    // =====================================================

    selectedSaveDataIndex =
        -1;


    updateSelectedMessage();


    // =====================================================
    // Check SaveDataStorage
    // =====================================================

    if (
        !Array.isArray(
            saveDataStorage
        ) ||
        saveDataStorage.length ===
        0
    ) {

        if (
            emptyMessage
        ) {

            emptyMessage.style.display =
                "block";

        }

        updateUploadButton();

        return;

    }


    // =====================================================
    // Hide Empty Message
    // =====================================================

    if (
        emptyMessage
    ) {

        emptyMessage.style.display =
            "none";

    }


    // =====================================================
    // Create SaveData Cards
    // =====================================================

    saveDataStorage.forEach(
        function(
            saveData,
            index
        ) {

            const card =
                createSaveDataCard(
                    saveData,
                    index
                );


            list.appendChild(
                card
            );

        }
    );


    // =====================================================
    // Update Upload Button
    // =====================================================

    updateUploadButton();

}


// =========================================================
// Create SaveData Card
// =========================================================

function createSaveDataCard(
    saveData,
    index
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "upload-tournament-card";


    // =====================================================
    // Tournament Name
    // =====================================================

    const title =
        document.createElement(
            "h2"
        );


    title.className =
        "upload-tournament-name";


    title.textContent =
        saveData.name ||
        "Unnamed Tournament";


    // =====================================================
    // Tournament Information
    // =====================================================

    const information =
        document.createElement(
            "div"
        );


    information.className =
        "upload-tournament-information";


    // =====================================================
    // Participant Number
    // =====================================================

    const participantNumber =
        saveData.participant_number ||
        0;


    information.appendChild(
        createUploadInfo(
            "Participants",
            participantNumber
        )
    );


    // =====================================================
    // Tournament Status
    // =====================================================

    let status =
        "Not Started";


    if (
        saveData.tournament
    ) {

        if (
            saveData.tournament.end
        ) {

            status =
                "Completed";

        }

        else if (
            saveData.tournament.start
        ) {

            status =
                "In Progress";

        }

    }


    information.appendChild(
        createUploadInfo(
            "Status",
            status
        )
    );


    // =====================================================
    // Select Button
    // =====================================================

    const selectButton =
        document.createElement(
            "button"
        );


    selectButton.type =
        "button";


    selectButton.className =
        "upload-select-button";


    selectButton.textContent =
        "Select";


    selectButton.addEventListener(
        "click",
        function() {

            selectSaveData(
                index
            );

        }
    );


    // =====================================================
    // Build Card
    // =====================================================

    card.appendChild(
        title
    );


    card.appendChild(
        information
    );


    card.appendChild(
        selectButton
    );


    return card;

}


// =========================================================
// Create Upload Information
// =========================================================

function createUploadInfo(
    label,
    value
) {

    const info =
        document.createElement(
            "div"
        );


    info.className =
        "upload-tournament-info";


    const labelElement =
        document.createElement(
            "span"
        );


    labelElement.className =
        "upload-tournament-label";


    labelElement.textContent =
        label;


    const valueElement =
        document.createElement(
            "span"
        );


    valueElement.className =
        "upload-tournament-value";


    valueElement.textContent =
        value;


    info.appendChild(
        labelElement
    );


    info.appendChild(
        valueElement
    );


    return info;

}


// =========================================================
// Select SaveData
// =========================================================

function selectSaveData(
    index
) {

    // =====================================================
    // Check Index
    // =====================================================

    if (
        index < 0 ||
        index >= saveDataStorage.length
    ) {

        console.error(
            "Invalid SaveData index."
        );

        return;

    }


    // =====================================================
    // Save Selected Index
    // =====================================================

    selectedSaveDataIndex =
        index;


    // =====================================================
    // Get Selected SaveData
    // =====================================================

    const saveData =
        saveDataStorage[
            selectedSaveDataIndex
        ];


    // =====================================================
    // Update Cards
    // =====================================================

    updateSelectedCard();


    // =====================================================
    // Update Selected Message
    // =====================================================

    updateSelectedMessage();


    // =====================================================
    // Update Upload Button
    // =====================================================

    updateUploadButton();


    // =====================================================
    // Debug
    // =====================================================

    console.log(
        "Selected SaveData:",
        saveData
    );

}


// =========================================================
// Update Selected Card
// =========================================================

function updateSelectedCard() {

    const cards =
        document.querySelectorAll(
            ".upload-tournament-card"
        );


    cards.forEach(
        function(
            card,
            index
        ) {

            if (
                index ===
                selectedSaveDataIndex
            ) {

                card.classList.add(
                    "selected"
                );

            }

            else {

                card.classList.remove(
                    "selected"
                );

            }

        }
    );

}


// =========================================================
// Update Selected Message
// =========================================================

function updateSelectedMessage() {

    const selectedMessage =
        document.getElementById(
            "uploadSelectedMessage"
        );


    if (
        !selectedMessage
    ) {

        return;

    }


    // =====================================================
    // No Selection
    // =====================================================

    if (
        selectedSaveDataIndex ===
        -1
    ) {

        selectedMessage.textContent =
            "No tournament selected.";

        return;

    }


    // =====================================================
    // Get Selected SaveData
    // =====================================================

    const saveData =
        saveDataStorage[
            selectedSaveDataIndex
        ];


    if (
        !saveData
    ) {

        selectedMessage.textContent =
            "No tournament selected.";

        return;

    }


    // =====================================================
    // Show Selected Tournament
    // =====================================================

    selectedMessage.textContent =
        "Selected: " +
        (
            saveData.name ||
            "Unnamed Tournament"
        );

}


// =========================================================
// Update Upload Button
// =========================================================

function updateUploadButton() {

    const uploadButton =
        document.getElementById(
            "uploadTournamentButton"
        );


    if (
        !uploadButton
    ) {

        return;

    }


    uploadButton.disabled =
        selectedSaveDataIndex ===
        -1;

}


// =========================================================
// Upload Selected Tournament
// =========================================================

async function uploadSelectedTournament() {

    // =====================================================
    // Check Selection
    // =====================================================

    if (
        selectedSaveDataIndex ===
        -1
    ) {

        alert(
            "Please select a tournament first."
        );

        return;

    }


    // =====================================================
    // Get Token
    // =====================================================

    const token =
        localStorage.getItem(
            "token"
        );


    // =====================================================
    // Check Token
    // =====================================================

    if (
        !token
    ) {

        alert(
            "Please login first."
        );

        return;

    }


    // =====================================================
    // Get SaveData
    // =====================================================

    const saveData =
        saveDataStorage[
            selectedSaveDataIndex
        ];


    // =====================================================
    // Check SaveData
    // =====================================================

    if (
        !saveData
    ) {

        alert(
            "Selected tournament was not found."
        );

        return;

    }


    // =====================================================
    // Confirm Upload
    // =====================================================

    const confirmed =
        confirm(
            "Upload \"" +
            (
                saveData.name ||
                "Unnamed Tournament"
            ) +
            "\" to Community?"
        );


    if (
        !confirmed
    ) {

        return;

    }


    // =====================================================
    // Get Upload Button
    // =====================================================

    const uploadButton =
        document.getElementById(
            "uploadTournamentButton"
        );


    // =====================================================
    // Disable Upload Button
    // =====================================================

    if (
        uploadButton
    ) {

        uploadButton.disabled =
            true;

        uploadButton.innerHTML =
            "Uploading...";

    }


    // =====================================================
    // Send Upload Request
    // =====================================================

    try {

        const response =
            await fetch(
                COMMUNITY_API +
                "upload",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " +
                            token

                    },

                    body:
                        JSON.stringify({

                            saveData:
                                saveData

                        })

                }
            );


        // =================================================
        // Read Response
        // =================================================

        const data =
            await response.json();


        console.log(
            "Upload Response:",
            data
        );


        // =================================================
        // Upload Failed
        // =================================================

        if (
            !response.ok
        ) {

            alert(
                data.message ||
                "Unable to upload tournament."
            );

            return;

        }


        // =================================================
        // Upload Success
        // =================================================

        alert(
            "Tournament uploaded successfully."
        );


        // =================================================
        // Return To Community
        // =================================================

        window.location.href =
            "community.html";

    }

    catch (
        error
    ) {

        console.error(
            "Upload Tournament Error:",
            error
        );


        alert(
            "Unable to connect to server."
        );

    }

    finally {

        // =================================================
        // Restore Button
        // =================================================

        if (
            uploadButton
        ) {

            uploadButton.disabled =
                selectedSaveDataIndex ===
                -1;

            uploadButton.innerHTML =
                "<span>↑</span> Upload Tournament";

        }

    }

}


// =========================================================
// Back To Community
// =========================================================

function goBackToCommunity() {

    window.location.href =
        "community.html";

}