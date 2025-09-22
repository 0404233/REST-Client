import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';

vi.mock('i18n/navigation', () => ({
  Link: ({ children, href, target }: any) => (
    <a data-testid="team-link" href={href} target={target}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img data-testid="team-img" {...props} />,
}));

import Team from './Team';
import { teamConfig } from './team-config';

describe('Team Component', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders one link per teamConfig entry with correct href and target', () => {
    render(<Team />);
    const links = screen.getAllByTestId('team-link');
    expect(links).toHaveLength(teamConfig.length);

    links.forEach((link, idx) => {
      expect(link).toHaveAttribute('href', teamConfig[idx].href);
      expect(link).toHaveAttribute('target', teamConfig[idx].target);
    });
  });

  it('preserves the order of teamConfig entries in the rendered output', () => {
    render(<Team />);
    const links = screen.getAllByTestId('team-link');
    const alts = links.map((link) =>
      link.querySelector('[data-testid="team-img"]')?.getAttribute('alt')
    );
    expect(alts).toEqual(teamConfig.map((cfg) => cfg.alt));
  });
});
