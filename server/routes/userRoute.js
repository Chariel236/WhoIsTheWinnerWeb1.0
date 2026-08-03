// =========================================================
// User Route
// =========================================================
const jwt =
    require("jsonwebtoken");

const express =
    require("express");

const bcrypt =
    require("bcrypt");

const User =
    require("../models/User");


// =========================================================
// Router
// =========================================================

const router =
    express.Router();


// =========================================================
// Register User
// =========================================================

router.post(
    "/register",
    async function(
        request,
        response
    ) {

        try {

            // =================================================
            // Get Username And Password
            // =================================================

            const username =
                request.body.username;

            const password =
                request.body.password;


            // =================================================
            // Check Username
            // =================================================

            if (
                !username
            ) {

                return response.status(
                    400
                ).json({

                    message:
                        "Username is required."

                });

            }


            // =================================================
            // Check Password
            // =================================================

            if (
                !password
            ) {

                return response.status(
                    400
                ).json({

                    message:
                        "Password is required."

                });

            }


            // =================================================
            // Check Existing User
            // =================================================

            const existingUser =
                await User.findOne({

                    username:
                        username

                });


            if (
                existingUser
            ) {

                return response.status(
                    400
                ).json({

                    message:
                        "Username already exists."

                });

            }


            // =================================================
            // Encrypt Password
            // =================================================

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );


            // =================================================
            // Create User
            // =================================================

            const user =
                new User({

                    username:
                        username,

                    password:
                        hashedPassword

                });


            // =================================================
            // Save User
            // =================================================

            await user.save();


            // =================================================
            // Success
            // =================================================

            return response.status(
                201
            ).json({

                message:
                    "User registered successfully."

            });

        }

        catch (
            error
        ) {

            console.error(
                "Register User Error:",
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
// Login User
// =========================================================

router.post(
    "/login",
    async function(
        request,
        response
    ) {

        try {

            // =================================================
            // Get Username And Password
            // =================================================

            const username =
                request.body.username;

            const password =
                request.body.password;


            // =================================================
            // Check Username
            // =================================================

            if (
                !username
            ) {

                return response.status(
                    400
                ).json({

                    message:
                        "Username is required."

                });

            }


            // =================================================
            // Check Password
            // =================================================

            if (
                !password
            ) {

                return response.status(
                    400
                ).json({

                    message:
                        "Password is required."

                });

            }


            // =================================================
            // Find User
            // =================================================

            const user =
                await User.findOne({

                    username:
                        username

                });


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
                        "Invalid username or password."

                });

            }


            // =================================================
            // Compare Password
            // =================================================

            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            // =================================================
            // Password Incorrect
            // =================================================

            if (
                !passwordMatch
            ) {

                return response.status(
                    401
                ).json({

                    message:
                        "Invalid username or password."

                });

            }


            // =================================================
            // Create JWT Token
            // =================================================

            const token =
                jwt.sign(

                    {

                        userId:
                            user._id

                    },

                    process.env.JWT_SECRET,

                    {

                        expiresIn:
                            "7d"

                    }

                );


            // =================================================
            // Login Success
            // =================================================

            return response.status(
                200
            ).json({

                message:
                    "Login successful.",

                token:
                    token,

                userId:
                    user._id,

                username:
                    user.username

            });

        }

        catch (
            error
        ) {

            console.error(
                "Login User Error:",
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