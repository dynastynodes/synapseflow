# SynapseFlow E2E Tests

End-to-end tests for SynapseFlow using Playwright.

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# View test report
npm run report
```

## Test Suites

### Research Flow (`research-flow.spec.ts`)
- Home page rendering
- Search functionality
- Domain filtering
- Form submission
- Navigation between pages
- Tab switching in results
- Dark mode toggle
- Responsive design

### Accessibility (`accessibility.spec.ts`)
- Keyboard navigation
- ARIA attributes
- Color contrast
- Focus indicators
- Performance metrics
- SEO meta tags
- Error handling

## Configuration

Tests are configured in `playwright.config.ts`:

- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12
- **Base URL**: `http://localhost:3000` (configurable via `BASE_URL` env var)
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On first retry

## CI/CD Integration

Tests can be run in CI/CD pipelines:

```bash
BASE_URL=https://staging.synapseflow.ai npm test
```

## Writing New Tests

Follow the existing patterns:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Hello')).toBeVisible();
  });
});
```

## Best Practices

1. Use semantic locators (role, text, label)
2. Add explicit waits for dynamic content
3. Use data-testid for complex components
4. Keep tests independent and idempotent
5. Mock external API calls when possible
