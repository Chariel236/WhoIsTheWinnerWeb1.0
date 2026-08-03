
const mongoose =
    require("mongoose");


// =========================================================
// User Save Data Schema
// =========================================================

const userSaveDataSchema =
    new mongoose.Schema(

        {

            // =================================================
            // User
            // =================================================

            user:
                {
                    type:
                        mongoose.Schema.Types.ObjectId,

                    ref:
                        "User",

                    required:
                        true
                },


            // =================================================
            // SaveData
            // =================================================

            save_data:
                {
                    type:
                        mongoose.Schema.Types.Mixed,

                    required:
                        false
                },


            // =================================================
            // Default Participants
            // =================================================

            default_participants:
                {
                    type:
                        mongoose.Schema.Types.Mixed,

                    required:
                        false
                }

        },

        {

            timestamps:
                true

        }

    );


// =========================================================
// Model
// =========================================================

const UserSaveData =
    mongoose.model(
        "UserSaveData",
        userSaveDataSchema
    );


// =========================================================
// Export Model
// =========================================================

module.exports =
    UserSaveData;