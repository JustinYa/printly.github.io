# Printly favicon

The selected source was edited with the built-in image generation tool from the supplied black P mark. The website header logo is unchanged.

Final selected edit prompt:

> Change all black shapes in the supplied P logo to flat brand blue #006DFD. Preserve the existing P silhouette, stroke weights, rounded corners, internal opening, and the two rounded horizontal bars. Crop away uneven empty space, keep the complete symbol uncropped, and center it at its original proportions on a square white canvas with approximately 12% even margins. No gradients, shadows, 3D, additional text, or watermark.

To regenerate the browser assets, run `node scripts/build-favicons.mjs` from the project root.

Outputs:

- `public/favicon.png`: 512 x 512 PNG for browsers and search engines.
- `public/favicon.ico`: 16, 32, 48, and 256 pixel PNG frames in an ICO container.
- `public/apple-touch-icon.png`: 180 x 180 PNG for iOS shortcuts.
