import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';
import error from '@assets/images/error.gif';

export class ErrorBoundary extends Component<{
  children: ReactNode;
}> {
  state = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);

    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <img src={error} alt="error" className={styles.error} />;
    }

    return this.props.children;
  }
}
