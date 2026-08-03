// =========================================================
// Register
// =========================================================

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        async function(event) {

            // =================================================
            // Prevent Page Refresh
            // =================================================

            event.preventDefault();


            // =================================================
            // Get Input
            // =================================================

            const username =
                document.getElementById(
                    "username"
                ).value;


            const password =
                document.getElementById(
                    "password"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            // =================================================
            // Check Password
            // =================================================

            if (
                password !==
                confirmPassword
            ) {

                message.textContent =
                    "Passwords do not match.";

                return;

            }


            // =================================================
            // Send Register Request
            // =================================================

            try {

                const response =
                    await fetch(
                        "http://localhost:3000/api/users/register",
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    username:
                                        username,

                                    password:
                                        password

                                })

                        }
                    );


                // =================================================
                // Get Server Response
                // =================================================

                const data =
                    await response.json();


                // =================================================
                // Register Failed
                // =================================================

                if (
                    !response.ok
                ) {

                    message.textContent =
                        data.message;

                    return;

                }


                // =================================================
                // Register Success
                // =================================================

                message.textContent =
                    data.message;


                // =================================================
                // Go To Login
                // =================================================

                setTimeout(
                    function() {

                        window.location.href =
                            "login.html";

                    },
                    1000
                );

            }

            catch (
                error
            ) {

                console.error(
                    "Register Error:",
                    error
                );


                message.textContent =
                    "Unable to connect to server.";

            }

        }
    );


// =========================================================
// Back To Login
// =========================================================

function goBackToLogin() {

    window.location.href =
        "login.html";

}