import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div style={styles.spinnerContainer}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 1000,
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
} as const;

export default LoadingSpinner;
