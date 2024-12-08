import React, { useState } from "react";

const ChannelModal = ({
  isOpen,
  allChannels,
  selectedChannels,
  gridSize,
  onClose,
  onSave,
  onGridSizeChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Tamaños de grilla disponibles
  const gridSizes = [2, 3, 4, 5];

  // Obtener la lista de países únicos
  const uniqueCountries = [...new Set(allChannels.map((channel) => channel.country))];

  // Filtrar canales según la búsqueda y el país seleccionado
  const filteredChannels = allChannels.filter((channel) => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry ? channel.country === selectedCountry : true;
    return matchesSearch && matchesCountry;
  });

  const handleChannelToggle = (channelId) => {
    const updatedChannels = selectedChannels.includes(channelId)
      ? selectedChannels.filter((id) => id !== channelId)
      : [...selectedChannels, channelId];
    onSave(updatedChannels);
  };

  return isOpen ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#333",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          textAlign: "left",
        }}
      >
        <h2 style={{ color: "#fff" }}>Modificar Canales</h2>

        {/* Contenedor de búsqueda y filtro */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          {/* Campo de búsqueda */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar canales..."
            style={{
              flex: "2",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />

          {/* Filtro de país */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{
              flex: "1",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            <option value="">Todos</option>
            {uniqueCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Grilla de canales */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {filteredChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => handleChannelToggle(channel.id)}
              style={{
                padding: "10px",
                backgroundColor: selectedChannels.includes(channel.id) ? "#007bff" : "#555",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {channel.name} ({channel.country})
            </button>
          ))}
        </div>

        {/* Cambio de tamaño de grilla */}
        <h3 style={{ color: "#fff" }}>Cambiar Tamaño de Grilla</h3>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
          {gridSizes.map((size) => (
            <button
              key={size}
              onClick={() => onGridSizeChange(size)}
              style={{
                padding: "10px 20px",
                backgroundColor: size === gridSize ? "#007bff" : "#555",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {size}x{size}
            </button>
          ))}
        </div>

        {/* Botón de cierre */}
        <div style={{ textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              color: "#fff",
              backgroundColor: "#ff5f5f",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ChannelModal;
