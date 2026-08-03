const express =
    require("express");

const mongoose =
    require("mongoose");

const cors =
    require("cors");

const dotenv =
    require("dotenv");

const userRoute =
    require("./routes/userRoute");

const communityRoute =
    require("./routes/communityRoute");

const storageRoute =
    require("./routes/storageRoute");

dotenv.config();


const app =
    express();


app.use(
    cors()
);


app.use(
    express.json()
);

app.use(
    "/api/users",
    userRoute
);

app.use(
    "/api/community",
    communityRoute
);

app.use(
    "/api/storage",
    storageRoute
);


mongoose.connect(
    process.env.MONGODB_URI
)
.then(
    function() {

        console.log(
            "MongoDB Connected"
        );

    }
)
.catch(
    function(error) {

        console.error(
            "MongoDB Connection Failed:",
            error
        );

    }
);


app.get(
    "/",
    function(
        request,
        response
    ) {

        response.json({

            message:
                "WhoIsTheWinner API is running."

        });

    }
);


const PORT =
    process.env.PORT ||
    3000;


app.listen(
    PORT,
    function() {

        console.log(
            "Server running on port " +
            PORT
        );

    }
);