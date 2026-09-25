# OneView website

Static website for the OneView Android app. The deployable files are `index.html`, `privacy.html`, `terms.html`, `styles.css`, `gallery.js`, `motion.js`, and the `assets/` directory. There is no build step, server, tracking script, or form backend.

## Publish on AWS

1. Upload the deployable files to the **root** of your S3 site bucket, keeping the `assets/` directory structure.
2. Set `index.html` as the index document. If using S3 website hosting, set an error document appropriate to your hosting setup.
3. For a public, secure URL, serve the bucket through CloudFront with HTTPS and a domain you control. A private S3 bucket with CloudFront Origin Access Control is preferred over making the bucket public.
4. In Play Console, put the full public URL ending in `/privacy` into the Privacy Policy field. The URL must open without login and display the policy as a normal web page.
5. After the app is live, replace the “Coming to Google Play” text in `index.html` with a link to its actual store listing.

The public website is `https://oneviewportfolio.com/`, and support requests use `support@oneviewportfolio.com`. Keep both available when publishing the privacy-policy URL. Keep the app’s in-app privacy text and Play Console Data safety answers aligned with the policy whenever the app changes.

The privacy policy now covers local PDF/CSV/TXT processing, Android Share/Open with, on-device OCR through Google Play services, and local statement reminders. Keep this wording aligned with the shipped app.

Before releasing a version of the app with ads, update the in-app and website privacy disclosures and Play Console Data safety answers to name the actual ad SDK and accurately describe its data practices. The current website does not describe a future ad SDK as already present because no ad SDK is currently included.

## Google Play items outside the website

The website does not complete Play Console declarations. Review the app’s **Data safety** form and **Financial features** declaration before submitting. OneView tracks a portfolio, so the latter should accurately describe its features. Also complete the store listing, content rating, app access, target audience, and other App content questions that Play Console requests.

## Source and assets

- The mark in `assets/oneview-mark.svg` follows the Android launcher vector in the OneView app.
- The five screenshots in `assets/` were captured from the connected Android phone. The dashboard, portfolio mix, Investment, and Activity screenshots show real portfolio figures, as requested. The gallery visually crops the phone status and system navigation bars in CSS.
- The gallery advances every three seconds while it is in view. Visitors can choose a screen, use previous/next, or pause autoplay. Autoplay starts off for visitors who prefer reduced motion.
- `assets/inter-variable.woff2` is the web-optimized subset of the app’s Inter font; its license is copied to `assets/inter-license.txt`.

## Local preview

From this directory, run `python3 -m http.server 8000`, then open `http://localhost:8000/`.
