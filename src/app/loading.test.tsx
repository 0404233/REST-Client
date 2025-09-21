import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./_components/loading-skeleton/LoadingSkeleton', () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement('div', {
      'data-testid': 'loading-skeleton',
      'data-w': String(props.w),
      'data-h': String(props.h),
      'data-b': String(props.b),
    }),
}));

import Loading from './loading';

describe('Loading component', () => {
  it('renders LoadingSkeleton with the correct dimensions and border', () => {
    render(<Loading />);

    const skeleton = screen.getByTestId('loading-skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('data-w', '24');
    expect(skeleton).toHaveAttribute('data-h', '24');
    expect(skeleton).toHaveAttribute('data-b', '6');
  });
});
