import React from "react";

const ImageCard = ({ image }) => {
  const tags = image.tags.split(",");

  return (
    <div className="w-72 h-[28rem] bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 duration-300 flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-200">
        <img
          src={image.webformatURL}
          alt="Image Preview"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="flex-grow flex flex-col justify-between p-4">
        <div>
          <h2 className="font-bold text-purple-600 text-lg mb-2 truncate">
            Photo by {image.user}
          </h2>
          <ul className="text-gray-700 text-sm mb-4">
            <li>
              <strong>Views: </strong>
              {image.views}
            </li>
            <li>
              <strong>Downloads: </strong>
              {image.downloads}
            </li>
            <li>
              <strong>Likes: </strong>
              {image.likes}
            </li>
          </ul>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full"
              style={{ minWidth: "fit-content" }} // Prevent tags from overlapping
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
