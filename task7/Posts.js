'use strict';

let posts = [];

for (let i = 1; i <= 40; i++){
    let post = {

        id: i,
        description: 'This is the description of the post nubmer ' + i,
        createdAt: new Date(),
        author: 'Petya Petrovich',
        photoLink: 'https://sun2.beltelecom-by-minsk.userapi.com/Wyr0jJ47KVWRCgUB5OKOywmJxgOZKevUFObSgA/tvECRvo5vbs.jpg',
        hashtags: ['HashTag' + i, 'Alpha-PVE'],
        likes: ['User' + i, 'Alexander Lukashenko', 'Barack Obama']

    };

    posts.push(post);
}