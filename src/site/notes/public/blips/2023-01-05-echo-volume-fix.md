---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"blip","created-date":"2023-01-05T00:00:00","disabled rules":["yaml-title","yaml-title-alias","file-name-heading"],"title":"philipp @ 2023-01-05","dg-permalink":"2023/01/05/echo-volume-fix/","updated-date":"2025-04-30T22:27:37","dg-path":"blips/2023-01-05-echo-volume-fix.md","permalink":"/2023/01/05/echo-volume-fix/","dgPassFrontmatter":true,"created":"2023-01-05T00:00:00","updated":"2025-04-30T22:27:37"}
---

> [!summary] **philipp**:
>
> Here is the fix to an annoying issue I recently had.
>
> _The problem:_
>
> Alexa's volume is either too low or too loud relative to the media/music playback. So when you hear music at a regular volume and then ask Alexa something, either its feedback blasts holes in the nearest wall, or it is so low that you can barely hear it.
>
> _The solution:_
>
> I only tested this with the Spotify skill, but I assume that this also works with other skills where you _remotely change the Echo's volume_ , e.g. without directly interacting with the Echo. Here is what happens: Suppose the Echo is set up correctly at Volume 3, Alexa's volume is just fine. Then you start playback via Spotify. You increase the volume using the Spotify app: the Echo changes its volume. However, _Alexa's volume does not change with it_, so if you set the volume to e.g. 6 while hearing Spotify, Alexa's volume would still be at 3. If you now change the volume on the echo directly, or asking Alexa to change the volume, you change both the Echo volume and Alexa's volume at the same time - no matter if you're still using Spotify or not. So if, for example, after the above change you change your volume from 6 to 5 on the Echo, you also change Alexa's volume from 3 to 2. And if you turn the echo's volume all the way back to 3, Alexa's volume would be on the lowest setting.
>
> This also works the other way around.
>
> _The Fix_:
>
> - You need to use the Spotify skill (or, as mentioned above, any other skill that allows remotely changing the volume).
> - Start playback.
> - Using the Echo controls or voice commands, change the Echo's volume so that Alexa's voice responses are at the right level for you.
> - Using Spotify's controls, change the volume to a level that matches Alexa's voice volume level.
> - Both volumes should now be in synch and change simultaneously using the device's controls or voice commands.
> - - -
>
> 🗓️ `Thu, Jan 5, 2023` · [[public/blips/2023-01-05-echo-volume-fix\|🔗]]
{ #blip}

