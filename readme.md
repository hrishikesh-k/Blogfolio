Please note:

1. This is not a theme for Hugo. It's a complete website. There are not many variables or easy options to configure. You might need to edit the code directly.

1. This repository contains lots of media files and the total size goes beyond 400 MiB. Please take that into consideration before cloning or downloading the repository as it is.

# Blogfolio

Repository of my personal website (portfolio + blog), made in Hugo, hosted on Netlify. [Check it out here](https://www.hrishikeshk.ml/).

## TOC

- [What is this repository?](#what-is-this-repository)
- [Getting started](#getting-started)
  * [File structure](#file-structure)
    + [`./` directory](#-diretory)
    + [`./animations/` directory](#animations-directory)
    + [`./content/` directory](#content-directory)
    + [`./layouts` directory](#layouts-directory)
    + [`./static/` directory](#static-directory)
- [Features and customization](#features-and-customization)
  * [UIkit-based](#uikit-based)
  * [Light/Dark mode](#lightdark-mode)
  * [Frontmatter](#frontmatter)
  * [Taxonomy](#taxonomy)
  * [Markdown links](#markdown-links)
  * [Media](#media)
    + [Image](#image)
      - [Gallery](#gallery)
    + [Audio](#audio)
    + [Video](#video)
    + [Media optimization](#media-optimization)
  * [Single Page Application (SPA)](#single-page-application-spa)
  * [Contact form](#contact-form)
  * [Comments](#comments)
  * [Search](#search)
  * [Table Of Contents](#table-of-contents)
  * [Pagination](#pagination)
  * [Off-canvas menu](#off-canvas-menu)
  * [PWA](#pwa)
    + [Offline support](#offline-support)
  * [SEO](#seo)
    + [`<meta>` tags](#meta-tags)
    + [Structured data](#structured-data)
    + [Sitemap](#sitemap)
  * [Social sharing](#social-sharing)
- [Using this code](#using-this-code)
- [Support](#support)
- [License](#license)

## What is this repository?

After struggling to make my personal portfolio website in Gatsby for months by trying different starters and themes, it was time I either looked for alternative ways or give up on the plan. I finally decided to give Hugo a shot and being a newcomer, I checked out the availability of templates first. I found a few interesting ones and so, decided to start developing. I watched Mike Dane's Hugo tutorial series on YouTube and was intrigued by the fact that Hugo was mostly dependent on pure HTML. So, instead of using a theme, I switched to a custom layout and design. This repository is the end result of a lot of Google searches, YouTube videos, forums posts, etc.

[Back to TOC](#TOC)

## Getting started

If someone wants to get a hold of this code, this section contains some trivial getting started information. It is assumed that Hugo (v0.81.0) is installed and configured on the system.

Some features would also need `Node.js`, `Python`, `FFmpeg`, etc. installed, but it's optional.

[Back to TOC](#TOC)

### File structure

Here's a vital file structure to help you understand it better. Only the vital files for the functioning of this website are listed, the content files are excluded. Once you understand this organization structure, it would be easy for you to follow the rest of the guide.

```
./
├── animations/
│   ├── assets.cdr
│   ├── error404.saola
│   ├── home.saola
│   └── offline.saola
├── content/
│   ├── blog/
│   │   └── _index.md
│   ├── projects/
│   │   └── _index.md
│   ├── tags/
│   │   └── _index.md
│   ├── 404.md
│   ├── about.md
│   ├── contact.md
│   ├── offline.md
│   └── search.md
├── layouts/
│   ├── _default/
│   │   └── _markdown/
│   │   │   ├── render-image.html
│   │   │   └── render-link.html
│   │   ├── baseof.html
│   │   ├── section.html
│   │   ├── single.html
│   │   ├── taxonomy.html
│   │   └── term.html
│   ├── page/
│   │   ├── 404.html
│   │   ├── contact.html
│   │   ├── offline.html
│   │   └── search.html
│   ├── partials/
│   │   ├── breadcrumbs.html
│   │   ├── header.html
│   │   ├── nav-btn.html
│   │   ├── navigation.html
│   │   ├── pagination.html
│   │   └── toc.html
│   ├── shortcodes/
│   │   ├── audio.html
│   │   ├── gallery.html
│   │   └── video.html
│   ├── index.html
│   ├── index.json
│   ├── index.logic.js
│   ├── index.manifest.json
│   ├── index.sprites.svg
│   ├── index.styles.css
│   ├── index.sw.js
│   ├── robots.txt
│   └── sitemap.xml
├── static/
│   ├── animations/
│   │   ├── error404.js
│   │   ├── home.js
│   │   └── offline.js
│   ├── css/
│   │   ├── gitalk-v1.7.0.css
│   │   ├── glide-v3.4.1.css
│   │   └── uikit-v3.6.16.css
│   ├── images/
│   │   ├── chrome-icon-192.png
│   │   ├── chrome-icon-512.png
│   │   ├── explorer-square-70.png
│   │   ├── explorer-square-150.png
│   │   ├── explorer-square-310.png
│   │   ├── explorer-wide.png
│   │   ├── og.png
│   │   ├── safari-home.png
│   │   ├── safari-pinned.svg
│   │   └── twitter.png
│   ├── js/
│   │   ├── dplayer-v1.26.0.js
│   │   ├── flexsearch-v0.7.0-light.js
│   │   ├── gitalk-v1.7.0.js
│   │   ├── glide-v3.4.1.js
│   │   ├── hls-v1.0.0-beta4-light.js
│   │   ├── saola-animate-v3.0.0.js
│   │   ├── turbo-v7.0.0-beta.4.js
│   │   ├── uikit-v3.6.16.js
│   │   └── wavesurfer-v4.4.0.js
│   ├── browserconfig.xml
│   └── favicon.ico
├── config.toml
└── netlify.toml
```

[Back to TOC](#TOC)

#### `./` directory

In the root directory, the 2 most important files are `config.toml` and `netlify.toml`. You probably would not need to edit `netlify.toml`. However, in `config.toml`, you need to edit the `baseURL`. Don't keep it `/` as Hugo uses this parameter to generate links in `sitemap.xml`. Also, you need to end the URL with a `/` to match all other configurations in the code.

[Back to TOC](#TOC)

#### `./animations/` directory

his folder contains the HTML5 animations I made in [Saola Animate v3.0.0](https://atomisystems.com/saola-animate/). So, unless you want to edit the animations, this folder can be safely deleted.

[Back to TOC](#TOC)

#### `./content/` directory

The `content` directory is supposed to have all the content files (Markdown, page assets, etc.) that you'd need. You can organise it in sections or create single pages. I have also created the `tags` directory to add all my tags to my menu as there's no other way to do it automatically while maintaining its order in the menu.

[Back to TOC](#TOC)

#### `./layouts/` directory

This is one of the most important directories as it contains all the templates and page creation logic. It consists of:

1. `_default` directory: This one contains the default pages, that is the base page consisting of the top-level skeleton of the page and also other templates like `section`, `single`, `taxonomy` and `term`. It also consists of `_markdown` directory which contains the templates to manipulate the rendering of certain Markdown syntax.

1. `page` directory: This one contains the single pages for the name mentioned in the `frontmatter` of the Markdown files.

1. `partials` directory: This one contains some re-usable components that I have used in the files in the `_default` directory.

1. `shortcodes` directory: This one contains some re-usable components that are required by the Markdown files.

1. `index.html`: Home page.

1. `index.json`: Search index.

1. `index.logic.js`: Custom JavaScript.

1. `index.manifest.json`: Manifest for PWA.

1. `index.sprites.svg`: SVG icon sprites.

1. `index.styles.css`: Custom CSS.

1. `index.sw.js`: Service Worker.

1. `robots.txt`: Search Engine rules.

1. `sitemap.xml`: All Search Engine indexable pages.

[Back to TOC](#TOC)

#### `./static/` directory

Static folder is directly mapped to the root of the website. All the required CSS and JS libraries are stored in the `./css/` and `./js/` folder. This is because they're pre-minified and I didn't want Hugo to process them. I have directly referenced them in my HTML files. This folder also consists contains images needed by the entire website, etc. The generated files of the animations exist in `./animations/` folder. So, if you're not planning to use the animations, you can delete that folder too.

[Back to TOC](#TOC)

## Features and customization

With my limited skill set, I have tried to add the most essential features for the website to 'just work'. Nothing fancy, but after a lot of trial and error, everything that's set-up seems to work fine. While I'm not a UI/UX designer myself, I have tried to think of best practices according to the users' point of view.

[Back to TOC](#TOC)

### UIkit-based

I have chosen UIkit as a front-end library for this website. It gives a clean, minimalistic and responsive layout almost out of the box. It also has a wide range of components to use. [Check it out here](https://github.com/uikit/uikit).

[Back to TOC](#TOC)

### Light/Dark mode

The website comes with support for light/dark mode out of the box. By default, it's configured to adapt to system settings. If the user's system (and browser) is set to use light mode, the website will load in light mode. The same goes for dark mode. However, the end-user has an option to override the mode settings. When the theme button is clicked, the theme is toggled. It's done using appending a `class` to `<html>`, either `light-theme` or `dark-theme` and changing colours using `CSS variables`. Once a user manually toggles the mode, the preference is stored in `localstorage`. So, on subsequent visits, the manually set theme takes preference. I have set the light mode as the default. This is used when the user's system doesn't report any preferred theme and if the user has not set a preferred theme.

[Back to TOC](#TOC)

### Frontmatter

All available frontmatter variables:

```
---
title: "string"
date: YYYY-MM-DD
description: "string"
tags: ["string", "string"]
static: boolean
layout: "string"
menu:
  main:
    parent: "string"
_build:
  render: boolean
---
```

`title` (mandatory): It contains the title of the post. It's shown on the list pages. It's also used in SEO tags, the title of the webpage and shown on the post's page itself.

`date` (mandatory): The date of the post. It must be in the format YYYY-MM-DD. It is used to sort posts. The latest ones are shown first.

`description` (mandatory): It has the same functionality as the `title`, except it won't be shown in the title of the webpage.

`tags` (recommended): It contains the list of tags the post is supposed to be categorized in.

`static` (optional): It accepts only boolean values, that is, true or false. When not specifying, it defaults to false. For all pages with the value of this variable = true, a comment box won't be rendered.

`layout` (optional): It can contain any string value. The value that you provide here should match the name of the file in `layouts/page/*.html`, where * is the value of the string. When this parameter is specified, the page will be generated using the contents of the HTML file and not using the default single page template.

```
menu:
  main:
    pre: "string"
    weight: integer
    parent: "string"
```
(recommended) It's used to configure the positioning of a page in the menu. `pre` contains the name of the icon. It should exist in `./layouts/index.sprites.svg` with the prefix `mi-`. `weight` defines the position of the page in the menu. `parent` defines the parent of the menu item.

```
_build:
  render:
```
(optional): It accepts only boolean values. Not specifying it, defaults to true. When this parameter is specified as false, the page won't be rendered.

[Back to TOC](#TOC)

### Taxonomy

The website is configured to use Tags as its taxonomy. A page is automatically generated for each tag that's added in the frontmatter. A class is automatically generated for each tag with a unique name and it follows the convention `.tag-<name>`. To customise the colours, edit `./layouts/index.styles.css`.

[Back to TOC](#TOC)

### Markdown links

Markdown is configured to render 5 types of links:

1. Internal links 1 (`[Link text](/relative-path/)`): Internal links are loaded directly using the [internal navigation of the website](#single-page-application-spa).

1. Internal links 2 (`[Link text](relative-path/)`): You can drop the `/` from the start of the link to exempt that link from the internal navigation. This will cause a full-page reload and have a `nofollow` attribute.

1. Anchor links (`[Link text](#relative-path)`): Anchor links are configured to scroll smoothly to the destination.

1. External links: (`[Link text](https://www.domain.tld/page/)`): External links are configured to open in new tab with the `rel = "nofollow noopener noreferrer"` attribute and also show an indication.

1. `mailto` links (`[user@example.com](mailto)`): `mailto` links open in a new tab (or open the default mail client) and show an indication.

[Back to TOC](#TOC)

### Media

The code is configured to handle image, audio and video files. However, some special treatment is needed for it to work perfectly.

[Back to TOC](#TOC)

#### Image

There are three types of images: Cover images, post images and social images.

Cover images are not optional and need to exist at `./content/<section>/<slug>/assets/cover.png`.

Social images for posts are also not optional and need to exist at `./content/<section>/<slug>/assets/og.png` and `./content/<section>/<slug>/assets/twitter.png`. More info [below](#social-sharing).

Post images on the other hand are totally optional. They must exist inside the `./content/<section>/<slug>/assets/` directory. The standard Markdown image syntax can be used to add those images to the page.

Cover and post images are responsive by default. That means, they will adapt to the screen size to prevent overflows, etc. However, no optimised sizes of the images would be generated. You need to handle the compression, optimization, etc. yourself.

For each of the cover and post image, you'd also have to generate a low-quality placeholder (width ≈ 64px) of the same ratio as the original image. These images should exist at the same location as that of the original images and should be suffixed by `-low`. For example, a high-quality cover would be `cover.png` and the low quality one would be `cover-low.png`.

Even though the examples mention `.png` extension, you're free to use `.jpg` images too.

[Back to TOC](#TOC)

##### Gallery

Alongside the standard images of Markdown, you can also create image galleries/slideshows. It's made possible with the `{{< gallery >}}` shortcode. It accepts any number of parameters, however, none of it should be named. The image paths should be relative to the post and the alt text for the images should be separated with a `:`. The images used in the gallery also need to have a low-quality placeholder as mentioned above. All images need to be of the same size. It will work with different sized images, but there would be inconsistencies in the overall layout. Here's an example usage of the shortcode:

```go
{{< gallery "assets/img1.png:Alt text 1" "assets/img2.png:Alt text 2" >}}
```

The gallery is made possible using [Glide.js](https://github.com/glidejs/glide).

[Back to TOC](#TOC)

#### Audio

Audio files can be added to Markdown files using the `{{< audio >}}` shortcode. It accepts only one parameter `src`. Add the source URL of the audio file there. Only `.mp3`, `.ogg` and `.wav` files are supported. For example:

```go
{{< audio src = "assets/audio.mp3" >}}
```

The audio player is generated using [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js). For this to fully work, you'd also need to generate a JSON file and save it along with the audio file with the same name. For example, if the audio file exists at `./content/<section>/<slug>/assets/audio.mp3`, the JSON file must exist at `./content/<section>/<slug>/assets/audio.json`. This JSON needs to be generated manually. To do this, you'd need Python installed and configured on your system.

To generate the JSON, use [audiowaveform](https://github.com/bbc/audiowaveform). Once you have it installed and configured on your system, use the following command in your shell:

```sh
audiowaveform -i audio.mp3 -o audio.json --pixels-per-second 20 --bits 8
```

Once you get a JSON file, create a file called `scaleJSON.py` with the following code:

```py
import json
import sys

if len(sys.argv) < 2:
    print("Usage: python scale-json.py file.json")
    exit()

filename = sys.argv[1]

with open(filename, "r") as f:
    file_content = f.read()

json_content = json.loads(file_content)
data = json_content["data"]
digits = 2

max_val = float(max(data))
new_data = []
for x in data:
    new_data.append(round(x / max_val, digits))

json_content["data"] = new_data
file_content = json.dumps(json_content, separators=(',', ':'))

with open(filename, "w") as f:
    f.write(file_content)
```

Then, at the location of this file, run the following command:

```sh
python scaleJSON.py audio.json
```

Use this generated JSON in the location mentioned before.

[Back to TOC](#TOC)

#### Video

Videos can be inserted in Markdown using `{{< video >}}` shortcode. It accepts 4 parameters: `src`, `poster`, `thumbnails` and `subtitles`. Only the `subtitles` parameter is optional. The video supports only `HLS (m3u8)` stream which is specified by the `src` parameter. It must have at least 5 qualities: 256px × 144p, 426px × 240p, 640px × 360p, 854px × 480p, 1280px × 720p, 1920px × 1080px and in the same order. Higher qualities can be included too. By default, 1080p quality is selected. `poster` and `thumbnails` parameters can contain any image file, however, the thumbnails need to be generated in a special way (more on that below). Subtitles only support `.vtt` files and only 1 subtitle file per video is accepted. It can be used like:

```go
{{< video src = "assets/video.m3u8" poster = "assets/poster.png" thumbnails = "assets/thumbnails.jpg" subtitles = "assets/subtitles.vtt" >}}
```

The video player is made possible using [DPlayer](https://github.com/DIYgod/DPlayer) and [hls.js](https://github.com/video-dev/hls.js).

The required `.m3u8` file can be generated with the following command (needs ffmpeg installed and configured):

```sh
ffmpeg ^
-i vid1-2160p.mp4 ^
-sc_threshold 0 ^
-keyint_min 60 ^
-c:v libx264 ^
-c:a aac ^
-r 30 ^
-g 60 ^
-map v:0 -s:0 3840x2160 -maxrate:0 3M -bufsize:0 6M ^
-map v:0 -s:1 2160x1440 -maxrate:1 2.7M -bufsize:1 5.4M ^
-map v:0 -s:2 1920x1080 -maxrate:2 2.4M -bufsize:2 4.8M ^
-map v:0 -s:3 1280x720 -maxrate:3 2.1M -bufsize:3 4.2M ^
-map v:0 -s:4 854x480 -maxrate:4 1.8M -bufsize:4 3.6M ^
-map v:0 -s:5 640x360 -maxrate:5 1.5M -bufsize:5 3M ^
-map v:0 -s:6 426x240 -maxrate:6 1.2M -bufsize:6 2.4M ^
-map v:0 -s:7 256x144 -maxrate:7 0.9M -bufsize:7 1.8M ^
-map a:0 -b:a:0 128k ^
-map a:0 -b:a:1 128k ^
-map a:0 -b:a:2 128k ^
-map a:0 -b:a:3 96k ^
-map a:0 -b:a:4 80k ^
-map a:0 -b:a:5 64k ^
-map a:0 -b:a:6 48k ^
-map a:0 -b:a:7 32k ^
-var_stream_map "v:0,a:0,name:2160p v:1,a:1,name:1440p v:2,a:2,name:1080p v:3,a:3,name:720p v:4,a:4,name:480p v:5,a:5,name:360p v:6,a:6,name:240p v:7,a:7,name:144p" ^
-master_pl_name vid1.m3u8 ^
-f hls ^
-hls_time 2 ^
-hls_playlist_type vod ^
-hls_segment_filename vid1-%v/segment-%03d.ts ^
vid1-%v/index.m3u8
```

The above command can be used as-is for 4K (2160p) 30FPS videos. For videos with other resolutions, you might have to reduce the number of `map` statements. For a different frame rate, change the value of `-keyint_min`, `-r` and `-g`. `-r` = FPS. `-keyint_min` = `-g` = 2 × FPS. Also, kindly note, the above command is beautified for easy editing. When actually using the command (at least on Windows), it should all go in one single line.

To generate the video thumbnails, run the following command (needs Node.js installed and configured): `npm install -g dplayer-thumbnails`. Once installed, thumbnails can be generated using the following command `dplayer-thumbnails -o ./thumbnails.jpg -q 100 video.mp4`

[Back to TOC](#TOC)

#### Media optimization

Cover and post images are lazy-loaded but are not optimised by the code. That is, no responsive sizes etc. are generated, the compression and optimization are to be done by the developer.

Since audio and video files are known to be heavy on bandwidth, there are some special features added to handle them:

1. Only 1 instance of a media player can be played on one page. As soon as any other player is played, all others are paused. The players continue to remain paused even when the new player is paused.

1. Media players are paused when any part of them is scrolled out of the viewport, or the tab is changed or the device gets disconnected from the internet. Once any of these conditions are reverted back to the normal state, the paused state persists.

[Back to TOC](#TOC)

### Single Page Application (SPA)

The internal navigation of the website is managed using [Turbo](https://github.com/hotwired/turbo). It gives the feel of a SPA by not reloading the entire page to navigate. The body content is replaced with the new body requested using AJAX.

[Back to TOC](#TOC)

### Contact form

There's a contact form set up to work with Netlify forms + AJAX submission. It shows a toast notification for submitting, success and error.

[Back to TOC](#TOC)

### Comments

A comment system has been setup to show comments on all content pages not marked as `static` in the frontmatter. This is made possible using [Gitalk](https://github.com/gitalk/gitalk). You'd have to change it with your values in `./layouts/index.logic.js`. You'd have to update the following:

```js
new Gitalk({
  repo: 'string',
  owner: 'string',
  admin: 'string',
  clientID: 'string',
  clientSecret: 'string',
}).render(comments)
```

[Back to TOC](#TOC)

### Search

A client-side search has been implemented which should work out of the box without any changes. It is made possible by [FlexSearch.js](https://github.com/nextapps-de/flexsearch). The search features 'search-as-you-type' and query parameter support. While 'search-as-you-type' is self-explanatory, by query parameter support, I mean, it responds to search queries directly from URL, for example: `https://www.domain.tld/search/?q=hello` would search the website for `hello`. This helps to also enable the Potential Action in Structured Data.

[Back to TOC](#TOC)

### Table Of Contents

A sticky TOC is generated for all content pages for the `<h2-4>` headings. Everything is pre-configured and automatic, including the numbering of headings.

[Back to TOC](#TOC)

### Pagination

There's support for pagination of posts on list pages (except taxonomy page). The pagination shows the following buttons (from left to right): First page, previous page, current page, next page and last page. Only the available buttons are generated, that is when on the second page, a button for the first page won't be generated because previous page = first page.

[Back to TOC](#TOC)

### Off-canvas menu

The website's internal navigation is managed by an off-canvas menu. The generation of the menu is automatic to some extent, that is, all the posts are automatically added to the menu. However, any taxonomy or single page should be added/removed manually. The icon for each should also be added to `./layouts/index.sprites.svg`.

[Back to TOC](#TOC)

### PWA

The website is configured to be installable as a Progressive Web Application. You'd have to customise the website name, etc. The title from `./config.toml` is used. Each section also generates a shortcut, icons for which need to be generated manually.

[Back to TOC](#TOC)

#### Offline support

By default, the service worker is caching all files needed by the website from the `./static/` directory, along with all the custom CSS and JS that's generated. Additionally, it's also caching the 404 and the offline page. The service worker is configured to show the home page when offline and any other page (except 404) would show the offline page. If any of the content organization is changed, make sure to edit the service worker at `./layouts/index.sw.js`. The service worker also responds to all the fetch events to all the `GET` requests, while the `POST` requests are ignored. So, any cached file is later served by the service worker. Moreover, it's easy to update an already installed service worker is users' browsers by just updating the service worker version number.

Users are also shown a toast notification whenever they get disconnected from the internet. It can be dismissed by clicking on it, but otherwise, it stays permanently. As soon as the internet is back, another notification is fired to let them know. Any audio/video player on the page or contact form is disabled whenever the user goes offline and is enabled whenever they're back online.

[Back to TOC](#TOC)

### SEO

The website has been configured with some of the best SEO practices.

[Back to TOC](#TOC)

#### `<meta>` tags

All the `<meta>` tags are set up in `./layouts/_default/baseof.html`. The `title` and the `description` of the pages are conditionally generated according to their type. Paginated pages also get a bit of a different treatment. The title from the `./config.toml` is automatically appended to the page's title. The keywords are also added to the same file. They're the same on each page. Other `meta` tags like the viewport tag, etc. are also included.

[Back to TOC](#TOC)

#### Structured data

The website also makes use of JSON-LD structured data. They are also conditionally generated like the `meta` tags. The Potential Action is enabled for all of the pages. For eligible pages, Breadcrumbs are also enabled.

[Back to TOC](#TOC)

#### Sitemap

The sitemap is set up to add the home page and all content pages, list pages, taxonomy pages and paginated pages. However, any single page should be added/removed manually.

404 and Offline pages are blocked by the `noindex` tag.

[Back to TOC](#TOC)

### Social sharing

The most common social media `meta` tags, OG and Twitter (Card) ones are already included. For all content pages, there must exist a `./contents/<section>/<slug>/assets/og.png` and `./contents/<section>/<slug>/assets/twitter.png` of size 1200px × 638px and 1200px × 600px respectively. For all other pages, the images from `./static/images/` directory are used.

[Back to TOC](#TOC)

## Using this code

While I've manually run a lost of tests to check every aspect of this website, there can always be scenarios in which I've missed something. Moreover, I don't have any Apple device to test Safari browsers. Sometimes, some external libraries break certain stuff. Basically, while there are no known issues currently, the same cannot be said for the future.

Also, my skillset in programming is fairly limited. Thus, there might be instances in which you might find a lot of unoptimized, sub-optimal pieces of code. In such cases, kindly [start a new discussion](https://github.com/Hrishikesh-K/Blogfolio/discussions/).

Since this code is MIT licensed, you're free to use it, modify it or redistribute it as you like, with or without credits.

[Back to TOC](#TOC)

## Support

I'd be happy to help anyone regarding anything about this website. In case of a how-to, suggestion, security concern or a feature request, kindly open an issue. I usually respond in a few hours. However, I cannot make any promises for feature requests as I said, my skills in programming are fairly limited. However, kindly note, I speak English, Hindi and Marathi. So, if you write in any other language, I might not be able to respond.

However, please make sure to ask for help related to issues only with my part of the code as I can't fix issues caused by other libraries. I do keep libraries updated to the latest versions as fast as possible, so such problems should be less, but unavoidable.

[Back to TOC](#TOC)

## License

MIT License

Copyright (c) 2021 Hrishikesh Kokate

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[Back to TOC](#TOC)