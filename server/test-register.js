// =========================================================
// Test Register User
// =========================================================

async function registerUser() {

    try {

        const response =
            await fetch(
                "https://who-is-the-winner-imdt.onrender.com/api/users/register",
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
                                "TestUser",

                            password:
                                "123456"

                        })

                }
            );


        const data =
            await response.json();


        console.log(
            "Status:",
            response.status
        );


        console.log(
            "Response:",
            data
        );

    }

    catch (
        error
    ) {

        console.error(
            "Register Test Failed:",
            error
        );

    }

}


registerUser();