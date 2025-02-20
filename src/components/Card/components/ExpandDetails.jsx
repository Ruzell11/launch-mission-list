import React from 'react';

function ExpandDetails({ launch }) {
  return (
    <div className="card__body">
      <p className="card__content-copy">
        <small>
          {new Date().getFullYear() - new Date(launch.launch_date_utc).getFullYear()} years ago |
          <a href={launch.links.article_link} target="_blank" rel="noopener noreferrer"> Article</a> |
          <a href={launch.links.video_link} target="_blank" rel="noopener noreferrer"> Video</a>
        </small>
      </p>
      <div className="card__content">
        <img
          src={launch.links.mission_patch_small || "https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"}
          alt="mission"
          className="card__image"
          onError={(e) => e.target.src = "https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"}
        />
        <p className="card__description">{launch.details || "No description available."}</p>
      </div>
    </div>
  );
}

export default ExpandDetails;
