import OpinionJS from 'opinionjs'

window.addEventListener('load', () => {

  var searchSite;
  var searchInput;
  var contactForm;
  var resizeInput;
  var messageInput;
  var clickHandler;
  var submitContact;
  var placeAnimation;
  var onlineFunctions;
  var wavesurfers = [];
  var videoPlayers = [];
  var glidePlayers = [];

  Turbo.setProgressBarDelay(0);

  (function themeSetter() {
    var html = document.querySelector('html');
    var checkTheme = (function checkTheme() {
      var selectedTheme = localStorage.getItem('theme');
      switch (selectedTheme) {
        case null:
          switch (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            case true:
              html.classList.add('dark-theme');
              html.classList.remove('light-theme');
              break;
            case false:
              html.classList.add('light-theme');
              html.classList.remove('dark-theme');
          };
          break;
        default:
          html.classList.add(selectedTheme + '-theme');
      };
      return checkTheme;
    })();
    document.querySelector('#theme-btn').addEventListener('click', () => {
      switch (html.classList.contains('light-theme')) {
        case true:
          html.classList.add('dark-theme');
          html.classList.remove('light-theme');
          localStorage.setItem('theme', 'dark');
          break;
        case false:
          html.classList.add('light-theme');
          html.classList.remove('dark-theme');
          localStorage.setItem('theme', 'light');
      };
    });
    window.matchMedia('(prefers-color-scheme: dark)').addListener(checkTheme);
    return themeSetter;
  })();

  function pauseAudio(element) {
    element.pause();
    var playIcon = element.mediaContainer.parentElement.querySelector('.icon-playback');
    playIcon.classList.add('paused');
    playIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-playArrow');
  };

  function outViewport(element) {
    var inViewport;
    var bounds = element.getBoundingClientRect();
    switch (bounds.top > 0 && bounds.bottom < window.innerHeight) {
      case true:
        inViewport = false;
        break;
      default:
        inViewport = true;
    };
    return inViewport;
  };

  function enableElement(element) {
    element.style.pointerEvents = 'all';
    element.style.filter = 'brightness(100%)';
  };

  function disableElement(element) {
    element.style.pointerEvents = 'none';
    element.style.filter = 'brightness(50%)';
  };

  var setupAudio = (function setupAudio() {
    wavesurfers = [];
    var mediaA = document.querySelectorAll('.audio-player');
    switch (mediaA.length > 0) {
      case false:
        break;
      default:
        mediaA.forEach(medium => {
          var source = medium.getAttribute('src');
          var playIcon = medium.parentElement.querySelector('.icon-playback');
          var volumeIcon = medium.parentElement.querySelector('.icon-volume');
          disableElement(playIcon);
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
            enableElement(playIcon);
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
    };
    return setupAudio;
  })();

  var setupVideo = (function setupVideo() {
    videoPlayers = [];
    var mediaV = document.querySelectorAll('.video-player');
    switch (mediaV.length > 0) {
      case true:
        mediaV.forEach(medium => {
          var qualities = [];
          var hls = new Hls();
          var subtitles = null;
          var source = medium.getAttribute('src');
          hls.loadSource(source);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            hls.levels.forEach(level => {
              var quality = {
                type: 'hls',
                name: level.height + 'p',
                url: 'assets/' + source.substring(source.length - 9, source.length - 5) + '-' + level.height + 'p/index.m3u8'
              };
              qualities.push(quality);
            });
            switch (medium.hasAttribute('subtitles')) {
              case true:
                subtitles = {
                  type: 'webvtt',
                  url: medium.getAttribute('subtitles')
                };
                break;
              default:
                break;
            };
            var videoPlayer = new DPlayer({
              volume: 1,
              lang: 'en',
              airplay: false,
              container: medium,
              preload: 'metadata',
              subtitle: subtitles,
              playbackSpeed: [0.5, 1, 2],
              video: {
                defaultQuality: 5,
                quality: qualities,
                pic: medium.getAttribute('poster'),
                thumbnails: medium.getAttribute('thumbnails')
              }
            });
            videoPlayers.push(videoPlayer);
            var volumeIcon = medium.querySelector('.dplayer-volume');
            var volumeIconClone = volumeIcon.cloneNode(true);
            volumeIcon.parentNode.replaceChild(volumeIconClone, volumeIcon);
            volumeIcon = medium.querySelector('.dplayer-volume');
            volumeIcon.classList.add('volUp');
            volumeIcon.addEventListener('click', () => {
              switch (true) {
                case volumeIcon.classList.contains('volUp'):
                  videoPlayer.volume(0.5, true, false);
                  volumeIcon.classList.add('volDown');
                  volumeIcon.classList.remove('volUp');
                  volumeIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-volumeDown');
                  break;
                case volumeIcon.classList.contains('volDown'):
                  videoPlayer.volume(0, true, false);
                  volumeIcon.classList.add('volMute');
                  volumeIcon.classList.remove('volDown');
                  volumeIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-volumeOff');
                  break;
                default:
                  videoPlayer.volume(1, true, false);
                  volumeIcon.classList.add('volUp');
                  volumeIcon.classList.remove('volMute');
                  volumeIcon.querySelector('use').setAttribute('xlink:href', '/images/sprites.svg#mi-volumeUp');
              };
            });
            switch (wavesurfers.length > 0) {
              case true:
                videoPlayer.on('play', () => {
                  wavesurfers.forEach(wavesurfer => {
                    pauseAudio(wavesurfer);
                  });
                });
                break;
              default:
                break;
            };
          });
        });
        break;
      default:
        break;
    };
    return setupVideo;
  })();

  var loadGallery = (function loadGallery() {
    document.querySelectorAll('.glide').forEach(glidePlayer => {
      var glide = new Glide(glidePlayer, {
        rewindDuration: 750,
        animationTimingFunc: 'ease',
        classes: {
          activeNav: 'uk-active',
        }
      }).mount();
      glidePlayers.push(glide);
    });
    return loadGallery;
  })();

  var deleteCovers = (function deleteCovers() {
    var images = document.querySelectorAll('.img');
    switch (images) {
      case null:
        break;
      default:
        images.forEach(image => {
          var div = image.querySelector('div');
          var actualImage = image.querySelector('img');
          var checkImage = (function checkImage() {
            switch (actualImage.getAttribute('src').startsWith('data')) {
              case true:
                break;
              default:
                actualImage.removeAttribute('style');
                switch (div) {
                  case null:
                    break;
                  default:
                    div.remove();
                };
            };
            return checkImage;
          })();
          var observer = new MutationObserver(() => {
            checkImage();
            switch (typeof observer == 'undefined') {
              case true:
                break;
              default:
                observer.disconnect();
            };
          }).observe(image, {
            subtree: true,
            childList: true,
            attributes: true
          });
        });
    };
    return deleteCovers;
  })();

  var setupContact = (function setupContact() {
    messageInput = null;
    contactForm = document.querySelector('.contact-form');
    switch (contactForm) {
      case null:
        break;
      default:
        messageInput = contactForm.querySelector('#message-input');
        resizeInput = (function resizeInput() {
          messageInput.style.height = messageInput.scrollHeight + 'px';
          return resizeInput;
        });
        submitContact = (function submitContact(event) {
          event.preventDefault();
          disableElement(contactForm);
          UIkit.notification.closeAll();
          UIkit.notification({
            timeout: 0,
            status: 'default',
            pos: 'bottom-center',
            message: '<svg class="icon icon-primary submit-progress"><use xlink:href=/images/sprites.svg#mi-publishedWithChanges></use></svg><span class=uk-margin-small-left>Submitting...</span>'
          });
          fetch('/', {
            method: 'POST',
            body: new URLSearchParams(new FormData(this)).toString(),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response) => {
            UIkit.notification.closeAll();
            switch (response.ok) {
              case true:
                UIkit.notification({
                  timeout: 5000,
                  status: 'success',
                  pos: 'bottom-center',
                  message: '<svg class="icon uk-margin-small-right"><use xlink:href=/images/sprites.svg#mi-done></use></svg><span>Successfully submitted.</span>'
                });
                contactForm.reset();
                break;
              default:
                UIkit.notification({
                  timeout: 5000,
                  status: 'danger',
                  pos: 'bottom-center',
                  message: '<svg class="icon uk-margin-small-right"><use xlink:href=/images/sprites.svg#mi-close></use></svg><span>Something went wrong.</span>'
                });
            };
            enableElement(contactForm);
          }).catch(() => {
            UIkit.notification.closeAll();
            UIkit.notification({
              timeout: 5000,
              status: 'danger',
              pos: 'bottom-center',
              message: '<svg class="icon uk-margin-small-right"><use xlink:href=/images/sprites.svg#mi-close></use></svg><span>Something went wrong.</span>'
            });
            enableElement(contactForm);
          });
          return submitContact;
        });
        messageInput.addEventListener('input', resizeInput);
        contactForm.addEventListener('submit', submitContact);
    };
    return setupContact;
  })();

  var setupComments = (function setupComments() {
    var comments = document.querySelector('#comment-form');
    switch (comments) {
      case null:
        break;
      default:
        new OpinionJS({
          commentContainer: 'body',
          dateFormat: 'en-IN',
          form: '#comment-form',
          title: document.title.split('|')[0].trim().toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (spaces, firstCharacters) => firstCharacters.toUpperCase())
        })
    };
    return setupComments;
  })();

  var manageSearches = (function manageSearches() {
    var resultsContainer;
    var minSearchForm = document.querySelector('#search-form-min');
    clickHandler = (function clickHandler(event) {
      event.preventDefault();
      resultsContainer.querySelector('.clear-button').removeEventListener('click', clickHandler);
      searchInput.value = '';
      resultsContainer.innerHTML = '';
      resultsContainer.style.marginTop = 0;
      history.replaceState('', '', './');
      return clickHandler;
    });
    switch (document.querySelector('.search-form')) {
      case null:
        enableElement(minSearchForm);
        searchInput = document.querySelector('.search-input-min');
        resultsContainer = document.querySelector('.search-results-min');
        searchSite = (function searchSite(event) {
          event.preventDefault();
          switch (searchInput.value.trim().length <= 2) {
            case true:
              resultsContainer.innerHTML = '<p>Please enter some text (longer than 3 characters) to search</p><a href=# class="uk-button clear-button" data-turbo=false><svg class="icon icon-primary uk-margin-small-right"><use xlink:href=/images/sprites.svg#mi-backspace></use></svg><span>Clear</span></a>';
              resultsContainer.querySelector('.clear-button').addEventListener('click', clickHandler);
              break;
            default:
              location.href = '/search/?q=' + searchInput.value.trim();
          };
          return searchSite;
        });
        searchInput.parentElement.parentElement.addEventListener('submit', searchSite);
        break;
      default:
        var pagesIndex;
        var searchIndex;
        var resultsArray;
        var params = new URLSearchParams(location.search);
        searchInput = document.querySelector('.search-input');
        resultsContainer = document.querySelector('.search-results');
        disableElement(minSearchForm);
        (async () => {
          var indexFile = await fetch('/index.json');
          pagesIndex = await indexFile.json();
          searchIndex = new FlexSearch();
          pagesIndex.forEach(page => {
            searchIndex.add(page.href, page.content + page.title);
          });
          switch (params.has('q')) {
            case true:
              searchInput.value = params.get('q');
              searchSite();
              break;
            default:
              break;
          };
        })();
        searchSite = (function searchSite(event) {
          switch (this == window) {
            case true:
              break;
            default:
              event.preventDefault();
          };
          resultsArray = [];
          switch (searchInput.value.trim().length <= 2) {
            case true:
              history.replaceState('', '', './');
              resultsContainer.style.marginTop = '20px';
              resultsContainer.innerHTML = '<p>Please enter some text (longer than 3 characters) to search</p><a href=# class="uk-button clear-button" data-turbo=false><svg class="icon icon-primary uk-margin-small-right"><use xlink:href=/images/sprites.svg#mi-backspace></use></svg><span>Clear</span></a>';
              resultsContainer.querySelector('.clear-button').addEventListener('click', clickHandler);
              break;
            default:
              searchIndex.search(searchInput.value.trim()).map(result => {
                var resultMatches = pagesIndex.find(resultMatch => result === resultMatch.href);
                resultMatches.correctedContexts = [];
                var matchedResults = resultMatches.content.match(new RegExp('[^\.]*(' + searchInput.value.trim() + ')[^\.]*', 'gmi'));
                switch (matchedResults) {
                  case null:
                    resultMatches.correctedContexts.push(resultMatches.description);
                    break;
                  default:
                    matchedResults.forEach(context => {
                      resultMatches.correctedContexts.push(context.trim().replace(new RegExp(searchInput.value.trim(), 'gi'), '<mark>$&</mark>'));
                    });
                };
                resultsArray.push(resultMatches);
              });
              switch (resultsArray.length > 0) {
                case true:
                  switch (resultsArray.length > 1) {
                    case true:
                      resultCount = resultsArray.length + ' results';
                    default:
                      resultCount = resultsArray.length + ' result';
                  };
                  history.replaceState('', '', './?q=' + searchInput.value.trim());
                  resultsContainer.style.marginTop = '20px';
                  resultsContainer.innerHTML = `<p>Found ${resultCount} for <mark>${searchInput.value.trim()}</mark></p>` + resultsArray.map(result => `<div><h3 class=uk-margin-remove>${result.title}</h3><p>` + result.correctedContexts.map(context => `<span>${context}</span>`).join('<span>... </span>') + `</p><a href=${result.href} class="uk-button uk-text-left arrow-btn"><span>Read more</span><svg class="icon icon-primary uk-margin-small-left"><use xlink:href=/images/sprites.svg#mi-east></use></svg></a></div>`).join('<hr/>') + `<a href=# class="uk-button uk-margin-small-top clear-button" data-turbo=false><svg class="icon icon-primary uk-margin-small-right"><use xlink:href=/images/sprites.svg#mi-backspace></use></svg><span>Clear</span></a>`;
                  resultsContainer.querySelector('.clear-button').addEventListener('click', clickHandler);
                  break;
                default:
                  resultsContainer.style.marginTop = '20px';
                  resultsContainer.innerHTML = '<p>No results found for ' + searchInput.value.trim() + '</p><a href=# class="uk-button clear-button" data-turbo=false><svg class="icon icon-primary uk-margin-small-right"><use xlink:href=/images/sprites.svg#mi-backspace></use></svg><span>Clear</span></a>';
                  resultsContainer.querySelector('.clear-button').addEventListener('click', clickHandler);
              };
          };
          return searchSite;
        });
        searchInput.addEventListener('input', searchSite);
        searchInput.parentElement.parentElement.addEventListener('submit', searchSite);
    };
    return manageSearches;
  })();

  var manageAnimation = (function manageAnimation() {
    var animation = document.querySelector('#animation-div');
    switch (animation) {
      case null:
        break;
      default:
        (function(Saola) {
          Saola.openDoc(('/animations/' + animation.getAttribute('file')), animation, {
            paused: false,
            autofit: true,
            center: 'none',
          });
        })(AtomiSaola);
        placeAnimation = (function placeAnimation() {
          document.querySelector('.full-page-container').style.height = (window.innerHeight - 40) + 'px';
          animation.style.height = animation.offsetWidth + 'px';
          AtomiSaola.topDocs[0].layoutIfNeeded();
          return placeAnimation;
        })();
        window.addEventListener('resize', placeAnimation);
    };
    return manageAnimation;
  })();

  var pauseOtherMedia = (function pauseOtherMedia() {
    switch (wavesurfers.length > 0) {
      case true:
        wavesurfers.forEach(wavesurfer => {
          wavesurfer.on('play', () => {
            var otherWavesurfers = wavesurfers.filter(otherWavesurfer => otherWavesurfer != wavesurfer);
            otherWavesurfers.forEach(otherWavesurfer => {
              pauseAudio(otherWavesurfer);
            });
            switch (videoPlayers.length > 0) {
              case true:
                videoPlayers.forEach(videoPlayer => {
                  videoPlayer.pause();
                });
                break;
              default:
                break;
            };
          });
        });
        break;
      default:
        break;
    };
    return pauseOtherMedia;
  })();

  var scrollFunctions = (function scrollFunctions() {
    var fab = document.querySelector('#fab');
    var top = document.querySelector('#top');
    var toc = document.querySelector('.toc');
    (function manageFAB() {
      switch (top) {
        case null:
          break;
        default:
          switch (window.pageYOffset > top.clientHeight) {
            case true:
              fab.style.transform = 'scale(1)';
              break;
            default:
              fab.style.transform = 'scale(0)';
          };
      };
      return manageFAB;
    })();
    (function manageTOC() {
      switch (toc) {
        case null:
          break;
        default:
          switch (window.scrollY < 75) {
            case true:
              toc.style.maxHeight = 'calc(100vh - 155px)';
              break;
            default:
              toc.style.maxHeight = 'calc(100vh - 100px)';
          };
      };
      return manageTOC;
    })();
    (function manageMedia() {
      switch (wavesurfers.length > 0) {
        case true:
          wavesurfers.forEach(wavesurfer => {
            var playIcon = wavesurfer.mediaContainer.parentElement.querySelector('.icon-playback');
            switch (outViewport(wavesurfer.mediaContainer.parentElement)) {
              case true:
                pauseAudio(wavesurfer);
                disableElement(playIcon);
                break;
              default:
                enableElement(playIcon);
            };
          });
          break;
        default:
          break;
      };
      switch (videoPlayers.length > 0) {
        case true:
          videoPlayers.forEach(videoPlayer => {
            var playbackButton = videoPlayer.container.querySelector('.dplayer-play-icon');
            switch (outViewport(videoPlayer.container)) {
              case true:
                videoPlayer.pause();
                disableElement(playbackButton);
                videoPlayer.container.style.pointerEvents = 'none';
                break;
              default:
                enableElement(playbackButton);
                videoPlayer.container.style.pointerEvents = 'all';
            };
          });
          break;
        default:
          break;
      };
    })();
    return scrollFunctions;
  })();

  var offlineFunctions = (function offlineFunctions() {
    var disabledElements = [];
    UIkit.notification.closeAll();
    UIkit.notification({
      timeout: 0,
      status: 'danger',
      pos: 'bottom-center',
      message: '<svg class=icon><use xlink:href=/images/sprites.svg#mi-offlineBolt></use></svg><span class=uk-margin-small-left>Looks like you\'re offline.</span>'
    });
    switch (contactForm) {
      case null:
        case undefined:
          break;
      default:
        disableElement(contactForm);
        disabledElements.push(contactForm);
    };
    switch (wavesurfers.length > 0) {
      case true:
        wavesurfers.forEach(wavesurfer => {
          pauseAudio(wavesurfer);
          disableElement(wavesurfer.mediaContainer.parentElement);
          disabledElements.push(wavesurfer.mediaContainer.parentElement);
        });
        break;
      default:
        break;
    };
    switch (videoPlayers.length > 0) {
      case true:
        videoPlayers.forEach(videoPlayer => {
          videoPlayer.pause();
          disableElement(videoPlayer.container);
          disabledElements.push(videoPlayer.container);
        });
        break;
      default:
        break;
    };
    onlineFunctions = (function onlineFunctions() {
      UIkit.notification.closeAll();
      UIkit.notification({
        timeout: 5000,
        status: 'success',
        pos: 'bottom-center',
        message: '<svg class=icon><use xlink:href=/images/sprites.svg#mi-done></use></svg><span class=uk-margin-small-left>You\'re back online.</span>'
      });
      switch (document.querySelector('.offline')) {
        case null:
          break;
        default:
          setTimeout(() => {
            location.reload();
          }, 5000);
      };
      switch (disabledElements.length > 0) {
        case true:
          disabledElements.forEach(disabledElement => {
            enableElement(disabledElement);
          });
          disabledElements = [];
          break;
        default:
          break;
      };
      window.addEventListener('offline', offlineFunctions);
      window.removeEventListener('online', onlineFunctions);
      return onlineFunctions;
    });
    window.addEventListener('online', onlineFunctions);
    window.removeEventListener('offline', offlineFunctions);
    return offlineFunctions;
  });

  var visibilityFunctions = (function visibilityFunctions() {
    (function manageMedia() {
      switch (wavesurfers.length > 0) {
        case true:
          wavesurfers.forEach(wavesurfer => {
            pauseAudio(wavesurfer);
          });
          break;
        default:
          break;
      };
      switch (videoPlayers.length > 0) {
        case true:
          videoPlayers.forEach(videoPlayer => {
            videoPlayer.pause();
          });
          break;
        default:
          break;
      };
    })();
    return visibilityFunctions;
  })();

  window.addEventListener('scroll', scrollFunctions);

  switch (navigator.onLine) {
    case true:
      window.addEventListener('offline', offlineFunctions);
      break;
    default:
      offlineFunctions();
  };

  switch (wavesurfers.length > 0 || videoPlayers.length > 0) {
    case true:
      window.addEventListener('visibilitychange', visibilityFunctions);
      break;
    default:
      break;
  };

  (function turboLoadvent() {
    document.documentElement.addEventListener('turbo:load', () => {
      setupAudio();
      setupVideo();
      loadGallery();
      deleteCovers();
      setupContact();
      setupComments();
      manageSearches();
      manageAnimation();
      pauseOtherMedia();
      window.addEventListener('scroll', scrollFunctions);
      switch (navigator.onLine) {
        case true:
          window.addEventListener('offline', offlineFunctions);
          break;
        default:
          offlineFunctions();
      };
      switch (wavesurfers.length > 0 || videoPlayers.length > 0) {
        case true:
          window.addEventListener('visibilitychange', visibilityFunctions);
          break;
        default:
          break;
      };
    });
  })();

  (function turboClickEvent() {
    document.documentElement.addEventListener('turbo:click', () => {
      switch (wavesurfers.length > 0) {
        case true:
          wavesurfers.forEach(wavesurfer => {
            wavesurfer.destroy();
          });
          wavesurfers = [];
          break;
        default:
          break;
      };
      switch (videoPlayers.length > 0) {
        case true:
          videoPlayers.forEach(videoPlayer => {
            videoPlayer.destroy();
          });
          videoPlayers = [];
          break;
        default:
          break;
      };
      switch (glidePlayers.length > 0) {
        case true:
          glidePlayers.forEach(glidePlayer => {
            glidePlayer.destroy();
          });
          glidePlayers = [];
          break;
        default:
          break;
      };
      window.removeEventListener('resize', placeAnimation);
      searchInput.removeEventListener('input', searchSite);
      window.removeEventListener('scroll', scrollFunctions);
      window.removeEventListener('offline', offlineFunctions);
      window.removeEventListener('visibilitychange', visibilityFunctions);
      searchInput.parentElement.parentElement.removeEventListener('submit', searchSite);
      switch (contactForm) {
        case null:
          break;
        default:
          messageInput.removeEventListener('input', resizeInput);
          contactForm.removeEventListener('submit', submitContact);
      };
      switch (document.querySelector('.clear-button')) {
        case null:
          break;
        default:
          document.querySelector('.clear-button').removeEventListener('click', clickHandler);
      };
    });
  })();

  navigator.serviceWorker.register('/sw.js');

});