"use strict";

class PostCollection{
    _posts = [];

    constructor(posts){
        this._posts = posts;
    }

    addAll(posts){
        let notValidPosts = [];

        for (let i = 0; i < posts; i++){

            if (PostCollection.validate(posts[i])){
                this._posts.push(posts[i]);
            }
            else {
                notValidPosts.push(posts[i]);
            }
        }

        return notValidPosts;

    }

    clear(){

        this._posts.splice(0, this._posts.splice);

    }

    _filterByProperties(post){
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

    getPage(skip = 0, top = 10, filterConfig){
        let filteredPosts = [];
        if(filterConfig!=undefined){
            filteredPosts = posts.filter(this._filterByProperties, filterConfig);
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

    static validate(post){
        if(post.createdAt == undefined || post.id == undefined || post.author == undefined || post.description == undefined){
            return false;
        }
        if(post.description.length > 200){
            return false;
        }
        return true;
    }

    get(id){
        let post = posts.find(function(item){
            return item.id == id;
        });
        return post;
    }

    add(post){
        if(!PostCollection.validate(post)){
            return false;
        }
        else{
            posts.push(post);
        }
        return true;
    }
    
    remove(id){
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

    edit(id, edits){
        let post = this.get(id);
        let index = posts.findIndex(function(item){
            return item.id == id
        });

        if(post == undefined || PostCollection.validate(post) == false || index == -1){
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
        
        if(PostCollection.validate(editedPost)){
            posts[index] = editedPost;
            return true;
        }
        else{
            return false;
        }

    }
}

    let postCollection = new PostCollection(posts);
    postCollection.clear();
    postCollection.addAll(posts);

    console.log("GetPage default usage");
    console.log(postCollection.getPage());
    console.log("GetPage usage with parameters");
    console.log(postCollection.getPage(5,20));
    console.log("GetPage usage with author filter");
    console.log(postCollection.getPage(0,20,{author: 'Petya Petrovich'} ));
    console.log("GetPage usage with hashtags filter");
    console.log(postCollection.getPage(0,10,{hashtags: ["HashTag2", "Alpha-PVE"]}))
    console.log("Validate function with correct parameters");
    console.log(PostCollection.validate(posts[5]));
    console.log("Validate with incorrect parameters");
    console.log(PostCollection.validate("lolIAmNotAPost"));
    console.log("GetPost function with correct id");
    console.log(postCollection.get(10));
    console.log("GetPost function with incorrect id");
    console.log(postCollection.get(100));
    console.log("Remove with correct id");
    console.log(postCollection.remove(40));
    console.log("Remove with incorrect id");
    console.log(postCollection.remove(100));
    console.log("Add with correct parameter");
    console.log(postCollection.add({
        id: 40,
        description: 'I ve added this post i am a genius',
        createdAt: new Date(),
        author: 'Egor Letov',
        photoLink: 'https://sun2.beltelecom-by-minsk.userapi.com/Wyr0jJ47KVWRCgUB5OKOywmJxgOZKevUFObSgA/tvECRvo5vbs.jpg',
        hashtags: ['HashTagAbles', 'Alpha-PVE'],
        likes: ['User', 'Alexander Lukashenko', 'Barack Obama']
    }));
    console.log("Add with incorrect parameter");
    console.log(postCollection.add("i am so tired of writing CONSOLE.LOG T_T "));
    console.log("Edit with correct paramaters");
    console.log(postCollection.edit('1', { photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg' }));
    console.log(postCollection.get(1));
    console.log("Edit with incorrect parameters");
    console.log(postCollection.edit('69', { photoLink: 'https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg' }));
    console.log(postCollection.edit('3', 'bruh'));