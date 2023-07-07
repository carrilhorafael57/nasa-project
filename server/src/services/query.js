const DEFAULT_PAGE_NUMBER = 1;
//mongoose returns all docs if limit is set to 0
const DEFAULT_LIMIT_NUMBER = 0;

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_LIMIT_NUMBER;

  //skipping based on page
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
