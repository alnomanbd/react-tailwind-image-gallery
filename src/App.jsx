import { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import { Oval } from "react-loader-spinner";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    term
  )}&image_type=photo&page=${currentPage}&pretty=true`;

  useEffect(() => {
    setIsLoading(true); // Start loading whenever the term or current page is updated
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setTotalPages(Math.ceil(data.totalHits / 20)); // Assuming 20 results per page
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Stop loading on error
      });
  }, [term, currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Generate pagination range with 5 buttons
  const generatePagination = () => {
    const paginationRange = [];
    const rangeSize = 2; // How many pages to show on each side of the current page

    // Case 1: Pages are at the start
    if (currentPage <= rangeSize + 2) {
      for (let i = 1; i <= Math.min(totalPages, rangeSize * 2 + 3); i++) {
        paginationRange.push(i);
      }
    }
    // Case 2: Pages are at the end
    else if (currentPage >= totalPages - rangeSize - 1) {
      for (let i = totalPages - (rangeSize * 2 + 2); i <= totalPages; i++) {
        paginationRange.push(i);
      }
    }
    // Case 3: Middle pages
    else {
      paginationRange.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return paginationRange;
  };

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {/* Show message if no images are found */}
      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
      )}

      {/* Show loading spinner while fetching */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-32">
          <Oval
            height="80"
            width="80"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            ariaLabel="oval-loading"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-teal-500 text-white px-4 py-2 rounded-l-md disabled:bg-gray-300"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {generatePagination().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== "..." && handlePageChange(page)}
            disabled={page === "..."}
            className={`px-4 py-2 rounded-md ${
              page === currentPage
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-black"
            } ${page === "..." ? "bg-transparent text-gray-500" : ""}`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-teal-500 text-white px-4 py-2 rounded-r-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
