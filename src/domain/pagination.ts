export type PaginationQuery = {
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  to: number;
  total: number;
};

export type PaginationRequest = {
  page?: number;
  pageSize?: number;
};
