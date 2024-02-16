const { Post, Community, Comment, User } = require('../schemas/schemas');

exports.addCommunity = async (req, res) => {
  try {
    const { name, description, backgroundImage, logo } = req.body;
    const community = new Community({
      name,
      description,
      backgroundImage,
      logo,
    });
    await community.save();
    res.status(201).json(community);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, author, content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const newComment = new Comment({
      author,
      content,
    });
    await newComment.save(); // Save comment separately
    post.comments.push(newComment._id); // Push comment ID instea
    console.log({ newComment });
    console.log({ post });
    await post.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.patchCommunity = async (req, res) => {
  try {
    const { name, description, backgroundImage, logo, id } = req.body;
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (backgroundImage !== undefined) updateFields.backgroundImage = backgroundImage;
    if (logo !== undefined) updateFields.logo = logo;

    const updatedCommunity = await Community.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedCommunity) {
      return res.status(404).json({ message: 'Community not found' });
    }
    res.status(200).json(updatedCommunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.patchComment = async (req, res) => {
  try {
    const { content, id } = req.body;
    const updateFields = {};
    if (content !== undefined) updateFields.content = content;

    const updatedComment = await Comment.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCommunity = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCommunity = await Community.findByIdAndDelete(id);
    if (!deletedCommunity) {
      return res.status(404).json({ message: 'Community not found' });
    }
    res.status(200).json({ message: 'Community deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addPost = async (req, res) => {
  try {
    const { community, author, title, content, images } = req.body;
    const post = new Post({
      community,
      author,
      title,
      content,
      images,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.patchPost = async (req, res) => {
  try {
    const { title, content, images, id } = req.body;
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (content !== undefined) updateFields.content = content;
    if (images !== undefined) updateFields.images = images;

    const updatedPost = await Post.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('comments');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
