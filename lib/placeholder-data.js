// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        userName: 'Delba',
        email: 'delba@nextmail.com',
        followerCount: 0,
        followedCount: 0,
    },
];

const recaps = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        user_id: users[0].id,
        totalLikes: 0,
        totalComments: 0,
        recapTitle: 'Delba\'s Pizza Crawl',
        recapDescription: 'Crawling through New York for the best Pizza slices.',
    },
];

const likes = [
    {
        id: '3958dc9e-712f-3477-85e9-fec4b6a6442a',
        recap_id: recaps[0].id,
        user_id: users[0].id,
    },
];

const comments = [
    {
        id: '3958dc9e-712f-4388-85e9-fec4b6a6442a',
        recap_id: recaps[0].id,
        user_id: users[0].id,
        comment: 'OP: I love pizza!',
    },
];
const followers = [
    {
        // follower_user_id: ,
        // followed_user_id: ,
    },
];
const locationsVisited = [
    {
        id: '3958dc9e-712f-3488-85e9-fec4b6a6442a',
        recap_id: recaps[0].id,
        userNotes: 'This pizza place is know for having the best vegan pizza!',
        locationName: 'Vegan Pizza Place',
        locationCoordinates: '40.7128,74.0060',
        userLocationRating: 4,
        userAmountSpent: 24,
        userDateVisited: '2022-02-14',
    },
];

module.exports = {
    users,
    recaps,
    likes,
    comments,
    followers,
    locationsVisited,
};
