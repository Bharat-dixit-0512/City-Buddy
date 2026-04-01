import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cards from "./cards/Cards";
import Spinner from "./shared/Spinner";
import DetailsModal from "./DetailsModal";
import { getCached } from "../services/api";

const slides = [
  {
    src: "/cityWallpaper.jpg",
    alt: "A bright city skyline at sunset",
  },
  {
    src: "https://w0.peakpx.com/wallpaper/371/290/HD-wallpaper-blue-neon-city-landscape.jpg",
    alt: "A blue neon city skyline at night",
  },
  {
    src: "/cityWallpaper2.jpg",
    alt: "A modern city skyline with warm evening lights",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeData, setHomeData] = useState({
    topRatedPlaces: [],
    newlyAddedPlaces: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHomeData = async () => {
      try {
        const data = await getCached("/home", {
          ttl: 5 * 60_000,
          signal: controller.signal,
        });
        setHomeData(data);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error("Failed to fetch homepage data", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            alt={slide.alt}
            className={`absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            onError={(event) => {
              event.currentTarget.src = "/cityWallpaper.jpg";
            }}
            src={slide.src}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-6 text-center text-white">
          <h1 className="mb-6 text-4xl font-extrabold text-[#FFD60A] md:text-6xl">
            Discover Your Next{" "}
            <span className="animate-pulse text-[#FF7B54]">Adventure</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            Discover trusted stays, charming cafes, and must-see attractions.
            CityBuddy curates your perfect journey.
          </p>
          <NavLink to="/restaurants">
            <button className="rounded-full bg-[#FF7B54] px-8 py-3 font-semibold text-white shadow-lg hover:bg-[#E85D04]">
              Start Exploring
            </button>
          </NavLink>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <section>
              <h2 className="mb-8 text-center text-3xl font-bold">
                Top Rated Places
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {homeData.topRatedPlaces.map((item) => (
                  <Cards
                    key={item._id}
                    item={item}
                    onItemClick={setSelectedItem}
                  />
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-8 text-center text-3xl font-bold">
                Newly Added
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {homeData.newlyAddedPlaces.map((item) => (
                  <Cards
                    key={item._id}
                    item={item}
                    onItemClick={setSelectedItem}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Home;
