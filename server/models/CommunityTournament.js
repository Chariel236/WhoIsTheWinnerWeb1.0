
// =========================================================
// Community Tournament Model
// =========================================================

const mongoose =
    require("mongoose");


// =========================================================
// Community Tournament Schema
// =========================================================

const communityTournamentSchema =
    new mongoose.Schema({

        // =====================================================
        // Tournament Name
        // =====================================================

        tournament_name: {

            type:
                String,

            required:
                true,

            trim:
                true

        },


        // =====================================================
        // Author User
        // =====================================================

        author: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref:
                "User",

            required:
                true

        },


        // =====================================================
        // Author Username
        // =====================================================

        author_username: {

            type:
                String,

            required:
                true

        },


        // =====================================================
        // SaveData
        // =====================================================

        save_data: {

            type:
                mongoose.Schema.Types.Mixed,

            required:
                true

        },


        // =====================================================
        // Created Date
        // =====================================================

        created_at: {

            type:
                Date,

            default:
                Date.now

        }

    });


// =========================================================
// Export Model
// =========================================================

module.exports =
    mongoose.model(
        "CommunityTournament",
        communityTournamentSchema
    );