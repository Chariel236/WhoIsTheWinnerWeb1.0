// =========================================================
// Load Saved Data
// =========================================================

loadSaveData();


// =========================================================
// Load Current Tournament
// =========================================================

loadCurrentTournament();


// =========================================================
// Participant A
// =========================================================

let participantA =
    new Participant();


// =========================================================
// Participant B
// =========================================================

let participantB =
    new Participant();


// =========================================================
// YouTube Player Counter
// =========================================================

let youtubePlayerCounter =
    0;


// =========================================================
// Update Fight Title
// =========================================================

function updateFightTitle() {

    const title =
        document.getElementById(
            "fightStageTitle"
        );


    const description =
        document.getElementById(
            "fightStageDescription"
        );


    if (!title) {

        return;

    }


    // =====================================================
    // Swiss Stage
    // =====================================================

    if (
        current_tournament &&
        current_tournament.swiss ===
        true
    ) {

        const round =
            Number(
                current_tournament.swiss_round
            ) || 0;


        title.textContent =
            "Swiss Stage: Round " +
            (
                round +
                1
            );


        if (description) {

            description.textContent =
                "Select the winner of the match.";

        }


        return;

    }


    // =====================================================
    // Main Tournament
    // =====================================================

    if (
        current_tournament &&
        current_tournament.main ===
        true
    ) {

        // =================================================
        // Get Current Main Tournament Round
        // =================================================

        const currentRound =
            Number(
                current_tournament.main_round
            ) || 0;


        // =================================================
        // Get Participant Number
        // =================================================

        const participantNumber =
            Number(
                current_participant_number
            ) || 0;


        // =================================================
        // Get Correct Main Tournament Match List
        // =================================================

        let matchList =
            [];


        if (
            participantNumber ===
            16
        ) {

            matchList =
                main_tournament_match_16;

        }

        else if (
            participantNumber ===
            32
        ) {

            matchList =
                main_tournament_match_32;

        }


        // =================================================
        // Find Current Match
        // =================================================

        const currentMatch =
            matchList.find(
                match => {

                    return (
                        Number(
                            match.round
                        ) ===
                        currentRound
                    );

                }
            );


        // =================================================
        // Display Current Stage
        // =================================================

        if (
            currentMatch
        ) {

            title.textContent =
                currentMatch.stage;

        }

        else {

            title.textContent =
                "MAIN TOURNAMENT";

        }


        // =================================================
        // Description
        // =================================================

        if (description) {

            description.textContent =
                "Select the winner of the match.";

        }


        return;

    }


    // =====================================================
    // Tournament End
    // =====================================================

    if (
        current_tournament &&
        current_tournament.end ===
        true
    ) {

        title.textContent =
            "TOURNAMENT FINISHED";


        if (description) {

            description.textContent =
                "The tournament has ended.";

        }

    }

}


// =========================================================
// Reload Current Tournament
// =========================================================

function refreshFightTitle() {

    // =====================================================
    // Load Latest Current Tournament
    // =====================================================

    loadCurrentTournament();


    // =====================================================
    // Update Title
    // =====================================================

    updateFightTitle();

}


// =========================================================
// Real-Time Fight Title Update
// =========================================================

setInterval(
    function() {

        refreshFightTitle();

    },
    100
);

// =========================================================
// Initialize Fight Page
// =========================================================

function initializeFightPage() {

    displayFightParticipant(
        "playerAContent",
        participantA
    );


    displayFightParticipant(
        "playerBContent",
        participantB
    );

}


// =========================================================
// Display Fight Participant
// =========================================================

function displayFightParticipant(
    elementId,
    participant
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    element.innerHTML =
        "";


    if (!participant) {

        return;

    }


    const url =
        participant.url || "";


    // =====================================================
    // YouTube
    // =====================================================

    if (
        isYouTubeURL(url)
    ) {

        displayYouTube(
            element,
            url
        );

        return;

    }


    // =====================================================
    // Image
    // =====================================================

    if (
        isImageURL(url)
    ) {

        displayImage(
            element,
            url,
            participant.name
        );

        return;

    }


    // =====================================================
    // Participant Name
    // =====================================================

    element.textContent =
        participant.name || "";

}


// =========================================================
// Display YouTube
// =========================================================

function displayYouTube(
    element,
    url
) {

    const videoId =
        getYouTubeVideoId(
            url
        );


    if (!videoId) {

        element.textContent =
            "";

        return;

    }


    youtubePlayerCounter++;


    const iframeId =
        "youtube-player-" +
        youtubePlayerCounter;


    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.id =
        iframeId;


    iframe.src =
        "https://www.youtube.com/embed/" +
        videoId +
        "?enablejsapi=1&rel=0";


    iframe.title =
        "Participant video";


    iframe.frameBorder =
        "0";


    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


    iframe.allowFullscreen =
        true;


    iframe.referrerPolicy =
        "strict-origin-when-cross-origin";


    element.appendChild(
        iframe
    );


    waitForYouTubeAPI(
        iframe
    );

}


// =========================================================
// Wait For YouTube API
// =========================================================

function waitForYouTubeAPI(
    iframe
) {

    if (
        typeof YT !==
            "undefined"
        &&
        typeof YT.Player ===
            "function"
    ) {

        createYouTubePlayer(
            iframe
        );

        return;

    }


    setTimeout(
        function() {

            waitForYouTubeAPI(
                iframe
            );

        },
        100
    );

}


// =========================================================
// Create YouTube Player
// =========================================================

function createYouTubePlayer(
    iframe
) {

    const player =
        new YT.Player(
            iframe.id,
            {

                events: {

                    onReady:
                        function(event) {

                            setupYouTubeHover(
                                iframe,
                                event.target
                            );

                        }

                }

            }
        );

}


// =========================================================
// Setup YouTube Hover
// =========================================================

function setupYouTubeHover(
    iframe,
    player
) {

    const box =
        iframe.closest(
            ".fight-player-box"
        );


    if (!box) {

        return;

    }


    box.addEventListener(
        "mouseenter",
        function() {

            if (
                player &&
                typeof player.playVideo ===
                "function"
            ) {

                player.playVideo();

            }

        }
    );


    box.addEventListener(
        "mouseleave",
        function() {

            if (
                player &&
                typeof player.pauseVideo ===
                "function"
            ) {

                player.pauseVideo();

            }

        }
    );

}


// =========================================================
// Get YouTube Video ID
// =========================================================

function getYouTubeVideoId(
    url
) {

    if (
        typeof url !==
        "string"
    ) {

        return "";

    }


    try {

        const parsedURL =
            new URL(
                url
            );


        if (
            parsedURL.hostname ===
                "www.youtube.com"
            ||
            parsedURL.hostname ===
                "youtube.com"
        ) {

            return (
                parsedURL.searchParams.get(
                    "v"
                )
                ||
                ""
            );

        }


        if (
            parsedURL.hostname ===
            "youtu.be"
        ) {

            return (
                parsedURL.pathname
                    .substring(1)
                    .split("/")[0]
            );

        }

    }

    catch (error) {

        return "";

    }


    return "";

}


// =========================================================
// Check YouTube URL
// =========================================================

function isYouTubeURL(
    value
) {

    if (
        typeof value !==
        "string"
    ) {

        return false;

    }


    return (
        value.includes(
            "youtube.com"
        )
        ||
        value.includes(
            "youtu.be"
        )
    );

}


// =========================================================
// Display Image
// =========================================================

function displayImage(
    element,
    url,
    participantName
) {

    const image =
        document.createElement(
            "img"
        );


    image.src =
        url;


    image.alt =
        participantName ||
        "Participant";


    image.onerror =
        function() {

            element.innerHTML =
                "";

            element.textContent =
                participantName ||
                "";

        };


    element.appendChild(
        image
    );

}


// =========================================================
// Check Image URL
// =========================================================

function isImageURL(
    value
) {

    if (
        typeof value !==
        "string"
    ) {

        return false;

    }


    return (
        /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(
            value
        )
    );

}


// =========================================================
// Choose Player A
// =========================================================

function chooseA() {

    // =====================================================
    // Swiss Stage
    // =====================================================

    if (
        current_tournament.swiss ===
            true
        &&
        current_tournament.main ===
            false
    ) {

        SwissAWinner();

        return;

    }


    // =====================================================
    // Main Tournament
    // =====================================================

    MainAWinner();

    DecideMatch();

}

// =========================================================
// Swiss A Winner
// =========================================================

function SwissAWinner() {

    // =====================================================
    // Get Current Round
    // =====================================================

    const round =
        current_tournament.swiss_round;


    // =====================================================
    // Participant A Wins
    // =====================================================

    participantA.swiss.points +=
        1;


    participantA.swiss.round +=
        1;


    participantA.swiss.round_result[
        round
    ] =
        true;


    participantA.swiss.win_match +=
        1;


    // =====================================================
    // Participant B Loses
    // =====================================================

    participantB.swiss.points -=
        1;


    participantB.swiss.round +=
        1;


    participantB.swiss.round_result[
        round
    ] =
        false;


    participantB.swiss.loss_match +=
        1;


    // =====================================================
    // Find Participant A In Current Participant List
    // =====================================================

    const currentParticipantA =
        current_participant_list.find(
            participant =>
                participant.seed ===
                participantA.seed
        );


    // =====================================================
    // Find Participant B In Current Participant List
    // =====================================================

    const currentParticipantB =
        current_participant_list.find(
            participant =>
                participant.seed ===
                participantB.seed
        );


    // =====================================================
    // Update Current Participant List
    // =====================================================

    if (
        currentParticipantA
    ) {

        Object.assign(
            currentParticipantA,
            participantA
        );

    }


    if (
        currentParticipantB
    ) {

        Object.assign(
            currentParticipantB,
            participantB
        );

    }


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
    // Update SaveDataStorage
    // =====================================================

    if (
        currentSaveData
    ) {

        currentSaveData.participantlist =
            current_participant_list;

    }


    // =====================================================
    // BU Calculation
    // =====================================================

    BUCalculation();


    // =====================================================
    // Swiss Sort
    // =====================================================

    SwissSort();


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();


    // =====================================================
    // Decide Next Match
    // =====================================================

    DecideMatch();

}

// =========================================================
// Main A Winner
// =========================================================

function MainAWinner() {

    // =====================================================
    // Main Tournament - 16 Participants
    // =====================================================

    if (
        current_participant_number ===
        16
    ) {

        MatchHandler16(
            participantA,
            participantB
        );

        DecideMatch();

        initializeFightPage()

        return;

    }


    // =====================================================
    // Main Tournament - 32 Participants
    // =====================================================

    if (
        current_participant_number ===
        32
    ) {

        MatchHandler32(
            participantA,
            participantB
        );

        DecideMatch();

        initializeFightPage()

        return;

    }


    // =====================================================
    // Invalid Participant Number
    // =====================================================

    console.warn(
        "Unsupported participant number:",
        current_participant_number
    );

}

// =========================================================
// Choose Player B
// =========================================================

function chooseB() {

    // =====================================================
    // Swiss Stage
    // =====================================================

    if (
        current_tournament.swiss ===
            true
        &&
        current_tournament.main ===
            false
    ) {

        SwissBWinner();

        DecideMatch();

        return;

    }


    // =====================================================
    // Main Tournament
    // =====================================================

    MainBWinner();

    DecideMatch();

}


// =========================================================
// Swiss B Winner
// =========================================================

function SwissBWinner() {

    // =====================================================
    // Get Current Round
    // =====================================================

    const round =
        current_tournament.swiss_round;


    // =====================================================
    // Participant B Wins
    // =====================================================

    participantB.swiss.points +=
        1;


    participantB.swiss.round +=
        1;


    participantB.swiss.round_result[
        round
    ] =
        true;


    participantB.swiss.win_match +=
        1;


    // =====================================================
    // Participant A Loses
    // =====================================================

    participantA.swiss.points -=
        1;


    participantA.swiss.round +=
        1;


    participantA.swiss.round_result[
        round
    ] =
        false;


    participantA.swiss.loss_match +=
        1;


    // =====================================================
    // Find Participant A In Current Participant List
    // =====================================================

    const currentParticipantA =
        current_participant_list.find(
            participant =>
                participant.seed ===
                participantA.seed
        );


    // =====================================================
    // Find Participant B In Current Participant List
    // =====================================================

    const currentParticipantB =
        current_participant_list.find(
            participant =>
                participant.seed ===
                participantB.seed
        );


    // =====================================================
    // Update Current Participant List
    // =====================================================

    if (
        currentParticipantA
    ) {

        Object.assign(
            currentParticipantA,
            participantA
        );

    }


    if (
        currentParticipantB
    ) {

        Object.assign(
            currentParticipantB,
            participantB
        );

    }


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
    // Update SaveDataStorage
    // =====================================================

    if (
        currentSaveData
    ) {

        currentSaveData.participantlist =
            current_participant_list;

    }


    // =====================================================
    // BU Calculation
    // =====================================================

    BUCalculation();


    // =====================================================
    // Swiss Sort
    // =====================================================

    SwissSort();


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();


    // =====================================================
    // Decide Next Match
    // =====================================================

    DecideMatch();

}


// =========================================================
// Main B Winner
// =========================================================

function MainBWinner() {

    // =====================================================
    // Main Tournament - 16 Participants
    // =====================================================

    if (
        current_participant_number ===
        16
    ) {

        MatchHandler16(
            participantB,
            participantA
        );

        DecideMatch();

        initializeFightPage()

        return;

    }


    // =====================================================
    // Main Tournament - 32 Participants
    // =====================================================

    if (
        current_participant_number ===
        32
    ) {

        MatchHandler32(
            participantB,
            participantA
        );

        DecideMatch();

        initializeFightPage()

        return;

    }


    // =====================================================
    // Invalid Participant Number
    // =====================================================

    console.warn(
        "Unsupported participant number:",
        current_participant_number
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
// Swiss Stage
// =========================================================

function swiss_stage() {

    // =====================================================
    // Variables
    // =====================================================

    let participantAIndex =
        -1;


    let participantBIndex =
        -1;


    let fight_over =
        false;


    // =====================================================
    // Find Participant A
    // =====================================================

    for (
        let index = 0;
        index < current_participant_list.length;
        index++
    ) {

        participantAIndex =
            index;


        const participant =
            current_participant_list[index];


        // =================================================
        // Check Participant
        // =================================================

        if (
            participant.swiss.round !==
            current_tournament.swiss_round
            ||
            participant.swiss.win_match ===
            3
            ||
            participant.swiss.loss_match ===
            3
        ) {

            fight_over =
                true;

            continue;

        }


        // =================================================
        // Participant Can Fight
        // =================================================

        fight_over =
            false;

        break;

    }


    // =====================================================
    // Find Participant B
    // =====================================================

    if (
        fight_over ===
        false
    ) {

        const selectedParticipantA =
            current_participant_list[
                participantAIndex
            ];


        const opponentSeed =
            selectedParticipantA.swiss.round_opponent[
                current_tournament.swiss_round
            ];


        participantBIndex =
            current_participant_list.findIndex(
                participant =>

                    participant.seed ===
                    opponentSeed
            );


        // =================================================
        // Opponent Not Found
        // =================================================

        if (
            participantBIndex ===
            -1
        ) {

            return;

        }


        // =================================================
        // Set Fight Participants
        // =================================================

        participantA =
            current_participant_list[
                participantAIndex
            ];


        participantB =
            current_participant_list[
                participantBIndex
            ];


        initializeFightPage();


        return;

    }


    // =====================================================
    // All Fights Are Over
    // =====================================================

    if (
        fight_over ===
        true
    ) {

        // =================================================
        // Continue Swiss Stage
        // =================================================

        if (
            current_tournament.swiss_round <
            4
        ) {

            SwissOtherRound();

            DecideMatch();

            return;

        }


        // =================================================
        // Swiss Stage Finished
        // =================================================

        UpdateSwissRanking();

        DecideMainTournament();

        DecideMatch();

        initializeFightPage();

    }

}


// =========================================================
// Decide Match
// =========================================================

function DecideMatch() {

    // =====================================================
    // Swiss Stage
    // =====================================================

    if (
        current_tournament.swiss ===
            true
        &&
        current_tournament.main ===
            false
    ) {

        swiss_stage();

        return;

    }


    // =====================================================
    // Tournament End
    // =====================================================

    if (
        current_tournament.end ===
        true
    ) {

        OpenMainTView();

        return;

    }


    // =====================================================
    // Main Tournament
    // =====================================================

    MainTournamentFight();

}


// =========================================================
// Decide Main Tournament
// =========================================================

function DecideMainTournament() {

    // =====================================================
    // Change Tournament Stage
    // =====================================================

    current_tournament.swiss =
        false;


    current_tournament.main =
        true;


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

        console.warn(
            "Current SaveData not found."
        );

        return;

    }


    // =====================================================
    // Save Tournament State
    // Into SaveDataStorage
    // =====================================================

    currentSaveData.tournament =
        current_tournament;


    // =====================================================
    // Save SaveDataStorage
    // =====================================================

    saveSaveData();


    // =====================================================
    // Save Current Tournament
    // =====================================================

    saveCurrentTournament();


    // =====================================================
    // Main Tournament - 16 Participants
    // =====================================================

    if (
        current_participant_number ===
        16
    ) {

        MainTournament16SetUp();

        return;

    }


    // =====================================================
    // Main Tournament - 32 Participants
    // =====================================================

    if (
        current_participant_number ===
        32
    ) {

        MainTournament32SetUp();

        return;

    }


    // =====================================================
    // Invalid Participant Number
    // =====================================================

    console.warn(
        "Unsupported participant number:",
        current_participant_number
    );

}


// =========================================================
// Open Main Tournament View
// =========================================================

function OpenMainTView() {

    // =====================================================
    // 16 Participants
    // =====================================================

    if (
        current_participant_number ===
        16
    ) {

        window.location.href =
            "main-tournament-result-16.html";

        return;

    }


    // =====================================================
    // 32 Participants
    // =====================================================

    if (
        current_participant_number ===
        32
    ) {

        window.location.href =
            "main-tournament-result-32.html";

        return;

    }


    // =====================================================
    // Invalid Participant Number
    // =====================================================

    console.warn(
        "Unsupported participant number:",
        current_participant_number
    );

}


// =========================================================
// Main Tournament Fight
// =========================================================

function MainTournamentFight() {

    // =====================================================
    // Main Tournament - 16 Participants
    // =====================================================

    if (
        current_participant_number ===
        16
    ) {

        // =================================================
        // Initialize Main Tournament 16
        // =================================================

        MainTournament16();


        // =================================================
        // Find Participant A
        // =================================================

        const selectedParticipantA =
            current_main_t_participants.find(
                participant =>
                    participant.main_t_location ===
                    locationA16
            );


        // =================================================
        // Find Participant B
        // =================================================

        const selectedParticipantB =
            current_main_t_participants.find(
                participant =>
                    participant.main_t_location ===
                    locationB16
            );


        // =================================================
        // Check Participant A
        // =================================================

        if (
            !selectedParticipantA
        ) {

            console.warn(
                "Participant A not found at location:",
                locationA16
            );

            return;

        }


        // =================================================
        // Check Participant B
        // =================================================

        if (
            !selectedParticipantB
        ) {

            console.warn(
                "Participant B not found at location:",
                locationB16
            );

            return;

        }


        // =================================================
        // Set Participant A
        // =================================================

        participantA =
            selectedParticipantA;


        // =================================================
        // Set Participant B
        // =================================================

        participantB =
            selectedParticipantB;


        return;

    }


    // =====================================================
    // Main Tournament - 32 Participants
    // =====================================================

    if (
        current_participant_number ===
        32
    ) {

        // =================================================
        // Initialize Main Tournament 32
        // =================================================

        MainTournament32();


        // =================================================
        // Find Participant A
        // =================================================

        const selectedParticipantA =
            current_main_t_participants.find(
                participant =>
                    participant.main_t_location ===
                    locationA32
            );


        // =================================================
        // Find Participant B
        // =================================================

        const selectedParticipantB =
            current_main_t_participants.find(
                participant =>
                    participant.main_t_location ===
                    locationB32
            );


        // =================================================
        // Check Participant A
        // =================================================

        if (
            !selectedParticipantA
        ) {

            console.warn(
                "Participant A not found at location:",
                locationA32
            );

            return;

        }


        // =================================================
        // Check Participant B
        // =================================================

        if (
            !selectedParticipantB
        ) {

            console.warn(
                "Participant B not found at location:",
                locationB32
            );

            return;

        }


        // =================================================
        // Set Participant A
        // =================================================

        participantA =
            selectedParticipantA;


        // =================================================
        // Set Participant B
        // =================================================

        participantB =
            selectedParticipantB;


        return;

    }


    // =====================================================
    // Invalid Participant Number
    // =====================================================

    console.warn(
        "Unsupported participant number:",
        current_participant_number
    );

}

// =========================================================
// Initialize
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // =============================================
        // Load Latest Tournament
        // =============================================

        loadCurrentTournament();


        // =============================================
        // Update Fight Title
        // =============================================

        updateFightTitle();


        // =============================================
        // Decide Match
        // =============================================

        DecideMatch();


        // =============================================
        // Display Player A
        // =============================================

        displayFightParticipant(
            "playerAContent",
            participantA
        );


        // =============================================
        // Display Player B
        // =============================================

        displayFightParticipant(
            "playerBContent",
            participantB
        );

    }
);