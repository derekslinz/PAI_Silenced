<div align="center">

<img src="https://beehiiv-images-production.s.amazonaws.com/uploads/asset/file/aac-a---abe/extwis-logo-miessler.png?t=" alt="extwislogo" width="" height=""/>

`/extractwisdom`

<h><code>extractwisdom</code> is a <a href="https://github.com/danielmiessler/fabric" target="_blank">Fabric</a> pattern that <em>extracts wisdom</em> from any text.</h>

[Description](description) •
[Functionality](functionality) •
[Usage](usage) •
[Output](output) •
[Meta](meta)

</div>

<br />

Description

`extractwisdom` addresses the problem of too much contentand too little time.
_Not only that, but it's also too easy to forget the stuff we read, watch, or listen to._

This pattern _extracts wisdom_ from any content that can be translated into text, for example:

- Podcast transcripts
- Academic papers
- Essays
- Blog posts
- Really, anything you can get into text!

Functionality

When you use `extractwisdom`, it pulls the following content from the input.

- `IDEAS`
  - Extracts the best ideas from the content, i.e., what you might have taken notes on if you were doing so manually.
- `QUOTES`
  - Some of the best quotes from the content.
- `REFERENCES`
  - External writing, art, and other content referenced positively during the content that might be worth following up on.
- `HABITS`
  - Habits of the speakers that could be worth replicating.
- `RECOMMENDATIONS`
  - A list of things that the content recommends Habits of the speakers.

Use cases

`extractwisdom` output can help you in multiple ways, including:

. `Time Filtering`<br />
   Allows you to quickly see if content is worth an in-depth review or not.
. `Note Taking`<br />
   Can be used as a substitute for taking time-consuming, manual notes on the content.

Usage

You can reference the `extractwisdom` systemand usercontent directly like so.

Pull the _system_ prompt directly

```sh
curl -sS https://github.com/danielmiessler/fabric/blob/main/extract-wisdom/dmiessler/extract-wisdom-../system.md
```

Pull the _user_ prompt directly

```sh
curl -sS https://github.com/danielmiessler/fabric/blob/main/extract-wisdom/dmiessler/extract-wisdom-../user.md
```

Output

Here's an abridged output example from `extractwisdom` (limited to only items per section).

```markdown
SUMMARY:

The content features a conversation between two individuals discussing various topics, including the decline of Western culture, the importance of beauty and subtlety in life, the impact of technology and AI, the resonance of Rilke's poetry, the value of deep reading and revisiting texts, the captivating nature of Ayn Rand's writing, the role of philosophy in understanding the world, and the influence of drugs on society. They also touch upon creativity, attention spans, and the importance of introspection.

IDEAS:

. Western culture is perceived to be declining due to a loss of values and an embrace of mediocrity.
. Mass media and technology have contributed to shorter attention spans and a need for constant stimulation.
. Rilke's poetry resonates due to its focus on beauty and ecstasy in everyday objects.
. Subtlety is often overlooked in modern society due to sensory overload.
. The role of technology in shaping music and performance art is significant.
. Reading habits have shifted from deep, repetitive reading to consuming large quantities of new material.
. Revisiting influential books as one ages can lead to new insights based on accumulated wisdom and experiences.
. Fiction can vividly illustrate philosophical concepts through characters and narratives.
. Many influential thinkers have backgrounds in philosophy, highlighting its importance in shaping reasoning skills.
. Philosophy is seen as a bridge between theology and science, asking questions that both fields seek to answer.

QUOTES:

. "You can't necessarily think yourself into the answers. You have to create space for the answers to come to you."
. "The West is dying and we are killing her."
. "The American Dream has been replaced by mass packaged mediocrity porn, encouraging us to revel like happy pigs in our own meekness."
. "There's just not that many people who have the courage to reach beyond consensus and go explore new ideas."
. "I'll start watching Netflix when I've read the whole of human history."
. "Rilke saw beauty in everything... He sees it's in one little thing, a representation of all things that are beautiful."
. "Vanilla is a very subtle flavor... it speaks to sort of the sensory overload of the modern age."
. "When you memorize chapters [of the Bible], it takes a few months, but you really understand how things are structured."
. "As you get older, if there's books that moved you when you were younger, it's worth going back and rereading them."
. "She [Ayn Rand] took complicated philosophy and embodied it in a way that anybody could resonate with."

HABITS:

. Avoiding mainstream media consumption for deeper engagement with historical texts and personal research.
. Regularly revisiting influential books from youth to gain new insights with age.
. Engaging in deep reading practices rather than skimming or speed-reading material.
. Memorizing entire chapters or passages from significant texts for better understanding.
. Disengaging from social media and fast-paced news cycles for more focused thought processes.
. Walking long distances as a form of meditation and reflection.
. Creating space for thoughts to solidify through introspection and stillness.
. Embracing emotions such as grief or anger fully rather than suppressing them.
. Seeking out varied experiences across different careers and lifestyles.
. Prioritizing curiosity-driven research without specific goals or constraints.

FACTS:

. The West is perceived as declining due to cultural shifts away from traditional values.
. Attention spans have shortened due to technological advancements and media consumption habits.
. Rilke's poetry emphasizes finding beauty in everyday objects through detailed observation.
. Modern society often overlooks subtlety due to sensory overload from various stimuli.
. Reading habits have evolved from deep engagement with texts to consuming large quantities quickly.
. Revisiting influential books can lead to new insights based on accumulated life experiences.
. Fiction can effectively illustrate philosophical concepts through character development and narrative arcs.
. Philosophy plays a significant role in shaping reasoning skills and understanding complex ideas.
. Creativity may be stifled by cultural nihilism and protectionist attitudes within society.
. Short-term thinking undermines efforts to create lasting works of beauty or significance.

REFERENCES:

. Rainer Maria Rilke's poetry
. Netflix
. Underworld concert
. Katy Perry's theatrical performances
. Taylor Swift's performances
. Bible study
. Atlas Shrugged by Ayn Rand
. Robert Pirsig's writings
. Bertrand Russell's definition of philosophy
. Nietzsche's walks
```

This allows you to quickly extract what's valuable and meaningful from the content for the use cases above.

Meta

- Author: {{PRINCIPAL_FULL_NAME}}
- Version Information: {{PRINCIPAL_NAME}}'s main `extractwisdom` version.
- Published: January , 