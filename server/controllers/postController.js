import Postservice from "../services/postService.js";

// create
export const createPost = async (req, res) => {
  try {
    const post = await Postservice.postCreate(req.body, req.files?.picture);
    res.status(200).json({ message: "Post created", post });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get
export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Postservice.postsGet(res, req);
    res.json(allPosts);
  } catch (error) {
    res.status(500).json(error.massage);
  }
};

// get to id

export const getPostsId = async (req, res) => {
  try {
    const { id } = req.params;

    const postId = await Postservice.postsGetId(id);
    return res.json(postId);
  } catch (error) {
    res.status(500).json(error.massage);
  }
};

// delete
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { picture } = req.body;
    const element = await Postservice.deletePost(id, picture);
    return res.json({
      post: element,
      message: `Post id: ${id} deleted`,
    });
  } catch (error) {
    res.json(error.massage);
  }
};

// edit post
export const editPost = async (req, res) => {
  try {
    const updatedPost = await Postservice.postEdit(
      req.body,
      req.files?.newPicture
    );

    res.status(200).json({ message: "Post edited", updatedPost });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
