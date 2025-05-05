---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"other","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"hecto, Chapter 3: Raw Input and Output","dg-permalink":"hecto-chapter-3/","created-date":"2024-03-30T09:37:00","aliases":["hecto, Chapter 3: Raw Input and Output"],"linter-yaml-title-alias":"hecto, Chapter 3: Raw Input and Output","updated-date":"2025-05-05T18:18:22","tags":["hecto"],"dg-path":"hecto-chapter-3.md","permalink":"/hecto-chapter-3/","dgPassFrontmatter":true,"created":"2024-03-30T09:37:00","updated":"2025-05-05T18:18:22"}
---

## Table of Contents
- [[public/hecto\|Introduction]]
- [[public/hecto-chapter-1\|Chapter 1: Setup]]
- [[public/hecto-chapter-2\|Chapter 2: Entering Raw Mode]]
- [[public/hecto-chapter-3\|Chapter 3: Raw Input and Output]] 📍 You are here
- [[public/hecto-chapter-4\|Chapter 4: A Text Viewer]]
- [[public/hecto-chapter-5\|Chapter 5: A Text Editor]]
- [[public/hecto-chapter-6\|Chapter 6: Search]]
- [[public/hecto-chapter-7\|Chapter 7: Syntax Highlighting]]
- [[public/hecto-appendices\|Appendices]]
- [[public/hecto-change-log\|Change Log]]

## Chapter 3: Raw Input and Output
![flenker-1715083263-0.png|philipp's blog](/img/user/attachments/flenker-1715083263-0.png)
Welcome to Chapter 3, where we'll explore the ins and outs of reading from and writing to the terminal. But before we dive in, let's polish up our code to make it more aligned with standard practices.

## Getting to Know Idiomatic Code
When working with newer languages like Rust, you've probably heard talk about **idiomatic** code. It's not just about making your code work; it's about making it fit in with how things are typically done in the language. But why does it matter?

Let's think about it this way: Imagine I told you that by following this tutorial, you could "kill two flies with one fly swatter"—learning Rust and building your own editor at the same time. Would you get what I mean?

For some, like German speakers, that might ring a bell because it's similar to a common German saying. Others might express it differently, like "killing two rabbits with one stick blow" in Portuguese. But for those not familiar with these sayings, it might take a bit of explaining. In English, we usually say "To kill two birds with one stone," emphasizing the importance of using expressions that everyone understands. While non-idiomatic phrases can still get the point across, they often lead to unnecessary focus on the wording rather than the message itself.

Writing idiomatic code is a bit like that. It's about following the usual rules and practices in the language, making your code easy for others to read and understand. Typically, people only dive into your code when something's not working right—either because there's a bug or they want to add something new. So, making your code easy to understand helps not only your current collaborators but also your future self when it's time to debug or add more features.

We'll tackle this in three steps: refining our code to fit with the usual style, using `crossterm` in the way it's meant to be used, and getting some guidance from a certain familiar paper clip from the 90s to stay on track.[^4]

Refining code without changing how it works is called _refactoring_. Our aim isn't perfection right off the bat; it's about continually improving to make our code easier to work with and build upon. And to make sure our changes don't break anything, we'll test things out manually for now. While automated tests would be great, they're a bit beyond what we're covering in this tutorial.

### Splitting the Code into Multiple Files

In Rust, like in many programming languages, it's usual for the main method to simply kick things off by providing the app's entry point, and not do much more. Our goal is to place our code where it logically makes sense, making it easier to find and maintain as we move forward. There are plenty of other benefits to this approach, and I'll point them out as we come across them.

Right now, our code is a bit tough to wrap your head around. To really understand what it does, you have to dig through the entire thing. In short, it echoes back every key pressed by the user and exits when 'q' is pressed. Let's simplify our lives by murdering two animals with one weapon: we'll introduce a new structure for our editor named `Editor`, which will reside in its own file. This will make the code easier to reason about and a bit more idiomatic.

A `struct` is basically a group of variables—and sometimes functions—that come together to form a meaningful whole. It’s exactly what we need to keep things neat and organized.

[Head over to GitHub to see this change and its comments.](https://github.com/pflenker/hecto-tutorial/commit/020820189e4e92a9848203b406b7c5691839f129)

Now, we can leave the `main.rs` alone while we focus on the `editor.rs` .

After this change and our newfound knowledge about structs and functions, let’s focus on `crossterm`. So far we’ve only used it to enter and leave `raw mode`,  but it can do much more. For now, we should use it to properly read from the terminal.

[This is how we do it](https://github.com/pflenker/hecto-tutorial/commit/fc28b24fb72bb669fa74b86001c661864e3da36f).

Now, this code change really expands upon how we work with `match`, so it’s time to understand `match` a bit better, and some other concepts, while we’re at it.

Let’s start with the inner `match`. It looks like this:
```rust 
match (event.code) {
    Char(c) => {
        if c == 'q' {
            break;
        }
    },
    _ => (),   
}   
```

The outer `match` statement (which we will discuss shortly) ensures that at this point we know `event`is a `KeyEvent`, which is documented [here](https://docs.rs/crossterm/latest/crossterm/event/struct.KeyEvent.html):

```rust
pub struct KeyEvent {
    pub code: KeyCode,
    pub modifiers: KeyModifiers,
    pub kind: KeyEventKind,
    pub state: KeyEventState,
}
```

So how have we been able to extract a character from this structure? Recall our discussion on Error Handling, where I described two metaphorical boxes: a pink one containing what we want, and a black one holding an error. We're extending this metaphor here.

Let’s look at the details of `KeyCode`:

```rust
pub enum KeyCode {
    Backspace,
    Enter,
   // More KeyCodes
    Char(char),
   // Some more KeyCodes
}
```

[Here is the full list](https://docs.rs/crossterm/latest/crossterm/event/enum.KeyCode.html), if you’re interested. So `KeyCode` can represent:
- a `Backspace`
- an `Enter`
- various other things (probably keys)
- a box containing a character
- additional things (probably even more keys)

That’s _immensely_ useful and goes _way_ beyond a usual if/then/else construct. What the first branch of the `match` does can be described as follows: “If `event.code` looks like a box with a character, let’s call this character `c` and execute the following block”.

Another thing to note about `match`: Matches need to be exhaustive, meaning that every possible case must be addressed. You have to make a conscious decision what to do in case there is no box with a character, but something else instead. We instruct `match` tohandle it as follows:  `_ => ()`. This means: For everything that didn’t match (denoted by `_`), do nothing (denoted by `()`).  

Isn’t this contradicting?, I hear you ask. If a `match` is designed to explicitly cover every case, then what is the purpose of just matching “everything”?  That’s a very good point, and you can actually teach `clippy`, whom we meet soon, to highlight this a potential issue.

Now it’s easier for us to understand the outer `match`, which looks like this:

```rust
match read() {
    Ok(Key(event)) => {
        // ... inner match
        }   
    },
    Err(err) => println!("Error: {}", err),
    _ => ()
}
```

The first branch uses the Boxes concept twice. It says: If `read()`returns a pink box labeled `Ok`, and in that pink box is another box labeled `Key`, then call what’s in that box `event` and proceed.
The second branch addresses errors directly: If there’s a black box, take the `err` out and display it.
The last branch handles all other combinations: For all pink `Ok` boxes that do not contain a box labeled `Key`, do nothing.

## "It looks like you're writing a program. Would you like help?"

Is the code idiomatic now? It seems so. But is it exceptional? Not exactly. Knowing all the idioms doesn’t make one a poet. To some extent, this is acceptable, as previously mentioned. However, we can enlist help from a [30-year-old annoying paperclip](https://en.wikipedia.org/wiki/Office_Assistant) to refine our code even further: `clippy`.

`clippy` is both the name of  an annoying Microsoft Office 97 feature, and a tool to point out possible  improvements in our code - a linter. You can run it from the command line with:
```
cargo clippy
```

`clippy`  already highlights some deliberate[^1] issues. Here is one example:
```
warning: unnecessary parentheses around `match` scrutinee expression
  --> src/editor.rs:19:27
   |
19 |                     match (event.code) {
   |                           ^          ^
   |
   = note: `#[warn(unused_parens)]` on by default
help: remove these parentheses
   |
19 -                     match (event.code) {
19 +                     match event.code {
   |
```

Take a moment to appreciate how precise and useful the feedback is! It specifically pinpoints the problematic part of the code. We’ll address this issue soon, but let’s first allow `clippy` to do more extensive checks. `clippy` has various settings, or flags, and the most appropriate one for us as beginners is `pedantic`, enabling `clippy` to suggest all possible idiomatic improvements.

We run it like this:
```
cargo clippy -- -W clippy::all  -W clippy::pedantic
```

This command now triggers several warnings.
Not only does `clippy` point out a weakness in our code, it also provides a link to the documentation for further reading. That's great!

`clippy` can also go ahead and fix certain issues for us:
```
cargo clippy --fix -- -W clippy::all  -W clippy::pedantic
```

We can tell `clippy` which flags we want to be used by default, for instance by adding the following code to the top of our `main.rs`:
```rust
#![warn(clippy::all, clippy::pedantic)]
```
This directive activates warnings for the two categories `all` and `pedantic`.  Despite the name, `all` does not include _everything_, but categories such as  `correctness`, `suspicious`, `style`,  `complexity` and `perf`.  Looking at the [docs](https://doc.rust-lang.org/nightly/clippy/), it seems like `style` is exactly what we need, but the others won’t hurt us, either.

[Let’s apply these changes, including clippy's automatic fixes and manual corrections, in this commit.](https://github.com/pflenker/hecto-tutorial/commit/4a7df66f1103b318b28b8d5374aa172e0bf3ac8a).

Through this process, `clippy` has taught us two lessons: how to optimize format strings and the use of `if let `for cleaner pattern matching.

`clippy` still rightfully points out that our `run()` function doesn’t depend on the specific instance of Editor. We structured it this way intentionally to introduce different types of functions simultaneously, and we are going to change this, soon.  

Ultimately, our goal should be to compile the code without any warnings at all, signalling to future developers that we’ve strived to produce the best possible code. Whenever a tutorial step involves a practice that  `clippy` would frown upon, I will make sure to clarify that in the text.

## Paranoid `clippy`
We can crank up `clippy` to 11 and make it extremely vigilant.  The documentation describes various additional flags that can be enabled to maximise `clippy`'s scrutiny. The following command includes all the options that seem useful for `hecto`:
```
cargo clippy -- -W clippy::all -W clippy::pedantic  -W clippy::nursery -W clippy::cargo -W clippy::restriction
```

This approach is rigorous but comes with a cost: The more paranoid `clippy` becomes, the more likely it is to flag some presumably bad code that is actually acceptable under the circumstances. Worse yet, some of the rules we've enabled may point out issues with perfectly valid code or contradict other rules.
At our current level of experience, fully understanding these nuances can be challenging, and we might dive down the wrong rabbit hole. For the Rust newbies that we are, the pedantic setting is already ambitious. Therefore, we'll stop there for now.

## Improved Error Handling
Let's wrap up our look at idiomatic code by addressing our promise about error handling. Our goal is to:
- **Handle locally:** If we can address an error where it occurs, we'll take care of it.
- **Pass upwards:** For errors we can't fix directly, we'll pass them up the chain for further handling.
- **Top-level handling:** If an error reaches the highest level, we'll manage it as gracefully as possible.

As part of this, we'll separate the error handling logic from the main loop and print out a simple goodbye message.

To see how this works, [check out the code here](https://github.com/pflenker/hecto-tutorial/commit/ce8bed0ce9efc7d03e6e822b47b235ad3cdbc8f4).

## Press Ctrl-Q to quit
Right now, our Text Editor exits anytime someone types a `q`, which isn't exactly ideal. Let’s about we switch it up and make it quit only when you hit `Ctrl-Q`.
Plus, as our code gets more complex and the functions grow, we need a smoother way to close the program without having to manually interrupt the loop all over the place.
We'll tackle this by tweaking our `Editor` struct to include a boolean named `should_quit`. This fix will also get rid of that final warning from Clippy.

You can check out how we made these changes [here](https://github.com/pflenker/hecto-tutorial/commit/3134980bc6b3ca898545d65c31890b6ebe87e452).

Diving into these updates means we're also getting a taste of how Rust handles memory safety with something called Ownership. Rust is pretty strict about who gets to read and write data, and it likes us to be clear about our intentions to change (or _mut_ate) anything by using the `mut` keyword. We'll dive deeper into Rust's Ownership model a bit later on.

## Clear the screen
We're about to dive into how we render the editor's user interface each time a key is pressed. This happens at three crucial moments:
- **Starting up:** We're setting the stage for the user.
- **After each keypress:** To respond to the user's actions.
- **Before exiting:** To clean up our workspace and leave a tidy farewell message.

First things first, let's clear the screen. We'll pause our Rust programming for a brief moment and switch our focus to terminal commands. We're going to tackle the concept first and save the actual implementation for later.
For now, just drop this line into your code wherever you feel like the screen needs a refresh:
```rust 
print!("\x1b[2J");
```

The `print! `macro in Rust lets us send data directly to the terminal. Unlike `println!`, which ends with a newline, `print!` only outputs exactly what we tell it to. We start with `\x1b`, the escape character, or 27 in decimal.
Let's break down `\x1b`:
- `\x` signifies that what follows should be read as a hexadecimal number.
- `1b` translates to 27 in decimal (you can check out the conversion [here](https://www.rapidtables.com/convert/number/hex-to-decimal.html)).

⠀The remaining part, `[2J`, forms part of an **escape sequence**. If you recall our previous discussion about escape sequences, like those for the Arrow Keys, it shouldn't surprise you that they can also instruct the terminal to perform various actions—like clearing the screen.

Here, we’re using the J command ([Erase In Display](http://vt100.net/docs/vt100-ug/chapter3.html#ED)) to wipe the screen clean. The 2 in [2J tells the terminal to clear the entire screen. Different arguments adjust the scope:
- `\x1b[1J` clears up to the cursor.
- `\x1b[0J` clears from the cursor to the end of the screen.
- Simply `\x1b[J` defaults to clearing from the cursor to the end.

For a deeper dive into the magic of terminal commands, explore the [VT100](https://en.wikipedia.org/wiki/VT100) escape sequences widely supported by modern terminals. Full details are in the [VT100 User Guide](http://vt100.net/docs/vt100-ug/chapter3.html).

Check out [this documentation on virtual terminals](https://learn.microsoft.com/en-us/windows/console/console-virtual-terminal-sequences) and experiment with crafting your own escape sequences and write them out with the command above.

While `crossterm` largely spares us from manually entering these sequences, understanding them can be pretty fascinating. However, moving forward, we won't need to write them ourselves.

Let’s now make our  our code cleaner and more structured:
- Initially, we enable Raw Mode and clear the screen, setting up our editor.
- Finally, we clean up: disable Raw Mode, clear the screen again, handle any errors, and bid farewell to the user.
- In between, our loop reads the input, evaluates it, updates the screen, and repeats—keeping things neat and manageable for our future selves. Better start cleaning up now while the code is still manageable.
From now on, we'll stop echoing each keypress, keeping the screen clear and focused.

[Check out this update in action.](https://github.com/pflenker/hecto-tutorial/commit/ba50855df0d40a34ce373db95027ef6e213b8283)
Experiment with the result and you'll find that the screen clears as expected, keypress echoes are gone, and exiting is smooth. We're one step closer to transforming hecto into a fully functioning text editor!

Lastly, remember that clearing the screen each time can obscure compiler tips. To catch any warnings, run `cargo build `separately. Keep in mind, Rust won’t recompile unchanged code, so to get a fresh set of warnings, run` cargo clean` first, then `cargo build`.

## Assignment 1: Tildes
This is now where we’ll switch sides. So far, I’ve been in the driver’s seat, showing you what I did  and why. Now, you’ve seen enough Rust to grab the wheel yourself. Both `clippy` and me are still there to help you. And if you don’t do the assignment yourself but immediately look at the solution  then that’s fine, too.

I will usually explain the assignment a bit and give you some pointers on how to solve them. Some assignments include a _Bonus_. The idea here is that you should be able to figure out the core assignment by yourself, with only the knowledge presented in the tutorial so far, but the _Bonus_ might be something a bit harder to reach. However, my solution will at times use alternative ways to solve something, or point out different ways to solve the respective problem, so make sure you check out my solutions to learn new things.

It's time to start drawing. Your first task is to draw a column of tildes (`~`) on the left hand side of the screen, like [vim](http://www.vim.org/) does. In our text editor, we'll draw a tilde at the beginning of any lines that come after the end of the file being edited.

“Drawing” means: We move the cursor wherever we want to draw something, then we print out whatever we want to draw. We didn’t move the cursor previously,  leading to our Goodbye message being printed out somewhere in the terminal, but not on the top-left. So we plan to position our cursor to the top-left, start drawing tildes one by one, and once we’ve reached the bottom, we’ll position the cursor back into the top-left corner.

Take a look at the following code in Rust Playground and experiment with it - it contains a few things you might find useful for the task.
```rust
fn main() {
    let somesize = (10,20);
    dbg!(somesize);
    dbg!(somesize.0);
    dbg!(somesize.1);
    for number in 0..10 {
        dbg!(number);
    }
}
```
[Link to Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=7a63b4a737f91a26ad0e68142aa50912)

Here’s the task:
- Implement a function called ￼`draw_rows()`￼ . This function should print a ￼`~`￼  in every row.
  - [￼`crossterm::cursor::MoveTo`￼](https://docs.rs/crossterm/latest/crossterm/cursor/struct.MoveTo.html) moves the cursor.
  - [￼`crossterm::terminal::size`￼](https://docs.rs/crossterm/latest/crossterm/terminal/fn.size.html)  provides you with the size.
- Refactoring\: You’ll notice that we’re doing a lot of similar things whenever we’re interacting with `crossterm`. It’s time to encapsulate at least parts of the Terminal in its own file.
  - If you get stuck importing your new file into the editor, try using `mod` in the `main.rs`instead. We will investigate this together later.

This should not produce any `clippy` warnings.

## Assignment 1: Code Review
[Solution to Assignment 1 on GitHub.](https://github.com/pflenker/hecto-tutorial/commit/a63b417ebf74199cd16c3bd46445873b0498088a?diff=unified&w=0)

Under the hood, `crossterm` has used the Escape Sequence `\x1b[H`, the `H` command ([Cursor Position](http://vt100.net/docs/vt100-ug/chapter3.html#CUP)), to position the cursor. The `H` command actually takes two arguments: the row number and the column number at which to position the cursor. So if you have an 80×24 size terminal and you want the cursor in the centre of the screen, you could use the command `\x1b[12;40H.` (Multiple arguments are separated by a `;` character.) The default arguments for `H` both happen to be 1, so we can leave both arguments out and it will position the cursor at the first row and first column, as if we had sent the `\x1b[1;1H` command. (Rows and columns are numbered starting at 1, not 0 - `crossterm` doesn’t follow this and uses 0 as the start).

## Types in Rust
Let’s start talking about _types_ now.  Intuitively, a _type_ is something that we can use to better reason about whatever we’re talking about. And in Chapter 2 we saw that the _type_ of a data point in memory determines whether Rust treats `01100001` as an integer,  `97` or a character, `a`.
The first type we encountered was therefore a `Char` , representing a single Character. You might remember that even this seemingly innocent, basic type is already fuzzy, as our intuitive understanding of a character differs from Rusts understanding (I never learned how to write a Carriage Return at school, for example!). In Chapter 4, we’re going to explore chars in more detail and discover that Chars, in Rust, are actually UTF-32 encoded.

Up until here, we encountered a few types, but never really commented on them:
- `Char`, as discussed above.
- `Editor` and `Terminal` are types we’ve defined ourselves.
- A `Result` is a type which represents either the pink box labeled `Ok`, or the black box labeled `Err`.
- `std::io::Error` is a specific Error type for Errors that can happen during Input or Output operations  - in our case, when reading from the terminal or when writing to the terminal.
- Then we have seen various kinds of so-called Enums. An Enum is a list of different variants that something can have. `crossterm` ’s `KeyCode`  is an enum which represents all kinds of potential keys that can be pressed.

There is a spectrum which defines how strict a programming language works with types. On the one side of the spectrum you have languages like `JavaScript`, which really do not care about types at all. If you want to call the method `foobar()` on anything it won’t complain, it only checks once it gets to that code if this “anything” even has a method called  `foobar()`.  This is called “weak typing”.

And on the other side of the spectrum you have languages like `Java`, which require you to be very deliberate with your types and try to protect you from calling methods on invalid types. This is called “strong typing”.

There is also a middle ground, with oddities like `TypeScript`, which brings strong typing to `JavaScript`, or `Groovy`, which brings weak typing to `Java`.[^2]

Rust is firmly on the “strong type” side of the spectrum. But if that’s true, why did it take us until the last third of Chapter 3 to fully encounter them? Why, for instance, were we allowed to write the following in our `main()` earlier?
```rust
 let editor = Editor::default(); 
```
There is no trace of the type of `editor`, yet this compiles.

Rust tries to be very accommodating to developers here. It infers the type wherever it can, and since there is no way that `Editor::default()` returns something other than an `Editor`, we don’t need to make it explicit in this assignment. We, as developers, have to be less verbose in what we write, and should we change the return value of `default()`, we would have one less code piece to touch for this update. We can (and sometimes have to) make the type explicit. If we wanted to make the assignment above explicit, we would write:
```rust
let editor: Editor = Editor::default(); 
```

This way, if we change the return type of `default()`, the compiler asks us to also change the type of `editor`.

This is called _Type Inference_, and Rust can do that because we explicitly need to mention types where it matters, i.e. in _function signatures_. For example, our function signature to move the mouse cursor looks like this:
```rust 
    pub fn move_cursor_to(x: u16, y: u16) -> Result<(), std::io::Error> 
```
This can be read as follows:
- `pub`: What follows can be accessed outside of this file.
- `fn`: What follows is a function.
- `move_cursor_to`: This function is henceforth referred to as `move_cursor_to` .
  - `(`: What follows is an definition of everything this function expects as an input, when called.
    - `x: u16`: The first thing this function expects needs to be of type `u16`. It will henceforth be referred to as `x`.
    - `y: u16`: The second thing this function expects needs to be of type `u16`. It will henceforth be referred to as `y`.
  - `)`: This  ends the definition of the input for this function.
- `->` What follows is a description about what this function will return to the caller.
- `Result`:This function returns a `Result`, which is one of two possible boxes labeled `Ok` or `Err`.
  - `<`: What follows is a definition of the two boxes this function returns.
    - `()`: An `Ok` box will contain nothing, it will be empty.
    - `std::io::Error`: An `Err` box will contain a `std::io::Error`.
  - `>`: This ends the definition of the boxes.

## Integer Types
Let’s take a look at the new type, `u16`, which we have seen `crossterm` using and then utilized in our own code. This is one of multiple types to represent numbers. As you might have guessed from the hidden complexity around `Char`s (where we haven’t seen the end yet, more on this in Chapter 4), numbers are also not easy to handle. First of all, we need to separate integers from other numbers, like fractions.  Remember, in storage everything is just 0s and 1s, so if you’re dealing with a fraction you have to reason about how you can actually represent them in memory, which isn’t trivial.
Luckily, we’re dealing with integers here. They are easier to handle than fractions, but still - they also come in multiple flavours. Let’s meet them in a rust playground first, so you can experiment with them.

```rust

fn main() {

    let small_u: u8 = std::u8::MAX;  
    let medium_u: u16 = std::u16::MAX;  
    let large_u: u32 = std::u32::MAX;  
    let extra_large_u: u64 = std::u64::MAX;  
    
    let small_i_min: i8 = std::i8::MIN;  
    let small_i_max: i8 = std::i8::MAX;  
    let medium_i_min: i16 = std::i16::MIN;  
    let medium_i_max: i16 = std::i16::MAX;  
    let large_i_min: i32 = std::i32::MIN;  
    let large_i_max: i32 = std::i32::MAX;  
    let extra_large_i_min: i64 = std::i64::MIN;  
    let extra_large_i_max: i64 = std::i64::MAX;  

    println!("Unsigned integers:");
    println!("u8 max: {}", small_u);
    println!("u16 max: {}", medium_u);
    println!("u32 max: {}", large_u);
    println!("u64 max: {}", extra_large_u);

    println!("Signed integers:");
    println!("i8 min: {}, max: {}", small_i_min, small_i_max);
    println!("i16 min: {}, max: {}", medium_i_min, medium_i_max);
    println!("i32 min: {}, max: {}", large_i_min, large_i_max);
    println!("i64 min: {}, max: {}", extra_large_i_min, extra_large_i_max);
}

```

[Link to Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=d9ab1c4613e62957ed2a759c48c2d892)

Let’s start with the distinction between 8,16,32 and 64: the width.

By width, I mean here how many bits are used to represent that number. This width determines the amount of different combinations I can represent. A hypothetical 2-bit integer has the following combinations: `00`, `01`, `10`and `11`. I can store 4 different values in that small integer. The `16` in `u16` means a width of 16 bit, which yields us a more impressive 65 536 different values. Rust, even has integers as wide as 128 bit, resulting in 340 000 000 000 000 000 000 000 000 000 000 000 000 different combinations. That’s between one undecillon and one duodecilllion.

So why not be on the safe side and always use the widest integer type? The answer is: Performance. Smaller units can be processed more swiftly by your machine.  A 32-bit machine is called like that because it can handle 32-bit operations efficiently. Any bigger data type would have to be handled differently under the hood,  decreasing performance. It follows that you sometimes might want to use the widest type available on the machine - for example u32 on 32-bit machines, and u64 on 64-bit machines. That’s what another type is representing: `usize` and `isize`, respectively. We will discuss and use these a bit later.

The other distinction between integer types is denoted with the letter i, for (signed) integer, or u, for unsigned integer. The _sign_ this refers to is the minus in front of it, i.e. if an integer is allowed to be negative or not. Let’s get back to my awesome 2 bit integer. As I told you, it can represent 4 different values, but which ones? If I decide for _signed integers_ , it would represent -2, -1, 0 and 1 (By convention, the range is a bit wider on the negative side). If I decide to go for _unsigned integer_s, I would be able to represent 0, 1, 2 and 3.[^3]

This means that in scenarios where I do not expect negative numbers, an unsigned data type yields me around the double amount of numbers.

`crossterm`  uses the type `u16` to place the mouse, so an unsigned 16 bit integer. “Unsigned” makes sense - the coordinate `(0,0)` is on the top left corner of the terminal, so we won’t ever expect negative coordinates. 16 bit, unsigned, means that the highest number we can represent is 65 535. So we can infer that  by taking over `u16` from `crossterm`, ``hecto`` won’t run properly in terminals bigger than that. We can live with that for now.

## Better Drawing of Tildes
The next assignment are a few under the hood improvements. For starters, I’m unhappy with how we write to the terminal. We used the `println!` macro in the past and switched to `print!` in the previous step. But we’re also using `crossterm`, where we use some construct using a macro called `execute!`. This is bad for three reasons:

One - it irks me that we are mixing two concepts - direct printing and `crossterm`. For me, this irking is like something that smells when you enter a room. This is usually referred to as a [Code Smell](https://en.wikipedia.org/wiki/Code_smell): something that possibly indicates a deeper problem.

Two - We don’t understand `execute!` yet, we simply used it because the documentation told us to. That also smells fishy, in my opinion.

Three - printing is weird sometimes, and our code doesn’t account for it.

Let’s start with that last part, how weird printing is. Printing to the screen is an expensive operation, and to make this more efficient, there is a concept of a buffer. Whenever you try to write on screen, you actually write to this buffer instead, and this buffer is emptied (and written to the screen) either if you do it manually or if the buffer is full. We didn’t run into this issue yet because usually the buffer is _line_ buffered, so it automatically writes out at the latest if a full line is in the buffer. All our printing so far has included new lines, so we didn’t see that issue. But writing the escape sequences does not necessarily print out a new line, means that at that point we might be subject to buffering issues,

Which brings us to the second part,  the fact that we don’t understand what we’re using. `execute!` is actually a macro that ensures that whatever you pass to it is printed out immediately. That’s.. half great? It’s almost what we want, but as I mentioned above, writing is an expensive operation, and we really only need to fully write to the screen after we are done with evaluating the keypress. We do not need a full write for every cursor placement, clear screen or write and can leave it up to the buffering mechanism and can leave it up to the system to figure out the best timing to write each of these things. This could even lead to weird flickering effects if we write out every small change all the time.

And this brings me to the first point, the Code Smell. Investigating that Code Smell has lead us to read up on `execute!` and uncover how weird printing can be. And the result is that we now understand that our code only works the way it works by a lucky coincidence, and that it is not working very efficiently.

## Assignment 2: Improved Drawing
There is another possible source of the annoying flicker effect we should take care of now. It’s possible that the cursor might be displayed in the middle of the screen somewhere for a split second while the terminal is drawing to the screen. To make sure that doesn’t happen, let’s hide the cursor before refreshing the screen, and show it again immediately after the refresh finishes.

Then, instead of clearing the entire screen before each refresh, it seems more optimal to clear each line as we redraw them.

Here’s the full assignment now:
- Hide the cursor before you refresh the screen by using [Hide](https://docs.rs/crossterm/latest/crossterm/cursor/struct.Hide.html).
- Show the cursor after you’re done refreshing by using [Show](https://docs.rs/crossterm/latest/crossterm/cursor/struct.Show.html).
- Clear only what you intend to redraw by using an appropriate [ClearType](https://docs.rs/crossterm/latest/crossterm/terminal/enum.ClearType.html).
- Refactor the current implementation to no longer directly use  `print!`, but use `crossterm`’s [Print](https://docs.rs/crossterm/latest/crossterm/style/struct.Print.html#) instead.
- Refactor the current implementation to no longer use `execute!`. Use `queue!` instead, which you can use exactly the same. You’ll need to manually ensure a write by calling `stdout.flush();` to trigger the write at the appropriate time. Hint: To call this, you need to `use std::io::Write;`.
- Bonus Refactor: `size()` returns a pair of two ordered values, called a tuple. Wouldn’t it be nicer if we somehow worked with a `struct`, so that we could make it make it more explicit which of the two values is the `height` and which one is the `width`?
- Bonus Refactor 2: `MoveTo` works with two parameters to denote the x and y position. Wouldn’t it be nicer if we somehow worked with a `struct`, so that we can make it more explicit which of these two values is the x and which is the y position?

## Assignment 2: Code Review
[Solution to Assignment 2 on GitHub.](https://github.com/pflenker/hecto-tutorial/commit/bc0a1ac66ed65dd7fcffebd8140d4c4d575dc0ab)

`crossterm` uses escape sequences to tell the terminal to hide and show the cursor. The `h` and `l` commands ([Set Mode](http://vt100.net/docs/vt100-ug/chapter3.html#SM), [Reset Mode](http://vt100.net/docs/vt100-ug/chapter3.html#RM)) are used to turn on and turn off various terminal features or [“modes”](http://vt100.net/docs/vt100-ug/chapter3.html#S3.3.4).  It appears the cursor hiding/showing feature appeared in [later VT models](http://vt100.net/docs/vt510-rm/DECTCEM.html). So some terminals might not support hiding/showing the cursor, but if they don’t, then they will just ignore those escape sequences, which isn’t a big deal. Either way, we trust `crossterm` to use the correct escape sequences for us anyways.

The `K` command ([Erase In Line](http://vt100.net/docs/vt100-ug/chapter3.html#EL)) erases part of the current line. Its argument is analogous to the `J` command’s argument: `2` erases the whole line, `1` erases the part of the line to the left of the cursor, and `0` erases the part of the line to the right of the cursor. `0` is the default argument, and since that’s what we want, that’s what `crossterm` used under the hood.
 
## Unexpected Obstacles
This assignment, and the bonus, contained two unexpected gotchas. Let’s first understand the problems together.
The first gotcha is, we are somehow not allowed to use `flush()` without importing something we don’t even need.

Here is the issue in isolation:
```rust
use std::io::stdout;
use std::io::Write; //Remove this line and it won't work

fn main() {
    print!("Testing!");
    stdout().flush().unwrap();
}
```
[See this code on Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=e5e343e5e9cf5ac5b17f2d4e34de8c26)

The second issue is that we can’t freely pass around our new structs without the Compiler complaining at some point.

Here is the issue in isolation:
```rust
struct Size {
    height:u16
}

fn get_size() -> Size {
    Size{height:2}
}

fn print_size(size:Size) {
    let Size{height} = size;
    println!("The height is {}", height);
}
fn print_size_assessment(size:Size) {
    let Size{height} = size;
    if height < 5 {
        println!("It's small");
    } else {
        println!("It's tall");
    }
}

fn main() {
    let size = get_size();
    print_size(size);
    print_size_assessment(size);
}
```
[See this on Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=db9eb0af30a8a1477b507821acb0107e)

To fix this, you can either change the parameter of the two functions, or you can do something cryptic like I did in my code.

I’m going to give you a cryptic explanation for both of these things now. Then I will explain a couple of things, then I will repeat the explanation, it should then be less cryptic.

Both issues relate to traits. We need to import another trait for `stdout`, so that we can access `flush()`. And I was telling Rust to create the implementation for some traits for me.

Let’s learn together what this all means.

## Move Semantics & Ownership
Pop Quiz!  What is the result of the following:
```rust
#[derive(Debug)]
struct Hecto;
fn main() {
    let x = Hecto{};
    println!("x is {:?}",x); // This would prints out "x is Hecto"
    let y = x;
    println!("x is {:?}, and y is {:?}",x, y); // ... and this?
}
```

(Ignore the `derive` fora second, it’s not crucial for understanding here)

[Try it on the Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=74136d711e93c1c4caf4d919ba369798).

The answer is: Nothing, it doesn’t work. Seems weird?
Then what about another Pop Quiz!

What is the result of the following:
- I put an apple in your left hand
- You bite into the apple
- I take this apple and move it to your right hand
- You bite into the apple in your left hand, then you bite into the apple in your right hand.

The answer is: Nothing, it doesn’t work. Let’s learn.

Rust tries very, very hard to ensure Memory Safety. Let’s look a the following metaphor to illustrate the problem:

If you are the proud owner of a lot of money, it’s not always practical to carry this around, as it’s heavy. You put it somewhere and take a map, or multiple maps pointing to different parts of your wealth with you. Those maps represents your wealth.[^6]

If you are the proud owner of a huge data structure (Say: a file), it’s not always practical to move this file around in memory, as it’s heavy. You put it somewhere and take a pointer to it with you (We call this _dereferencing_). That pointer represents your file.

If you hand out one of your maps to me, and I can then not only access the money you have hidden there, but also the money you have hidden somewhere else, then suddenly one of your maps which you thought points to money, points to an IOU by me instead.  Similarly, if you copy your map and hand one of them to me and one to your friend, and I then take out the money, your friend will find a IOU where they expected money.
Your hiding places aren’t safe.

If you hand one of the pointers to your file to me and I can then delete some other file of yours, then suddenly some of your other pointers point to something else. Similarly, if you hand a pointer to me and to some other function, and I can change your file, then the other function finds a modified file which it probably didn’t expect.
Your memory isn’t safe.

Different programming languages use different approaches to solve this. `C` doesn’t solve it at all and leaves it to you, the developer. `JavaScript`  YOLOs it. Let’s learn a few aspects of how Rust does it.

Rust is very strict in keeping track about _who_ does _what_ with each value. What we have seen above is the “Move Semantics”: Rust moves the ownership over the `struct`  instance from `x` to `y`, attempting to access via `x` is then no longer possible.

Why doesn’t Rust just _copy_ the value, so that `x` and `y` are separate?
Rust does that when it can. Try the above examples not with a struct, but with integers for `x` and `y`, and you will see that it works perfectly fine.
But for more complex data types, such as a `struct`, Rust  doesn’t really know how to do it. What Rust proposes to us above is that we do not pass the real thing, but a pointer to it, or to tell Rust how it can copy the thing. It _could_ guess it itself, as we will see in a bit, but let’s fully understand the concept of traits first.

## Traits
We’re now confronted with the situation that in order to achieve something, in this case copying something around, we need to implement something.

We’ve seen this here and there already. Consider this line in the example above:
```rust
println!("x is {:?}",x); 
```
This only works if Rust knows how to create a `Debug` representation of `x`. Rust knows how to do that for easy data types like `u16`, but not for `struct`s.

So Rust needs a way to tell us: Hey, in order print _this as a debug thing_, I want you to do _tell me how_!
And we need a way to tell Rust: _this is how you do it!_

What we’re looking for are called traits. A _trait_ is just that: A statement that says “You need to implement a couple of things for this to work”.

Let’s code a bit to explore this in depth. Let’s say we want our new and shiny test struct, `Hecto`, to show up as a debug string. Let’s try this:
```rust
struct Hecto;
fn main() {
    let x = Hecto;
    println!("{:?}",x);
}
```
[See this on the Rust Playground.](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=fdb6fdf484af983f6a984f780dcf33f7)

This does not compile, and the compiler specifically tells us why:
```
  = help: the trait `Debug` is not implemented for `Hecto`
```

Ok, understood, “the trait is not implemented” means something like “we have to code something so that this works”. [The Docs](https://doc.rust-lang.org/std/fmt/trait.Debug.html) tell us what this trait looks like:
```rust
pub trait Debug {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```
What this says is: This is a trait called `Debug`, and in order to implement this trait, you need to implement a function named `fmt` with that specific signature.

If you tried to be smart above and change the print statement a bit, to:
```rust 
println!("x is {}",x); 
```
Then this would also fail, this time because Rust wants you to implement the `Display` trait.

According to [the docs](https://doc.rust-lang.org/std/fmt/trait.Display.html), the trait looks like this:
```rust
pub trait Display {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

So that’s basically the exact same function signature. This implies that we can’t simply implement that function, we have to do it in a way so that Rust understands which function implements which trait, so that the actual debug and display representations differ.

Fine, we’ll do that then, but we’re going to be childish about it.  And I’ll cheat a bit and jump to the solution on how to handle the formatter, since the point here is not how the formatter works, but: How do we tell Rust that we want to implement this method?

The answer is that we are implementing the function in a special `impl` block, which looks like this:
```rust
impl Debug for Hecto {
// Implementation goes here
}
```
 
This means: “This implementation block implements the `Debug` trait for the data type `Hecto`.
 
Let’s try this out.

```rust
use std::fmt::{Debug, Result, Formatter};
struct Hecto;
impl Debug for Hecto {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(f, "Hecto is awesome.")
    }
}
fn main() {
    let x = Hecto;
    println!("{:?}",x);
}
```
[Try this on the Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=994e9410401d2acca5d573b75aa17927)

What we do here is to say: whatever `Hecto` is, whatever it contains, the only debug information you’ll ever need is “Hecto is awesome.”.  

And sure enough: This time, the code compiles and the debug info is exactly what we implemented.

Try to play around with this and implement the `Display`trait, so that this line works:
```rust
    println!("{0:?} - {0}",x);
```

## Deriving and Using Traits
We’re getting closer to understanding both problems from above now.

`Stdout` does not directly implement `flush()`. Instead, it implements a trait called [Write](https://doc.rust-lang.org/std/io/trait.Write.html), and that trait requires `flush()`.  The reason is that at certain points in the code, we might not want to say “We expect a `Stdout`here”. We might want to say “We don’t care what this is here, as long as it implements the `Write` trait”. Implicitly, this is what `println!` does. It doesn’t say “I want to get a `Hecto` here”. It doesn’t know this thing. So instead it says “I want to have something here that implements Debug”.

The code line `use std::io::Write;` brings the trait in scope, and its implementation, and makes `flush()` available to us.  You could easily write your own implementation for `Write`, including your own way to `flush()`, and use this here instead.

There, that’s one thing explained now. But what about the other one?

I told you further up that Rust _can_ guess some traits for us, but we have to explicitly tell it to do so, to avoid auto-implementing all kinds of traits we’d never use. That’s what `derive` does.

If, instead of implementing the Debug trait for hecto, we derived it, our previous code sample would look like this:

```rust
#[derive(Debug)]
struct Hecto;
fn main() {
    let x = Hecto;
    println!("{:?}",x);
}
```
[See how this works on the Rust Playground.](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=aaa47f47dd01888e94d484a8493b771c)

We can also ask Rust to derive the traits necessary for copying things around for us (`Copy` and `Clone`). Let’s extend the pop quiz from earlier and to this:
```rust
#[derive(Debug, Copy, Clone)]
struct Hecto;
fn main() {
    let x = Hecto{};
    println!("x is {:?}",x); // This would prints out "x is Hecto"
    let y = x;
    println!("x is {:?}, and y is {:?}",x, y); // ... and this?
}
```
[See how this works on Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=a790c796177b20a615cf21d6ca5e1867)

And this, of course, just works.

Now, how did `Clone` sneak in here?  That’s not terribly important right now, but since you asked:   `Copy` is meant to be inexpensive, implicit and quick. You can’t implement that one yourself, Rust needs to do it for you. `Clone` can be heavyweight and you can implement it on your own.

## Summarising the Assignment
With this knowledge, let’s circle back to the two questions that we asked ourselves during the code review:
- Why do we need to import `std::io::Write` though we don’t use it?
- Why did my code have to use something like `derive`?
I’ll repeat my answer here. It should be less cryptic now:

Both issues relate to traits. We need to import another trait for `stdout`, so that we can access `flush()`. And I was telling Rust to create the implementation for some traits for me.

## Assignment 3: Welcome Message
Perhaps it’s time to display a welcome message. Let’s display the name of our editor and a version number a third of the way down the screen, centred in the middle of the terminal.

Here is a Rust Playground for you to play around with, with stuff you will find useful:
```rust
fn main() {
    let division = 9/3;
    dbg!(division);
    
    let longer = "hecto".repeat(3);
    dbg!(longer);
    
    let slicing = &"hecto"[..2];
    dbg!(slicing);
    
    let length = "123".len();
    dbg!(length);
    
    let x:u16 = 1;
    let result = (length as u16) - x;
    dbg!(result);
}
```
[Link to Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=2e0abd7adcb23d30f32895bc510add97)

Note that the data type returned by `len()` is not an `u16`,  you have to use `as` to cast it. The data type for the result is `usize`. This one is a bit special, as its size depends on your system. If your system is 32bit, `usize` is 32bit, so 4 byte. If your system is 64bit, `usize` is 64bit, so 8 byte. Same applies to the signed counterpart `isize`.

Here is the assignment:
- A third down the screen and centered, display `hecto` and a version number.
- Bonus Refactoring: Use the newfound knowledge around traits to further simplify the code in `terminal.rs`.

## Assignment 3: Code Review
[Solution to Assignment 3 on GitHub.](https://github.com/pflenker/hecto-tutorial/commit/c234b6e648a97b2609070faa20d7cf2c12443b84)

If you did the bonus assignment, you probably used a function signature along the following lines to indicate you’d like to have a parameter that implements the `Command` trait:

```rust
 fn queue_command(command: impl Command) -> Result<(), Error>
```

In my code, I used this one instead:
```rust
fn queue_command<T:Command>(command: T) -> Result<(), Error>
```

For our purposes, they are equivalent. I went with the more complex one because I assumed you’d find the easier one (which might arguably be more appropriate  in this case).

Now let’s discuss my code - it contains a bug. Let’s see if your code has it, too: make your terminal very narrow and then try to run `hecto`. Does it crash? If not, congratulations! The student has become the master.

If it does, hang on for a second while we  explore some edge case behaviour first. As per our tradition, here is a Rust Playground to play with:
```rust
#[allow(arithmetic_overflow)]
fn main() {
    let huge : u32 = std::u32::MAX; 
    dbg!(huge);
    dbg!(huge as u16);
    let small: u16 = 0;
    dbg!(small-1);
    dbg!(9/3);
    dbg!(10/3);
}
```
[Link to Rust Playground](https://play.rust-lang.org/?version=stable&mode=release&edition=2021&gist=cced39a660546214d2bff4aac0f0e237)

Play around, see what happens. Then change the toggle at the top left, next to “Run”, from `Debug` to `Release` and see what happens.

There are several things going on here.
- Why does this crash on `Debug`, but work on `Release`?
- Why is `huge` so small?
- Why is `small` so big?
- Why do the last two lines have the same result?

Let’s start at the bottom, because that’s probably the least of your questions: We’re dealing with integers, not fractions, so it’s only mildly surprising that Rust does not return a fraction.

Now, let’s go to the top - why the difference in behaviour for `Debug` and `Release`?
I already foreshadowed this in Chapter 1. The reason is: The kind of behaviour the bug produces is very confusing and definitely mostly not what you want (this is especially true  for the middle two issues which we will investigate in a second), so whenever this happens, Rust chooses the most drastic way it can tell you that you have been wrong: it crashes.

Rust _can_ continue though, since it _does_ get some values to work with. Very, very wrong ones, but values nonetheless. And assuming for an end user a crash is worse than wildly wrong data, it continues.

But what happened to `huge`, and what happened to `small`?
Let’s circle back to my tiny data structure from above, the 2 bit integer. And let’s also invent a 3 bit integer and call the unsigned variants `u2` and `u3`, respectively. This is what they can store:

| Number | `u2` | `u3`  |
|:------:|:----:|:-----:|
| 0      | `00` | `000` |
| 1      | `01` | `001` |
| 2      | `10` | `010` |
| 3      | `11` | `011` |
| 4      |      | `100` |
| 5      |      | `101` |
| 6      |      | `110` |
| 7      |      | `111` |

If you remember one of the earlier chapters, the operator `as` tells Rust: Treat this underlying number differently. We used this to tell rust to treat a binary number as a `Char`.
Let’s say we do something like `let x: u2 = 3` . Then under the hood, x is stored as `11`. If we do `let y = x as u3`, it just rolls with it, as  `011` for `u3` represents a 3, same as `11` for `u2`.

But if we do `let x: u3 = 7` followed by `let y = x as u2`, we take something that is under the hood represented as `111` and turn it into `11`, which is: 3. 7 becomes 3.

This is how  `huge` became so small.

Let’s look at the other oddity. Take a look again at the table above and how `u2` changes for each decrement. The algorithm to remove one from a binary number seems to be:
1. Start at the right.
2. If the current number is 1, decrease it to 0. You are done.
3. If the current number is 0, flip it to 1 and move one step to the left.
4. Go To 2.

What if you performed this on 0, represented as  `00`? The algorithm would then flip your number to `11`, making a 3, and then end. 0-1 is 3. This is called an _underflow_. The opposite exists, too - it’s called an _overflow_.

And this is how `small` became so huge.

You might be tempted to think that the crash was all about that one place where we tried to make room for the tilde without checking `padding`. Yes, that’s true, but part of the issue is also that we were driving without a safety belt.

Let me fix this. I won’t make this an assignment to fix my faulty code, I’ll clean this up myself.

## Safe arithmetics and casting
[Here is the fixed code.](https://github.com/pflenker/hecto-tutorial/commit/93550f129bd3a13958e5659206032a02efc98200)

As you saw, I have taught `clippy`  to tell me all about potential pitfalls - but I disabled most of them again whenever they occurred. If you think this is pointless, hear me out:

I think it makes a whole lot of difference if someone _deliberately_ turns off a safety, or if they do so _by mistake_. _Deliberately disabling a `clippy` rule_ tells whoever reviews your code (it could be you) “This here did not happen by mistake, I did it on purpose”.  That alone is a strong signal that we’re sending.

But I am doing more: I left different types of comments aimed at whoever comes after me (it could be me). I was verbose, and I tried to start with the most relevant thing (describing under which circumstances to expect the edge case). That’s all I did.

Let’s also take a step back here:
There are multiple other ways to solve the problem.
- Ignore it. It’s highly unlikely anyone will ever face it, as it only occurs in extreme edge cases. If ever.
- Crash. We could attempt to convert `usize` to `u16` or vice versa and crash if it didn’t work.
- Prevent it. Part of the issue is that we have no control over the `Position`  people pass to us. We could refactor our code to enforce the bounds of `Position`.
- Document it and move on.

I don’t think that any of these 4 options is highly preferable over the other 3. But that’s not the point - the point here is that `clippy` made us aware of this issue and forced us to make an explicit decision instead of just having stuff randomly happen to us. And that. Is. Awesome.

Under other circumstances, I would have opted for the 1st solution because I happen to assume that someone working with low-bit microcontrollers will likely not use `hecto` on them. In this case I opted for the 4th solution to make this point about documentation.

But I did not write this only to wag my finger at you, but (also) show you something cool. Run the following if you have checked out my code or created some `///` comments yourself:
```
cargo doc --open
```

This creates another build target: `doc`, and opens your browser with some auto-generated documentation.  Go to `target/doc/hecto/` to find all the documentation files. That’s pretty awesome. Check out the [docs](https://doc.rust-lang.org/rustdoc/what-is-rustdoc.html) (the official ones) for more info.[^5]

## Some Text-Related Concepts
Less finger wagging, more coding! Before we do, I need you to pause again for a split second.

As a text editor, we’re going to be able to edit some text, right? The text we’re going to edit is what we will call a `Document`.  

We need to be able to talk about a specific place in a `Document`. This is what we call a `Location`,  depending on the line it is in and the number of visible characters before it.

`hecto` is represented on a screen.  That flashy thing on your screen is what we call a `Cursor`, and also refer to it as the `Caret`. We will never talk about a mouse pointer when we talk about a cursor. Where on screen the Caret is located is what we call its `Position`. It depends on the `Row` it is in, and on the `Column`.  It’s not the same as the Insert `Point`, which is a specific Location in the text. Once we have text that goes beyond a single screen, the pairs Point/Caret and Location/Position will start to diverge.

In the upcoming assignments, we will experience multiple times how one complex concept emerges from a simpler, different one. To start with, the concept of a `Location` in the document will evolve from the concept of a `Position` on screen. There will be several more concepts emerging as we go along.

For each assignment, I will point out the concept we’re about to start evolving, so that you can take your design decisions accordingly.

## Assignment 4: Caret Movement

Let’s focus on input now. We want the user to be able to move the caret around.
We also want to keep track of where the caret currently is, because we will evolve the caret position into the location of the point in the document over the next chapters.

Here is a tiny Rust Playground for some concepts:
```rust
use core::cmp::min;
fn main() {
    let what_is_this:u8 = min(4,8);
    dbg!(what_is_this);
    match what_is_this {
        4 | 8 => {
            println!("It's one of the two numbers!");
        }
       _ => {
            println!("It's something else!");
        }
    }
}
```
[Link to Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=f821ffda3619e7dddffee34b1f1dbdd8)


Here is the assignment:
- Keep track of the current position of the cursor on screen. It’s up to you if you already implement this as keeping track of the `Location` (that’s representing where we are in the text) or  if you treat this as a `Position` (that’s representing where we are on the screen)
- Listen to more `KeyCode` s to allow movement `Up`, `Down`, `Left`, `Right`.  Decide at which point to place the cursor to the right position on screen.
- Make sure the cursor stays within the screen’s boundaries, so e.g. pressing `Right` while on the rightmost position doesn’t do anything - to check this, make sure that if you press right once while at the rightmost position, then it should only take you one left-press to move one step to the left.
- Handle `PageUp`, `PageDown`, `Home` and `End` to move the cursor to the top, bottom, left and right side of the screen, respectively.
- There is no need to properly handle resizing the terminal.

**Windows-Only Addition**: To ensure your code works properly also on Windows machines, you have to ensure that you’re only listening to Key Press Events. To do so, you need to adjust the if..let like this:
```rust
 if let Key(KeyEvent {
            code, modifiers, ..
            code,
            modifiers,
            kind: KeyEventKind::Press, //This is new
            ..

        }) = event {
			//...
}
```
[Thanks to lv_motong for pointing this out!](https://github.com/pflenker/hecto-tutorial/pull/22/commits/84072271fd858caed3db4f28f3526571ef39a4fb)

**Code Review:** [Here is how I solved it.](https://github.com/pflenker/hecto-tutorial/commit/c942416642df9c38e798df3ebf452573f688cc98)

## Wrap-up and Outlook
This chapter started out with musings around idiomatic code, introduced us to `clippy`,  Rust’s type system and subtle bugs and finally turned the program we’re working on into something resembling a text editor.

I hope this chapter has given you a first feeling of pride when you saw how your text editor was taking shape. Since we now know our way around Rust, we won’t have to worry that much about refactoring, or new concepts, in the upcoming chapters and can focus on adding functionality.

In the [[public/hecto-chapter-4\|next chapter]], we will get our program to display files.


[^1]: I swear it was deliberate.
[^2]: both these languages are supersets of their respective counterpart. Pure `Java` code is valid `Groovy` code, and pure `JavaScript` code is valid `TypeScript` code.
[^3]: What happens if you add 1 to the number 3, you ask? We get to that soon.
[^4]: This tutorial is written by someone with a strong JavaScript background, and it’s based on a tutorial which is written in C (and to top it off, the way it’s been written was to make the resulting editor fit in less than 1000 lines and is therefore also not idiomatic). If we’d continue like this, we’d soon have very weird code at hand. I once knew a guy who learned Perl professionally and was self-taught in Java. He called his coding style “Java with a Perl necklace”. I can confirm the accuracy of this assessment.
[^5]: Some of the tiny things from Rust amaze me. If you look at your docs, you will see both `const`s auto-documented which we created earlier.  Since they are `const`, Rust knows their value _exactly_ and includes it into the docs.
[^6]: Seems absurd? Then what’s that funny printed piece of paper in your wallet which you exchange for food? (Before you answer this: Yes, I know what [Fiat money](https://en.wikipedia.org/wiki/Fiat_money) is).
