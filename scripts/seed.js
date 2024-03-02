const { db } = require('@vercel/postgres');
const {
    users,
    recaps,
    likes,
    comments,
    followers,
    locationsVisited,
} = require('../app/lib/placeholder-data.js');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        userName VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        followerCount INT NOT NULL,
        followedCount INT NOT NULL
      );
    `;

        console.log(`Created "users" table`);

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                return client.sql`
        INSERT INTO users (id, userName, email, followerCount, followedCount)
        VALUES (${user.id}, ${user.userName}, ${user.email}, ${user.followerCount}}, ${user.followedCount})
        ON CONFLICT (id) DO NOTHING;
      `;
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
    recapDescription VARCHAR(255) NOT NULL
  );
`;

        console.log(`Created "recap" table`);

        const insertedRecaps = await Promise.all(
            recaps.map(
                (recap) => client.sql`
        INSERT INTO recaps (user_id, totalLikes, totalComments, recapTitle, recapDescription)
        VALUES (${recap.user_id}, ${recap.totalLikes}, ${recap.totalComments}, ${recap.recapTitle}, ${recap.recapDescription})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
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
        recap_id INT NOT NULL,
        user_id INT NOT NULL
      );
    `;

        console.log(`Created "likes" table`);

        const insertedLikes = await Promise.all(
            likes.map(
                (like) => client.sql`
        INSERT INTO likes (id, recap_id, user_id)
        VALUES (${like.id}, ${like.recap_id}, ${like.recap_id})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
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
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recap_id INT NOT NULL,
        user_id INT NOT NULL,
        comment VARCHAR(225) NOT NULL
      );
    `;

        console.log(`Created "comments" table`);

        const insertedComments = await Promise.all(
            comments.map(
                (comment) => client.sql`
        INSERT INTO comments (recap_id, user_id, comment)
        VALUES (${comment.recap_id}, ${comment.user_id}, ${comment.comment})
        ON CONFLICT (month) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedComments.length} comments`);

        return {
            createTable,
            revenue: insertedComments,
        };
    } catch (error) {
        console.error('Error seeding comments:', error);
        throw error;
    }
}
async function seedFollowers(client) {
    try {

        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS followers (
        follower_user_id INT NOT NULL, 
        followed_user_id INT NOT NULL,
      );
    `;

        console.log(`Created "comments" table`);

        const insertedFollowers = await Promise.all(
            followers.map(
                (follower) => client.sql`
        INSERT INTO followers (follower_user_id, followed_user_id)
        VALUES (${follower.follower_user_id}, ${follower.followed_user_id})
        ON CONFLICT (month) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedFollowers.length} comments`);

        return {
            createTable,
            revenue: insertedFollowers,
        };
    } catch (error) {
        console.error('Error seeding comments:', error);
        throw error;
    }
}
async function seedLocationsVisited(client) {
    try {
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS locationsVisited (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        recap_id INT NOT NULL,
        userNotes VARCHAR(225) NOT NULL,
        locationName VARCHAR(225) NOT NULL,
        locationCoordinates VARCHAR(225) NOT NULL,
        userLocationRating INT,
        userAmountSpent INT,
        userDateVisited DATE
      );
    `;

        console.log(`Created "locationsVisited" table`);

        const insertedLocationsVisited = await Promise.all(
            locationsVisited.map(
                (location) => client.sql`
        INSERT INTO comments (recap_id, user_id, userNotes, locationName, locationCoordinates, userLocationRating, userAmountSpent, userDateVisited)
        VALUES (${location.recap_id}, ${location.userNotes}, ${location.locationName}, ${location.locationCoordinates}, ${location.userLocationRating}, ${location.userAmountSpent}, ${location.userDateVisited})
        ON CONFLICT (month) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${locationsVisited.length} locationsVisited`);

        return {
            createTable,
            revenue: locationsVisited,
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
    await seedLikes(client);
    await seedComments(client);
    await seedFollowers(client);
    await seedLocationsVisited(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
