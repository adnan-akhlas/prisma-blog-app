export interface IPaginationAndSorting {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

const buildPaginationAndSorting = (queries: any): IPaginationAndSorting => {
  const page = Number(queries.page) || 1;
  const limit = Number(queries.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = queries.sortBy || "createdAt";
  const sortOrder = queries.sortOrder || "desc";

  return { page, limit, skip, sortBy, sortOrder };
};

export default buildPaginationAndSorting;
