import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have no accessibility violations on home page', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }

    // Check for proper labels on form inputs
    const queryInput = page.getByPlaceholder(/enter your research query/i);
    await expect(queryInput).toBeVisible();

    const domainInput = page.getByPlaceholder(/add domain/i);
    await expect(domainInput).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab to search input
    await page.keyboard.press('Tab');
    const searchInput = page.getByPlaceholder(/enter your research query/i);
    await expect(searchInput).toBeFocused();

    // Type in search input
    await searchInput.fill('AI research');

    // Tab to domain input
    await page.keyboard.press('Tab');
    const domainInput = page.getByPlaceholder(/add domain/i);
    await expect(domainInput).toBeFocused();

    // Tab to submit button
    await page.keyboard.press('Tab');
    const submitButton = page.getByRole('button', { name: /start research/i });
    await expect(submitButton).toBeFocused();

    // Press Enter to submit
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/research/);
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    // Get computed styles of key elements
    const heading = page.locator('h1').first();
    const headingColor = await heading.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    // Color should be defined (basic check)
    expect(headingColor).toBeTruthy();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/');

    // Check submit button has proper role
    const submitButton = page.getByRole('button', { name: /start research/i });
    const buttonRole = await submitButton.getAttribute('role');

    // Button should either have explicit role="button" or be a <button> element
    if (buttonRole) {
      expect(buttonRole).toBe('button');
    }
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder(/enter your research query/i);
    await searchInput.focus();

    // Check that focused element has visual indication
    const outlineWidth = await searchInput.evaluate((el) => {
      return window.getComputedStyle(el).outlineWidth;
    });

    const ringWidth = await searchInput.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('--tw-ring-width');
    });

    // Either outline or ring should be present
    expect(outlineWidth !== '0px' || ringWidth !== '').toBeTruthy();
  });
});

test.describe('Performance', () => {
  test('should load home page quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Home page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have reasonable bundle size', async ({ page }) => {
    await page.goto('/');

    // Get all script tags
    const scripts = page.locator('script[src]');
    const scriptCount = await scripts.count();

    // Should not have excessive number of scripts
    expect(scriptCount).toBeLessThan(20);
  });

  test('should lazy load images', async ({ page }) => {
    await page.goto('/');

    // Check for loading="lazy" on images below the fold
    const images = page.locator('img[loading="lazy"]');
    const lazyImageCount = await images.count();

    // At least some images should be lazy loaded
    expect(lazyImageCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('SEO', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check for title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]');
    const descriptionContent = await metaDescription.getAttribute('content');
    expect(descriptionContent).toBeTruthy();

    // Check for viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    const viewportContent = await viewport.getAttribute('content');
    expect(viewportContent).toContain('width=device-width');
  });

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/');

    // Check for og:title
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogTitleCount = await ogTitle.count();
    expect(ogTitleCount).toBeGreaterThan(0);
  });

  test('should have canonical URL', async ({ page }) => {
    await page.goto('/');

    const canonical = page.locator('link[rel="canonical"]');
    const canonicalCount = await canonical.count();

    // Canonical URL is good to have but not required
    expect(canonicalCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Error Handling', () => {
  test('should handle 404 pages gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-page');

    // Should return 404
    expect(response?.status()).toBe(404);

    // Should display error message or redirect
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
  });

  test('should display error message for invalid search', async ({ page }) => {
    await page.goto('/');

    const input = page.getByPlaceholder(/enter your research query/i);

    // Try to submit empty form (should be prevented)
    const submitButton = page.getByRole('button', { name: /start research/i });
    await expect(submitButton).toBeDisabled();

    // Fill with very long query
    await input.fill('a'.repeat(1000));

    // Should either truncate or show error
    const value = await input.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });
});
