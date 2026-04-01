const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const pageNumbers = [...Array(pages).keys()].map((i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded-md border border-slate-200 bg-white px-3 py-1 text-slate-700 shadow-sm hover:border-[#0077B6] hover:text-[#0077B6] disabled:opacity-50"
        type="button"
      >
        Prev
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`rounded-md px-3 py-1 shadow-sm ${
            page === number
              ? "bg-[#FF7B54] text-white"
              : "border border-slate-200 bg-white text-slate-700 hover:border-[#0077B6] hover:text-[#0077B6]"
          }`}
          type="button"
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="rounded-md border border-slate-200 bg-white px-3 py-1 text-slate-700 shadow-sm hover:border-[#0077B6] hover:text-[#0077B6] disabled:opacity-50"
        type="button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
