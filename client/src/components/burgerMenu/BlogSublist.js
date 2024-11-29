import BlogNavbarDropdown from "../blogPage/BlogNavbarDropdown";

const BlogSublist = ({ blog, popupMenueHendler, clearMenuState }) => {
  return (
    <div
      className={`burger__list_sublist ${blog && "open-blog"}`}
      onClick={() => {
        popupMenueHendler();
        clearMenuState();
      }}
    >
      <BlogNavbarDropdown />
    </div>
  );
};

export default BlogSublist;
