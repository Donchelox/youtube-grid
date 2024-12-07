import React from "react";

const ChannelModal = ({
  isOpen,
  allChannels,
  selectedChannels,
  gridSize,
  onClose,
  onSave,
  onGridSizeChange,
}) => {
  const handleChannelToggle = (channelId) => {
    const updatedChannels = selectedChannels.includes(channelId)
      ? selectedChannels.filter((id) => id !== channelId)
      : [...selectedChannels, channelId];
    onSave(updatedChannels);
  };

  const gridSizes = [2, 3, 4, 5];

  return isOpen ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro semi-transparente
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#333", // Fondo oscuro para la modal
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          textAlign: "left",
        }}
      >
        <h2 style={{ color: "#fff" }}>Modificar Canales</h2>
        
        {/* Grilla de canales */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 columnas fijas
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {allChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => handleChannelToggle(channel.id)}
              style={{
                padding: "10px",
                backgroundColor: selectedChannels.includes(channel.id) ? "#007bff" : "#555", // Color oscuro para los botones
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {channel.name}
            </button>
          ))}
        </div>

        {/* Cambio de tamaño de grilla */}
        <h3 style={{ color: "#fff" }}>Cambiar Tamaño de Grilla</h3>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {gridSizes.map((size) => (
            <button
              key={size}
              onClick={() => onGridSizeChange(size)}
              style={{
                padding: "10px 20px",
                margin: "5px",
                backgroundColor: size === gridSize ? "#007bff" : "#555", // Fondo oscuro para los botones
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {size}x{size}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={onClose} style={{ marginRight: "10px", color: "#fff", backgroundColor: "#ff5f5f", border: "none", padding: "10px 20px", borderRadius: "5px" }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ChannelModal;
