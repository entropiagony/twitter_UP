'use strict';

(function() {

    function filterByProperties(post){
        let properties = Object.keys(this);
        for(let i = 0; i < properties.length; i++ ){
             if(!Array.isArray(this[properties[i]])){
                 if(this[properties[i]] != post[properties[i]]){
                     return false;
                 }
             }
             else{
                 if(this[properties[i]].length != post[properties[i]].length){
                     return false;
                 }
                 for(let k = 0; k < this[properties[i]].length; k++){
                     if(this[properties[i]][k] != post[properties[i]][k]){
                         return false;
                     }
                 }
             }
        }
        return true;
    }

    function getPosts(skip = 0, top = 10, filterConfig){
        let filteredPosts = [];
        if(!filterConfig){
            filteredPosts = posts.filter(filterByProperties, filterConfig);
        }
        else{
            filteredPosts = posts;
        }
        filteredPosts.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });
        
        filteredPosts = filteredPosts.filter(function(post,index){
            if(index < skip || index >= skip + top){
                return false;
            }
            return true;
        })
        return filteredPosts;
    }

    function validatePost(post){
        if(post.createdAt == undefined || post.id == undefined || post.author == undefined || post.description == undefined){
            return false;
        }
        if(post.description.length > 200){
            return false;
        }
        return true;
    }

    function getPost(id){
        let post = posts.find(function(item){
            return item.id == id;
        });
        return post;
    }

    function addPost(post){
        if(!validatePost(post)){
            return false;
        }
        else{
            posts.push(post);
        }
        return true;
    }
    
    function removePost(id){
        let index = posts.findIndex(function(item){
            return item.id == id
        });
        if(index == -1){
            return false;
        }
        else{
            posts.splice(index, 1);
        }
        return true;
    }

    function editPost(id, edits){
        let post = getPost(id);
        let index = posts.findIndex(function(item){
            return item.id == id
        });

        if(!post || !validatePost(post) || index == -1){
            return false;
        }

        let editedPost = post;

        if(edits instanceof Object){
            if ('description' in edits){
                editedPost.text = edits.text;
            }

            if('hashtags' in edits){
                editedPost.hashtags = edits.hashtags;
            }

            if('photoLink' in edits){
                editedPost.photoLink = edits.photoLink;
            }
        }
        else{
            return false;
        }
        
        if(validatePost(editedPost)){
            posts[index] = editedPost;
            return true;
        }
        else{
            return false;
        }
    }

    console.log("List of all posts:");
    console.log(posts);
    console.log("GetPosts default usage");
    console.log(getPosts());
    console.log("GetPosts usage with parameters");
    console.log(getPosts(5,20));
    console.log("GetPosts usage with author filter");
    console.log(getPosts(0,20,{author: 'Petya Petrovich'} ));
    console.log("GetPosts usage with hashtags filter");
    console.log(getPosts(0,10,{hashtags: ["HashTag2", "Alpha-PVE"]}))
    console.log("ValidatePost function with correct parameters");
    console.log(validatePost(posts[5]));
    console.log("ValidatePost with incorrect parameters");
    console.log(validatePost("lolIAmNotAPost"));
    console.log("GetPost function with correct id");
    console.log(getPost(10));
    console.log("GetPost function with incorrect id");
    console.log(getPost(100));
    console.log("RemovePost with correct id");
    console.log(removePost(40));
    console.log("Deleted post");
    console.log(posts[39]);
    console.log("RemovePost with incorrect id");
    console.log(removePost(100));
    console.log("AddPost with correct parameter");
    console.log(addPost({
        id: 40,
        description: 'I ve added this post i am a genius',
        createdAt: new Date(),
        author: 'Egor Letov',
        photoLink: 'https://sun2.beltelecom-by-minsk.userapi.com/Wyr0jJ47KVWRCgUB5OKOywmJxgOZKevUFObSgA/tvECRvo5vbs.jpg',
        hashtags: ['HashTagAbles', 'Alpha-PVE'],
        likes: ['User', 'Alexander Lukashenko', 'Barack Obama']
    }));
    console.log(posts[39]);
    console.log("AddPost with incorrect parameter");
    console.log(addPost("i am so tired of writing CONSOLE.LOG T_T "));
    console.log("EditPost with correct paramaters");
    console.log(editPost('1', { photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg' }));
    console.log(getPost(1));
    console.log("EditPost with incorrect parameters");
    console.log(editPost('69', { photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg' }));
    console.log(editPost('3', 'bruh'));
}());
