import React from 'react';
import { toastApiError } from '@/utils/apiError';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = { hasError: boolean; error: unknown };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error } as State;
  }

  componentDidCatch(error: unknown) {
    toastApiError(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

