"use client";
import React, { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

interface IWithAsyncError {
  children: React.ReactNode;
  FallbackUI?: JSX.Element;
  FallbackComponent?: React.ComponentType<FallbackProps>;
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return <div></div>;
};

const DEFAULT_SUSPENSE_FALLBACK = <p>로딩중...</p>;

const AsyncError = ({
  children,
  FallbackUI = DEFAULT_SUSPENSE_FALLBACK,
  FallbackComponent = ErrorFallback,
}: IWithAsyncError): JSX.Element => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Suspense fallback={FallbackUI}>{children}</Suspense>
    </ErrorBoundary>
  );
};

const withAsyncError = <T extends object>(
  Component: React.ComponentType<T>,
  FallbackUI?: JSX.Element,
  FallbackComponent?: React.ComponentType<FallbackProps>
) => {
  const asyncComponent = (props: T) => (
    <AsyncError FallbackUI={FallbackUI} FallbackComponent={FallbackComponent}>
      <Component {...props} />
    </AsyncError>
  );
  return asyncComponent;
};

export default withAsyncError;
