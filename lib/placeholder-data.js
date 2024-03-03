// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        userName: 'Delba',
        email: 'delba@nextmail.com',
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        userName: 'Lee Robinson',
        email: 'lee@robinson.com',
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        userName: 'Hector Simpson',
        email: 'hector@simpson.com',
    },
    {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        userName: 'Steven Tey',
        email: 'steven@tey.com',
    },
    {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        userName: 'Steph Dietz',
        email: 'steph@dietz.com',
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        userName: 'Michael Novotny',
        email: 'michael@novotny.com',
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        userName: 'Evil Rabbit',
        email: 'evil@rabbit.com',
    },
    {
        id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
        userName: 'Emil Kowalski',
        email: 'emil@kowalski.com',
    },
    {
        id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
        userName: 'Amy Burns',
        email: 'amy@burns.com',
    },
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        userName: 'Balazs Orban',
        email: 'balazs@orban.com',
    },
];

const recaps = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        user_id: users[0].id,
        totalLikes: 0,
        totalComments: 0,
        recapTitle: 'NYC Pizza Crawl',
        recapDescription: 'Crawling through New York for the best Pizza slices.',
    },
    {
        id: '95826d4d-0e3c-40b6-b408-c5ca82a18a42',
        user_id: users[0].id,
        totalLikes: 0,
        totalComments: 0,
        recapTitle: 'California Bar Crawl',
        recapDescription: 'Crawling through Cali for the best cocktails.',
    },
    {
        id: 'eb486afc-2d50-4bce-ab48-bc22c47a6482',
        user_id: users[3].id,
        totalLikes: 0,
        totalComments: 0,
        recapTitle: 'Costa Rica 2023',
        recapDescription: 'A recap of where I went to in Costa Rica.',
    },
    {
        id: 'dbd4ddfc-bc26-43d4-9c91-c7aa46dfe862',
        user_id: users[8].id,
        totalLikes: 0,
        totalComments: 0,
        recapTitle: 'NJ Trip',
        recapDescription: 'Here are the places I went to on my NJ trip.',
    },
    {
        id: 'fe4c9dac-b286-4e79-bb53-0b902d31110f',
        user_id: users[9].id,
        totalLikes: 0,
        totalComments: 0,
        recapTitle: 'Norway Baybeeeee',
        recapDescription: 'Saved up for a while for this trip! Here is the breakdown.',
    },
];

const likes = [
    {
        id: '3958dc9e-712f-3477-85e9-fec4b6a6442a',
        recap_id: recaps[0].id,
        user_id: users[0].id,
    },
    {
        id: '5ca69936-1fbe-4922-8885-5e29588ba2a0',
        recap_id: recaps[0].id,
        user_id: users[1].id,
    },
    {
        id: '0d6db351-5051-4a35-9ae1-79fbd85d5ac8',
        recap_id: recaps[0].id,
        user_id: users[2].id,
    },
    {
        id: '5b922ff0-e2a8-4066-84a5-74e4eb160fda',
        recap_id: recaps[1].id,
        user_id: users[3].id,
    },
    {
        id: 'f25abdfe-7d41-46b5-be60-87bc4b663d52',
        recap_id: recaps[1].id,
        user_id: users[4].id,
    },
    {
        id: '163572e2-b0e3-4461-a062-0407ec57c195',
        recap_id: recaps[3].id,
        user_id: users[5].id,
    },
    {
        id: 'fd801b2f-eeb3-48ef-a303-b58cfb994464',
        recap_id: recaps[4].id,
        user_id: users[0].id,
    },
    {
        id: '369efa68-da8e-4e92-9019-eeb8943eb7f2',
        recap_id: recaps[2].id,
        user_id: users[0].id,
    },
    {
        id: 'b8b67594-1e6d-4427-9ed1-65577676a8a4',
        recap_id: recaps[2].id,
        user_id: users[8].id,
    },
    {
        id: '59e5ba1b-e61a-4222-b5f4-86f21644d13e',
        recap_id: recaps[0].id,
        user_id: users[9].id,
    },
];

const comments = [
    {
        id: '99d551f0-88cd-4191-bca7-4a206567e6d9',
        recap_id: recaps[0].id,
        user_id: users[0].id,
        comment: 'I love pizza!',
    },
];
const followers = [
    {
        id: "bca2c4f2-3f08-4a58-9a9f-9991e27c5d0c",
        follower_user_id: users[1].id,
        followed_user_id: users[0].id,
    },
    {
        id: "0570bb5c-02be-4e4c-858f-132108512611",
        follower_user_id: users[2].id,
        followed_user_id: users[0].id,
    },
    {
        id: "f0e55880-6ea5-4169-a414-22a463a99d5a",
        follower_user_id: users[3].id,
        followed_user_id: users[0].id,
    },
    {
        id: "4928515c-518c-4079-a220-2613a625a47f",
        follower_user_id: users[4].id,
        followed_user_id: users[0].id,
    },
    {
        id: "1d6239bf-5f75-41e7-893e-2a5e3139c359",
        follower_user_id: users[5].id,
        followed_user_id: users[0].id,
    },
    {
        id: "02bd13fc-437c-46c9-b14c-275fb76d82ce",
        follower_user_id: users[6].id,
        followed_user_id: users[0].id,
    },
    {
        id: "286f8839-75db-412d-b980-dd689fbd376d",
        follower_user_id: users[7].id,
        followed_user_id: users[0].id,
    },
    {
        id: "5ee242ae-73aa-4a5a-b820-bcd1d3ceb14e",
        follower_user_id: users[0].id,
        followed_user_id: users[1].id,
    },
    {
        id: "e4a6ebb8-f6e7-4834-b0d9-de6cdce9a05d",
        follower_user_id: users[0].id,
        followed_user_id: users[2].id,
    },
    {
        id: "18d39e96-79b1-4054-9dfc-9d23fd710940",
        follower_user_id: users[0].id,
        followed_user_id: users[7].id,
    },
    {
        id: "7eb8188f-e32d-4a59-b17b-17ed82872fcf",
        follower_user_id: users[0].id,
        followed_user_id: users[9].id,
    },

];
const locationsVisited = [
    {
        id: '3958dc9e-712f-3488-85e9-fec4b6a6442a',
        recap_id: recaps[0].id,
        userNotes: 'Supposedly one of the best pizza places in the city and the world. I thought it was average, nothing special like it used to be.',
        locationName: 'Lucali',
        locationCoordinates: '40.681964285254374,-74.00037204646198',
        userLocationRating: 3,
        userAmountSpent: 44,
        userDateVisited: '2022-02-14',
    },
    {
        id: 'c39c98b0-fe22-46d0-9e67-e76f11ee2caa',
        recap_id: recaps[0].id,
        userNotes: `Good, but I've had better tbh.`,
        locationName: 'Scarrs Pizza',
        locationCoordinates: '40.715894542723625,-73.99163295995301',
        userLocationRating: 4,
        userAmountSpent: 24,
        userDateVisited: '2022-02-14',
    },
    {
        id: 'ea7d360f-434d-442b-b5ca-a16d76b13f1d',
        recap_id: recaps[1].id,
        userNotes: 'Great place',
        locationName: 'The Blind Rabbit Bar',
        locationCoordinates: '34.55859744579297,-117.77893013302148',
        userLocationRating: 5,
        userAmountSpent: 30,
        userDateVisited: '2022-02-14',
    },
    {
        id: 'a830018c-0197-4ac6-b7f8-79b882d5e730',
        recap_id: recaps[1].id,
        userNotes: 'Awesome! Good cocks (thats my abbreviation for cocktails)!',
        locationName: 'The Broken Shaker at Freehand',
        locationCoordinates: '40.739903277828155,-73.98435107333255',
        userLocationRating: 5,
        userAmountSpent: 20,
        userDateVisited: '2022-02-14',
    },
    {
        id: 'bf6e3e09-6a1b-4479-8d70-61c60c321b6b',
        recap_id: recaps[2].id,
        userNotes: 'BEAUTIFUL. CANNOT WAIT TO GO BACKKKK!',
        locationName: 'Parque Nacional Rincón de la Vieja',
        locationCoordinates: '10.77420578205667,-85.3499276586552',
        userLocationRating: 5,
        userAmountSpent: 24,
        userDateVisited: '2022-02-14',
    },
    {
        id: '038d7e45-f6f7-4f07-8148-4d085713357a',
        recap_id: recaps[2].id,
        userNotes: 'The best hotel ever. They should shoot a season off the white lotus here tbh.',
        locationName: 'The Four Seasons Hotel, Papagayo',
        locationCoordinates: '10.611690943036452,-85.68846834702073',
        userLocationRating: 5,
        userAmountSpent: 240000,
        userDateVisited: '2022-02-14',
    },
    {
        id: '6cff96f0-4b22-4ba5-993a-ad04cb0efa63',
        recap_id: recaps[3].id,
        userNotes: 'INSANELY GOOD. AMAAAAAHZING',
        locationName: 'Ferraros Pizza',
        locationCoordinates: '40.615448688600885,-74.41848247344866',
        userLocationRating: 4.78,
        userAmountSpent: 34,
        userDateVisited: '2022-02-14',
    },
    {
        id: 'c17b8539-4a30-4871-b5f5-f89d1a95b78a',
        recap_id: recaps[3].id,
        userNotes: 'Its golf, but fun, but expensive and food is meh',
        locationName: 'Top Golf, Edison',
        locationCoordinates: '40.51969863322213,-74.36833004450367',
        userLocationRating: 3.5,
        userAmountSpent: 240,
        userDateVisited: '2022-02-14',
    },
    {
        id: 'a9507f0d-474a-450d-ac88-51472791337f',
        recap_id: recaps[4].id,
        userNotes: 'Go here to be one with nature.',
        locationName: 'Geiranger',
        locationCoordinates: '62.100812018178225,7.206862172273558',
        userLocationRating: 5,
        userAmountSpent: 300,
        userDateVisited: '2022-02-14',
    },
    {
        id: '97c09281-ac54-48c4-afb2-8544ba92ecb2',
        recap_id: recaps[4].id,
        userNotes: 'Tatti place, not worth it.',
        locationName: 'Fana legevaktstasjon',
        locationCoordinates: '60.316474697209486,5.356998522428419',
        userLocationRating: 1,
        userAmountSpent: 2400,
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
