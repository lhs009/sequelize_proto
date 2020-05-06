const express = require('express');
const { Op } = require('sequelize');
const { sequelize, User, Post, Image } = require('./models');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

sequelize
  .sync()
  .then(() => {
    console.log('✓ DB connection success.');
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

app.get('/', async (req, res) => {
  try {
    // let where = {};
    // if (parseInt(req.query.lastId, 10)) {
    //   where = {
    //     id: {
    //       [Op.lt]: parseInt(req.query.lastId, 10), // less than
    //     },
    //   };
    //}
    const posts = await Post.findAll({
      where: {
        postId: {
          [Op.gt]: 0,
        },
      },
      attributes: ['postId', 'content'],
      include: [
        {
          model: User,
          attributes: ['userId', 'nickname'],
        },
        {
          model: Image,
          attributes: ['imageId', 'src'],
        },
        {
          model: User,
          through: 'likes',
          as: 'likers',
          attributes: ['userId'],
        },
        {
          model: Post,
          as: 'retweets',
          include: [
            {
              model: User,
              attributes: ['userId', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
      order: [['createdAt', 'ASC']], // DESC는 내림차순, ASC는 오름차순
      // limit: parseInt(req.query.limit, 10),
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(503).json(e);
  }
});

// app.get('/users', async (req, res) => {
//   try {
//     const result = await User.findAll();
//     console.log(result);
//     res.json(result);
//   } catch (error) {
//     res.status(503).json(error);
//   }
// });

app.get('/users', async (req, res) => {
  try {
    const result = await User.findAndCountAll({
      where: {
        userId: {
          [Op.gt]: 0,
        },
      },
      order: [
        ['userId', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      offset: 0,
      limit: 100,
    });
    // const data = result.toJSON();
    // console.log(result.count, result.rows);
    // console.log(result.toJSON());
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(503).json(error);
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await User.findOne({ where: { userId } });
    console.log(result.toJSON());
    res.json(result);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.post('/users', async (req, res) => {
  const { loginId, password, nickname } = req.body;

  try {
    const result = await User.create({ loginId, password, nickname });
    res.status(201).json({ created: result.toJSON().userId });
  } catch (error) {
    res.status(503).json(error);
  }
});

app.put('/users/:id', async (req, res) => {
  const { nickname } = req.body;
  const userId = req.params.id;
  console.log(userId, nickname);

  try {
    const result = await User.update({ nickname }, { where: { userId } });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await User.destroy({ where: { userId } });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.post('/posts', async (req, res) => {
  const { userId, content } = req.body;
  if (!userId || !content) {
    return res.status(401).json({ error: 'Invalid Parameters' });
  }

  try {
    const result = await Post.create({ userId, content });
    res.status(201).json({ created: result.toJSON().postId });
  } catch (error) {
    res.status(503).json(error);
  }
});

app.post('/posts/:id/likes', async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findOne({ where: { postId } });
    if (!post) {
      return res.status(404).json({ result: 'not found post' });
    }
    await post.addLiker(userId);
    res.json({ userId });
  } catch (e) {
    console.error(e);
    res.status(503).json(e);
  }
});

app.listen(3000, () => console.log(`listening at http://localhost:3000`));
