---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"other","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"hecto, Chapter 2: Entering Raw Mode","dg-permalink":"hecto-chapter-2/","created-date":"2024-03-30T09:37:00","aliases":["hecto, Chapter 2: Entering Raw Mode"],"linter-yaml-title-alias":"hecto, Chapter 2: Entering Raw Mode","updated-date":"2025-05-05T18:17:04","tags":["hecto"],"dg-path":"hecto-chapter-2.md","permalink":"/hecto-chapter-2/","dgPassFrontmatter":true}
---

## Table of Contents
- [[public/hecto\|Introduction]]
- [[public/hecto-chapter-1\|Chapter 1: Setup]]
- [[public/hecto-chapter-2\|Chapter 2: Entering Raw Mode]] 📍 You are here
- [[public/hecto-chapter-3\|Chapter 3: Raw Input and Output]]
- [[public/hecto-chapter-4\|Chapter 4: A Text Viewer]]
- [[public/hecto-chapter-5\|Chapter 5: A Text Editor]]
- [[public/hecto-chapter-6\|Chapter 6: Search]]
- [[public/hecto-chapter-7\|Chapter 7: Syntax Highlighting]]
- [[public/hecto-appendices\|Appendices]]
- [[public/hecto-change-log\|Change Log]]

## Chapter 2: Entering Raw Mode
![flenker-1712509029-0.png|philipp's blog](/img/user/attachments/flenker-1712509029-0.png)
Let’s try and read key presses from the user.
Remove everything in the `main.rs` and replace it with the following code:
```rust
use std::io::{self, Read};

fn main() {
    for b in io::stdin().bytes() {
        let c = b.unwrap() as char;
        println!("{}", c);
    }
}
```
Play around with that program and try to find out how it works. To stop it, press `Ctrl-C` or `Ctrl-D`.

Once you think you’ve sufficiently understood the program, head over to [this step on GitHub](https://github.com/pflenker/hecto-tutorial/commit/73c0e2acd8767953b469102b1fd8ff99d8c979c4) for an in-depth explanation of the code and syntax.

If you guessed that the code above would print out any character you type on a new line, you would’ve been wrong. Or half-right - this is what the program does, but it doesn’t immediately get the characters from the terminal for processing.

When you run `./hecto`, your terminal gets hooked up to the standard input, and so your keyboard input gets read into the `b` variable. However, by default your terminal starts in **canonical mode**, also called **cooked mode**. In this mode, keyboard input is only sent to your program when the user presses `Enter`.

This means that our program will let you type whatever text you want, and once you hit enter, it outputs the same text, with every character in a new line, before it waits for new input. If you press  `CTRL-D`, you tell `io::stdin().bytes()` that the file it’s supposed to read has ended. `CTRL-C` immediately terminates the program.

This behaviour is useful for many programs: it lets the user type in a line of text, use `Backspace` to fix errors until they get their input exactly the way they want it, and finally press `Enter` to send it to the program. This is how terminals work and has nothing to do with Rust. But this  does not work well for programs with more complex user interfaces, like text editors. We want to process each key press as it comes in, so we can respond to it immediately.

## Press `q` to quit?
To demonstrate how canonical mode works, we'll have the program exit when it reads a `q` key press from the user. To do so, add the following code below `println`  :

```rust
if c == 'q' {
    break;
}
```

The `break` statement will end the `for-each` loop, and it does so if the character that is read is a `q`.

To quit this program, you will have to type a line of text that includes a `q` in it, and then press enter. The program will quickly read the line of text one character at a time until it reads the `q`, at which point the `for..in` loop will stop and the program will exit. _Neither_ will the program end immediately once you press `q` (you have to hit `Enter` sometime after), _nor_ will it process anything that comes after the `q` -  Rust discards the additional characters while exiting.

## Entering Raw Mode
What we want is **raw mode**, and we’re going to use a dependency to change our terminal to it.[^3] External dependencies in Rust are called Crates (`cargo`, Crate … get it?), and the one we’re going to use is called [crossterm](https://docs.rs/crossterm/latest/crossterm/).

We add `crossterm` by running the following command:

```
cargo add crossterm
```

This produces the following output:
```
    Updating crates.io index
      Adding crossterm v0.27.0 to dependencies.
             Features:
             + bracketed-paste
             + events
             + windows
             - event-stream
             - filedescriptor
             - serde
             - use-dev-tty
    Updating crates.io index
```

`cargo` updates its index from [crates.io](https://crates.io) and then adds `crossterm` to the previously-empty `dependencies` section of the `Cargo.toml`. What follows is a list of features which are enabled (+) or disabled (-)  for this dependency. Features go beyond this tutorial, but you can read all about it [here](https://doc.rust-lang.org/cargo/reference/features.html).

Next time you run `cargo build`, you will see that `cargo` will build much more than just `hecto`, as it now also builds `crossterm` and the dependencies used by it.

Now, let’s use our shiny new dependency by replacing the contents of `main.rs` with the following code:
```rust
use std::io::{self, Read};
use crossterm::terminal::enable_raw_mode;
use crossterm::terminal::disable_raw_mode;

fn main() {
    enable_raw_mode().unwrap();
    for b in io::stdin().bytes() {
        let c = b.unwrap() as char;
        println!("{}", c);
        if c == 'q' {
			disable_raw_mode().unwrap();
            break;
        }
    }
}
```

Try it out, and you will notice that every character you type in is immediately printed out, and as soon as you type `q`, the program ends.

[Let’s investigate the code changes on GitHub](https://github.com/pflenker/hecto-tutorial/commit/0d30c3d9ea77beda16d19149b8720608378dd029).

## Dependency Management
Now is also a good time to discuss dependency management a bit more in detail and connect what we see here with a few things from Chapter 1.

Using dependencies means that we can focus on our coding task without having to reinvent the wheel (and reinvent the same bugs) over and over again.

The `Cargo.toml` plays a strong role in this. Not only do we list dependencies there, but if we are building a library function ourselves, we can use the `Cargo.toml` to provide additional information about our package should we decide to publish it. It’s normal, and sometimes unfortunate, that dependencies have other dependencies, and these other dependencies depend on other things, too. This implies that we essentially need to trust the author of the library to a) be a nice person, and b) have trusted or checked that the author if _their_ dependencies are _also_ nice persons, and so on. This can be a serious issue.[^4]

At this point, `cargo`s ability to selectively recompile parts of the code which have changed comes in pretty handy, as recompiling the whole thing might take a bit. The compile time is not _bad_ yet - that would be concerning after adding just one dependency - but the difference between a fresh `cargo build` and a subsequent one is noticeable already.

If you poke around in the `target` directories, as we did in Chapter 1, you will now also notice that the aptly named folder `deps` is now filled. And you can also notice that the resulting executable for a `release` build is _much_ smaller than the resulting executable for a `debug` build!

Let’s also try to understand a final piece of the puzzle, which we omitted in Chapter 1: The `Cargo.lock`. That file also contains information about the dependencies - even in more depth than the `Cargo.toml`. But what is it good for?

As described in the GitHub step above, `cargo` is nice enough to upgrade versions which do not include breaking changes. Let’s say `crossterm` introduces a bug fix but stays otherwise unchanged, then this behaviour means that we only need to ask `cargo` to update its index by running `cargo update`, then a subsequent build would use the updated version. You would only notice a longer build as `cargo` downloads it.

This poses a problem. Let’s say you have successfully released `hecto` and it is used around the world. Then someone submits a bug report, and you try to reproduce it. You open your old `hecto` code base, rebuild it, and you can’t find the error.
This means one of the following:
- You didn’t reproduce it properly
- Your machine is different than the other one, that’s where the error is coming from
- The bug was due to a faulty dependency, but that dependency has fixed the bug, which `cargo` downloaded, meaning your new version doesn’t have it

That is pretty annoying. The `Cargo.lock` attempts to solve one of these problems by providing  you with a very specific “fingerprint” of all the dependencies that went into your build.  You can build based on the dependencies in the `Cargo.lock` by using:
```
$ cargo build --locked
```
`cargo` then checks if the `Cargo.lock` still fits the `Cargo.toml` (so defining a new dependency or version in the `.toml`which is not part of the `.lock` yet creates an error), but it doesn’t use a version different from what  has been used before, even if there have been updates in the meantime.

## Entering Raw Mode, the Hard Way
To enter Raw Mode, we simply needed to call our dependency to do it for us. Neat!

What `crossterm` does for us is that it first _gets_ the attributes of our terminals under the hood, disables a lot of them and _sets_ these new attributes. `crossterm` uses methods from `libc`, which represent the [raw bindings to platforms’ system libraries](https://docs.rs/libc/latest/libc/index.html). Using them directly at this point would require us to use Rust functionality and concepts we don’t understand at this point, to modify obscure terminal settings which we _also_ don’t understand yet, so a library function it is!

If that doesn’t satisfy you, maybe the following will:
1. We will learn the required Rust concepts later in this tutorial. So once you’ve completed it, you should be able to set Raw Mode by yourself.
2. The underlying terminal attributes needed for Raw Mode are explained in depth in the [original `kilo` tutorial](https://viewsourcecode.org/snaptoken/kilo/02.enteringRawMode.html). The Rust way of doing this isn’t all that different.
3. If you want to understand the theory without deep diving into the implementation details, you can use `crossterm`’s [implementation](https://github.com/crossterm-rs/crossterm/blob/99fe255f33f774f04c09755572503349c915112b/src/terminal/sys/unix.rs#L71) as a starting point.

## Display Keypresses
To get a better idea of how input in raw mode works, let’s print out each byte that we read. We’ll print each character’s binary representation, its numeric ASCII value, as well as the character it represents if it is a printable character. We do this by changing our `main()` as follows:

```rust
fn main() {
    enable_raw_mode().unwrap();
    for b in io::stdin().bytes() {
        let b = b.unwrap();
        let c = b as char;
        if c.is_control() {
            println!("Binary: {0:08b} ASCII: {0:#03} \r", b);
        } else {
            println!("Binary: {0:08b} ASCII: {0:#03} Character: {1:#?}\r", b, c);
        }
        if c == 'q' {
            disable_raw_mode().unwrap();
            break;
        }
    }
}
```

Head over to [this step on GitHub](https://github.com/pflenker/hecto-tutorial/commit/8121519e5cb32b7a49fa3f8a80720daa0ed28f6d) to learn a bit more about code specifics.

Before we play around with this together, let me quickly tell you some fun facts about printing things in terminals. But first: typewriters.

[Typewriters](https://en.wikipedia.org/wiki/Typewriter) worked like this: A paper sheet was fixed on a drum, which in turn was fixed on a carriage. Every time you’d hammer on a key with a character, a mechanical stamp mechanism would stamp the corresponding character onto the paper and move the carriage a bit to the left. When you got near to the end of the paper, you’d hear an audible “Ding”, telling you that you should now care about a word break as the end of the paper was approaching. Then you would need to push a handle to the right. That handle did two things: It moved the carriage so that you could start the new line fully at the left, and it turned the drum so that you wouldn’t overwrite the previous line but started a new one instead.

All three concepts, the bell, the turning of the drum and the moving of the carriage are still present in computers, though historically, these concepts made their way via [teletypes](https://en.wikipedia.org/wiki/Teleprinter) to computers.[^1] To come back to `hecto`: You might have noticed further up that `println!` _did_ start a new line, but it didn’t start it _on the left_, as if on a typewriter we only rotated the drum but did not move  the carriage. We fixed this by adding the signal for carriage return (which is actually still called like this), `\r`, to the output above.

By the way, we’re a bit indecisive in our code about which parts we want Rust to handle (like the newline, which is added for us by `println!`), and what we want to do ourselves (like the Carriage Return). We’ll fix that later.

Now, let’s use our new program to learn a few things.

Under the hood, characters are just numbers, and numbers are represented in memory as `0`s and `1`s (We call these “Bits”) internally.  Let’s say we have `01100001` somewhere in our memory (we call 8 bits a _Byte_, so this is one Byte). It’s [easy to turn binary numbers into decimal numbers](https://www.rapidtables.com/convert/number/binary-to-decimal.html), and if we do this for `01100001`, we get the number `97`.  There exists a standard which maps a number like this one to a character. This standard is called ASCII, and when you [look up 97 in an ASCII table](https://www.asciitable.com/), the result is a lowercase `a`. Sure enough, if we type `a` into our new program, we see all three things printed out: `a`, `097` and `01100001`.
This is also why we could easily teach our program to treat a binary that we’ve read from the keyboard as a character. Basically we just told the computer “Please treat this number as a character”. The underlying binary number still stays the same, but Rust understands that we want to follow the convention from ASCII and prints out an `a` whenever we ask it to.

ASCII codes 0-31 are all unprintable characters (you’ll find the bell, the carriage return and the line feed from above in there as well), and 127 is also a control character. ASCII codes 32-126 are all printable. `is_control()`  would therefore simply look at the range of the code.[^2]

This is a very useful program, let’s play around with it some more. It shows us how various key presses translate into the characters we read. Most ordinary keys translate directly into the characters they represent. But try seeing what happens
- when you press the arrow keys,
- or `Escape`,
- or `Page Up`, `Page Down` , `Home`,  `End` (`fn` and Arrow Up, Down, Left, Right on a MacBook),
- or `Backspace`, `Delete`,  `Enter`.
- Make sure you also try key combinations with `Ctrl`, like `Ctrl-A`, `Ctrl-B`, etc.

You'll notice a few interesting things:
- Pressing `Escape` sends a single `27` byte as input.
- Arrow keys, `Page Up`, `Page Down`, `Home`, and `End` all input 3 or 4 bytes to the terminal: `27` (same as the Escape key), `[`, and then one or two other characters. This is known as an **escape sequence**, and the key is named after this.
- `Backspace` is byte `127`.
- `Enter` is byte `13` . If you look this up in the ASCII table, you’ll find that this is  a carriage return character, which we used above as `'\r'` - and not, as you might expect, a newline, `'\n'`
- Special characters such as German umlauts also produce multiple bytes.
- `Ctrl-A` is `1`, `Ctrl-B` is `2`, `Ctrl-C` is... `3` and doesn't terminate the program as you might have expected (Raw Mode disables this for us). And the rest of the `Ctrl` key combinations  seem to map the letters A-Z to the codes 1-26.
Looking closer at the byte representation, you’ll notice that ASCII is designed in a way that you can get from a character to its lowercase counterpart, or to `CTRL` and this character by just manipulating a couple of bytes. For example, `CTRL` seems to set the upper 3 bits to 0.

## Error Handling
Let’s wrap up this chapter by improving the way we handle errors (as in: We didn’t handle them before, but now we want to). This is also where I’ll make good on my promise and explain the occasional `unwrap()` we’ve met along the way.

First, some short theory. In many other programming languages, if a function encounters an error, it will not return, but instead “throw an exception”, which you can catch further above and then try to recover.  This means that we effectively have two ways a function can return control to whoever invoked it: Either by returning a value, or by throwing an exception, and both of these things require different pieces of code to handle, making it harder to reason about the code.

In Rust, you can return errors from functions just as any other return value, allowing for a much cleaner way to handle exceptional cases. To do this cleanly, Rust has the concept of a [Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html), which comes in two variants: `Ok` and `Err`.  Here is a metaphor that we’re going to use for a while:

Let’s say I owe you money and you request that money from me. Then either I give you the money or I tell you that nope, I have nothing to give to you. This is my way of telling you that “requesting money owed” is a function that either returns you some money, or it throws an exception. Note that returning 0 EUR in case I have no money would be invalid in case I actually owe you money, so throwing an exception here comes closer to the mental model of getting the money owed.

Now, instead of money, I return you a box, and I do that both when I have money and when I have no money. In case I have your money, it’s a pink box labeled `Ok`. Wrapped inside you will find the money you need. Otherwise it’s a black box labeled `Err`. That box contains information about why I didn’t give you anything (I have no money, or maybe _you_ owe _me_ money?!)

Now - what `.unwrap()` does is, to stay in the metaphor, to assume the box is pink and take the result out of it. If the box is black, your program will stop then and there.

The behaviour we want is that we pass Errors upwards as far as we can - let _them_ deal with that black box up there! - and at the highest level, when there is no one left to pass the Error to but ourselves, we would finally abort the program.

[Let’s build this in this step on GitHub.](https://github.com/pflenker/hecto-tutorial/commit/23f1c0f6c54d794a8794fa40432c8e52103cc188)

## Wrap-up and Outlook
In this chapter, we learned about dependencies in Rust, reading user input, the basics of error handling and a surprising  amount of information about how terminals and typewriters work.
If you found this chapter a bit light on coding, then you have something to look forward to: In the [[public/hecto-chapter-3\|next chapter]], we’re going to build the foundations of our text editor.


[^1]: The Bell was used to get the attention of a nearby operator.
[^2]: We’ve sidestepped a problem here: Everything I said about ASCII so far is true, but Rust uses a superset of ASCII for chars. We’ll get to the joy of text encodings later in the tutorial.
[^3]: To stay as close to the basics as we can, this tutorial avoids dependencies whenever it can. However, using dependencies are a crucial part of using Rust, so omitting them entirely would be pointless.
[^4]: [This link](https://www.openwall.com/lists/oss-security/2024/03/29/4) tells you all you need to know about just how bad it can be to recursively rely on trust.
