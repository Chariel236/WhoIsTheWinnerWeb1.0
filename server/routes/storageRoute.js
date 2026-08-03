
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

            // =================================================
            // Get User ID
            // =================================================

            const userId =
                request.userId;


            // =================================================
            // Find SaveData
            // =================================================

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


            // =================================================
            // Convert To SaveData Array
            // =================================================

            const saveDataStorageDB =
                saveDataList.map(
                    function(
                        item
                    ) {

                        return item.save_data;

                    }
                );


            // =================================================
            // Success
            // =================================================

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

            // =================================================
            // Get User ID
            // =================================================

            const userId =
                request.userId;


            // =================================================
            // Get SaveData Storage
            // =================================================

            const saveDataStorage =
                request.body.saveDataStorage;


            // =================================================
            // Check SaveData Storage
            // =================================================

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


            // =================================================
            // Delete Existing User SaveData
            // =================================================

            await UserSaveData.deleteMany({

                user:
                    userId

            });


            // =================================================
            // Create New Database SaveData
            // =================================================

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


            // =================================================
            // Save To Database
            // =================================================

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


            // =================================================
            // Convert Saved Data
            // =================================================

            const savedDataStorage =
                savedDocuments.map(
                    function(
                        item
                    ) {

                        return item.save_data;

                    }
                );


            // =================================================
            // Success
            // =================================================

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

            // =================================================
            // Get User ID
            // =================================================

            const userId =
                request.userId;


            // =================================================
            // Get SaveData ID
            // =================================================

            const saveDataId =
                request.params.id;


            // =================================================
            // Delete
            // =================================================

            const deletedSaveData =
                await UserSaveData.findOneAndDelete({

                    _id:
                        saveDataId,

                    user:
                        userId

                });


            // =================================================
            // Not Found
            // =================================================

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


            // =================================================
            // Success
            // =================================================

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

            // =================================================
            // Get User ID
            // =================================================

            const userId =
                request.userId;


            // =================================================
            // Find Default Participants
            // =================================================

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


            // =================================================
            // Convert To Array
            // =================================================

            const defaultParticipantsListArrayDB =
                defaultParticipantsList.map(
                    function(
                        item
                    ) {

                        return item.default_participants_list;

                    }
                );


            // =================================================
            // Success
            // =================================================

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

            // =================================================
            // Get User ID
            // =================================================

            const userId =
                request.userId;


            // =================================================
            // Get Default Participants List
            // =================================================

            const defaultParticipantsListArray =
                request.body.defaultParticipantsListArray;


            // =================================================
            // Check Array
            // =================================================

            if (
                !Array.isArray(
                    defaultParticipantsListArray
                )
            ) {

                return response.status(
                    400
                ).json({

                    message:
                        "defaultParticipantsListArray must be an array."

                });

            }


            // =================================================
            // Delete Existing User Default Participants
            // =================================================

            await UserDefaultParticipantsList.deleteMany({

                user:
                    userId

            });


            // =================================================
            // Create Database Documents
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


            // =================================================
            // Save To Database
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
            // Convert Saved Data
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
            // Success
            // =================================================

            return response.status(
                200
            ).json({

                message:
                    "Default Participants List saved successfully.",

                defaultParticipantsListArray:
                    savedDefaultParticipants

            });

        }

        catch (
            error
        ) {

            console.error(
                "Save Default Participants Error:",
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

            // =================================================
            // Get User ID
            // =================================================

            const userId =
                request.userId;


            // =================================================
            // Get Default Participants ID
            // =================================================

            const defaultParticipantsId =
                request.params.id;


            // =================================================
            // Delete
            // =================================================

            const deletedDefaultParticipants =
                await UserDefaultParticipantsList.findOneAndDelete({

                    _id:
                        defaultParticipantsId,

                    user:
                        userId

                });


            // =================================================
            // Not Found
            // =================================================

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


            // =================================================
            // Success
            // =================================================

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