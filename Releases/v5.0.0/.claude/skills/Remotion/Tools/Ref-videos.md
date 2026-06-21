---
name: videos
description: Embedding videos in Remotion - trimming, volume, speed, looping, pitch
metadata:
  tags: video, media, trim, volume, speed, loop, pitch
---

Using videos in Remotion

Prerequisites

First, the @remotion/media package needs to be installed.  
If it is not, use the following command:

```bash
npx remotion add @remotion/media If project uses npm
bunx remotion add @remotion/media If project uses bun
yarn remotion add @remotion/media If project uses yarn
pnpm exec remotion add @remotion/media If project uses pnpm
```

Use `<Video>` from `@remotion/media` to embed videos into your composition.

```tsx
import { Video } from "@remotion/media";
import { staticFile } from "remotion";

export const MyComposition = () => {
  return <Video src={staticFile("video.mp")} />;
};
```

Remote URLs are also supported:

```tsx
<Video src="https://remotion.media/video.mp" />
```

Trimming

Use `trimBefore` and `trimAfter` to remove portions of the video. Values are in seconds.

```tsx
const { fps } = useVideoConfig();

return (
  <Video
    src={staticFile("video.mp")}
    trimBefore={fps} // Skip the first seconds
    trimAfter={fps} // End at the second mark
  />
);
```

Delaying

Wrap the video in a `<Sequence>` to delay when it appears:

```tsx
import { Sequence, staticFile } from "remotion";
import { Video } from "@remotion/media";

const { fps } = useVideoConfig();

return (
  <Sequence from={fps}>
    <Video src={staticFile("video.mp")} />
  </Sequence>
);
```

The video will appear after second.

Sizing and Position

Use the `style` prop to control size and position:

```tsx
<Video
  src={staticFile("video.mp")}
  style={{
    width: ,
    height: ,
    position: "absolute",
    top: ,
    left: ,
  }}
/>
```

`objectFit` prop (v..+)

`objectFit` is now a first-class prop on `<Video>` — use it directly instead of via `style`. Valid values: `"cover" | "contain" | "fill" | "scale-down" | "none"`.

```tsx
<Video
  src={staticFile("video.mp")}
  objectFit="cover"
  style={{ width: , height: }}
/>
```

Use when overlaying source footage whose aspect ratio doesn't match the composition — `cover` fills and crops, `contain` letterboxes.

Volume

Set a static volume (to ):

```tsx
<Video src={staticFile("video.mp")} volume={.} />
```

Or use a callback for dynamic volume based on the current frame:

```tsx
import { interpolate } from "remotion";

const { fps } = useVideoConfig();

return (
  <Video
    src={staticFile("video.mp")}
    volume={(f) =>
      interpolate(f, [, fps], [, ], { extrapolateRight: "clamp" })
    }
  />
);
```

Use `muted` to silence the video entirely:

```tsx
<Video src={staticFile("video.mp")} muted />
```

Speed

Use `playbackRate` to change the playback speed:

```tsx
<Video src={staticFile("video.mp")} playbackRate={} /> {/x speed /}
<Video src={staticFile("video.mp")} playbackRate={.} /> {/Half speed /}
```

Reverse playback is not supported.

Looping

Use `loop` to loop the video indefinitely:

```tsx
<Video src={staticFile("video.mp")} loop />
```

Use `loopVolumeCurveBehavior` to control how the frame count behaves when looping:

- `"repeat"`: Frame count resets to each loop (for `volume` callback)
- `"extend"`: Frame count continues incrementing

```tsx
<Video
  src={staticFile("video.mp")}
  loop
  loopVolumeCurveBehavior="extend"
  volume={(f) => interpolate(f, [, ], [, ])} // Fade out over multiple loops
/>
```

Pitch

Use `toneFrequency` to adjust the pitch without affecting speed. Values range from .to :

```tsx
<Video
  src={staticFile("video.mp")}
  toneFrequency={.} // Higher pitch
/>
<Video
  src={staticFile("video.mp")}
  toneFrequency={.} // Lower pitch
/>
```

Pitch shifting only works during server-side rendering, not in the Remotion Studio preview or in the `<Player />`.
