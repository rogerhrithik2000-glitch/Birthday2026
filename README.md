# Mission: Make Baby Smile 💗

A ready-to-run birthday mini-game made with plain HTML, CSS and JavaScript. No dependencies, accounts, build step, or backend.

## Run it
1. Unzip `baby-birthday-adventure.zip`.
2. Open `index.html` in a browser.
3. Click **Start your mission** and play through the quiz, heart game, personal notes, and birthday letter.

If you'd prefer a local server, open a terminal in this folder and run:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Add Baby's photos
1. Put five image files in the `assets/` folder, named `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, and `photo5.jpg` (or use PNG/WebP and change the paths).
2. Open `script.js`.
3. Find `PHOTO FILES` near the bottom.
4. Remove the `//` from the `setPhoto(...)` lines. Keep the semicolons.
5. Save and refresh `index.html`.

Example:
```js
setPhoto('photo1', 'assets/photo1.jpg', 'Baby');
setPhoto('photo2', 'assets/photo2.jpg', 'A candid smile');
setPhoto('photo3', 'assets/photo3.jpg', 'A favourite memory');
setPhoto('photo4', 'assets/photo4.jpg', 'A silly moment');
setPhoto('photo5', 'assets/photo5.jpg', 'My favourite photo');
```
The five main photo frames appear on the welcome screen. Extra `setPhoto` lines place images in the quiz, memory section, and finale too. You can reuse the same images in multiple places. Photos must be added to the project before publishing; the browser's edit panel does not upload files.

**Privacy:** a static website makes its included photos accessible to anyone who has the link. Use only photos Baby would be comfortable having shared that way. Compress images to roughly 1 MB or less each for faster loading.

## Personalise the messages
Open `script.js` and edit the `CONTENT` object at the top:
- `name`: the greeting name (currently Baby)
- `tea`: the inside joke about hiring a tea-making person
- `sushi`: the first-sushi memory at Kara Kara
- `admire`: what you admire about her
- `trip`: what you're looking forward to
- `letter`: the final birthday letter
- `sign`: the letter sign-off
- `heartMessages`: the five heart messages
- `quiz`: questions and answer choices
- `notes`: the three expandable personal note cards

Keep the quote marks, commas, and backticks intact when editing JavaScript. The in-page **Personalise the words** panel lets you preview text edits in the browser; edits there aren't saved to disk, so copy permanent changes into `script.js`.

## Publish and share
For a free static page, you can use GitHub Pages or Netlify:
- **GitHub Pages:** create a repository, upload `index.html`, `script.js`, `README.md`, and the `assets/` folder, then enable Pages in the repository's Settings.
- **Netlify:** deploy the project folder or its ZIP using Netlify's manual deploy flow.

After publishing, test the URL on your phone. Then create a QR code for the URL and print it inside a birthday card. Share the link only when you're happy with the photos and letter.

## Current storyboard
1. Welcome: Mission: Make Baby Smile + five photo frames.
2. Quiz: first sushi at Kara Kara, the tea-person hiring joke, and what you admire about her.
3. Heart collector: tap five hearts, each reveals a little message.
4. Little things: three expandable cards for the tea joke, sushi memory, and her qualities.
5. Finale: birthday cake, confetti, and a personal letter full of real feelings and a future together.

All text is editable. Replace any sample phrasing with words that sound like you.
