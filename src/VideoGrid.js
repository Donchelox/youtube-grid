import React, { useEffect, useState } from "react";

const VideoGrid = ({ channels, gridSize }) => {
  const [responsiveGridSize, setResponsiveGridSize] = useState(gridSize);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setResponsiveGridSize(1); // 1x1 en pantallas pequeñas
      } else {
        setResponsiveGridSize(gridSize); // Valor original para pantallas grandes
      }
    };

    handleResize(); // Ajustar tamaño en la carga inicial
    window.addEventListener("resize", handleResize); // Escuchar cambios de tamaño
    return () => window.removeEventListener("resize", handleResize); // Limpieza
  }, [gridSize]);

  const filledChannels = [...channels];
  while (filledChannels.length < responsiveGridSize * responsiveGridSize) {
    filledChannels.push(null); // Rellenar con espacios vacíos
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${responsiveGridSize}, 1fr)`,
        gap: "2px", // Ajustado el gap a 2px
        padding: "0px", // Ajustado el padding a 0px
      }}
    >
      {filledChannels.map((channelId, index) =>
        channelId ? (
          <div
            key={channelId}
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%", // 16:9 Aspect Ratio
            }}
          >
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              src={`https://www.youtube.com/embed/${channelId}&autoplay=1`}
              title={`YouTube video player - ${channelId}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div
            key={index}
            className="video-vacio"
            style={{
              backgroundColor: "rgb(221, 221, 221)",
              width: "100%",
              paddingTop: "56.25%", // 16:9 Aspect Ratio
            }}
          ></div>
        )
      )}
    </div>
  );
};

export default VideoGrid;
