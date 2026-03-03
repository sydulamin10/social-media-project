import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

const Photos = ({ imageData, imageLoading }) => {
  const [showMore, setShowMore] = useState(false);

  const photosCount = () => {
    const total_count = imageData?.total_count || 0;
    return total_count === 0
      ? "0 Photo"
      : total_count === 1
      ? `${total_count} Photo`
      : `${total_count} Photos`;
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div className="">
            <h3 className="font-Gilroy-Bold text-base text-black-color capitalize">
              Photos
            </h3>
            <span className="font-Gilroy-Medium text-sm text-secondary-color">
              {photosCount()}
            </span>
          </div>
          {imageData?.resources?.length > 4 && (
            <div>
              <button
                onClick={handleShowMore}
                className="font-Gilroy-Bold text-sm text-white-color bg-blue-color px-4 py-2 rounded-md cursor-pointer"
              >
                {showMore ? "Show Less..." : "Show More..."}
              </button>
            </div>
          )}
        </div>
        {imageLoading ? (
          <Skeleton height={160} highlightColor={"#f5f5f5"} />
        ) : (
          <div className="min-h-40 grid grid-cols-2 justify-start items-center gap-2 mt-2">
            {imageData?.resources &&
              imageData?.resources?.length &&
              imageData?.resources
                .slice(0, showMore ? imageData?.resources?.length : 4)
                .map((image, index) => (
                  <img
                    key={image?.asset_id}
                    src={`${image?.secure_url}`}
                    alt="Image"
                    className="h-full w-full object-cover"
                  />
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Photos;
