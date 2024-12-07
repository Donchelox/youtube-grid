import React, { useState, useEffect } from "react";
import VideoGrid from "./VideoGrid";
import ChannelModal from "./ChannelModal"; // Modal inicial
import allChannels from "./channels.json"; // Importar los datos desde JSON

const App = () => {
  const storedChannels = JSON.parse(localStorage.getItem("selectedChannels"));
  const storedGridSize = parseInt(localStorage.getItem("gridSize"));

  const initialChannels = storedChannels || allChannels.slice(0, 9).map((channel) => channel.id);
  const initialGridSize = storedGridSize || 3;

  const [selectedChannels, setSelectedChannels] = useState(initialChannels);
  const [gridSize, setGridSize] = useState(initialGridSize);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateSelectedChannels = (channels) => {
    setSelectedChannels(channels);
    localStorage.setItem("selectedChannels", JSON.stringify(channels));
  };

  const updateGridSize = (size) => {
    setGridSize(size);
    localStorage.setItem("gridSize", size);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <VideoGrid channels={selectedChannels} gridSize={gridSize} />
      <button
        onClick={toggleModal}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "20px",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
        }}
      >
        +
      </button>
      <ChannelModal
        isOpen={isModalOpen}
        allChannels={allChannels}
        selectedChannels={selectedChannels}
        gridSize={gridSize}
        onClose={toggleModal}
        onSave={updateSelectedChannels}
        onGridSizeChange={updateGridSize}
      />
    </div>
  );
};

export default App;
