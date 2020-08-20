// const hexo = require('hexo');
const GhostContentAPI = require('@tryghost/content-api');

const ghostSettings = require('../settings.js').ghost;

const api = new GhostContentAPI(ghostSettings);

const ghostPostData = async () => {
  const data = await api.posts
      .browse({
        limit: 'all',
      })
      .catch((err) => {
        console.error(err);
      });

  data.forEach((post) => {
    const postData = {
      title: post.title,
      slug: post.slug,
      path: post.slug,
      date: post.published_at,
      content: post.html,
    };

    hexo.post.create(postData, true);
  });
};

ghostPostData();
