---
title: "wavesurfer.js Audio Player"
draft: true
date: 2021-02-19
description: "Building a simple, custom JavaScript Waveform Audio Player with wavesurfer.js"
tags: ["Programming", "Web"]
menu:
  main:
    parent: "Blog"
---

## Introduction

HTML5 introduced some great features for the web - the new `<audio>` and `<video>` tags. This replaced a lot of SWF content on the web. It was a great thing for the most part, but there were some downsides to this too. Primarily, I'd say, the inconsistencies in rendering these tags. While a lot of raw HTML would look same in the major browsers (Chrome, Firefox and Safari), this wasn't the case for these media elements. This would make the UIs inconsistent across browsers, thus developers started using libraries to render media on webpages. So today, I'm going to tell you how I added a waveform-based audio player to my website using a great free library [wavesurfer.js](https://wavesurfer-js.org/).

## Diving into the code

Before we actually get our hands dirty, let me warn you regarding the fact that my implementation might not be the best one. It's something that 'just works'.

### HTML

```HTML
<!DOCTYPE html>
<html>
  <head>
    <script src = "/js/uikit-v3.6.16.js" defer></script>
    <script src = "/js/wavesurfer-v4.4.0.js" defer></script>
    <link href = "/css/uikit-v3.6.16.css" rel = "stylesheet">
  </head>
  <body>
    <div class = "audio-container">
      <div class = "audio-player" src = "{{- .Get `src` -}}"></div>
      <hr class = "uk-margin-remove">
      <div class = "uk-flex uk-flex-between">
        <div>
          <svg class = "icon icon-playback paused">
            <use xlink:href = "/images/sprites.svg#mi-playArrow"></use>
          </svg>
          <span class = "time-display uk-margin-small-left uk-text-bold">
            Loading...
          </span>
        </div>
        <div>
          <svg class = "icon icon-volume volUp">
            <use xlink:href = "/images/sprites.svg#mi-volumeUp"></use>
          </svg>
        </div>
      </div>
    </div>
  </body>
</html>
```

### CSS

```CSS
.audio-container {
  background: #212121;
}
.audio-container svg {
  cursor: pointer;
  vertical-align: baseline;
}
.audio-container span {
  font-size: 12px;
  vertical-align: super;
}
.audio-container canvas {
  max-width: none;
}
.audio-container hr + div {
  padding: 7.5px;
}
.audio-container hr + div div {
  height: 20px;
}
```

### SVG

```HTML
<svg width = "0" height = "0">
  <symbol xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 24 24" id = "mi-pause">
    <path d = "M1.7 24h6.9V0H1.7v24zM15.4 0v24h6.9V0h-6.9z"></path>
  </symbol>
  <symbol xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 24 24" id = "mi-playArrow">
    <path d = "M6 6.2l9 5.8-9 5.8V6.2M2.6 0v24l18.9-12L2.6 0z"></path>
  </symbol>
  <symbol xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 24 24" id = "mi-volumeDown">
    <path d = "M18.1 6v12c2.2-1.1 3.8-3.4 3.8-6s-1.6-4.9-3.8-6zM1.6 7.5v9h6l7.5 7.5V0L7.6 7.5h-6zm10.5-.3v9.5l-3.3-3.3H4.6v-3h4.2l3.3-3.2z"></path>
  </symbol>
  <symbol xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 24 24" id = "mi-volumeOff">
    <path d = "M1.9 0L0 1.9l5.8 5.8-.4.3H.1v8h5.3l6.6 6.6v-8.7l5.5 5.5c-.9.6-1.8 1.2-2.9 1.5v2.7c1.8-.4 3.4-1.2 4.8-2.3l2.7 2.7 1.9-1.9L1.9 0zm7.5 16.2l-2.9-2.9H2.7v-2.6h3.7l1.2-1.2 1.7 1.7v5zM21.3 12c0 1.1-.2 2.1-.5 3.1l2 2c.7-1.5 1.2-3.3 1.2-5.1C24 6.3 20 1.6 14.7.4v2.7c3.8 1.2 6.6 4.7 6.6 8.9zM12 1.4L9.5 3.9 12 6.4v-5zM18 12c0-2.3-1.3-4.4-3.3-5.3V9l3.3 3.3c-.1-.1 0-.2 0-.3z"></path>
  </symbol>
  <symbol xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 24 24" id = "mi-volumeUp">
    <path d = "M0 8v8h5.3l6.7 6.7V1.3L5.3 8H0zm9.3-.2v8.5l-2.9-2.9H2.7v-2.7h3.8l2.8-2.9zM18 12c0-2.4-1.4-4.4-3.3-5.4v10.7c1.9-.9 3.3-2.9 3.3-5.3zM14.7.3V3c3.9 1.1 6.7 4.7 6.7 8.9s-2.8 7.8-6.7 8.9v2.7C20 22.5 24 17.7 24 12S20 1.5 14.7.3z"></path>
  </symbol>
</svg>
```

### Python

```PY
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

### JavaScript

```JS
window.addEventListener('load', () => {
  var wavesurfers = [];
  var setupAudio = (function setupAudio() {
    var mediaA = document.querySelectorAll('.audio-player');
    switch (mediaA.length > 0) {
      case false:
        break;
      default:
        mediaA.forEach(medium => {
          var source = medium.getAttribute('src');
          var playIcon = medium.parentElement.querySelector('.icon-playback');
          var volumeIcon = medium.parentElement.querySelector('.icon-volume');
          playIcon.style.pointerEvents = 'none';
          playIcon.style.filter = 'brightness(50%)';
          var wavesurfer = WaveSurfer.create({
            height: 75,
            barWidth: 3,
            pixelRatio: 1,
            barMinHeight: 1,
            normalize: true,
            responsive: true,
            container: medium,
            partialRender: true,
            waveColor: '#FFE078',
            cursorColor: '#03A9F4',
            progressColor: '#03A9F4'
          });
          wavesurfers.push(wavesurfer);
          function setTime() {
            medium.parentElement.querySelector('.time-display').innerHTML = new Date(wavesurfer.getCurrentTime() * 1000).toISOString().substr(14, 5) + ' / ' + new Date(wavesurfer.getDuration() * 1000).toISOString().substr(14, 5);
          };
          (async () => {
            var response = await fetch(source.substring(0, source.length - 3) + 'json');
            var peaks = await response.json();
            wavesurfer.load(source, peaks.data);
            wavesurfer.fireEvent('interaction');
          })();
          wavesurfer.on('ready', () => {
            setTime();
            playIcon.style.pointerEvents = 'all';
            playIcon.style.filter = 'brightness(100%)';
          });
          wavesurfer.on('finish', () => {
            playIcon.classList.add('paused');
            playIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-playArrow');
          });
          wavesurfer.on('seek', setTime);
          wavesurfer.on('audioprocess', setTime);
          playIcon.addEventListener('click', () => {
            switch (playIcon.classList.contains('paused')) {
              case true:
                wavesurfer.play();
                playIcon.classList.remove('paused');
                playIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-pause');
                break;
              default:
                wavesurfer.pause();
                playIcon.classList.add('paused');
                playIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-playArrow');
            };
          });
          volumeIcon.addEventListener('click', () => {
            switch (true) {
              case volumeIcon.classList.contains('volUp'):
                wavesurfer.setVolume(0.5);
                volumeIcon.classList.add('volDown');
                volumeIcon.classList.remove('volUp');
                volumeIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-volumeDown');
                break;
              case volumeIcon.classList.contains('volDown'):
                wavesurfer.setVolume(0);
                volumeIcon.classList.add('volOff');
                volumeIcon.classList.remove('volDown');
                volumeIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-volumeOff');
                break;
              default:
                wavesurfer.setVolume(1);
                volumeIcon.classList.add('volUp');
                volumeIcon.classList.remove('volOff');
                volumeIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-volumeUp');
            };
          });
        });
      wavesurfers.forEach(wavesurfer => {
        wavesurfer.on('play', () => {
          var otherWavesurfers = wavesurfers.filter(otherWavesurfer => otherWavesurfer != wavesurfer);
          otherWavesurfers.forEach(otherWavesurfer => {
            otherWavesurfer.pause();
            var playIcon = otherWavesurfer.mediaContainer.parentElement.querySelector('.icon-playback');
            playIcon.classList.add('paused');
            playIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-playArrow');
          });
        });
      });
    };
    return setupAudio;
  })();
});
```