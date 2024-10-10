import "./sort.scss";

const Sort = ({
  setStep,
  step,
  posts,
  setFirstIndex,
  onChangeQuantityPostsToPage,
  onChangeDisplayPostsToDate,
}) => {
  return (
    <div className="blog__sort">
      <button
        className="blog__show-all"
        onClick={() => {
          setStep(posts.length);
          setFirstIndex(0);
        }}
      >
        all
      </button>

      <select
        className="blog__select form-select "
        aria-label="Small select example"
        value={step}
        onChange={(e) => onChangeQuantityPostsToPage(e)}
      >
        <option value="" hidden>
          qantity per page
        </option>
        <option value="3">3 per page</option>
        <option value="4">4 per page</option>
        <option value="5">5 per page</option>
        <option value="6">6 per page</option>
        <option value="8">8 per page</option>
      </select>

      <select
        className="blog__select form-select "
        aria-label="Small select example"
        onChange={(e) => onChangeDisplayPostsToDate(e)}
      >
        <option value="" hidden>
          sort by date
        </option>
        <option value="1">new first</option>
        <option value="2"> old first</option>
      </select>
    </div>
  );
};

export default Sort;
