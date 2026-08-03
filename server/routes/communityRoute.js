const express =
    require("express");

const CommunityTournament =
    require("../models/CommunityTournament");

const User =
    require("../models/User");

const authMiddleware =
    require("../middleware/authMiddleware");


// =========================================================
// Router
// =========================================================

const router =
    express.Router();


// =========================================================
// Upload Tournament
// =========================================================

router.post(
    "/upload",
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
            // Find User
            // =================================================

            const user =
                await User.findById(
                    userId
                );


            // =================================================
            // User Not Found
            // =================================================

            if (
                !user
            ) {

                return response.status(
                    401
                ).json({

                    message:
                        "User not found."

                });

            }


            // =================================================
            // Get SaveData
            // =================================================

            const saveData =
                request.body.saveData;


            // =================================================
            // Check SaveData
            // =================================================

            if (
                !saveData
            ) {

                return response.status(
                    400
                ).json({

                    message:
                        "SaveData is required."

                });

            }


            // =================================================
            // Check Tournament Name
            // =================================================

            if (
                !saveData.name ||
                saveData.name.trim() === ""
            ) {

                return response.status(
                    400
                ).json({

                    message:
                        "Tournament name is required."

                });

            }


            // =================================================
            // Create Community Tournament
            // =================================================

            const communityTournament =
                new CommunityTournament({

                    tournament_name:
                        saveData.name,

                    author:
                        user._id,

                    author_username:
                        user.username,

                    save_data:
                        saveData

                });


            // =================================================
            // Save To MongoDB
            // =================================================

            await communityTournament.save();


            // =================================================
            // Success
            // =================================================

            return response.status(
                201
            ).json({

                message:
                    "Tournament uploaded successfully.",

                tournament:
                    communityTournament

            });

        }

        catch (
            error
        ) {

            console.error(
                "Upload Community Tournament Error:",
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
// Get Community Tournament List
// =========================================================

router.get(
    "/",
    async function(
        request,
        response
    ) {

        try {

            // =================================================
            // Get Tournaments
            // =================================================

            const tournaments =
                await CommunityTournament
                    .find()
                    .select(
                        "tournament_name author author_username created_at save_data"
                    )
                    .sort({

                        created_at:
                            -1

                    });


            // =================================================
            // Success
            // =================================================

            return response.status(
                200
            ).json({

                tournaments:
                    tournaments

            });

        }

        catch (
            error
        ) {

            console.error(
                "Get Community Tournament Error:",
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
// Delete Community Tournament
// =========================================================

router.delete(
    "/:id",
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
            // Get Tournament ID
            // =================================================

            const tournamentId =
                request.params.id;


            // =================================================
            // Find Tournament
            // =================================================

            const tournament =
                await CommunityTournament.findById(
                    tournamentId
                );


            // =================================================
            // Tournament Not Found
            // =================================================

            if (
                !tournament
            ) {

                return response.status(
                    404
                ).json({

                    message:
                        "Tournament not found."

                });

            }


            // =================================================
            // Check Tournament Owner
            // =================================================

            if (
                tournament.author.toString() !==
                userId.toString()
            ) {

                return response.status(
                    403
                ).json({

                    message:
                        "You are not allowed to delete this tournament."

                });

            }


            // =================================================
            // Delete Tournament
            // =================================================

            await CommunityTournament.findByIdAndDelete(
                tournamentId
            );


            // =================================================
            // Success
            // =================================================

            return response.status(
                200
            ).json({

                message:
                    "Tournament deleted successfully."

            });

        }

        catch (
            error
        ) {

            console.error(
                "Delete Community Tournament Error:",
                error
            );


            // =================================================
            // Invalid MongoDB ID
            // =================================================

            if (
                error.name ===
                "CastError"
            ) {

                return response.status(
                    400
                ).json({

                    message:
                        "Invalid tournament ID."

                });

            }


            // =================================================
            // Server Error
            // =================================================

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