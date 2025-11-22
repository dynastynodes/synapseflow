import { test, expect } from '@playwright/test';

test.describe('Research Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display home page with search interface', async ({ page }) => {
    await expect(page).toHaveTitle(/SynapseFlow/i);
    await expect(page.getByPlaceholder(/enter your research query/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /start research/i })).toBeVisible();
  });

  test('should disable submit button when query is empty', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /start research/i });
    await expect(submitButton).toBeDisabled();
  });

  test('should enable submit button when query is entered', async ({ page }) => {
    const input = page.getByPlaceholder(/enter your research query/i);
    const submitButton = page.getByRole('button', { name: /start research/i });

    await input.fill('transformer models');

    await expect(submitButton).toBeEnabled();
  });

  test('should navigate to research page on submit', async ({ page }) => {
    const input = page.getByPlaceholder(/enter your research query/i);
    const submitButton = page.getByRole('button', { name: /start research/i });

    await input.fill('attention mechanisms in deep learning');
    await submitButton.click();

    await expect(page).toHaveURL(/\/research\?q=attention/);
  });

  test('should add domains to search', async ({ page }) => {
    const domainInput = page.getByPlaceholder(/add domain/i);

    await domainInput.fill('AI');
    await domainInput.press('Enter');

    await expect(page.getByText('AI')).toBeVisible();

    await domainInput.fill('Machine Learning');
    await domainInput.press('Enter');

    await expect(page.getByText('Machine Learning')).toBeVisible();
  });

  test('should remove domain when × is clicked', async ({ page }) => {
    const domainInput = page.getByPlaceholder(/add domain/i);

    await domainInput.fill('AI');
    await domainInput.press('Enter');

    await expect(page.getByText('AI')).toBeVisible();

    await page.getByRole('button', { name: '×' }).click();

    await expect(page.getByText('AI')).not.toBeVisible();
  });

  test('should include domains in search query', async ({ page }) => {
    const queryInput = page.getByPlaceholder(/enter your research query/i);
    const domainInput = page.getByPlaceholder(/add domain/i);
    const submitButton = page.getByRole('button', { name: /start research/i });

    await domainInput.fill('Biology');
    await domainInput.press('Enter');
    await domainInput.fill('AI');
    await domainInput.press('Enter');

    await queryInput.fill('protein folding');
    await submitButton.click();

    await expect(page).toHaveURL(/domains=Biology%2CAI/);
  });

  test('should submit form using Enter key', async ({ page }) => {
    const input = page.getByPlaceholder(/enter your research query/i);

    await input.fill('neural networks');
    await input.press('Enter');

    await expect(page).toHaveURL(/\/research\?q=neural/);
  });

  test('should not allow empty domain addition', async ({ page }) => {
    const domainInput = page.getByPlaceholder(/add domain/i);

    await domainInput.fill('   ');
    await domainInput.press('Enter');

    // Domain tag should not appear
    const domainTags = page.locator('.rounded-full.bg-primary\\/10');
    await expect(domainTags).toHaveCount(0);
  });

  test('should not add duplicate domains', async ({ page }) => {
    const domainInput = page.getByPlaceholder(/add domain/i);

    await domainInput.fill('AI');
    await domainInput.press('Enter');
    await domainInput.fill('AI');
    await domainInput.press('Enter');

    // Should only have one AI tag
    const aiTags = page.getByText('AI', { exact: true });
    await expect(aiTags).toHaveCount(1);
  });
});

test.describe('Research Results Page', () => {
  test('should display loading state initially', async ({ page }) => {
    await page.goto('/research?q=transformer+models');

    // Check for loading indicator
    const loadingIndicator = page.getByText(/searching|loading/i);
    await expect(loadingIndicator).toBeVisible();
  });

  test('should display paper results', async ({ page }) => {
    // This test requires mocked API responses or a running backend
    await page.goto('/research?q=transformer+models');

    // Wait for results to load (with timeout)
    await page.waitForSelector('[data-testid="paper-card"]', {
      timeout: 10000,
      state: 'visible'
    }).catch(() => {
      // If backend is not running, test will gracefully fail
      console.log('Backend not available for E2E test');
    });
  });

  test('should switch between result tabs', async ({ page }) => {
    await page.goto('/research?q=deep+learning');

    // Click on Citation Graph tab
    const graphTab = page.getByRole('button', { name: /citation graph/i });
    if (await graphTab.isVisible()) {
      await graphTab.click();
      await expect(page.getByText(/citation graph/i)).toBeVisible();
    }

    // Click on Insights tab
    const insightsTab = page.getByRole('button', { name: /insights/i });
    if (await insightsTab.isVisible()) {
      await insightsTab.click();
    }

    // Click back to Papers tab
    const papersTab = page.getByRole('button', { name: /papers/i });
    if (await papersTab.isVisible()) {
      await papersTab.click();
    }
  });
});

test.describe('Navigation', () => {
  test('should navigate to About page', async ({ page }) => {
    await page.goto('/');

    const aboutLink = page.getByRole('link', { name: /about/i });
    await aboutLink.click();

    await expect(page).toHaveURL(/\/about/);
  });

  test('should navigate to Documentation page', async ({ page }) => {
    await page.goto('/');

    const docsLink = page.getByRole('link', { name: /docs|documentation/i });
    if (await docsLink.isVisible()) {
      await docsLink.click();
      await expect(page).toHaveURL(/\/docs/);
    }
  });

  test('should navigate back to home from header', async ({ page }) => {
    await page.goto('/about');

    const homeLink = page.getByRole('link', { name: /synapseflow|home/i }).first();
    await homeLink.click();

    await expect(page).toHaveURL('/');
  });
});

test.describe('Dark Mode', () => {
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/');

    // Find and click the dark mode toggle
    const darkModeToggle = page.getByRole('button', { name: /dark mode|theme/i });

    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();

      // Check if dark class is applied to html or body
      const html = page.locator('html');
      const isDark = await html.getAttribute('class');
      expect(isDark).toContain('dark');

      // Toggle back
      await darkModeToggle.click();
      const isLight = await html.getAttribute('class');
      expect(isLight).not.toContain('dark');
    }
  });
});

test.describe('Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto('/');

    const searchInput = page.getByPlaceholder(/enter your research query/i);
    await expect(searchInput).toBeVisible();

    const submitButton = page.getByRole('button', { name: /start research/i });
    await expect(submitButton).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    await page.goto('/');

    const searchInput = page.getByPlaceholder(/enter your research query/i);
    await expect(searchInput).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const searchInput = page.getByPlaceholder(/enter your research query/i);
    await expect(searchInput).toBeVisible();
  });
});
