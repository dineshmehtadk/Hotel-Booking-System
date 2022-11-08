import useFetch from "../hooks/useFetch";
import "./featuredProperties.css";

const imgList = [
  "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
]

const FeaturedProperties = () => {

  const {data,loading} = useFetch("http://localhost:4000/api/hotel?featured=true&limit=4");
  const hotels = data.hotels;
 

  return (
    <div className="fp">
      {loading ? "Loading":
      hotels&& hotels.map((item,i)=>
      <div className="fpItem" key={i}>
      <img
        src={imgList[i]}
        alt=""
        className="fpImg"
      />
      <span className="fpName">{item.name}</span>
      <span className="fpCity">{item.city}</span>
      <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
      <div className="fpRating">
        <button>8.9</button>
        <span>Excellent</span>
      </div>
    </div>

      )
      }

    </div>
  );
};

export default FeaturedProperties;
