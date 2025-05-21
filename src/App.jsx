import { CiSearch } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import Swal from "sweetalert2";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("alexandria");

  const fetchWeatherData = async () => {
    if (!location) return;

    setIsLoading(true);
    try {
      const apiKey = "d469d0f837bef7c55f62633c8bd4b2b2";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      const res = await axios.get(url);
      setWeatherData(res.data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      Swal.fire({
        title: "City not found!",
        icon: "error",
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-[#f3b07c] flex items-center justify-center p-4">
      <div className="p-4 rounded-2xl bg-[#f3b07c] w-full max-w-sm shadow-2xl border border-[#a89494] flex flex-col items-center gap-4">
        {isLoading ? (
          <Skeleton width={120} />
        ) : (
          <div className="w-full flex gap-2 items-center">
            <FaLocationDot className="text-[#605d80] text-xl" />
            <p className="text-[#605d80] font-medium text-base">
              {weatherData?.name}, {weatherData?.sys?.country}
            </p>
          </div>
        )}

        <div className="relative w-full flex items-center">
          <input
            type="search"
            placeholder="Search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchWeatherData();
              }
            }}
            className="p-3 pr-3 outline-0 border border-gray-500 bg-white rounded-2xl w-full text-sm"
          />
          <CiSearch
            onClick={fetchWeatherData}
            className="absolute top-[14px] right-9 text-xl text-gray-700 cursor-pointer"
          />
        </div>

        {isLoading ? (
          <Skeleton width={100} height={100} circle />
        ) : (
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`}
            alt="weather icon"
            className="w-24 object-contain"
          />
        )}

        <div>
          <span className="text-[#605d80] text-5xl font-medium">
            {weatherData?.main?.temp}°c
          </span>
        </div>

        <div className="w-full flex flex-col items-center gap-1 text-center">
          <p className="text-[#605d80] font-medium text-base">
            {weatherData?.weather?.[0]?.main}
          </p>
          <p className="text-[#605d80] font-medium text-base capitalize">
            {weatherData?.weather?.[0]?.description}
          </p>
          <p className="text-[#605d80] font-medium text-base">
            Feels like {weatherData?.main?.feels_like}
          </p>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center w-full sm:w-1/2 p-4 bg-[#fdc192] rounded-2xl">
            <p className="text-[#605d80] text-sm">Humidity</p>
            <span className="text-[#605d80] flex items-center gap-2 text-base">
              <WiHumidity />
              {weatherData?.main?.humidity}%
            </span>
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/2 p-4 bg-[#fdc192] rounded-2xl">
            <p className="text-[#605d80] text-sm">Wind Speed</p>
            <span className="text-[#605d80] flex items-center gap-2 text-base">
              <FaWind /> {weatherData?.wind?.speed} km/h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
