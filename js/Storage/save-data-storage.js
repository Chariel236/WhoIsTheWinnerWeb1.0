
// =========================================================
// Save Data Storage
// =========================================================


// =========================================================
// SaveData Storage
// =========================================================

const saveDataStorage = [];

const defaultParticipantsListArray = [];

const saveDataStorageDB = [];

const defaultParticipantsListArrayDB = [];


// =========================================================
// Database API
// =========================================================

const USERDATA_API =
    "https://who-is-the-winner-imdt.onrender.com/api/storage/";


// =========================================================
// Current Tournament Data
// =========================================================

let current_tournament_name = "";

let current_participant_number = 0;

let current_participant_list = [];

let current_tournament = null;

let current_ranking = [];

let current_main_t_participants = [];

let current_main_tournament_memory = [];


// =========================================================
// Current Username
// =========================================================

var current_username = "";


// =========================================================
// Save Username
// =========================================================

function saveUsername(
    username
) {

    if (
        !username ||
        username.trim() === ""
    ) {

        console.warn(
            "Username is empty."
        );

        return false;

    }


    current_username =
        username.trim();


    localStorage.setItem(
        "currentUsername",
        current_username
    );


    console.log(
        "Username Saved:",
        current_username
    );


    return true;

}


// =========================================================
// Load Username
// =========================================================

function loadUsername() {

    const savedUsername =
        localStorage.getItem(
            "currentUsername"
        );


    if (
        !savedUsername
    ) {

        current_username =
            "";

        return false;

    }


    current_username =
        savedUsername.trim();


    if (
        current_username === ""
    ) {

        current_username =
            "";

        return false;

    }


    console.log(
        "Username Loaded:",
        current_username
    );


    return true;

}


// =========================================================
// Delete Username
// =========================================================

function deleteUsername() {

    localStorage.removeItem(
        "currentUsername"
    );


    current_username =
        "";


    console.log(
        "Username Deleted."
    );

}


// =========================================================
// Get Default Participant Cache Key
// =========================================================

function getDefaultParticipantsCacheKey() {

    loadUsername();


    if (
        !current_username ||
        current_username.trim() === ""
    ) {

        return null;

    }


    return (
        "defaultParticipantsListArray_" +
        current_username.trim()
    );

}


// =========================================================
// Convert Default List To Plain Object
// =========================================================

function defaultParticipantListToObject(
    defaultList
) {

    if (
        !defaultList
    ) {

        return null;

    }


    const participantList =
        [];


    if (
        Array.isArray(
            defaultList.participant_list
        )
    ) {

        defaultList.participant_list.forEach(
            function(
                participant
            ) {

                if (
                    !participant
                ) {

                    return;

                }


                participantList.push({

                    seed:
                        Number(
                            participant.seed
                        ) || 0,

                    name:
                        participant.name ||
                        "",

                    url:
                        participant.url ||
                        ""

                });

            }
        );

    }


    return {

        name:
            defaultList.name ||
            "",

        participant_number:
            Number(
                defaultList.participant_number
            ) || 0,

        can_delete_by_user:
            defaultList.can_delete_by_user ===
            true,

        participant_list:
            participantList

    };

}


// =========================================================
// Convert Plain Object To Default List
// =========================================================

function objectToDefaultParticipantList(
    defaultData
) {

    if (
        !defaultData
    ) {

        return null;

    }


    if (
        typeof DefaultParticipantsList !==
        "function"
    ) {

        console.error(
            "DefaultParticipantsList is not available."
        );

        return null;

    }


    const defaultList =
        new DefaultParticipantsList();


    defaultList.name =
        defaultData.name ||
        "";


    defaultList.participant_number =
        Number(
            defaultData.participant_number
        ) || 0;


    defaultList.can_delete_by_user =
        defaultData.can_delete_by_user ===
        true;


    defaultList.participant_list =
        [];


    if (
        Array.isArray(
            defaultData.participant_list
        )
    ) {

        defaultData.participant_list.forEach(
            function(
                participant
            ) {

                if (
                    !participant
                ) {

                    return;

                }


                defaultList.participant_list.push({

                    seed:
                        Number(
                            participant.seed
                        ) || 0,

                    name:
                        participant.name ||
                        "",

                    url:
                        participant.url ||
                        ""

                });

            }
        );

    }


    return defaultList;

}


// =========================================================
// Serialize Default Participant Lists
// =========================================================

function serializeDefaultParticipantsListArray() {

    const result =
        [];


    if (
        !Array.isArray(
            defaultParticipantsListArray
        )
    ) {

        return result;

    }


    defaultParticipantsListArray.forEach(
        function(
            defaultList
        ) {

            const object =
                defaultParticipantListToObject(
                    defaultList
                );


            if (
                object
            ) {

                result.push(
                    object
                );

            }

        }
    );


    return result;

}


// =========================================================
// Apply Default Participant Lists
// =========================================================

function applyDefaultParticipantsList(
    data
) {

    defaultParticipantsListArray.length =
        0;


    if (
        !Array.isArray(
            data
        )
    ) {

        return false;

    }


    data.forEach(
        function(
            defaultData
        ) {

            const defaultList =
                objectToDefaultParticipantList(
                    defaultData
                );


            if (
                defaultList
            ) {

                defaultParticipantsListArray.push(
                    defaultList
                );

            }

        }
    );


    return true;

}


// =========================================================
// Save Default Participant List Cache
// =========================================================

function saveDefaultParticipantsListCache() {

    const cacheKey =
        getDefaultParticipantsCacheKey();


    if (
        !cacheKey
    ) {

        console.warn(
            "Cannot save Default Participant List cache. Username is empty."
        );

        return false;

    }


    const data =
        serializeDefaultParticipantsListArray();


    localStorage.setItem(
        cacheKey,
        JSON.stringify(
            data
        )
    );


    return true;

}


// =========================================================
// Load Default Participant List Cache
// =========================================================

function loadDefaultParticipantsListCache() {

    const cacheKey =
        getDefaultParticipantsCacheKey();


    if (
        !cacheKey
    ) {

        return false;

    }


    const cachedData =
        localStorage.getItem(
            cacheKey
        );


    if (
        !cachedData
    ) {

        return false;

    }


    let data;


    try {

        data =
            JSON.parse(
                cachedData
            );

    }

    catch (
        error
    ) {

        console.warn(
            "Failed to parse Default Participant List cache:",
            error
        );

        return false;

    }


    if (
        !Array.isArray(
            data
        )
    ) {

        return false;

    }


    applyDefaultParticipantsList(
        data
    );


    console.log(
        "Default Participant List Cache Loaded:",
        defaultParticipantsListArray
    );


    return true;

}


// =========================================================
// Merge Default Participant Lists
// =========================================================
//
// Existing:
// A
// B
//
// New:
// C
//
// Result:
// A
// B
// C
//
// If same name exists:
// Existing A
// New A
//
// Result:
// New A replaces old A
//
// =========================================================

function mergeDefaultParticipantLists(
    existingLists,
    newLists
) {

    const merged =
        [];


    // =====================================================
    // Add Existing Lists
    // =====================================================

    if (
        Array.isArray(
            existingLists
        )
    ) {

        existingLists.forEach(
            function(
                existingList
            ) {

                if (
                    !existingList
                ) {

                    return;

                }


                const copiedList =
                    objectToDefaultParticipantList(
                        existingList
                    );


                if (
                    copiedList
                ) {

                    merged.push(
                        copiedList
                    );

                }

            }
        );

    }


    // =====================================================
    // Add New / Updated Lists
    // =====================================================

    if (
        Array.isArray(
            newLists
        )
    ) {

        newLists.forEach(
            function(
                newList
            ) {

                if (
                    !newList
                ) {

                    return;

                }


                const newObject =
                    defaultParticipantListToObject(
                        newList
                    );


                if (
                    !newObject
                ) {

                    return;

                }


                const existingIndex =
                    merged.findIndex(
                        function(
                            existingList
                        ) {

                            return (
                                existingList &&
                                existingList.name ===
                                newObject.name
                            );

                        }
                    );


                // =========================================
                // Update Existing
                // =========================================

                if (
                    existingIndex !==
                    -1
                ) {

                    merged[
                        existingIndex
                    ] =
                        objectToDefaultParticipantList(
                            newObject
                        );

                }

                // =========================================
                // Add New
                // =========================================

                else {

                    merged.push(
                        objectToDefaultParticipantList(
                            newObject
                        )
                    );

                }

            }
        );

    }


    return merged;

}


// =========================================================
// Load SaveData
// =========================================================

function loadSaveData() {

    const savedData =
        localStorage.getItem(
            "saveDataStorage"
        );


    if (
        !savedData
    ) {

        saveDataStorage.length =
            0;


        return loadSaveDataFromDatabase();

    }


    let data;


    try {

        data =
            JSON.parse(
                savedData
            );

    }

    catch (
        error
    ) {

        console.warn(
            "Failed to parse saveDataStorage:",
            error
        );


        saveDataStorage.length =
            0;


        return loadSaveDataFromDatabase();

    }


    if (
        !Array.isArray(
            data
        )
    ) {

        console.warn(
            "saveDataStorage data is invalid."
        );


        saveDataStorage.length =
            0;


        return loadSaveDataFromDatabase();

    }


    saveDataStorage.length =
        0;


    saveDataStorage.push(
        ...data
    );


    removeDuplicateSaveData();


    console.log(
        "SaveDataStorage Loaded:",
        saveDataStorage
    );


    return loadSaveDataFromDatabase();

}


// =========================================================
// Remove Duplicate SaveData
// =========================================================

function removeDuplicateSaveData() {

    if (
        !Array.isArray(
            saveDataStorage
        )
    ) {

        return false;

    }


    const uniqueSaveDataStorage =
        [];


    saveDataStorage.forEach(
        function(
            saveData
        ) {

            if (
                !saveData
            ) {

                return;

            }


            const tournamentName =
                saveData.name;


            if (
                !tournamentName ||
                tournamentName.trim() === ""
            ) {

                uniqueSaveDataStorage.push(
                    saveData
                );

                return;

            }


            const existingIndex =
                uniqueSaveDataStorage.findIndex(
                    function(
                        existingSaveData
                    ) {

                        return (
                            existingSaveData &&
                            existingSaveData.name ===
                            tournamentName
                        );

                    }
                );


            if (
                existingIndex !==
                -1
            ) {

                uniqueSaveDataStorage[
                    existingIndex
                ] =
                    saveData;

            }

            else {

                uniqueSaveDataStorage.push(
                    saveData
                );

            }

        }
    );


    saveDataStorage.length =
        0;


    saveDataStorage.push(
        ...uniqueSaveDataStorage
    );


    localStorage.setItem(
        "saveDataStorage",
        JSON.stringify(
            saveDataStorage
        )
    );


    return true;

}


// =========================================================
// Load SaveData From Database
// =========================================================

function loadSaveDataFromDatabase() {

    const token =
        localStorage.getItem(
            "token"
        );


    if (
        !token
    ) {

        console.warn(
            "No login token found."
        );

        return Promise.resolve(
            false
        );

    }


    return fetch(
        USERDATA_API +
        "save-data",
        {

            method:
                "GET",

            headers: {

                "Authorization":
                    "Bearer " +
                    token

            }

        }
    )

    .then(
        function(
            response
        ) {

            return response.json()
                .then(
                    function(
                        data
                    ) {

                        return {

                            response:
                                response,

                            data:
                                data

                        };

                    }
                );

        }
    )

    .then(
        function(
            result
        ) {

            const response =
                result.response;

            const data =
                result.data;


            if (
                !response.ok
            ) {

                console.error(
                    "Load Database SaveData Error:",
                    data
                );

                return false;

            }


            if (
                !Array.isArray(
                    data.saveDataStorage
                )
            ) {

                console.warn(
                    "Database SaveDataStorage is invalid."
                );

                return false;

            }


            saveDataStorageDB.length =
                0;


            saveDataStorageDB.push(
                ...data.saveDataStorage
            );


            saveDataStorage.length =
                0;


            saveDataStorage.push(
                ...saveDataStorageDB
            );


            removeDuplicateSaveData();


            localStorage.setItem(
                "saveDataStorage",
                JSON.stringify(
                    saveDataStorage
                )
            );


            console.log(
                "Database SaveDataStorage Loaded:",
                saveDataStorageDB
            );


            return true;

        }
    )

    .catch(
        function(
            error
        ) {

            console.error(
                "Load Database SaveData Error:",
                error
            );

            return false;

        }
    );

}


// =========================================================
// Save SaveData
// =========================================================

function saveSaveData() {

    if (
        !Array.isArray(
            saveDataStorage
        )
    ) {

        console.warn(
            "saveDataStorage is invalid."
        );

        return false;

    }


    removeDuplicateSaveData();


    localStorage.setItem(
        "saveDataStorage",
        JSON.stringify(
            saveDataStorage
        )
    );


    console.log(
        "SaveDataStorage Saved:",
        saveDataStorage
    );


    saveSaveDataToDatabase();


    return true;

}


// =========================================================
// Save SaveData To Database
// =========================================================

function saveSaveDataToDatabase() {

    const token =
        localStorage.getItem(
            "token"
        );


    if (
        !token
    ) {

        console.warn(
            "No login token found."
        );

        return Promise.resolve(
            false
        );

    }


    if (
        !Array.isArray(
            saveDataStorage
        )
    ) {

        return Promise.resolve(
            false
        );

    }


    removeDuplicateSaveData();


    saveDataStorageDB.length =
        0;


    saveDataStorageDB.push(
        ...saveDataStorage
    );


    return fetch(
        USERDATA_API +
        "save-data",
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

                    saveDataStorage:
                        saveDataStorageDB

                })

        }
    )

    .then(
        function(
            response
        ) {

            return response.json()
                .then(
                    function(
                        data
                    ) {

                        return {

                            response:
                                response,

                            data:
                                data

                        };

                    }
                );

        }
    )

    .then(
        function(
            result
        ) {

            const response =
                result.response;

            const data =
                result.data;


            if (
                !response.ok
            ) {

                console.error(
                    "Save Database SaveData Error:",
                    data
                );

                return false;

            }


            if (
                Array.isArray(
                    data.saveDataStorage
                )
            ) {

                saveDataStorageDB.length =
                    0;


                saveDataStorageDB.push(
                    ...data.saveDataStorage
                );


                saveDataStorage.length =
                    0;


                saveDataStorage.push(
                    ...saveDataStorageDB
                );


                removeDuplicateSaveData();


                localStorage.setItem(
                    "saveDataStorage",
                    JSON.stringify(
                        saveDataStorage
                    )
                );

            }


            console.log(
                "SaveDataStorage Saved To Database:",
                saveDataStorageDB
            );


            return true;

        }
    )

    .catch(
        function(
            error
        ) {

            console.error(
                "Save Database SaveData Error:",
                error
            );

            return false;

        }
    );

}


// =========================================================
// Load Default Participants List
// =========================================================

function loadDefaultParticipantsList() {

    // =====================================================
    // IMPORTANT
    //
    // Load Local Cache First.
    //
    // create-tournament.js does:
    //
    // loadDefaultParticipantsList();
    // displayParticipantLists();
    //
    // Therefore fetch() cannot be relied on for the
    // first display.
    // =====================================================

    loadDefaultParticipantsListCache();


    // =====================================================
    // Get Token
    // =====================================================

    const token =
        localStorage.getItem(
            "token"
        );


    if (
        !token
    ) {

        console.warn(
            "No login token found."
        );


        return Promise.resolve(
            false
        );

    }


    // =====================================================
    // Load From Database
    // =====================================================

    return fetch(
        USERDATA_API +
        "default-participants",
        {

            method:
                "GET",

            headers: {

                "Authorization":
                    "Bearer " +
                    token

            }

        }
    )

    .then(
        function(
            response
        ) {

            return response.json()
                .then(
                    function(
                        data
                    ) {

                        return {

                            response:
                                response,

                            data:
                                data

                        };

                    }
                );

        }
    )

    .then(
        function(
            result
        ) {

            const response =
                result.response;

            const data =
                result.data;


            if (
                !response.ok
            ) {

                console.error(
                    "Load Default Participants Error:",
                    data
                );

                return false;

            }


            if (
                !Array.isArray(
                    data.defaultParticipantsListArray
                )
            ) {

                console.warn(
                    "Database DefaultParticipantsList is invalid."
                );

                return false;

            }


            // =====================================================
            // Database Data
            // =====================================================

            const databaseLists =
                data.defaultParticipantsListArray;


            // =====================================================
            // Database Has Data
            // =====================================================

            if (
                databaseLists.length >
                0
            ) {

                defaultParticipantsListArrayDB.length =
                    0;


                defaultParticipantsListArrayDB.push(
                    ...databaseLists
                );


                applyDefaultParticipantsList(
                    defaultParticipantsListArrayDB
                );


                saveDefaultParticipantsListCache();


                console.log(
                    "Default Participants List Loaded From Database:",
                    defaultParticipantsListArray
                );

            }


            // =====================================================
            // Database Is Empty
            // =====================================================

            else {

                console.warn(
                    "Database Default Participants List is empty. Keeping local cache."
                );


                console.log(
                    "Local Default Participants List:",
                    defaultParticipantsListArray
                );

            }


            return true;


            console.log(
                "Default Participants List Loaded From Database:",
                defaultParticipantsListArray
            );


            return true;

        }
    )

    .catch(
        function(
            error
        ) {

            console.error(
                "Load Default Participants Error:",
                error
            );


            // =================================================
            // IMPORTANT
            //
            // Do NOT clear the local cache.
            // =================================================

            return false;

        }
    );

}

// =========================================================
// Save Default Participants List
// =========================================================

function saveDefaultParticipantsList() {

    // =====================================================
    // Get Token
    // =====================================================

    const token =
        localStorage.getItem(
            "token"
        );


    if (
        !token
    ) {

        console.warn(
            "No login token found."
        );

        return Promise.resolve(
            false
        );

    }


    // =====================================================
    // Check Array
    // =====================================================

    if (
        !Array.isArray(
            defaultParticipantsListArray
        )
    ) {

        console.warn(
            "defaultParticipantsListArray is invalid."
        );

        return Promise.resolve(
            false
        );

    }


    // =====================================================
    // Save Local Cache Immediately
    // =====================================================

    saveDefaultParticipantsListCache();


    // =====================================================
    // Convert To Plain Object
    // =====================================================

    const currentData =
        serializeDefaultParticipantsListArray();


    console.log(
        "========================================"
    );

    console.log(
        "Saving Default Participants List..."
    );

    console.log(
        "Current Data:",
        currentData
    );

    console.log(
        "Count:",
        currentData.length
    );


    // =====================================================
    // POST Directly To Database
    // =====================================================

    return fetch(
        USERDATA_API +
        "default-participants",
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

                    defaultParticipantsListArray:
                        currentData

                })

        }
    )

    // =====================================================
    // Read Response
    // =====================================================

    .then(
        function(
            response
        ) {

            return response.json()
                .then(
                    function(
                        data
                    ) {

                        return {

                            response:
                                response,

                            data:
                                data

                        };

                    }
                );

        }
    )

    // =====================================================
    // Process Response
    // =====================================================

    .then(
        function(
            result
        ) {

            const response =
                result.response;

            const data =
                result.data;


            // =================================================
            // Database Save Failed
            // =================================================

            if (
                !response.ok
            ) {

                console.error(
                    "========================================"
                );

                console.error(
                    "Save Default Participants Error:"
                );

                console.error(
                    "Status:",
                    response.status
                );

                console.error(
                    "Response:",
                    data
                );

                console.error(
                    "========================================"
                );


                return false;

            }


            // =================================================
            // Server Returned Data
            // =================================================

            if (
                data &&
                Array.isArray(
                    data.defaultParticipantsListArray
                )
            ) {

                // =============================================
                // Update Database Array
                // =============================================

                defaultParticipantsListArrayDB.length =
                    0;


                defaultParticipantsListArrayDB.push(
                    ...data.defaultParticipantsListArray
                );


                // =============================================
                // Update Current Array
                // =============================================

                applyDefaultParticipantsList(
                    defaultParticipantsListArrayDB
                );


                // =============================================
                // Save Final Cache
                // =============================================

                saveDefaultParticipantsListCache();

            }


            // =================================================
            // Success
            // =================================================

            console.log(
                "========================================"
            );

            console.log(
                "Default Participants List Saved Successfully."
            );

            console.log(
                "Database:",
                defaultParticipantsListArrayDB
            );

            console.log(
                "Current:",
                defaultParticipantsListArray
            );

            console.log(
                "========================================"
            );


            return true;

        }
    )

    // =====================================================
    // Network Error
    // =====================================================

    .catch(
        function(
            error
        ) {

            console.error(
                "========================================"
            );

            console.error(
                "Save Default Participants Error:",
                error
            );

            console.error(
                "========================================"
            );


            // =================================================
            // Keep Local Cache
            // =================================================

            saveDefaultParticipantsListCache();


            return false;

        }
    );

}


// =========================================================
// Add Default Participants List
// =========================================================

function addDefaultParticipantsList(
    saveData
) {

    if (
        !saveData
    ) {

        console.warn(
            "SaveData is invalid."
        );

        return false;

    }


    if (
        typeof DefaultParticipantsList !==
        "function"
    ) {

        console.error(
            "DefaultParticipantsList is not available."
        );

        return false;

    }


    const defaultList =
        new DefaultParticipantsList();


    // =====================================================
    // Name
    // =====================================================

    defaultList.name =
        saveData.name ||
        "";


    // =====================================================
    // Participant Number
    // =====================================================

    defaultList.participant_number =
        Number(
            saveData.participant_number
        ) || 0;


    // =====================================================
    // Can Delete
    // =====================================================

    defaultList.can_delete_by_user =
        true;


    // =====================================================
    // Participant List
    // =====================================================

    defaultList.participant_list =
        [];


    // =====================================================
    // Copy Participants
    // =====================================================

    if (
        Array.isArray(
            saveData.participantlist
        )
    ) {

        saveData.participantlist.forEach(
            function(
                participant
            ) {

                if (
                    !participant
                ) {

                    return;

                }


                defaultList.participant_list.push({

                    seed:
                        Number(
                            participant.seed
                        ) || 0,

                    name:
                        participant.name ||
                        "",

                    url:
                        participant.url ||
                        ""

                });

            }
        );

    }


    // =====================================================
    // PUSH
    // =====================================================

    defaultParticipantsListArray.push(
        defaultList
    );


    // =====================================================
    // SAVE
    // =====================================================

    saveDefaultParticipantsList();


    console.log(
        "Default Participants List Added:",
        defaultList
    );


    return true;

}


// =========================================================
// Save Current Tournament
// =========================================================

function saveCurrentTournament() {

    const currentTournamentData = {

        name:
            current_tournament_name,

        participant_number:
            current_participant_number,

        participant_list:
            current_participant_list,

        tournament:
            current_tournament,

        ranking:
            current_ranking,

        main_t_participants:
            current_main_t_participants,

        main_tournament_memory:
            current_main_tournament_memory

    };


    localStorage.setItem(
        "currentTournamentData",
        JSON.stringify(
            currentTournamentData
        )
    );


    console.log(
        "Current Tournament Saved:",
        currentTournamentData
    );

}


// =========================================================
// Load Current Tournament
// =========================================================

function loadCurrentTournament() {

    const savedData =
        localStorage.getItem(
            "currentTournamentData"
        );


    if (
        !savedData
    ) {

        return false;

    }


    let data;


    try {

        data =
            JSON.parse(
                savedData
            );

    }

    catch (
        error
    ) {

        console.warn(
            "Failed to parse currentTournamentData:",
            error
        );

        return false;

    }


    current_tournament_name =
        data.name ||
        "";


    current_participant_number =
        Number(
            data.participant_number
        ) || 0;


    current_participant_list =
        Array.isArray(
            data.participant_list
        )
            ? data.participant_list
            : [];


    current_tournament =
        data.tournament ||
        null;


    current_ranking =
        Array.isArray(
            data.ranking
        )
            ? data.ranking
            : [];


    current_main_t_participants =
        Array.isArray(
            data.main_t_participants
        )
            ? data.main_t_participants
            : [];


    current_main_tournament_memory =
        Array.isArray(
            data.main_tournament_memory
        )
            ? data.main_tournament_memory
            : [];


    console.log(
        "Current Tournament Loaded:",
        current_tournament_name
    );


    return true;

}