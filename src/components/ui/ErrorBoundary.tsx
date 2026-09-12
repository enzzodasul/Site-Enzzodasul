import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 border border-red-500/40 flex items-center justify-center text-2xl font-bold mb-4">
            ⚠️
          </div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
            Ops! Algo deu errado ao carregar
          </h1>
          <p className="text-sm text-zinc-400 max-w-md mb-4 font-mono">
            {this.state.error?.message || 'Erro inesperado na aplicação.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-colors uppercase text-xs tracking-widest"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
