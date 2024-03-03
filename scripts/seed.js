const { db } = require('@vercel/postgres');
const {
    users,
    recaps,
    likes,
    comments,
    followers,
    locationsVisited,
} = require('../lib/placeholder-data');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE);`;

        console.log(`Created "users" table`);

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                return client.sql`
                INSERT INTO users (id, username, email)
                VALUES (${user.id}, ${user.userName}, ${user.email})
                ON CONFLICT (id) DO NOTHING;`;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedRecaps(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS recaps (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        totalLikes INT NOT NULL,
        totalComments INT NOT NULL,
        recapTitle VARCHAR(255) NOT NULL,
        recapDescription VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
        );`;

        console.log(`Created "recap" table`);

        const insertedRecaps = await Promise.all(
            recaps.map((recap) => client.sql`
                INSERT INTO recaps (id, user_id, totalLikes, totalComments, recapTitle, recapDescription)
                VALUES (${recap.id}, ${recap.user_id}, ${recap.totalLikes}, ${recap.totalComments}, ${recap.recapTitle}, ${recap.recapDescription})
                ON CONFLICT (id) DO NOTHING;`
            )
        );

        console.log(`Seeded ${insertedRecaps.length} recaps`);

        return {
            createTable,
            invoices: insertedRecaps,
        };
    } catch (error) {
        console.error('Error seeding recap:', error);
        throw error;
    }
}

async function seedLikes(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS likes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recap_id UUID NOT NULL,
        user_id UUID NOT NULL,
        FOREIGN KEY (recap_id) REFERENCES recaps(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
        );`;

        console.log(`Created "likes" table`);

        const insertedLikes = await Promise.all(
            likes.map((like) => client.sql`
                INSERT INTO likes (id, recap_id, user_id)
                VALUES (${like.id}, ${like.recap_id}, ${like.user_id})
                ON CONFLICT (id) DO NOTHING;`
            )
        );

        console.log(`Seeded ${insertedLikes.length} likes`);

        return {
            createTable,
            customers: insertedLikes,
        };
    } catch (error) {
        console.error('Error seeding likes:', error);
        throw error;
    }
}

async function seedComments(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS comments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recap_id UUID NOT NULL,
        user_id UUID NOT NULL,
        comment VARCHAR(225) NOT NULL,
        FOREIGN KEY (recap_id) REFERENCES recaps(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
        );`;

        console.log(`Created "comments" table`);

        const insertedComments = await Promise.all(
            comments.map((comment) => client.sql`
                INSERT INTO comments (id, recap_id, user_id, comment)
                VALUES (${comment.id}, ${comment.recap_id}, ${comment.user_id}, ${comment.comment})
                ON CONFLICT (id) DO NOTHING;`
            )
        );

        console.log(`Seeded ${insertedComments.length} comments`);

        return {
            createTable,
            insertedComments,
        };
    } catch (error) {
        console.error('Error seeding comments:', error);
        throw error;
    }
}

async function seedFollowers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS followers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        follower_user_id UUID NOT NULL, 
        followed_user_id UUID NOT NULL,
        FOREIGN KEY (follower_user_id) REFERENCES users(id),
        FOREIGN KEY (followed_user_id) REFERENCES users(id)
        );`;

        console.log(`Created "followers" table`);

        const insertedFollowers = await Promise.all(
            followers.map((follower) => client.sql`
                INSERT INTO followers (id, follower_user_id, followed_user_id)
                VALUES (${follower.id}, ${follower.follower_user_id}, ${follower.followed_user_id})
                ON CONFLICT (id) DO NOTHING;`
            )
        );

        console.log(`Seeded ${insertedFollowers.length} followers`);

        return {
            createTable,
            insertedFollowers,
        };
    } catch (error) {
        console.error('Error seeding followers:', error);
        throw error;
    }
}
async function seedLocationsVisited(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS locationsVisited (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recap_id UUID NOT NULL,
        userNotes VARCHAR(500) NOT NULL,
        locationName VARCHAR(225) NOT NULL,
        locationCoordinates VARCHAR(225) NOT NULL,
        userLocationRating FLOAT,
        userAmountSpent INT,
        userDateVisited DATE,
        FOREIGN KEY (recap_id) REFERENCES recaps(id)
        );`;

        console.log(`Created "locationsVisited" table`);

        const insertedLocationsVisited = await Promise.all(
            locationsVisited.map((location) => client.sql`
                INSERT INTO locationsVisited (id, recap_id, userNotes, locationName, locationCoordinates, userLocationRating, userAmountSpent, userDateVisited)
                VALUES (${location.id}, ${location.recap_id}, ${location.userNotes}, ${location.locationName}, ${location.locationCoordinates}, ${location.userLocationRating}, ${location.userAmountSpent}, ${location.userDateVisited})
                ON CONFLICT (id) DO NOTHING;`
            )
        );

        console.log(`Seeded ${insertedLocationsVisited.length} locationsVisited`);

        return {
            createTable,
            insertedLocationsVisited,
        };
    } catch (error) {
        console.error('Error seeding locationsVisited:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedRecaps(client);
    await seedFollowers(client);
    await seedComments(client);
    await seedLocationsVisited(client);
    await seedLikes(client);

    await client.end();
    // drop table users, recaps, comments
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
