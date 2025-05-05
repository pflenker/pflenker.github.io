---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"other","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"hecto, Chapter 1: Setup","dg-permalink":"hecto-chapter-1/","created-date":"2024-03-30T09:36:00","aliases":["hecto, Chapter 1: Setup"],"linter-yaml-title-alias":"hecto, Chapter 1: Setup","updated-date":"2025-05-05T18:18:20","dg-show-toc":false,"tags":["hecto"],"dg-path":"hecto-chapter-1.md","permalink":"/hecto-chapter-1/","dgPassFrontmatter":true,"created":"2024-03-30T09:36:00","updated":"2025-05-05T18:18:20"}
---

## Table of Contents
- [[public/hecto\|Introduction]]
- [[public/hecto-chapter-1\|Chapter 1: Setup]] 📍 You are here
- [[public/hecto-chapter-2\|Chapter 2: Entering Raw Mode]]
- [[public/hecto-chapter-3\|Chapter 3: Raw Input and Output]]
- [[public/hecto-chapter-4\|Chapter 4: A Text Viewer]]
- [[public/hecto-chapter-5\|Chapter 5: A Text Editor]]
- [[public/hecto-chapter-6\|Chapter 6: Search]]
- [[public/hecto-chapter-7\|Chapter 7: Syntax Highlighting]]
- [[public/hecto-appendices\|Appendices]]
- [[public/hecto-change-log\|Change Log]]

## Chapter 1: Setup
![flenker-1712399493-0.png|philipp's blog](/img/user/attachments/flenker-1712399493-0.png)

Ahh, step 1. Don't you love a fresh start on a blank slate? And then selecting that singular brick onto which you will build your entire palatial estate?

Unfortunately, when you're building a **computer program**, step 1 can get... complicated. And frustrating. You have to make sure your environment is set up for the programming language you're using, and you have to figure out how to compile and run your program in that environment.

Fortunately, the development environment that Rust comes with does most of the things for us, so you don’t need anything  besides a text editor[^1] and `rust`. This tutorial was written on a Mac, though it _should_ work on Windows and Linux as well.

## How to install Rust
In order to install Rust, we’re going to use  `rustup`,  which manages installed Rust versions and associated tools.
Rust comes with a fantastic, free book: [The Rust Programming Language](https://doc.rust-lang.org/book/title-page.html). I will link to this book often for more in-depth knowledge, whenever I think the book explains it better than I do, To install `rustup`, just follow [Chapter 1.1: Installation](https://doc.rust-lang.org/book/ch01-01-installation.html) for your platform. At the time of writing, it works like this on Mac: Open a terminal  (find it by typing “Terminal” into Spotlight) and enter the following command:

```
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

The installer greets you with some options, and offers to just go with the default by hitting `Enter`. The installation ends with the following encouraging words:

``` 
Rust is installed now. Great!
```

Restart your terminal, and then type the following:
```
rustc --version
```

You should see some information about the version you’ve installed. If not, head over to the [Installation guide for troubleshooting](https://doc.rust-lang.org/book/ch01-01-installation.html).

By the way, we’ll use the terminal a lot in this tutorial, so just keep it open.

## The `main()` function

Create a new file named `hecto.rs`and give it a `main()` function.(`hecto` is the name of the text editor we’re building).
```rust
fn main() {
    return;
}
```
In Rust, you have to put all your executable code inside functions. The `main()` function in Rust is special. It is the default starting point when you run your program. When you return from the `main()` function, the program exits and passes control back to the operating system.[^2]

Rust is a compiled language. That means we need to run our program through a Rust compiler to turn it into an executable file. We then run that executable like we would run any other program on the command line.

To compile `hecto.rs`, run `rustc hecto.rs` in your terminal. If no errors occur, this will produce an executable named `hecto`. To run `hecto`, type `./hecto` and press `Enter`. The program doesn’t print any output.[^3]

## Compiling with `cargo`
In theory, `rustc` is all need to build `hecto`. In practice, Rust comes with some convenient things that will make development easier, and as you will see later, safer.

Rust comes with a program called `cargo`. If you are used to the `JavaScript` ecosystem, then `cargo` can best be described as rust’s equivalent to `npm`. It helps you manage your dependencies, compile the code  and other things.  With Rust being installed correctly, you can type the following command to invoke cargo:
```
cargo --version
```
We’ll use this program to get started with hecto. Delete your previous `hecto.rs` and the executable `hecto` again by typing `rm hecto.rs hecto`.

In a directory where you’d like `hecto` to come to life, type the following:
```
cargo init hecto --vcs none
```

Using `--vcs none` part ensures that you init `hecto` without `git` support. If you want to use `git` in this project, omit this flag (but then you’d need to have `git` installed)

`cargo` claims success by telling you the following:
```
 Created binary (application) package
```

It created a new folder called `hecto`, populated with some files. We will go through most of them in a bit, the most interesting one is a file called `main.rs` in a folder called `src`.

Let’s look at that one. When you open it, you’ll find that it already contains a `main()`. Just by looking at it, we can infer that this program [follows the ritual of the ancients](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program)  by printing out "Hello, World!" and exiting.

To use `cargo` to compile this program, make sure you are in the `hecto` folder (Run `cd hecto` after `cargo init hecto`), and then run `cargo build` in your shell. `cargo` is not silent as `rustc`was and will produce output that looks a bit like this:
```
   Compiling hecto v0.1.0 (/Users/pflenker/repositories/hecto)
    Finished dev [unoptimized + debuginfo] target(s) in 12.36s
```

Running this command adds a few more files (which we’ll look at in a second) and puts an executable called `hecto` into the folder `target/debug`. Let’s execute `./target/debug/hecto` to convince ourselves that this program does, indeed, print out `Hello, World!` and then exit.

## Understanding `cargo`’s Extra Files (and Features)
Our `hecto` directory now contains a whole bunch of things (some of them hidden, the specifics might look different on your machine):
1. A folder called `src`, containing the `main.rs`.
2. Two files named `Cargo.toml` and `Cargo.lock`
3. A folder called `target` with some hidden files in it and a folder called `debug`. That folder contains more files and folders and our executable, `hecto`.
What are all these extra things good for? Let’s learn.

### The `src` Folder
The `src`  folder is where all our source files will live. Right now, we only have one. Soon, there will be more.

### `Cargo.toml` and `Cargo.lock`
This file follows a config format called [TOML](https://toml.io/en/) and is used to tell the compiler a few things about the code it’s supposed to compile. We take a closer look at the default one a few paragraphs down..  

 `cargo` also does dependency management for us, and the `Cargo.toml` will hold these dependencies for us. The `Cargo.lock` is part of that dependency management and ensures that dependencies stay consistent in different environments. No need to worry about that now - we will deep dive into that in the next chapter.

### Build Targets
Let’s take a look at `target` and its contents.
`cargo` supports multiple so-called _build targets_. The one that is used as the default is `debug`, meaning that the final executable is mainly targeted at us, the developers, and not at actual, real end customers.

Another valid target would be `release`, which is the opposite: Something to put into the hands of the customers, not only for developers.

To build a release version, run:
```
cargo build --release
```

Once you do, you will notice that another folder appeared in the `target` folder, aptly named `release`.

Wait a minute, what does it mean, “the executable is targeted at someone”, doesn’t it only print “Hello World”, regardless of who uses it?.[^4]

Well, it does.
First of  all, the Rust compiler tries to be very accommodating to developers and end users, therefore it treats `debug` and `release` builds differently.  We will encounter a concrete example later, but there are several types of programming errors where Rust assumes that you really, really did not do this on purpose. If a `debug` build encounters this kind of error, the program crashes, which is the most extreme thing Rust can to tell you just how wrong you’ve been. But Rust _does_ have a way to recover from these errors and can continue. With wrong results though, but it _can_ continue, and assuming that for an end user, a wrong result is bad, but a crash is worse, the same error would not crash the `release` build.

Secondly, the compiler can perform various optimisations under the hood to make the result faster. But these optimisations take time and make compilation slower. Who compiles all the time? Developers. Who compiles never? Users. Therefore, `debug` builds disable the optimisations to prioritise speed in development, and `release` builds enable them to prioritise speed in execution.

Lastly, the executable does contain code other than just “Hello, World”, and Rust adds  information to the `debug` build which will help you debug any issues quicker. This information isn’t needed for customers, therefore it can be excluded from the release build.

`cargo` also tells us as much during compilation, the final line for a `debug` release reads like this:
```
Finished dev [unoptimized + debuginfo] target(s) in 0.04s
```
This tells us that the build is not optimised and contains debug info.

The `release` build, on the other hand, ends its compilation with:
```
Finished release [optimized] target(s) in 0.04s
```
This tells us that no debug info is contained, and that it’s an optimised build.

Let’s take a closer look at the debug info, but let’s not mess with our new and already beloved text editor code. Instead, head over to the [Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021), which helpfully already contains our hello world function.  On the top left, you see some buttons Debug, then Stable, and then `...`. Click these 3 dots and enable `backtrace`.

Then change the code in the playground as follows:
```rust
fn main() {
   panic!("Hello, World");
}
```

`panic!` triggers a crash, plain and simple. Click on “Run” to run it. Then click on “Debug”, change it to “Release”, and run it again.

You will notice that the`release` build generates the following output:
```
     Running `target/release/playground`
thread 'main' panicked at src/main.rs:2:4:
Hello, World
stack backtrace:
   0: rust_begin_unwind
   1: core::panicking::panic_fmt
   2: playground::main
```

The `debug` output looks like this:
```
     Running `target/debug/playground`
thread 'main' panicked at src/main.rs:2:4:
Hello, World
stack backtrace:
   0: rust_begin_unwind
             at /rustc/7cf61ebde7b22796c69757901dd346d0fe70bd97/library/std/src/panicking.rs:647:5
   1: core::panicking::panic_fmt
             at /rustc/7cf61ebde7b22796c69757901dd346d0fe70bd97/library/core/src/panicking.rs:72:14
   2: playground::main
             at ./src/main.rs:2:4
   3: core::ops::function::FnOnce::call_once
             at /rustc/7cf61ebde7b22796c69757901dd346d0fe70bd97/library/core/src/ops/function.rs:250:5
```

We haven't discussed Stack Traces in detail yet, but even without this knowledge you can immediately see that the debug output contains more information than the release versions. Understanding the _call stack_, so the order in which functions have called other functions and then some more until one of them crashed, can be tremendously useful.

### Build Artefacts
So that explains the folders, but what about the stuff in there that is not `hecto`? Let’s investigate something to further our understanding.

Back in the terminal, run the following commands in order:
```
cargo clean
cargo build
cargo build
```
(Yes, we run `cargo build` two times)

The first command cleans the `target` directory. The second command runs as before. During third one, though, `cargo` does not output a line starting with `Compiling`, as it did before. That is because `cargo` can tell that the current version of `main.rs` has already been compiled. If the `main.rs` was not modified since the last compilation, then `cargo` doesn’t bother running the compilation again. If `main.rs` was changed, then `cargo` re-compiles `main.rs`. Once your codebase grows, this will become more useful, as most of the components shouldn’t need to be recompiled over and over when you’re only making changes to one component’s source code.

All (okay: most) of the extra files in the `target` directory are _build artefacts_  which enable `cargo` to do subsequent compilations more quickly. [Find more on this in ￼ `cargo￼’s` documentation.](https://doc.rust-lang.org/cargo/guide/build-cache.html)

## Compiling and Running
Since it's very common that you want to compile and run your program, `cargo` combines both steps with the command `cargo run`.

Try changing the return value in `main.rs` to a string other than `Hello, World`. Then run `cargo run`, and you should see it compile. Check the result to see if you get the string you changed it to. Then change it back to `Hello, World`, recompile, and make sure it's back to returning `Hello, World`.

## Code Review
Let’s take a look together at the code.

[Open this step on GitHub](https://github.com/pflenker/hecto-tutorial/commit/147a30cac80412b739808b864b1831c2fca182a8)

If you follow the link above, you’ll see an _annotated commit_. It shows you all the changes that have happened in the code between the previous step and the current one, with some comments directly on the line with the relevant code.

In this case, I am describing the contents of the `Cargo.toml` in that commit.

Working with commits like this comes with a lot of upsides:
- You can see explanations directly on the code I’m referring to, making it much easier to understand the code change.
- You can directly ask questions (GitHub account required) or comment on code fragments you don’t understand


In the beginning it might be tiring for you to switch back and forth between this tutorial and GitHub. However, as soon as we’ve learned the basics I am no longer going to show you what I did upfront so that you can repeat it - instead I’m going to tell you the assignment first and later show you what I did to solve it,  so you’ll switch to GitHub less often.

I will link to a lot of additional material throughout this tutorial. Here’s a convention I will stick to: Information crucial to understanding the tutorial will be either on the GitHub commits or directly here in the text. Any other link that is not clearly identifiable as a step on GitHub contains optional information that you can skip if you’re not interested.

## Wrap-up and outlook
In this chapter, we’ve installed Rust, initialised a bare-bone project and familiarised ourselves with it. We now know how to compile code by hand and with `cargo` and have a good initial understanding of `cargo` and the files it produces. Most importantly, we can build stuff and clean up behind us if need be. We also met the Rust Playground, which will sure come in handy once we want to investigate new things in isolation before we put them into action.

In [[public/hecto-chapter-2\|Chapter 2]], we’re going to build a program which reads user input, prints it on the screen and exits on pressing `q`.  That alone will hold a ton of beginner’s learnings for us.


[^1]: At one point, you’ll be able to edit `hecto`with `hecto`, so you won’t even need a text editor any more.
[^2]: Rust supports _asynchronous_ code, which we won’t cover in the tutorial. In this case, it’s perfectly possible for `main` to end but not pass control back to the Operating System yet.
[^3]: Not sure about you, but creating an actual, real world, grown-up executable was, and somehow still is, a magical moment for me.
[^4]: Depending on your context, it might seem odd to you to even _ask_ this question, since the concept of build variants is pretty widespread nowadays. This used to be different.
