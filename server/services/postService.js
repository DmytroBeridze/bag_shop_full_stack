import fileService from "../fileService/fileService.js";
import PostsSchema from "../models/posts.js";

class Postservice {
  //  create
  async postCreate(post, picture) {
    const modifiedPicture = picture
      ? Array.isArray(picture)
        ? picture
        : [picture]
      : null;

    const fileName = fileService.saveFile(modifiedPicture);
    const createdPost = await PostsSchema.create({
      ...post,
      picture: fileName,
    });
    return createdPost;
  }

  // get
  async postsGet() {
    // throw new Error("Test error");
    const allPosts = await PostsSchema.find();
    return allPosts;
  }

  //get to id
  async postsGetId(id) {
    if (!id) {
      throw new Error("ID not found");
    }
    const postId = await PostsSchema.findById(id);
    return postId;
  }

  // delete
  async deletePost(id, picture) {
    if (!id) {
      throw new Error("Such post does not exist");
    }
    fileService.deleteFile(picture);

    const element = await PostsSchema.findByIdAndDelete(id);
    return element;
  }

  // edit
  async postEdit(element, newPicture) {
    if (!element._id) {
      throw new Error("ID not found");
    }
    const notDeleted = JSON.parse(element.notDeletedPicture);

    const modifiedPicture = newPicture
      ? Array.isArray(newPicture)
        ? newPicture
        : [newPicture]
      : null;

    fileService.deleteFile(JSON.parse(element.deletedPicture));
    const fileName = fileService.saveFile(modifiedPicture);

    const updatedGoods = await PostsSchema.findByIdAndUpdate(element._id, {
      ...element,
      // newPicture: fileName,
      picture: [...fileName, ...notDeleted],

      new: true,
    });
    return updatedGoods;
  }
}
export default new Postservice();
