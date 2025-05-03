---
{"dg-publish":true,"dg-path":"2019-07-30-reload-without-shake.md","dg-permalink":"2019/07/30/-reload-without-shake/","permalink":"/2019/07/30/-reload-without-shake/","title":"Reloading on the Simulator without shaking the device"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




![flenker-logo-RGB.png|40](/img/user/attachments/flenker-logo-RGB.png)
🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]]


</div></div>


# Reloading on the Simulator without shaking the device
<p><span>📆 <code>Tuesday, July 30, 2019</code></span></p>
#ReactNative

I recently took the train to Munich, a 7-hour-ride, and I took the opportunity to working on a React Native project during the journey. Since I could not see myself shaking my phone every few minutes in front of strangers for the better part of the day, I researched a bit and found the following neat trick:

```sh
adb shell input keyevent 82 && adb shell input keyevent 66 && adb shell input keyevent 66
```

This emulates pushing the menu button once and enter twice, thus triggering a reload, and it works only with Android. Consequently, if you only need the dev menu to be opened, use this command:
```sh
adb shell input keyevent 82
```

This might be a no-brainer for veteran Android developers, but with my focus on iOS and React-Native, it was new!

By the way, there is no equivalent way to do this with an iPhone. If you really wanted to, you could include a button which is only visible if `__DEV__` is set and which reloads the app like this:

```javascript
NativeModules.DevMenu.reload();
```

Or, if you only need the dev menu to show, you can use:

```javascript
NativeModules.DevMenu.show();
```

- - -
<p><span>Edited: <code>Saturday, May 3, 2025</code></span></p>

👾
