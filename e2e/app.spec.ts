import { test, expect } from "@playwright/test";

// Note: in a real-life scenario, if we control the users API, we
// probably would not want to mock it. If it's an external API, mocking
// would be preferred to avoid flakiness.

test.beforeEach(async ({ page }) => {
  // Mock the API response for fetching users
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(mockUsers),
        headers: { "Content-Type": "application/json" },
      });
    }
  );

  // Go to the user list page
  await page.goto("http://localhost:5173");
});

test.describe("User List Page", () => {
  test("should display the correct number of users", async ({ page }) => {
    // Check that two users are rendered
    const users = await page.locator(".userCard");
    await expect(users).toHaveCount(2);
  });

  test("should display correct user details", async ({ page }) => {
    // Check that the correct name and phone number are displayed for the first user
    await expect(page.locator(".userCard >> nth=0")).toContainText(
      "Leanne Graham"
    );
    await expect(page.locator(".userCard >> nth=0")).toContainText(
      "1-770-736-8031 x56442"
    );

    // Check for the second user
    await expect(page.locator(".userCard >> nth=1")).toContainText(
      "Ervin Howell"
    );
    await expect(page.locator(".userCard >> nth=1")).toContainText(
      "010-692-6593 x09125"
    );
  });
});

test.describe("Edit User Page", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API response for updating a user
    await page.route("**/users/1", async (route, request) => {
      const requestBody = JSON.parse(request.postData() || "{}");
      expect(requestBody).toEqual({
        name: "New Name",
        email: "newemail@example.com",
        phone: "555-123-4567",
      });
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ...mockUsers[0], ...requestBody }),
        headers: { "Content-Type": "application/json" },
      });
    });

    // Go to the edit user page
    await page.goto("http://localhost:5173/users/edit/1");
  });

  test("should display the correct initial user details", async ({ page }) => {
    // Check that the form inputs are pre-populated with the correct user data
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const phoneInput = page.locator('input[name="phone"]');

    await expect(nameInput).toHaveValue("Leanne Graham");
    await expect(emailInput).toHaveValue("Sincere@april.biz");
    await expect(phoneInput).toHaveValue("1-770-736-8031 x56442");
  });

  test("should allow updating user details", async ({ page }) => {
    // Change the input values
    await page.fill('input[name="name"]', "New Name");
    await page.fill('input[name="email"]', "newemail@example.com");
    await page.fill('input[name="phone"]', "555-123-4567");

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify we are redirected back to the home page
    await page.waitForTimeout(1000);
    await expect(page.url()).toEqual("http://localhost:5173/");
  });
});

const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
];
