const calculatePagination = (page: number, count: number, total: number) => {
    const totalPages = Math.ceil(total / count);
    
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;
  
    const previousPage = hasPreviousPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
  
    return {
      currentPage: page,
      totalPages: totalPages,
      hasPreviousPage: hasPreviousPage,
      hasNextPage: hasNextPage,
      previousPage: previousPage,
      nextPage: nextPage,
      total: total
    };
  };
  
  export { calculatePagination };
  