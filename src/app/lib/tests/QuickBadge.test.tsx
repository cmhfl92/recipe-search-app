import QuickBadge from '@/app/components/quickBadge';
import { render, screen } from '@testing-library/react';

describe('QuickBadge', () => {
  it('renders 🚀 for <= 15', () => {
    render(<QuickBadge time={10} />);
    expect(screen.getByTitle('Quick Recipe')).toHaveTextContent('🚀');
  });

  it('renders nothing for time > 15', () => {
    const { container } = render(<QuickBadge time={20} />);
    expect(container).toBeEmptyDOMElement();
  });
});
