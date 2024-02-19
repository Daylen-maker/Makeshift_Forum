const { Post, Community, Comment } = require('../schemas/schemas');

// Get Methods
exports.getCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { communityId } = req.body;
    let query = {};
    if (communityId) {
      query.communityId = communityId;
    }
    const posts = await Post.find(query);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: 'postId is required' });
    }
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Methods
exports.addCommunity = async (req, res) => {
  try {
    let { name, description, backgroundImage, logo } = req.body;
    if (!logo) {
      logo = 'https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png';
    }
    if (!backgroundImage) {
      backgroundImage = 'https://t3.ftcdn.net/jpg/03/18/13/92/360_F_318139202_s4F1cp8hP5U3YpZmHLjozJHTebmj5Pbo.jpg';
    }
    const community = new Community({
      name,
      description,
      backgroundImage,
      logo,
    });
    await community.save();
    res.status(201).json({ message: 'success', communityId: community._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addPost = async (req, res) => {
  try {
    const { communityId, author, title, content, images } = req.body;
    const post = new Post({
      communityId,
      author,
      title,
      content,
      images,
    });
    await post.save();
    res.status(201).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, author, comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }
    let newComment = new Comment({
      postId,
      author,
      comment,
    });

    await newComment.save();
    res.status(201).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Methods
exports.deleteCommunity = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCommunity = await Community.findByIdAndDelete(id);
    if (!deletedCommunity) {
      return res.status(404).json({ message: 'Community not found' });
    }
    res.status(200).json({ message: 'success' });
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
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedComment = await Comment.findByIdAndRemove(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Patch Methods
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
    res.status(200).json({ message: 'success' });
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
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.patchComment = async (req, res) => {
  try {
    const { comment, id } = req.body;
    const updateFields = {};
    if (comment !== undefined) updateFields.comment = comment;

    const updatedComment = await Comment.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
