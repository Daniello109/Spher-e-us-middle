import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFixtures from "./AddFixtures";
import DeleteFixtures from "./DeleteFixtures";

function AdminFixtures() {
  const [fixturesData, setFixturesData] = useState([]);
  const [getAllCategories, setGetAllCategories] = useState([]);
  const [add, setAdd] = useState(false);

  function getFixtures() {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/fixtures`)
      .then((res) => setFixturesData(res.data))
      .catch((err) => console.error(err));
  }

  function getCategories() {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/categories`)
      .then((res) => setGetAllCategories(res.data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getFixtures();
    getCategories();
  }, []);

  return (
    <div className="fixtures-slider">
      <div className="fixtures-slider_text">
        <h1>Currently in the Fixture Slider</h1>
        <button
          className="icon-btn add-btn"
          type="button"
          onClick={() => setAdd(!add)}
        >
          <div className="btn-txt">Add Video</div>
          <div className="add-icon" />
        </button>
      </div>
      <div className="fixtures-selector-component">
        {add && getAllCategories.length > 0 && (
          <AddFixtures
            getAllCategories={getAllCategories}
            getFixtures={() => getFixtures()}
          />
        )}
      </div>
      <ul className="adminheroslider_videos">
        {fixturesData.length >= 1 &&
          fixturesData.map((el) => {
            return (
              <DeleteFixtures
                key={el.id}
                el={el}
                getFixtures={() => getFixtures()}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default AdminFixtures;
