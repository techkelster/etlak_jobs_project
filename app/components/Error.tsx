import React from "react";

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message = "Something went wrong.",
  onRetry,
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-red-800">{message}</h1>
      {onRetry && (
        <button className="retryButton" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorComponent;
