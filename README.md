# Cantrill AWS Courses Curriculum Comparer

Created with love by: `Thang`

<!-- TODO: 🔗 Deploy and add link here -->
<!-- View online at: [https://lqt-movie-browser.netlify.app/](https://lqt-movie-browser.netlify.app/) -->

Summary: This web app allows user compare **curriculum** between [Cantrill AWS courses](https://learn.cantrill.io/courses/category/aws)

<!-- ## Video Walkthrough
Here's a walkthrough of implemented user stories.
To create a GIF, use [LiceCap](http://www.cockos.com/licecap/), [RecordIt](http://www.recordit.co), or [Loom](http://www.useloom.com), and link the image here in the markdown.
```
<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />
``` -->

<!-- TODO: 🎬 Make a gif and show here -->

## User Stories

### The following functionalities are completed:

- [x] The user can see the list of Cantrill courses for AWS on a page.

  - [x] For each course, the user can see the summary of the curriculum (total/theory/demo duration).
  - [x] For each course, include a link to display a full curriculum on another page.

- [x] In the detail page:

  - [x] The user can see the list of all lectures, group to sections.
  - [x] For each lecture, the use an see the name, tags, duration, and the courses that also has this lecture.
  - [x] The user can show/hide the lectures tags.
  - [x] The user can change the courses to compare to.

### What's next

- [ ] Add navigation bar
- [ ] Add a shared button
- [ ] Add about page
- [ ] Add credit

## License

    Copyright [2024] [Le Quang Thang]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

## Development and regression checks

Use Node.js 22.18 or newer. Run `npm test` for dependency-free tests, or install the locked dependencies with `pnpm install --frozen-lockfile` and use `pnpm dev` / `pnpm build` for the application.

Tests cover saved preferences, blocked storage, URL overrides, duration formatting, and all courses in `app/courses.json`. Curriculum validation also runs when course data is loaded, so malformed references, counts, or duration totals stop the build instead of producing misleading pages.

## Updating curriculum data

`app/courses.json` is a checked-in snapshot, not a live feed. The initial date in `app/curriculum-metadata.json` comes from the last Git commit that changed that file (`7eb21a1c5819a85365490a8ffc9b4c4b047cb61e`, March 2, 2024); it is not a claim that the courses have been reviewed recently.

When refreshing the snapshot, verify the provider's curriculum, update course definitions in `constants/courses.ts` if needed, and update the snapshot metadata with a traceable source revision. Run `npm test` and `pnpm build` before publishing. Do not advance the displayed date for unrelated code changes.
