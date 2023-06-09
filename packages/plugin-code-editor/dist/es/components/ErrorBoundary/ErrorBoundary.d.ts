import { Component, ErrorInfo } from 'react';
interface ErrorBoundaryProps {
    onCatch?: (error: Error, info: ErrorInfo) => void;
}
interface ErrorBoundaryState {
    hasError: boolean;
    info: null | ErrorInfo;
}
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    state: {
        hasError: boolean;
        info: any;
    };
    componentDidCatch(error: Error, info: ErrorInfo): void;
    render(): JSX.Element;
    private _handleReset;
}
export {};
