---
title: "ThreadTalk.JS"
date: 2021-07-08
description: "A lightweight, themeable, secure and open-source comment engine for static websites. It’s powered by Netlify Fuctions, Netlify Identity and FaunaDB as a headless database."
tags: ["Programming"]
menu:
  main:
    parent: "Projects"
---

## Introduction

ThreadTalk.JS is a first-of-a-kind project for me. As you might have seen most of my projects have been related to graphics, audio/video, animation, etc. While a few of them had some elements of programming in it, it is probably not as prominent or complicated. This one's distinguished by a programming-only project (with some elements of graphics and animations). But what is this project exactly? It's basically a comment engine for statis websites. If some of you have visited my website before I wrote this post, you'd have probably noted I was using Gitalk as a comment engine. While I can't complain about it, I didn't like it a lot either. The primary reason was, my website's users had to sign up with GitHub and allow OAuth access to their GitHub account, and probably no one would actually do that. I wanted something using which my visitors could write comments without being asked for login credentials. Well, this an the other reason is themeability and white-labelling. Now I've managed to completely remove traces of GitHub as a backend and it feels more native to this website. So, this was the primary driving force that motivated me to work on this project.

## The journey

It was a bumpy ride!

Yes, I had never done something like this, I wasn't even sure if I'd be able to make it happen. I just gave it a go to see how far I can take it. I had times when, due to my limited skillset, I didn't think of the shortcomings of what I was trying to do and thus, ended up having to scrape big chnuks of code and rewrite it some other way. I've switched libraries, copied chunks of code from here and there, tested it, failed and gave up a few times, but still managed to finish it.

### FaunaDB

Yeah, why FaunaDB? There are other alternatives that are probably better and cheaper. Yes, indeed and to be honest I was trying to use Firebase first. My initial model of this engine was all client-side without using `npm` at all! But then why did I switch to `npm` only?

I noticed that with Firebase Realtime Database or Firebase Firestore, the only way for me to secure my database was to use the auth rules. I might be wrong, but from what I understood from its documentation, a lot of the rules needed some kind of an authentication and I needed this engine to be completely anonymous. I noticed this problem when I checked the Network panel of the Dev Tools and noticed the network requests to my database URL and after further research, I found out that it's totally accessible without any much of a fuss. Thus, this plan was dropped real fast.

That's when I came across FaunaDB. I had read its name somewhere and thus, I remembered it. I tried to go through its documentation and found out that it needs a API key and thus, it seemed more secure in this regards. But the API key could also not be left open to the client-side JavaScript. That's when I switched to serverless functions using Netlify Functions.

At this point, I was using Netlify Functions and could have switched back to Firebase, but now I was already making progress with FaunaDB which is why I decided to stick to it.

### Netlify Functions

A big chunk of the reason for using Netlify Functions is mentioned above already. But yeah since I was hosting my website on Netlify it made sense to keep it all at one place. This might seem like vendor-locking and to some extent it probably is but I was fine with it. More importantly it got the work done. But, because the functions had to be manually downloaded and copied, I thought it would make more sense if I could make this process easier. Thus, I created a Netlifu Build Plugin to copy the files dynamically during the build time. So, it's nearly zero-config in that area.

### Netlify Identity

This wasn't on the roadmap previously. But, I soon realised that even with serverless functions it's as simple as sending a call to the function with something as simple as a `fetch`, and manipulate my database. While, this is the downsides of keeping this anonymous, I still wanted to keep it anynymous. Now, I can't limit it to just 1 comment per person or somethng like that and I'm probably subject to abuse but I could at least try to make it as secure as possible. This is where Netlify Identity comes into play. I've added it as a backend to add a bit more of security.

### `npm` package

With the growing complexity of the project and after finally having some hopes that this project might work, I thought of releasing this as a library for others. But I can't obviously ask anyone to clone the repository and import the script. So, I decided to package this as an `npm` package. It would make it easy for everyone. But, that added more complexity for me, as I had no idea of how this works. How to publish, how to let users import it, how to pass options, etc. a lot of these questions, I answered based on my guesses and looks like it worked. The reason I did not release a UMD build of this library was that, to me, it doesn't make sense. When using Functions, a lot of it is going to need Node.js anyways.

### Documentation

This part was probably more difficult than actually writing the code. Honestly, it even took more time than writing the code. I was experimenting with something new even there. It was the first time I was working with Babel, TailwindCSS, SCSS and a monorepo altogether. Moreoever, it was also the first time I was actually integrating libraries by using Node Modules instead of using CDNs.

That's the technical part, but aesthetically speaking, I was even confused as to how to make this documenation website look nice. I am not a professional web-designer myself, so I jus kept changing code till it looked appealing to me. The end result? I think it looks nice enough. I found making the layout moderately difficult. Even though it seems like a very basic layout, I had to refactor a lot of stuff, many times because I decided to scrap the layout and redo it.

The animations on the homepage are made in After Effects. Ironically, the home page is the last thing that I worked on.

## End result

3 months of efforts finally came to an end. I had actually given up on the project in the last stages of the documentation. For a few weeks, I didn't work on it at all. But I had an idea for a new one and I thought, it's better not to leave this one so close to completion. If I had started the new one before finishing this, chances are you'd not have got this page to read. All of these efforts are visible on a different URL. [Check out ThreadTalk.JS here](ext:https://www.threadtalkjs.ml/).

## TL;DR

Within this 3 month journey, I finally managed to publish my first `npm` package. But, then, I ended up publishing 2 of them. I learnt a lot more things and this was an amazing challenge to test my skills. The satisfation I received after I published it all live was too much to handle.