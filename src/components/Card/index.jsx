import React, { useState, useRef, useCallback } from "react";
import { useLaunchContext } from "../../store";
import "./card.scss";
import ExpandDetails from "../../components/Card/components/ExpandDetails";
import Spinner from "../Spinner";

const Card = () => {
  const { filteredLaunchesData, launchesMissionData } = useLaunchContext();
  const [visibleCount, setVisibleCount] = useState(10);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastCardRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true); 
          setTimeout(() => {
            setVisibleCount((prev) => prev + 10);
            setLoading(false);
          }, 1000); 
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );
  const handleToggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="card-container">
      {launchesMissionData.length === 0 ? <p>No data available as of the moment</p> :
      filteredLaunchesData.length === 0 ? <p>No results found</p> :
        filteredLaunchesData.slice(0, visibleCount).map((launch, index) => {
          const status = launch.upcoming ? "upcoming" : launch.launch_success ? "success" : "failed";
          const statusColor = status === "success" ? "green" : status === "failed" ? "red" : "blue";

          return (
            <div
              key={index}
              ref={index === visibleCount - 1 ? lastCardRef : null}
              className="card"
            >
              {/* Header */}
              <div className="card__header">
                <h3 className="card__title">
                  {launch.mission_name}
                  <span className={`card__status card__status--${status}`} style={{ backgroundColor: statusColor }}>
                    {status}
                  </span>
                </h3>
                <button className="card__button" onClick={() => handleToggleExpand(index)}>
                  {expandedIndexes.includes(index) ? "Hide" : "View"}
                </button>
              </div>

              {/* Expandable Section */}
              {expandedIndexes.includes(index) && <ExpandDetails launch={launch} />}
            </div>
          );
        })}

         {/* Loading Indicator */}
      {loading && <p className="loading-indicator"><Spinner/> Loading more data...</p>}

      {visibleCount >= launchesMissionData.length && (
        <p className="end-of-data">End of list.</p>
      )}
    </div>
  );
};

export default Card;
