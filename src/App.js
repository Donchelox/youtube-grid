import React, { useState, useEffect } from "react";
import VideoGrid from "./VideoGrid";
import ChannelModal from "./ChannelModal";
import allChannels from "./channels.json";

const App = () => {
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [gridSize, setGridSize] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedVersion = localStorage.getItem("channelsVersion");
    const currentVersion = allChannels.version;

    // Cargar los canales seleccionados y sincronizar IDs si cambia la versión
    const storedChannels = JSON.parse(localStorage.getItem("selectedChannels")) || [];
    const allChannelIds = allChannels.channels.map((channel) => channel.id);

    if (storedVersion !== currentVersion) {
      // Sincronizar los canales seleccionados con los nuevos IDs
      const updatedChannels = storedChannels.filter((id) => allChannelIds.includes(id));
      localStorage.setItem("selectedChannels", JSON.stringify(updatedChannels));
      localStorage.setItem("channelsVersion", currentVersion);
      setSelectedChannels(updatedChannels);
    } else {
      setSelectedChannels(storedChannels.length > 0 ? storedChannels : allChannels.channels.slice(0, 9).map((channel) => channel.id));
    }

    const storedGridSize = parseInt(localStorage.getItem("gridSize")) || 3;
    setGridSize(storedGridSize);
  }, []);

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
        allChannels={allChannels.channels}
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
