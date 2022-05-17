---
layout: post
title: "Chapter 3: Headings and Line Elements"
categories: ["Tutorial", "konzept"]
permalink: /konzept-chapter-3/
---
The [previous chapter]({% post_url 2022-04-01-konzept-chapter-2 %}) left us with an editor that was able to deal with inline styles - which could be set via hotkeys, shortcuts and even a hovering toolbar. The next step will be to allow styles which affect a full line - the most notable example being Headings.

To achieve that, we will first extend our Paragraph type as follows:

{% raw %}
```tsx
// types.tsx
//...
export type Decoration = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Paragraph = {
  type: "paragraph";
  decoration?: Decoration; //this is new
  children: Text[];
};
//...
```
{% endraw %}
<small>[(View this step on GitHub)](https://github.com/pflenker/konzept/tree/extend-paragraph-type)</small>


We could have reused the "type" property for this, defining a paragraph either as one of the headings or as a paragraph. However, in our model, a `Paragraph` represents a single line in the editor, which can have multiple properties at the same time. For example, a `Paragraph` could have a `color` property, e.g. to model a red heading, a green one and so on. Since all headings can have all colors, it makes sense to make both properties - the color and the decoration - part of the `Paragraph` type.

It's very likely that the first line the user is going to enter into a document will be the title of the document, so let's adjust the initial value of the editor to have the proper `decoration`:

{% raw %}
```tsx
// index.tsx
//...
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    decoration: "h1",
    children: [{ text: "" }],
  },
];
//...

```
{% endraw %}
<small>[(View this step on GitHub)](https://github.com/pflenker/konzept/tree/extend-initial-value)</small>
If we now play around with the editor, the raw JSON tells us that the correct decoration is active. That is great, but it would be better if we could actually _see_ it. Let's implement another method which is similar to `renderLeaf` from the previous chapter:

{% raw %}
```tsx
// index.tsx
import renderElement from "./renderElement";
//...

export default function Konzept() {
//...
  return (
    //...
        <Editable
        //...
          renderElement={renderElement}
        />
    //...
  );
}


// renderElement.tsx
import { RenderElementProps } from "slate-react";

export default function renderElement(props: RenderElementProps) {
  const { children, attributes, element } = props;
  let Component = element.decoration || "div";
  return <Component {...attributes}>{children}</Component>;
}

```
{% endraw %}
<small>[(View this step on GitHub)](https://github.com/pflenker/konzept/tree/render-headings)</small>

For the time being, `renderElement` will _only_ receive `Paragraph`s, so we can simply access `element.decoration`. And since that one is a valid HTML tag, we can simply use it as a Component if defined, and use `div` otherwise.  This works nicely, but when it comes to handling headings, we expect our text editor to be a bit smarter, especially on line breaks.

Or, more concretely:
- If we hit enter at the end of the line, assume we've just entered our heading and want to continue with regular text.
- However, if the line was _empty_, assume we just wanted vertical space, and keep the heading active.
- If we hit enter in the middle of a sentence, assume we want to split the heading in two and keep the heading active for both lines.

And, speaking of newlines, I think it's sensible to assume that in the overwhelming majority of cases, hitting _Enter_ means that you are done with whatever inline styling you were typing in. And for the rare cases where our smart prediction doesn't hit the mark, let's implement some soft-enter behaviour, where hitting shift-enter doesn't do anything beside adding a newline, leaving everything else intact.

Luckily, with Slate, all of this is dead easy to implement. Let's dive right in.

{% raw %}
```tsx
// index.tsx
import withLinebreaks from "./withLinebreaks";
//...

export default function Konzept() {
//...
const editor = useMemo(
    () => withLinebreaks(withShortcuts(withReact(createEditor()))),
    []
  );
//...

// withLinebreaks.tsx
import {
  Editor as SlateEditor,
  Range,
  Transforms,
  Node,
  Element,
  NodeEntry,
} from "slate";
import switchMark from "./switchMark"; //  We refactored this out of toggleMark.tsx
import { Mark, Editor, Paragraph } from "./types"; // We had to export Paragraph from types

function disableAllMarks(editor: Editor) {
  let marks = SlateEditor.marks(editor);
  if (!marks) {
    return;
  }
  Object.keys(marks).forEach((mark) => switchMark(editor, mark as Mark, false));
}
function getTextFromParagraph(paragraph: Paragraph) {
  let ret = "";
  Array.from(Node.texts(paragraph)).forEach(([text]) => (ret += text.text));
  return ret;
}

function getParagraph(editor: Editor): Array<NodeEntry<Paragraph>> {
  return Array.from(
    SlateEditor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "paragraph",
    })
  );
}

function getCurrentText(editor: Editor) {
  let [[paragraph]] = getParagraph(editor);
  return getTextFromParagraph(paragraph);
}

export default function withLineBreaks(editor: Editor) {
  editor.insertSoftBreak = () => {
    editor.insertText("\n");
  };
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    if (Range.isExpanded(editor.selection!)) {
      Transforms.delete(editor);
    }
    const line1text = getCurrentText(editor);

    insertBreak();
    disableAllMarks(editor);
    const line2text = getCurrentText(editor);

    if (line1text.trim().length && !line2text.trim().length) {
      Transforms.unsetNodes(editor, "decoration");
    }
  };
  return editor;
}

```
{% endraw %}
<small>[(View this step on GitHub)](https://github.com/pflenker/konzept/tree/handle-linebreaks)</small>

We have written, and hooked in, another extension, this time called `withLinebreaks`. This extension overwrites `insertSoftbreak` by simply entering a newline instead of doing anything else, which is the least important, but also the easiest of the requirements we listed above.

The new implementation of `withLinebreaks` starts with a small trick: To not have to deal with multiple paragraphs in case the user has selected text which spans multiple lines, we first call `Transforms.delete`, which behaves as if the user has simply pressed `del` once. From there on out, we can assume that the selection is collapsed and only one paragraph is present in the selection.

We then grab the text of the line before we do a linebreak - in case of `Foo|bar` it would be `Foobar`. Then we call the original `insertBreak`, which adds the line break as usual for us. Then we disable all marks before we get the text of the newly inserted line, which in the case above wouldbe simply `bar`. 

Then we check if the original line contained any non-whitespace text, and the new line does _not_ contain any non-whitespace text, then we want to remove the heading. `Transforms.unsetNodes` does that for us by removing the property `decoration` of all nodes in the current selection. Since the node type `Paragraph` is the only type to potentially have this property, it will do what we expect it to do.

The implementation of all small helper functions should be straightforward and self-explanatory at this point, we're simply reusing already known concepts here.

## Adding shortcuts
Now we can gracefully handle headings - or at least, one type of heading, and that one only at the begining of a document. Let's extend our existing shortcut logic to also be able to toggle headings. Let's start by adjusting `withShortcuts`.


{% raw %}
```tsx
// withShortcuts.tsx
//...
export default function withShortcuts(editor: Editor) {
  const { insertText } = editor;
  editor.insertText = (text: string) => {
    insertText(text);
    const { selection } = editor;
    if (text !== " " || !selection || Range.isExpanded(selection)) {
      return;
    }
    handleParagraphShortcut(editor) || handleInlineShortcuts(editor);
  };
  return editor;
}
```
{% endraw %}

We simply hook in the handling of the Paragraph shortcuts before the handling of the inline shortcuts. Since we know that under no circumstances will we ever have a paragraph and an inline shortcut at the same time, we make `handleParagraph` return `true` once it has properly handled the shortcut, so that `handleInlineShortcuts` will never be called.

Now, onward to the implementation of `handleParagraphShortcut`:

{% raw %}
```tsx
// withShortcuts.tsx
import getParagraph from "./getParagraph"; // we extracted this out of withLinebreaks

const SHORTCUT_DECORATIONS_MAP: Readonly<{
  [key: string]: Decoration;
}> = {
  "# ": "h1",
  "## ": "h2",
  "### ": "h3",
  "#### ": "h4",
  "##### ": "h5",
  "###### ": "h6",
};

function handleParagraphShortcut(editor: Editor): boolean {
  const [[, path]] = getParagraph(editor);
  const { anchor } = editor.selection!;
  const start = SlateEditor.start(editor, path);
  const beforeRange = { anchor, focus: start };
  const beforeText = SlateEditor.string(editor, beforeRange);
  let decoration = SHORTCUT_DECORATIONS_MAP[beforeText];
  if (!decoration) {
    return false;
  }
  Transforms.setNodes(editor, { decoration }, { at: path });
  Transforms.select(editor, beforeRange);
  Transforms.delete(editor);
  return true;
}
```
{% endraw %}
<small>[(View this step on GitHub)](https://github.com/pflenker/konzept/tree/add-heading-shortcuts)</small>

There are a few things subtly different here than before. First of all, we construct a range which spans from the start of the current `Paragraph` to whereever our selection currently is (we can assume that there _is_ a selection, as we explicitly test for it before calling this function) by using `SlateEditor.start`, which returns the location of the starting point within the given path. We use `Editor.string` to convert whatever is between the selection and the start into a string and compare it to our shortcut list. Then we use `Transforms.setNodes` as before to change the current paragraph.

Notice that we're using a different strategy to `delete` than before: For the inline shortcuts, we told `Transforms.delete` specifically where we want to delete something - which worked, since we always only wanted to delete one word at a given time. However, there is no great API to delete an entire _range_, so what we do instead is to first _select_ the entire shortcut, and then call `delete`, which  - as explained before - acts as if the user has simply pressed <kbd>del</kbd> once. This works because the entire new selection ends right where the old selection was, so after the change, the selection is just where we want it to be.

If you comment out the `delete`, you'll notice that, indeed, the shortcut is selected entirely by `Transforms.select`. 

Nice, now we can add various headers! But wouldn't it be even better if we could toggle them with hotkeys? Let's do that next.

## Adding Hotkeys
Before we add hotkey support for headings in Konzept, let's first briefly think about what we want to achieve. The basic case is easy: Pressing the hotkey should toggle the associated heading _on_ if it is off, and it should toggle the heading _off_ if it is currently on. But if we are selecting multiple lines, things are not as simple: If one line is styled as a heading and another one is not, we don't know exactly what the user wants when they press the hotkey - but we can assume that flipping the styling for both of them - turning off the heading for the first line and enabling it for the second - is not what they wanted.

Our implementation is going to match what happens if you select text that is partly marked and partly unmarked and you hit the hotkey - we're going to apply the heading to all lines in case at least one doesn't have the heading style applied, and we're going to remove the heading style in case all of them have the heading style applied.

Let's implement.
{% raw %}
```tsx
//handleHotkeys.tsx
//...
import { Decoration, Editor, Mark } from "./types";
import getParagraph from "./getParagraph";
import { Transforms } from "slate";

//...
const HOTKEYS_DECORATIONS_MAP: Record<string, Decoration> = {
  "ctrl+1": "h1",
  "ctrl+2": "h2",
  "ctrl+3": "h3",
  "ctrl+4": "h4",
  "ctrl+5": "h5",
  "ctrl+6": "h6",
};

function toggleDecoration(editor: Editor, decoration: Decoration) {
  const paragraphs = getParagraph(editor);
  let shouldSetDecoration = paragraphs.some(
    ([paragraph]) => paragraph.decoration !== decoration
  );
  paragraphs.forEach(([, path]) => {
    if (shouldSetDecoration) {
      Transforms.setNodes(editor, { decoration }, { at: path });
    } else {
      Transforms.unsetNodes(editor, "decoration", { at: path });
    }
  });
}

export default function handleHotkeys(
  event: KeyboardEvent,
  editor: Editor
): boolean {
  for (const hotkey in HOTKEYS_MARKS_MAP) {
    if (isHotkey(hotkey, event)) {
      const mark = HOTKEYS_MARKS_MAP[hotkey];
      toggleMark(editor, mark);
      return true;
    }
  }
  for (const hotkey in HOTKEYS_DECORATIONS_MAP) {
    if (isHotkey(hotkey, event)) {
      const decoration = HOTKEYS_DECORATIONS_MAP[hotkey];
      toggleDecoration(editor, decoration);
      return true;
    }
  }
  return false;
}
```
{% endraw %}
<small>[(View this step on GitHub)](https://github.com/pflenker/konzept/tree/add-decoration-hotkeys)</small>


The implementation is actually pretty straightforward: We get all paragraphs in the selection, iterate over them until we find one where the `decoration` is not the one we are about to set and use this to determine whether or not we're going to call `Transforms.setNodes` on all paragraphs - to set the decoration - or if we're going to call `Transforms.unsetNodes` to remove the decoration.

## Horizontal Lines
This one isn't a heading, so it doesn't really fit into this chapter, but wouldn't it be great to be able to add a horizontal line to our text, so that we can separate sections from one another?

Let's quickly implement that.

First, we adjust the types to account for the new HR type:

{% raw %}
```tsx
//types.tsx
//...
export type HR = {
  type: "hr";
  children: Text[];
};
declare module "slate" {
  interface CustomTypes {
    Editor: Editor;
    Element: Paragraph | HR;
    Text: Text;
  }
}
```
{% endraw %}
Since a HR is not an inline element, we have defined it as an `Element` - which, according to Slate, means that it has to allow `children` nodes. Which do not make sense for HRs, but we'll see what kind of errors this creates and how to fix it later.

Now that we have added a new type, our `renderElement` function needs to be adapted:

{% raw %}
```tsx
//renderElement.tsx
//...
export default function renderElement(props: RenderElementProps) {
  const { children, attributes, element } = props;
  switch (element.type) {
    case "paragraph":
      let Component = element.decoration || "div";
      return <Component {...attributes}>{children}</Component>;
    case "hr":
      return <hr {...attributes} />;
  }
}
```
{% endraw %}
You can see that unline for the rendering of a `Paragraph`, we're not rendering the `children` of the `hr` at all.

Now that this is taken care of, let's adjust our shortcuts. We'll go with a super simple implementation:

{% raw %}
```tsx
//withShortcuts.tsx
function handleParagraphShortcut(editor: Editor): boolean {
  const [[, path]] = getParagraph(editor);
  const { anchor } = editor.selection!;
  const start = SlateEditor.start(editor, path);
  const beforeRange = { anchor, focus: start };
  const beforeText = SlateEditor.string(editor, beforeRange);

  const isHR = beforeText === "--- ";
  let decoration = SHORTCUT_DECORATIONS_MAP[beforeText];
  if (!decoration && !isHR) {
    return false;
  }
  if (decoration) {
    Transforms.setNodes(editor, { decoration }, { at: path });
  }
  Transforms.select(editor, beforeRange);
  Transforms.delete(editor);
  if (isHR) {
    Transforms.insertNodes(
      editor,
      { type: "hr", children: [{ text: "" }] },
      { at: path }
    );
  }
  return true;
}
```
{% endraw %}

Nice, this works - we can add a `hr` easily! But if you play around with it now, weird things will happen:

- We're able to move the caret on the HR and actually start typing something. 
- When we move around the HR with the arrow keys, the Editor crashes.

These things are due to the fact that Slate assumes that is it able to add, modify and access child elements to HR. After all, that's what we told Slate in the type definition! It moves the caret into the HR to allow us adding children, and it crashes because it can't find the text node in the DOM which it has in its book internally.

We need a way to tell Slate that the HR is something it should not take care of - it should just ignore it like a black hole. We do this by declaring the HR as a `void`: 


## Conclusion
Our tiny little editor looks all grown up now with Headings and Marks and we now have a pretty good understanding about how things work!
However, there is something that Konzept doesn't handle very well yet, and that is styles or decorations which apply to multiple lines of text - think about block quotes or code blocks, for example.
Sure, we know how to change the layout for the current line and we could extend it in a way that makes these lines stand out visually - but all the styling, and that includes for instance borders, would apply to all lines individually and not to the whole block. That is not nice, and will be part of the next chapter.
