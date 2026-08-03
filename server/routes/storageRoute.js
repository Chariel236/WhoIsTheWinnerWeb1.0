const express =
require("express");

const UserSaveData =
require("../models/UserSaveData");

const UserDefaultParticipantsList =
require("../models/UserDefaultParticipantsList");

const authMiddleware =
require("../middleware/authMiddleware");

// =========================================================
// Router
// =========================================================

const router =
express.Router();

// =========================================================
// SaveData
// =========================================================

// =========================================================
// Get User SaveData
// =========================================================

router.get(
"/save-data",
authMiddleware,
async function(
request,
response
) {


    try {

        const userId =
            request.userId;


        const saveDataList =
            await UserSaveData
                .find({
                    user:
                        userId
                })
                .sort({
                    createdAt:
                        1
                });


        const saveDataStorageDB =
            saveDataList.map(
                function(
                    item
                ) {

                    return item.save_data;

                }
            );


        return response.status(
            200
        ).json({

            saveDataStorage:
                saveDataStorageDB

        });

    }

    catch (
        error
    ) {

        console.error(
            "Get User SaveData Error:",
            error
        );


        return response.status(
            500
        ).json({

            message:
                "Server error."

        });

    }

}


);

// =========================================================
// Save User SaveData
// =========================================================

router.post(
"/save-data",
authMiddleware,
async function(
request,
response
) {


    try {

        const userId =
            request.userId;


        const saveDataStorage =
            request.body.saveDataStorage;


        if (
            !Array.isArray(
                saveDataStorage
            )
        ) {

            return response.status(
                400
            ).json({

                message:
                    "saveDataStorage must be an array."

            });

        }


        await UserSaveData.deleteMany({

            user:
                userId

        });


        const saveDataDocuments =
            saveDataStorage.map(
                function(
                    saveData
                ) {

                    return {

                        user:
                            userId,

                        save_data:
                            saveData

                    };

                }
            );


        let savedDocuments =
            [];


        if (
            saveDataDocuments.length >
            0
        ) {

            savedDocuments =
                await UserSaveData.insertMany(
                    saveDataDocuments
                );

        }


        const savedDataStorage =
            savedDocuments.map(
                function(
                    item
                ) {

                    return item.save_data;

                }
            );


        return response.status(
            200
        ).json({

            message:
                "SaveData saved successfully.",

            saveDataStorage:
                savedDataStorage

        });

    }

    catch (
        error
    ) {

        console.error(
            "Save User SaveData Error:",
            error
        );


        return response.status(
            500
        ).json({

            message:
                "Server error."

        });

    }

}


);

// =========================================================
// Delete User SaveData
// =========================================================

router.delete(
"/save-data/:id",
authMiddleware,
async function(
request,
response
) {


    try {

        const userId =
            request.userId;


        const saveDataId =
            request.params.id;


        const deletedSaveData =
            await UserSaveData.findOneAndDelete({

                _id:
                    saveDataId,

                user:
                    userId

            });


        if (
            !deletedSaveData
        ) {

            return response.status(
                404
            ).json({

                message:
                    "SaveData not found."

            });

        }


        return response.status(
            200
        ).json({

            message:
                "SaveData deleted successfully."

        });

    }

    catch (
        error
    ) {

        console.error(
            "Delete User SaveData Error:",
            error
        );


        return response.status(
            500
        ).json({

            message:
                "Server error."

        });

    }

}


);

// =========================================================
// Default Participants List
// =========================================================

// =========================================================
// Get Default Participants List
// =========================================================

router.get(
"/default-participants",
authMiddleware,
async function(
request,
response
) {


    try {

        const userId =
            request.userId;


        console.log(
            "========================================"
        );

        console.log(
            "GET DEFAULT PARTICIPANTS"
        );

        console.log(
            "User ID:",
            userId
        );


        const defaultParticipantsList =
            await UserDefaultParticipantsList
                .find({

                    user:
                        userId

                })
                .sort({

                    createdAt:
                        1

                });


        console.log(
            "Database Documents Found:",
            defaultParticipantsList.length
        );


        const defaultParticipantsListArrayDB =
            defaultParticipantsList.map(
                function(
                    item
                ) {

                    return item.default_participants_list;

                }
            );


        console.log(
            "Default Participants Data:",
            defaultParticipantsListArrayDB
        );


        console.log(
            "========================================"
        );


        return response.status(
            200
        ).json({

            defaultParticipantsListArray:
                defaultParticipantsListArrayDB

        });

    }

    catch (
        error
    ) {

        console.error(
            "Get Default Participants Error:",
            error
        );


        return response.status(
            500
        ).json({

            message:
                "Server error."

        });

    }

}


);

// =========================================================
// TEMPORARY DEBUG POST
// Save Default Participants List
// =========================================================

router.post(
"/default-participants",
authMiddleware,
async function(
request,
response
) {


    try {

        console.log(
            "========================================"
        );

        console.log(
            "POST DEFAULT PARTICIPANTS"
        );


        // =================================================
        // User ID
        // =================================================

        const userId =
            request.userId;


        console.log(
            "User ID:",
            userId
        );


        // =================================================
        // Request Body
        // =================================================

        console.log(
            "Request Body:",
            request.body
        );


        // =================================================
        // Get Array
        // =================================================

        const defaultParticipantsListArray =
            request.body.defaultParticipantsListArray;


        console.log(
            "Received Default Participants:",
            defaultParticipantsListArray
        );


        // =================================================
        // Check User ID
        // =================================================

        if (
            !userId
        ) {

            console.error(
                "ERROR: request.userId is empty."
            );


            return response.status(
                401
            ).json({

                message:
                    "User ID is missing."

            });

        }


        // =================================================
        // Check Array
        // =================================================

        if (
            !Array.isArray(
                defaultParticipantsListArray
            )
        ) {

            console.error(
                "ERROR: defaultParticipantsListArray is not an array."
            );


            return response.status(
                400
            ).json({

                message:
                    "defaultParticipantsListArray must be an array.",

                receivedType:
                    typeof defaultParticipantsListArray

            });

        }


        // =================================================
        // Delete Existing User Data
        // =================================================

        console.log(
            "Deleting existing Default Participants..."
        );


        const deleteResult =
            await UserDefaultParticipantsList.deleteMany({

                user:
                    userId

            });


        console.log(
            "Deleted Documents:",
            deleteResult.deletedCount
        );


        // =================================================
        // Prepare Documents
        // =================================================

        const defaultParticipantDocuments =
            defaultParticipantsListArray.map(
                function(
                    defaultParticipant
                ) {

                    return {

                        user:
                            userId,

                        default_participants_list:
                            defaultParticipant

                    };

                }
            );


        console.log(
            "Documents To Insert:",
            defaultParticipantDocuments
        );


        // =================================================
        // Insert Documents
        // =================================================

        let savedDocuments =
            [];


        if (
            defaultParticipantDocuments.length >
            0
        ) {

            savedDocuments =
                await UserDefaultParticipantsList.insertMany(
                    defaultParticipantDocuments
                );

        }


        // =================================================
        // Verify Database
        // =================================================

        console.log(
            "Inserted Documents:",
            savedDocuments.length
        );


        // =================================================
        // Convert Saved Documents
        // =================================================

        const savedDefaultParticipants =
            savedDocuments.map(
                function(
                    item
                ) {

                    return item.default_participants_list;

                }
            );


        // =================================================
        // Final Database Check
        // =================================================

        const verifyDocuments =
            await UserDefaultParticipantsList.find({

                user:
                    userId

            });


        console.log(
            "Verification Documents:",
            verifyDocuments.length
        );


        console.log(
            "Verification Data:",
            verifyDocuments
        );


        console.log(
            "========================================"
        );


        // =================================================
        // Success
        // =================================================

        return response.status(
            200
        ).json({

            message:
                "Default Participants List saved successfully.",

            insertedCount:
                savedDocuments.length,

            defaultParticipantsListArray:
                savedDefaultParticipants

        });

    }

    catch (
        error
    ) {

        console.error(
            "========================================"
        );

        console.error(
            "SAVE DEFAULT PARTICIPANTS ERROR"
        );

        console.error(
            error
        );

        console.error(
            "========================================"
        );


        return response.status(
            500
        ).json({

            message:
                "Server error.",

            error:
                error.message

        });

    }

}


);

// =========================================================
// Delete Default Participants List
// =========================================================

router.delete(
"/default-participants/:id",
authMiddleware,
async function(
request,
response
) {


    try {

        const userId =
            request.userId;


        const defaultParticipantsId =
            request.params.id;


        const deletedDefaultParticipants =
            await UserDefaultParticipantsList.findOneAndDelete({

                _id:
                    defaultParticipantsId,

                user:
                    userId

            });


        if (
            !deletedDefaultParticipants
        ) {

            return response.status(
                404
            ).json({

                message:
                    "Default Participants List not found."

            });

        }


        return response.status(
            200
        ).json({

            message:
                "Default Participants List deleted successfully."

        });

    }

    catch (
        error
    ) {

        console.error(
            "Delete Default Participants Error:",
            error
        );


        return response.status(
            500
        ).json({

            message:
                "Server error."

        });

    }

}

);

// =========================================================
// Export Router
// =========================================================

module.exports =
router;
