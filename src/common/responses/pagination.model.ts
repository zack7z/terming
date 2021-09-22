export class PaginationModel<T> {
  data: T[];
  pagination: Pagination;
}

export class ApiPaginationModel<T> {
  data: any[];
  pagination: Pagination;
}

class Pagination {
  currentPage: number;
  perPage: number;
  totalPage: number;
  nextLink: string;
  prevLink: string;
}
