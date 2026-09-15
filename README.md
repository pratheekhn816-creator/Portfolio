This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)..:

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form configuration

The Contact page submits through `/api/contact` to a standard Google Form. The server route keeps the Google request out of browser code and stores responses through the form's connected Google Sheet.

1. Create the five questions in your Google Form: Full Name, Email Address, Phone Number, Subject, and Message.
2. Copy the form's `formResponse` URL and each question's numeric `entry.<id>` value.
3. Put them in `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/FORM_ID/formResponse
NEXT_PUBLIC_GOOGLE_FORM_NAME_FIELD=123456789
NEXT_PUBLIC_GOOGLE_FORM_EMAIL_FIELD=234567890
NEXT_PUBLIC_GOOGLE_FORM_PHONE_FIELD=345678901
NEXT_PUBLIC_GOOGLE_FORM_SUBJECT_FIELD=456789012
NEXT_PUBLIC_GOOGLE_FORM_MESSAGE_FIELD=567890123
```

Do not add service-account credentials or OAuth secrets. Restart the Next.js server after changing `.env.local`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
