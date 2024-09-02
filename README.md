# SPA for currency conversion with Nuxt 3

## Goal

Write a SPA for currency conversion. The application should have a header and 2 pages:

Header should have links to 2 pages “Home” (/) and “Convert” (/convert) and Dropdown with selection of the main currency
of the site.

The main page should display currency rates in relation to the main currency of the site, if the main currency is RUB,
the user sees that 1 USD = 91.45 RUB, 1 EUR = 101.74 RUB.

On the conversion page there should be a form consisting of 2 lines, in each line there should be a Dropdown with
currency selection and numeric Input.

In each Dropdown one of the currencies should be selected by default. When a change, in either of the two Inputs, is
made to the value, automatically convert and change the value in the other Input. For example, if RUB is selected in the
upper Dropdown and USD is selected in the lower Dropdown, the user enters a value of 1000 in the upper Input, then the
value in the lower Input should be updated to 10.94. All values should be rounded to 2 digits when converting. As a
reference, use Google currency conversion.

### Note:

You can get currency rates from this API GET https://status.neuralgeneration.com/api/currency, or you can use any open
API from the internet.

To implement the application, use Vue3 framework and any libraries you deem necessary.

On the site add support for 3 currencies USD, EUR, RUB.

Design is left to your discretion, separation into components and establishing good links between them is welcome.

It will be a plus to add checks to Input and display errors, for example, when a person enters text values.

## Development process

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
