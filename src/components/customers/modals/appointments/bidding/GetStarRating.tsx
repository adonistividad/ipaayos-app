import StarRatings from "react-star-ratings";

export const GetStarRating = (provider: any) => {
    return (
      <>
        {parseInt("0" + provider.reviews) !== 0
          ? provider.rating.toFixed(1).toString()
          : ""}{" "}
        <StarRatings
          rating={provider.rating}
          starRatedColor="#ffbe28"
          starHoverColor="yellow"
          starDimension="11px"
          starSpacing="0px"
          name="rating"
        />
        {parseInt("0" + provider.reviews) !== 0 && (
          <> {provider.reviews} reviews</>
        )}{" "}
      </>
    );
  };