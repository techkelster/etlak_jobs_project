import React from "react";
import "./error.css";

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message = "Something went wrong.",
  onRetry,
}) => {
  return (
    <div className="errorContainer">
      <h1 className="errorMessage">{message}</h1>
      {onRetry && (
        <button className="retryButton" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorComponent;
