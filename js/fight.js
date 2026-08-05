
// =========================================================
// Fight
// =========================================================


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
// Choose Button Lock
// =========================================================

let chooseButtonLocked =
    false;


// =========================================================
// Hide Choose Buttons Temporarily
// =========================================================

function hideChooseButtonsTemporarily() {

    const choosePlayerA =
        document.getElementById(
            "choosePlayerA"
        );


    const choosePlayerB =
        document.getElementById(
            "choosePlayerB"
        );


    // =====================================================
    // Lock
    // =====================================================

    chooseButtonLocked =
        true;


    // =====================================================
    // Hide A
    // =====================================================

    if (
        choosePlayerA
    ) {

        choosePlayerA.style.visibility =
            "hidden";

    }


    // =====================================================
    // Hide B
    // =====================================================

    if (
        choosePlayerB
    ) {

        choosePlayerB.style.visibility =
            "hidden";

    }


    // =====================================================
    // Show Buttons After 2 Seconds
    // =====================================================

    setTimeout(
        function() {

            if (
                choosePlayerA
            ) {

                choosePlayerA.style.visibility =
                    "visible";

            }


            if (
                choosePlayerB
            ) {

                choosePlayerB.style.visibility =
                    "visible";

            }


            chooseButtonLocked =
                false;

        },
        2000
    );

}


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


    if (
        !title
    ) {

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


        if (
            description
        ) {

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

        const currentRound =
            Number(
                current_tournament.main_round
            ) || 0;


        const participantNumber =
            Number(
                current_participant_number
            ) || 0;


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


        const currentMatch =
            matchList.find(
                function(
                    match
                ) {

                    return (
                        Number(
                            match.round
                        ) ===
                        currentRound
                    );

                }
            );


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


        if (
            description
        ) {

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


        if (
            description
        ) {

            description.textContent =
                "The tournament has ended.";

        }

    }

}


// =========================================================
// Reload Current Tournament
// =========================================================

function refreshFightTitle() {

    loadCurrentTournament();

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


    // =====================================================
    // Check Element
    // =====================================================

    if (
        !element
    ) {

        return;

    }


    // =====================================================
    // Clear Previous Content
    // =====================================================

    element.innerHTML =
        "";


    // =====================================================
    // Check Participant
    // =====================================================

    if (
        !participant
    ) {

        return;

    }


    // =====================================================
    // Get Participant Information
    // =====================================================

    const name =
        participant.name ||
        "";


    const url =
        (
            participant.url ||
            ""
        ).trim();


    // =====================================================
    // YouTube
    // =====================================================
    //
    // Only display YouTube player if the URL
    // actually contains a playable YouTube video ID.
    //
    // Example:
    // https://www.youtube.com/watch?v=XXXXXXXXXXX
    //
    // https://youtu.be/XXXXXXXXXXX
    //
    // A normal URL such as:
    // https://www.youtube.com/
    //
    // will NOT be treated as a YouTube video.
    // =====================================================

    const youtubeVideoId =
        getYouTubeVideoId(
            url
        );


    if (
        youtubeVideoId
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
        isImageURL(
            url
        )
    ) {

        displayImage(
            element,
            url,
            name
        );

        return;

    }


    // =====================================================
    // Other URL
    // =====================================================
    //
    // If URL is not empty and is not YouTube/image,
    // display the participant name as a clickable link.
    //
    // Example:
    //
    // name:
    // Google
    //
    // url:
    // https://www.google.com
    //
    // Display:
    // Google
    //
    // Clicking "Google" opens the URL.
    // =====================================================

    if (
        url !== ""
    ) {

        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.target =
            "_blank";


        link.rel =
            "noopener noreferrer";


        link.textContent =
            name;


        element.appendChild(
            link
        );


        return;

    }


    // =====================================================
    // No URL
    // =====================================================
    //
    // If URL is empty, only display the participant name.
    // =====================================================

    element.textContent =
        name;

}


// =========================================================
// Display Clickable Participant Name
// =========================================================

function displayClickableName(
    element,
    name,
    url
) {

    const link =
        document.createElement(
            "a"
        );


    // =====================================================
    // Display Name Instead Of URL
    // =====================================================

    link.textContent =
        name;


    // =====================================================
    // Link
    // =====================================================

    link.href =
        url;


    // =====================================================
    // Open In New Tab
    // =====================================================

    link.target =
        "_blank";


    // =====================================================
    // Security
    // =====================================================

    link.rel =
        "noopener noreferrer";


    // =====================================================
    // Prevent Empty Name From Showing Nothing
    // =====================================================

    if (
        name ===
        ""
    ) {

        link.textContent =
            url;

    }


    // =====================================================
    // Add To Participant Box
    // =====================================================

    element.appendChild(
        link
    );

}


// =========================================================
// Check If URL Is A Playable YouTube Video
// =========================================================
//
// IMPORTANT:
//
// This function does NOT simply check:
//
//     url.includes("youtube.com")
//
// Instead, it checks whether the URL contains
// an actual YouTube video ID.
//
// Valid:
//
// https://www.youtube.com/watch?v=abc123
// https://youtu.be/abc123
//
// Invalid:
//
// https://www.youtube.com
// https://www.youtube.com/channel/xxxxx
// https://www.youtube.com/@username
// https://www.youtube.com/playlist?list=xxxxx
//
// =========================================================

function isPlayableYouTubeURL(
    url
) {

    if (
        typeof url !==
        "string"
    ) {

        return false;

    }


    const value =
        url.trim();


    if (
        value ===
        ""
    ) {

        return false;

    }


    try {

        const parsedURL =
            new URL(
                value
            );


        const hostname =
            parsedURL.hostname
                .toLowerCase()
                .replace(
                    /^www\./,
                    ""
                );


        // =================================================
        // youtube.com
        // =================================================

        if (
            hostname ===
            "youtube.com"
        ) {

            // =============================================
            // Only /watch?v=VIDEO_ID
            // =============================================

            if (
                parsedURL.pathname ===
                "/watch"
            ) {

                const videoId =
                    parsedURL.searchParams.get(
                        "v"
                    );


                return isValidYouTubeVideoId(
                    videoId
                );

            }


            return false;

        }


        // =================================================
        // youtu.be
        // =================================================

        if (
            hostname ===
            "youtu.be"
        ) {

            const videoId =
                parsedURL.pathname
                    .substring(1)
                    .split(
                        "/"
                    )[0];


            return isValidYouTubeVideoId(
                videoId
            );

        }

    }

    catch (
        error
    ) {

        return false;

    }


    return false;

}


// =========================================================
// Check YouTube Video ID
// =========================================================

function isValidYouTubeVideoId(
    videoId
) {

    if (
        typeof videoId !==
        "string"
    ) {

        return false;

    }


    const value =
        videoId.trim();


    if (
        value ===
        ""
    ) {

        return false;

    }


    // =====================================================
    // Normal YouTube Video IDs
    //
    // Usually 11 characters:
    //
    // ABCdef123_-
    // =====================================================

    return /^[A-Za-z0-9_-]{11}$/.test(
        value
    );

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


    if (
        !videoId
    ) {

        // =================================================
        // Safety Fallback
        //
        // If somehow the URL is not actually playable,
        // do NOT create a YouTube iframe.
        // =================================================

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
                        function(
                            event
                        ) {

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


    if (
        !box
    ) {

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


        const hostname =
            parsedURL.hostname
                .toLowerCase()
                .replace(
                    /^www\./,
                    ""
                );


        // =================================================
        // youtube.com
        // =================================================

        if (
            hostname ===
            "youtube.com"
            &&
            parsedURL.pathname ===
            "/watch"
        ) {

            const videoId =
                parsedURL.searchParams.get(
                    "v"
                );


            if (
                isValidYouTubeVideoId(
                    videoId
                )
            ) {

                return videoId;

            }


            return "";

        }


        // =================================================
        // youtu.be
        // =================================================

        if (
            hostname ===
            "youtu.be"
        ) {

            const videoId =
                parsedURL.pathname
                    .substring(1)
                    .split(
                        "/"
                    )[0];


            if (
                isValidYouTubeVideoId(
                    videoId
                )
            ) {

                return videoId;

            }

        }

    }

    catch (
        error
    ) {

        return "";

    }


    return "";

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


            // =================================================
            // If image failed AND URL exists,
            // make participant name clickable.
            // =================================================

            if (
                url &&
                url.trim() !==
                ""
            ) {

                displayClickableName(
                    element,
                    participantName,
                    url
                );

                return;

            }


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
            value.trim()
        )
    );

}


// =========================================================
// Choose Player A
// =========================================================

function chooseA() {

    // =====================================================
    // Prevent Double Click
    // =====================================================

    if (
        chooseButtonLocked
    ) {

        console.warn(
            "Choose button is temporarily locked."
        );

        return;

    }


    // =====================================================
    // Hide Both Buttons
    // =====================================================

    hideChooseButtonsTemporarily();


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

}


// =========================================================
// Swiss A Winner
// =========================================================

function SwissAWinner() {

    const round =
        current_tournament.swiss_round;


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


    const currentParticipantA =
        current_participant_list.find(
            function(
                participant
            ) {

                return (
                    participant.seed ===
                    participantA.seed
                );

            }
        );


    const currentParticipantB =
        current_participant_list.find(
            function(
                participant
            ) {

                return (
                    participant.seed ===
                    participantB.seed
                );

            }
        );


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


    const currentSaveData =
        saveDataStorage.find(
            function(
                saveData
            ) {

                return (
                    saveData.name ===
                    current_tournament_name
                );

            }
        );


    if (
        currentSaveData
    ) {

        currentSaveData.participantlist =
            current_participant_list;

    }


    BUCalculation();


    SwissSort();


    saveSaveData();


    saveCurrentTournament();


    DecideMatch();

}


// =========================================================
// Main A Winner
// =========================================================

function MainAWinner() {

    if (
        current_participant_number ===
        16
    ) {

        MatchHandler16(
            participantA,
            participantB
        );


        DecideMatch();


        initializeFightPage();


        return;

    }


    if (
        current_participant_number ===
        32
    ) {

        MatchHandler32(
            participantA,
            participantB
        );


        DecideMatch();


        initializeFightPage();


        return;

    }


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
    // Prevent Double Click
    // =====================================================

    if (
        chooseButtonLocked
    ) {

        console.warn(
            "Choose button is temporarily locked."
        );

        return;

    }


    // =====================================================
    // Hide Both Buttons
    // =====================================================

    hideChooseButtonsTemporarily();


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

        return;

    }


    // =====================================================
    // Main Tournament
    // =====================================================

    MainBWinner();

}


// =========================================================
// Swiss B Winner
// =========================================================

function SwissBWinner() {

    const round =
        current_tournament.swiss_round;


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


    const currentParticipantA =
        current_participant_list.find(
            function(
                participant
            ) {

                return (
                    participant.seed ===
                    participantA.seed
                );

            }
        );


    const currentParticipantB =
        current_participant_list.find(
            function(
                participant
            ) {

                return (
                    participant.seed ===
                    participantB.seed
                );

            }
        );


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


    const currentSaveData =
        saveDataStorage.find(
            function(
                saveData
            ) {

                return (
                    saveData.name ===
                    current_tournament_name
                );

            }
        );


    if (
        currentSaveData
    ) {

        currentSaveData.participantlist =
            current_participant_list;

    }


    BUCalculation();


    SwissSort();


    saveSaveData();


    saveCurrentTournament();


    DecideMatch();

}


// =========================================================
// Main B Winner
// =========================================================

function MainBWinner() {

    if (
        current_participant_number ===
        16
    ) {

        MatchHandler16(
            participantB,
            participantA
        );


        DecideMatch();


        initializeFightPage();


        return;

    }


    if (
        current_participant_number ===
        32
    ) {

        MatchHandler32(
            participantB,
            participantA
        );


        DecideMatch();


        initializeFightPage();


        return;

    }


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
            current_participant_list[
                index
            ];


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
                function(
                    participant
                ) {

                    return (
                        participant.seed ===
                        opponentSeed
                    );

                }
            );


        if (
            participantBIndex ===
            -1
        ) {

            return;

        }


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
    // All Fights Finished
    // =====================================================

    if (
        fight_over ===
        true
    ) {

        // =================================================
        // Continue Swiss
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
        // Swiss Finished
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
    // Swiss
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

    current_tournament.swiss =
        false;


    current_tournament.main =
        true;


    const currentSaveData =
        saveDataStorage.find(
            function(
                saveData
            ) {

                return (
                    saveData.name ===
                    current_tournament_name
                );

            }
        );


    if (
        !currentSaveData
    ) {

        console.warn(
            "Current SaveData not found."
        );

        return;

    }


    currentSaveData.tournament =
        current_tournament;


    saveSaveData();


    saveCurrentTournament();


    if (
        current_participant_number ===
        16
    ) {

        MainTournament16SetUp();

        return;

    }


    if (
        current_participant_number ===
        32
    ) {

        MainTournament32SetUp();

        return;

    }


    console.warn(
        "Unsupported participant number:",
        current_participant_number
    );

}


// =========================================================
// Open Main Tournament View
// =========================================================

function OpenMainTView() {

    if (
        current_participant_number ===
        16
    ) {

        window.location.href =
            "main-tournament-result-16.html";

        return;

    }


    if (
        current_participant_number ===
        32
    ) {

        window.location.href =
            "main-tournament-result-32.html";

        return;

    }


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
    // 16 Participants
    // =====================================================

    if (
        current_participant_number ===
        16
    ) {

        MainTournament16();


        const selectedParticipantA =
            current_main_t_participants.find(
                function(
                    participant
                ) {

                    return (
                        participant.main_t_location ===
                        locationA16
                    );

                }
            );


        const selectedParticipantB =
            current_main_t_participants.find(
                function(
                    participant
                ) {

                    return (
                        participant.main_t_location ===
                        locationB16
                    );

                }
            );


        if (
            !selectedParticipantA
        ) {

            console.warn(
                "Participant A not found at location:",
                locationA16
            );

            return;

        }


        if (
            !selectedParticipantB
        ) {

            console.warn(
                "Participant B not found at location:",
                locationB16
            );

            return;

        }


        participantA =
            selectedParticipantA;


        participantB =
            selectedParticipantB;


        initializeFightPage();


        return;

    }


    // =====================================================
    // 32 Participants
    // =====================================================

    if (
        current_participant_number ===
        32
    ) {

        MainTournament32();


        const selectedParticipantA =
            current_main_t_participants.find(
                function(
                    participant
                ) {

                    return (
                        participant.main_t_location ===
                        locationA32
                    );

                }
            );


        const selectedParticipantB =
            current_main_t_participants.find(
                function(
                    participant
                ) {

                    return (
                        participant.main_t_location ===
                        locationB32
                    );

                }
            );


        if (
            !selectedParticipantA
        ) {

            console.warn(
                "Participant A not found at location:",
                locationA32
            );

            return;

        }


        if (
            !selectedParticipantB
        ) {

            console.warn(
                "Participant B not found at location:",
                locationB32
            );

            return;

        }


        participantA =
            selectedParticipantA;


        participantB =
            selectedParticipantB;


        initializeFightPage();


        return;

    }


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

        loadCurrentTournament();


        updateFightTitle();


        DecideMatch();


        displayFightParticipant(
            "playerAContent",
            participantA
        );


        displayFightParticipant(
            "playerBContent",
            participantB
        );

    }
);