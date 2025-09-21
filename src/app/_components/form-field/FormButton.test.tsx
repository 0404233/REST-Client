import React from 'react';
import { render, screen } from '@testing-library/react';
import FormButton from './FormButton';

describe('FormButton Component', () => {
  describe('Rendering', () => {
    it('renders button with correct label', () => {
      render(<FormButton isValid={true} label="Submit Form" />);
      
      const button = screen.getByRole('button', { name: 'Submit Form' });
      expect(button).toBeDefined();
      expect(button.textContent).toBe('Submit Form');
    });

    it('renders with different labels', () => {
      const labels = ['Submit', 'Save', 'Send', 'Confirm', 'Update'];
      
      labels.forEach(label => {
        render(<FormButton isValid={true} label={label} />);
        expect(screen.getByText(label)).toBeDefined();
      });
    });
  });

  describe('Disabled State', () => {
    it('is enabled when isValid is true', () => {
      render(<FormButton isValid={true} label="Submit" />);
      
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('is disabled when isValid is false', () => {
      render(<FormButton isValid={false} label="Submit" />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('toggles disabled state when isValid changes', () => {
      const { rerender } = render(<FormButton isValid={true} label="Submit" />);
      
      let button = screen.getByRole('button');
      expect(button).not.toBeDisabled();

      rerender(<FormButton isValid={false} label="Submit" />);
      
      button = screen.getByRole('button');
      expect(button).toBeDisabled();

      rerender(<FormButton isValid={true} label="Submit" />);
      
      button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<FormButton isValid={true} label="Submit" />);
      
      expect(screen.getByRole('button')).toBeDefined();
    });

    it('has proper disabled attribute when not valid', () => {
      render(<FormButton isValid={false} label="Submit" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
    });

    it('does not have disabled attribute when valid', () => {
      render(<FormButton isValid={true} label="Submit" />);
      
      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('disabled');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label', () => {
      render(<FormButton isValid={true} label="" />);
      
      const button = screen.getByRole('button');
      expect(button.textContent).toBe('');
    });

    it('handles very long label', () => {
      const longLabel = 'This is a very long button label that should still render correctly';
      render(<FormButton isValid={true} label={longLabel} />);
      
      expect(screen.getByText(longLabel)).toBeDefined();
    });

    it('handles special characters in label', () => {
      const specialLabel = 'Submit';
      render(<FormButton isValid={true} label={specialLabel} />);
      
      expect(screen.getByText(specialLabel)).toBeDefined();
    });
  });

  describe('Snapshot Tests', () => {
    it('matches snapshot when enabled', () => {
      const { container } = render(<FormButton isValid={true} label="Submit" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot when disabled', () => {
      const { container } = render(<FormButton isValid={false} label="Submit" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});