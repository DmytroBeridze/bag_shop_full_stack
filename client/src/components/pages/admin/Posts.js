import AddPostsForm from "../../adminPanel/addPostsForm/AddPostsForm";
import DisplayPosts from "../../adminPanel/displayPosts/DisplayPosts";

const Posts = ({ getTargetId, imageModal }) => {
  return (
    <section className="admin">
      <div className="admin__posts-container ">
        <DisplayPosts getTargetId={getTargetId} imageModal={imageModal} />
        <AddPostsForm />
      </div>
    </section>
  );
};

export default Posts;
