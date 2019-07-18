// Dummy Database
// const post1 = {
//   id: 1,
//   title: 'POST TITLE 1',
//   body: 'BODY HERE'
// };
// const post2 = {
//   id: 2,
//   title: 'POST TITLE 2',
//   body: 'BODY 2 HERE'
// };
// const post3 = {
//   id: 3,
//   title: 'POST TITLE 3',
//   body: 'BODY 3 HERE'
// };

// const allPosts = [post1, post2, post3];

module.exports = {
  posts: async function(req, res) {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (err) {
      res.serverError(err.toString());
    }
    // Post.find().exec((err, posts) => {
    //   if (err) {
    //     return res.serverError(err.toString());
    //   }
    //   res.send(posts);
    // });
  },

  create: function(req, res) {
    const title = req.body.title;
    const postBody = req.body.postBody;
    sails.log.debug('My title: ' + title);
    sails.log.debug('My body: ' + postBody);

    Post.create({title: title, body: postBody}).exec((err) => {
      if (err) {
        return res.serverError(err.toString());
      }
      console.log('Finished creating post object');
      return res.redirect('/home');
      // return res.end();
    });
  },

  findById: function(req, res) {
    const postId = req.param('postId');
    // eslint-disable-next-line semi
    const filteredPosts = allPosts.filter(p => {return p.id == postId});

    if (filteredPosts.length > 0) {
      res.send(filteredPosts[0]);
    } else {
      res.send('Failed to find post by id: ' + postId);
    }
  },

  delete: async function(req, res) {
    const postId = req.param('postId');
    await Post.destroy({id: postId});
    res.send('Successfully Deleted post');
  }
};
