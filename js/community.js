// =========================================================
// Community Page
// =========================================================


// =========================================================
// API
// =========================================================

const COMMUNITY_API =
    "http://localhost:3000/api/community/";


// =========================================================
// Community Tournaments
// =========================================================

let communityTournaments = [];


// =========================================================
// DOM Loaded
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "COMMUNITY JS LOADED"
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
        // Load Community Tournaments
        // =====================================================

        loadCommunityTournaments();


        // =====================================================
        // Search
        // =====================================================

        const searchInput =
            document.getElementById(
                "communitySearchInput"
            );


        if (
            searchInput
        ) {

            searchInput.addEventListener(
                "input",
                function() {

                    renderCommunityTournaments(
                        searchInput.value
                    );

                }
            );

        }

    }

);


// =========================================================
// Load Community Tournaments
// =========================================================

async function loadCommunityTournaments() {

    try {

        console.log(
            "Loading Community Tournaments..."
        );


        const response =
            await fetch(
                COMMUNITY_API
            );


        // =====================================================
        // Check Response
        // =====================================================

        if (
            !response.ok
        ) {

            throw new Error(
                "Failed to load community tournaments."
            );

        }


        // =====================================================
        // Read Data
        // =====================================================

        const data =
            await response.json();


        console.log(
            "Community Data:",
            data
        );


        // =====================================================
        // Save Tournaments
        // =====================================================

        communityTournaments =
            Array.isArray(
                data.tournaments
            )
                ? data.tournaments
                : [];


        // =====================================================
        // Render
        // =====================================================

        renderCommunityTournaments();

    }

    catch (
        error
    ) {

        console.error(
            "Load Community Tournament Error:",
            error
        );


        communityTournaments =
            [];


        renderCommunityTournaments();

    }

}


// =========================================================
// Render Community Tournaments
// =========================================================

function renderCommunityTournaments(
    searchText = ""
) {

    const list =
        document.getElementById(
            "communityTournamentList"
        );


    const emptyMessage =
        document.getElementById(
            "communityEmptyMessage"
        );


    // =====================================================
    // Check Elements
    // =====================================================

    if (
        !list
    ) {

        console.error(
            "communityTournamentList not found."
        );

        return;

    }


    // =====================================================
    // Clear List
    // =====================================================

    list.innerHTML =
        "";


    // =====================================================
    // Search Text
    // =====================================================

    const keyword =
        searchText
            .trim()
            .toLowerCase();


    // =====================================================
    // Filter
    // =====================================================

    const filteredTournaments =
        communityTournaments.filter(
            function(tournament) {

                const tournamentName =
                    tournament.tournament_name ||
                    "";


                return tournamentName
                    .toLowerCase()
                    .includes(
                        keyword
                    );

            }
        );


    // =====================================================
    // Empty
    // =====================================================

    if (
        filteredTournaments.length ===
        0
    ) {

        if (
            emptyMessage
        ) {

            emptyMessage.style.display =
                "block";

        }

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
    // Create Cards
    // =====================================================

    filteredTournaments.forEach(
        function(tournament) {

            const card =
                createTournamentCard(
                    tournament
                );


            list.appendChild(
                card
            );

        }
    );

}


// =========================================================
// Create Tournament Card
// =========================================================

function createTournamentCard(
    tournament
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "community-tournament-card";


    // =====================================================
    // Tournament Name
    // =====================================================

    const header =
        document.createElement(
            "div"
        );


    header.className =
        "community-card-header";


    const title =
        document.createElement(
            "h2"
        );


    title.textContent =
        tournament.tournament_name ||
        "Unnamed Tournament";


    header.appendChild(
        title
    );


    // =====================================================
    // Information
    // =====================================================

    const information =
        document.createElement(
            "div"
        );


    information.className =
        "community-card-information";


    // =====================================================
    // Author
    // =====================================================

    information.appendChild(
        createCardInfo(
            "Author",
            tournament.author_username ||
            "Unknown"
        )
    );


    // =====================================================
    // Created Date
    // =====================================================

    let createdDate =
        "Unknown";


    if (
        tournament.created_at
    ) {

        const date =
            new Date(
                tournament.created_at
            );


        if (
            !isNaN(
                date.getTime()
            )
        ) {

            createdDate =
                date.toLocaleDateString(
                    "en-GB",
                    {

                        day:
                            "2-digit",

                        month:
                            "short",

                        year:
                            "numeric"

                    }
                );

        }

    }


    information.appendChild(
        createCardInfo(
            "Created",
            createdDate
        )
    );


    // =====================================================
    // Participant Number
    // =====================================================

    let participantNumber =
        "Unknown";


    if (
        tournament.save_data &&
        tournament.save_data.participant_number
    ) {

        participantNumber =
            tournament.save_data.participant_number;

    }


    information.appendChild(
        createCardInfo(
            "Participants",
            participantNumber
        )
    );


    // =====================================================
    // Actions
    // =====================================================

    const actions =
        document.createElement(
            "div"
        );


    actions.className =
        "community-card-actions";


    // =====================================================
    // Download Button
    // =====================================================

    const downloadButton =
        document.createElement(
            "button"
        );


    downloadButton.className =
        "community-download-button";


    downloadButton.type =
        "button";


    downloadButton.innerHTML =
        "Download <span>↓</span>";


    downloadButton.addEventListener(
        "click",
        function() {

            downloadTournament(
                tournament
            );

        }
    );


    actions.appendChild(
        downloadButton
    );


    // =====================================================
    // Delete Button
    // =====================================================

    const deleteButton =
        document.createElement(
            "button"
        );


    deleteButton.className =
        "community-delete-button";


    deleteButton.type =
        "button";


    deleteButton.textContent =
        "×";


    deleteButton.addEventListener(
        "click",
        function() {

            deleteCommunityTournament(
                tournament
            );

        }
    );


    actions.appendChild(
        deleteButton
    );


    // =====================================================
    // Build Card
    // =====================================================

    card.appendChild(
        header
    );


    card.appendChild(
        information
    );


    card.appendChild(
        actions
    );


    return card;

}


// =========================================================
// Create Card Information
// =========================================================

function createCardInfo(
    label,
    value
) {

    const info =
        document.createElement(
            "div"
        );


    info.className =
        "community-card-info";


    const labelElement =
        document.createElement(
            "span"
        );


    labelElement.className =
        "community-card-label";


    labelElement.textContent =
        label;


    const valueElement =
        document.createElement(
            "span"
        );


    valueElement.className =
        "community-card-value";


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
// Download Tournament
// =========================================================

function downloadTournament(
    tournament
) {

    // =====================================================
    // Check SaveData
    // =====================================================

    if (
        !tournament ||
        !tournament.save_data
    ) {

        console.error(
            "Tournament SaveData not found."
        );

        return;

    }


    // =====================================================
    // Get SaveData
    // =====================================================

    const downloadedSaveData =
        tournament.save_data;


    // =====================================================
    // Get Original Name
    // =====================================================

    const originalName =
        downloadedSaveData.name ||
        tournament.tournament_name ||
        "Tournament";


    // =====================================================
    // Find Available Name
    // =====================================================

    const newName =
        getUniqueTournamentName(
            originalName
        );


    // =====================================================
    // Copy SaveData
    // =====================================================

    const newSaveData =
        JSON.parse(
            JSON.stringify(
                downloadedSaveData
            )
        );


    // =====================================================
    // Change Name
    // =====================================================

    newSaveData.name =
        newName;


    // =====================================================
    // Add To Local SaveDataStorage
    // =====================================================

    saveDataStorage.push(
        newSaveData
    );


    // =====================================================
    // Save Local Storage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Debug
    // =====================================================

    console.log(
        "Tournament Downloaded:",
        newSaveData
    );


    // =====================================================
    // Message
    // =====================================================

    alert(
        "Tournament downloaded successfully.\n\n" +
        "Saved as: " +
        newName
    );

}


// =========================================================
// Get Unique Tournament Name
// =========================================================

function getUniqueTournamentName(
    originalName
) {

    let name =
        originalName;


    let number =
        1;


    // =====================================================
    // Check Existing Names
    // =====================================================

    while (
        saveDataStorage.some(
            function(saveData) {

                return (
                    saveData &&
                    saveData.name ===
                    name
                );

            }
        )
    ) {

        name =
            originalName +
            " (" +
            number +
            ")";


        number++;

    }


    return name;

}


// =========================================================
// Delete Community Tournament
// =========================================================

async function deleteCommunityTournament(
    tournament
) {

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
    // Confirm
    // =====================================================

    const confirmed =
        confirm(
            "Delete \"" +
            tournament.tournament_name +
            "\" from Community?"
        );


    if (
        !confirmed
    ) {

        return;

    }


    // =====================================================
    // Send Delete Request
    // =====================================================

    try {

        const response =
            await fetch(
                COMMUNITY_API +
                tournament._id,
                {

                    method:
                        "DELETE",

                    headers: {

                        "Authorization":
                            "Bearer " +
                            token

                    }

                }
            );


        const data =
            await response.json();


        // =====================================================
        // Check Response
        // =====================================================

        if (
            !response.ok
        ) {

            alert(
                data.message ||
                "Unable to delete tournament."
            );

            return;

        }


        // =====================================================
        // Remove From Current Array
        // =====================================================

        communityTournaments =
            communityTournaments.filter(
                function(item) {

                    return (
                        item._id !==
                        tournament._id
                    );

                }
            );


        // =====================================================
        // Re-render
        // =====================================================

        const searchInput =
            document.getElementById(
                "communitySearchInput"
            );


        renderCommunityTournaments(
            searchInput
                ? searchInput.value
                : ""
        );


        alert(
            "Tournament deleted successfully."
        );

    }

    catch (
        error
    ) {

        console.error(
            "Delete Community Tournament Error:",
            error
        );


        alert(
            "Unable to connect to server."
        );

    }

}


// =========================================================
// Go To Upload Page
// =========================================================

function openUploadTournament() {

    window.location.href =
        "upload.html";

}


// =========================================================
// Go Back To Home
// =========================================================

function goBackToHome() {

    window.location.href =
        "index.html";

}