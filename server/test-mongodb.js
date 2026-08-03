const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
    "mongodb://<db_username>:<db_password>@ac-pwrumgi-shard-00-00.xe8vgfx.mongodb.net:27017,ac-pwrumgi-shard-00-01.xe8vgfx.mongodb.net:27017,ac-pwrumgi-shard-00-02.xe8vgfx.mongodb.net:27017/?ssl=true&replicaSet=atlas-4p5jxe-shard-0&authSource=admin&appName=WhoIsTheWinner";


const client =
    new MongoClient(
        uri,
        {
            serverApi: {

                version:
                    ServerApiVersion.v1,

                strict:
                    true,

                deprecationErrors:
                    true

            }
        }
    );


async function run() {

    try {

        await client.connect();


        await client
            .db("admin")
            .command({
                ping: 1
            });


        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );

    }

    finally {

        await client.close();

    }

}


run().catch(
    console.dir
);