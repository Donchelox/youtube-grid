import React from "react";

const VideoGrid = ({ channels, gridSize }) => {
  const filledChannels = [...channels];
  while (filledChannels.length < gridSize * gridSize) {
    filledChannels.push(null); // Rellenar con espacios vacíos
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
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
              src={`https://www.youtube.com/embed/${channelId}&autoplay=1`} // Agregado el parámetro 'autoplay=1'
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
            style={{
              backgroundColor: "#ddd",
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
