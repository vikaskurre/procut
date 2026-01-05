# Procut Web - Premium Video Editing Agency

This project is a premium video editing agency website, built with Next.js, TypeScript, and Tailwind CSS. It features an animation-heavy, dark-themed UI, a comprehensive portfolio, services, pricing, contact form, and a floating WhatsApp button.

## Getting Started

To run this project locally, you will need Node.js (version 18 or higher) and npm (or yarn/pnpm) installed.

1.  **Navigate to the project directory:**
    ```bash
    cd procut-web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev
    # or pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Build for production:**
    ```bash
    npm run build
    # or yarn build
    # or pnpm build
    ```

## Project Structure

-   `src/app/`: Contains the page routes (Home, About, Services, Portfolio, etc.)
-   `src/components/`: Reusable React components (e.g., `WhatsAppButton`)
-   `public/`: Static assets (e.g., images, video placeholders)

## Key Features Implemented

-   **Next.js with TypeScript & Tailwind CSS:** Modern and efficient development stack.
-   **Dark Theme UI:** Premium, clean dark theme with neon blue/purple accents.
-   **Responsive Design:** Fully mobile-friendly using Tailwind CSS utilities.
-   **Hero Section:** Video background, ready for parallax, text reveal, scroll-based motion, and floating elements (requires animation libraries like Framer Motion/GSAP).
-   **Portfolio Section:** Categorized portfolio (Instagram Reels, Ads, YouTube Shorts) with embedded video players and descriptions.
-   **Services Section:** Detailed list of video editing services.
-   **Contact Page:** Lead-capture form (Name, Project Type, Budget Range) and direct contact details.
-   **Floating WhatsApp Button:** Instant chat integration across the site.
-   **Basic SEO:** Meta tags configured in `layout.tsx`.
-   **Google Analytics Placeholder:** Ready for your GA Measurement ID.
-   **Performance Optimizations:** Lazy loading for videos (`preload="none"`) and Next.js's built-in image optimization/code minification.

## Contact Form Integration

The contact form has been configured to send emails using Formspree (free) with SendGrid delivery. Form submissions are automatically emailed to vikaskurre80@gmail.com.

### Formspree Setup
- Form ID: `mvzglnzg`
- Free plan: 50 submissions/month
- SendGrid integration for reliable email delivery

## Customization & Content Management

### Replacing Placeholder Content

-   **Videos:**
    -   Hero Video: Replace `/public/hero-video.mp4` with your desired video file. For production, consider hosting on a CDN and updating the `src` in `src/app/page.tsx`.
    -   Portfolio Videos: Replace `/public/videos/reel1.mp4`, etc., with your actual video files. For production, host on a CDN.
-   **Video Thumbnails:** Add actual poster images for portfolio videos (replace `/public/video-thumbnail.jpg`).
-   **Text Content:** Update text in `src/app/about/page.tsx`, `src/app/services/page.tsx`, `src/app/portfolio/page.tsx`, `src/app/pricing/page.tsx`, `src/app/reviews/page.tsx`, `src/app/contact/page.tsx`.
-   **Logo:** Place your logo in the `public/` directory and update relevant `<img>` tags (e.g., in a future Navbar component).

### CDN for Videos

For optimal speed and performance, especially with high-quality video content, it is highly recommended to host all video files on a Content Delivery Network (CDN). Once hosted, update the `src` attributes of the `<video>` tags in `src/app/page.tsx` (Hero) and `src/app/portfolio/page.tsx` (Portfolio items) with the CDN URLs.

### Headless CMS for Dynamic Content & Admin Panel

For a fully dynamic website with an admin panel, integration with a **Headless CMS** (Content Management System) is recommended. This allows content (portfolio items, services, pricing plans, client reviews, about text, etc.) to be managed easily without directly editing code.

**Recommended Headless CMS Options:**

-   **Strapi:** Open-source, self-hostable (or cloud option), highly customizable, supports various databases.
-   **Sanity.io:** Cloud-native, real-time content editing, powerful query language (GROQ).
-   **Contentful:** Popular choice with a strong API, good for structured content.

**Integration Steps (High-Level):**

1.  **Set up the CMS:** Choose a headless CMS and configure your content models (e.g., `PortfolioItem` with fields for `title`, `description`, `videoUrl`, `category`).
2.  **Fetch Data:** In your Next.js application, use `fetch` or a dedicated library to retrieve data from the CMS API. Next.js supports powerful data fetching methods (e.g., `getServerSideProps`, `getStaticProps`, or direct fetches in Server Components).
3.  **Replace Local Data:** Substitute the mock data arrays (like `portfolioData` and `servicesList`) with the data fetched from your CMS.
4.  **Admin Panel:** The chosen headless CMS will provide an intuitive admin interface for you or your clients to update website content without touching the codebase.

## Animation Libraries

For the advanced animations requested (parallax, text reveal, scroll-based motion, floating elements), consider installing and integrating libraries like:

-   **Framer Motion:** A production-ready motion library for React.
-   **GSAP (GreenSock Animation Platform):** A robust JavaScript animation library for highly performant and complex animations.

## Future Enhancements (Beyond this Prototype)

-   **Navigation Bar & Footer:** Implement a global header with navigation links and a footer.
-   **About Me & Client Reviews Sections:** Further enrich these pages with images, team details, or more sophisticated review displays.
-   **Newsletter Subscription:** Integrate a form for email list sign-ups.
-   **Blog/Articles Section:** If desired, a section for industry insights or company news.
-   **Accessibility (a11y):** Ensure the website is usable by everyone, regardless of ability.

## Editing Tutorial & 1-Month Support

-   This README serves as a basic guide for editing and understanding the project. A full editing tutorial would involve a detailed walkthrough of updating content, adding new portfolio items, and potentially using a CMS.
-   For "1-month support," this would typically be an agreement between the developer and client for post-launch assistance.

---
**Note:** This is a basic prototype. A fully functional production website would require a robust backend for form submissions, comprehensive content management via a CMS, and thorough testing.
