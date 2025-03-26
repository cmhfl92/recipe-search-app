import QuickBadge from '@/app/components/quickBadge';
import { render } from '@testing-library/react';

describe('QuickBadge Snapshot', () => {
  it('renders quick badge correctly for <= 15 minutes', () => {
    const { asFragment } = render(<QuickBadge time={10} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders nothing for time > 15 minutes', () => {
    const { asFragment } = render(<QuickBadge time={20} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
