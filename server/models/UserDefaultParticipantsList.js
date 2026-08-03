const mongoose =
    require("mongoose");


// =========================================================
// User Default Participants List Schema
// =========================================================

const userDefaultParticipantsListSchema =
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
            // Default Participants List
            // =================================================

            default_participants_list:
                {
                    type:
                        mongoose.Schema.Types.Mixed,

                    required:
                        true
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

const UserDefaultParticipantsList =
    mongoose.model(
        "UserDefaultParticipantsList",
        userDefaultParticipantsListSchema
    );


// =========================================================
// Export
// =========================================================

module.exports =
    UserDefaultParticipantsList;