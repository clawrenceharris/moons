import "./SeasonalPicks.css";

const SeasonalPicks = () => {
  return (
    <div className="seasonal-picks-container">
      <div className="seasonal-grid">
        <div className="seasonal-grid-content">
          <p>Step into the new season with our latest picks</p>
          <button className="button-primary">Shop Now</button>
        </div>

        <img
          className="image-left"
          src={require("../../assets/images/seasonal2.jpeg")}
          alt="Seasonal Left"
        />
        <img
          className="image-middle-top"
          alt="Seasonal Middle Top"
          src={require("../../assets/images/seasonal1.png")}
        />
        <img
          className="image-middle-bottom"
          src={require("../../assets/images/seasonal4.png")}
          alt="Seasonal Middle Bottom"
        />
        <img
          className="image-right"
          src={require("../../assets/images/seasonal3.jpeg")}
          alt="Seasonal Right"
        />
      </div>
    </div>
  );
};

export default SeasonalPicks;
