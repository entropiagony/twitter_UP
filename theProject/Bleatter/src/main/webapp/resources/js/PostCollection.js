"use strict";

class PostCollection {
    _posts = [];

    constructor(posts) {
        this._posts = posts;
    }

    addAll(posts) {
        let notValidPosts = [];

        for (let i = 0; i < posts; i++) {

            if (PostCollection.validate(posts[i])) {
                this._posts.push(posts[i]);
            } else {
                notValidPosts.push(posts[i]);
            }
        }

        return notValidPosts;

    }

    clear() {

        this._posts.splice(0, this._posts.splice);

    }

    _filterByProperties(post) {
        let properties = Object.keys(this);
        for (let i = 0; i < properties.length; i++) {
            if (!Array.isArray(this[properties[i]])) {
                if (this[properties[i]] != post[properties[i]]) {
                    return false;
                }
            } else {
                if (this[properties[i]].length != post[properties[i]].length) {
                    return false;
                }
                for (let k = 0; k < this[properties[i]].length; k++) {
                    if (this[properties[i]][k] != post[properties[i]][k]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    getPage(skip = 0, top = 10, filterConfig) {
        let filteredPosts = [];
        if (filterConfig != undefined) {
            filteredPosts = posts.filter(this._filterByProperties, filterConfig);
        } else {
            filteredPosts = posts;
        }
        filteredPosts.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        filteredPosts = filteredPosts.filter(function (post, index) {
            if (index < skip || index >= skip + top) {
                return false;
            }
            return true;
        })
        return filteredPosts;
    }

    static validate(post) {
        if (post.createdAt == undefined || post.id == undefined || post.author == undefined || post.description == undefined) {
            return false;
        }
        if (post.description.length > 200) {
            return false;
        }
        return true;
    }

    get(id) {
        let post = posts.find(function (item) {
            return item.id == id;
        });
        return post;
    }

    add(post) {
        if (!PostCollection.validate(post)) {
            return false;
        } else {
            posts.push(post);
        }
        return true;
    }

    remove(id) {
        let index = posts.findIndex(function (item) {
            return item.id == id
        });
        if (index == -1) {
            return false;
        } else {
            posts.splice(index, 1);
        }
        return true;
    }

    edit(id, edits) {
        let post = this.get(id);
        let index = posts.findIndex(function (item) {
            return item.id == id
        });

        if (post == undefined || PostCollection.validate(post) == false || index == -1) {
            return false;
        }

        let editedPost = post;

        if (edits instanceof Object) {
            if ('description' in edits) {
                editedPost.text = edits.text;
            }

            if ('hashtags' in edits) {
                editedPost.hashtags = edits.hashtags;
            }

            if ('photoLink' in edits) {
                editedPost.photoLink = edits.photoLink;
            }
        } else {
            return false;
        }

        if (PostCollection.validate(editedPost)) {
            posts[index] = editedPost;
            return true;
        } else {
            return false;
        }

    }
}