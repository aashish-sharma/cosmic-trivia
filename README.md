# Cosmic Trivia

Cosmic Trivia is a single page space and astronomy quiz developed as a DevComm International Developers Community recruitment task.
The main purpose was to create something that would allow users to take a fun quiz without being overwhelmed by complex interface as well as provide the quiz with unique appearance.

## What's Inside

The quiz contains 10 multiple-choice astronomy trivia questions and runs with the help of responsive space-themed UI.
The progress bar shows how many questions have been answered, questions can be skipped and returned to with the help of a question indicator, there's a 10-minute timer that ends the quiz when it reaches zero.
All of the answered options are highlighted in green if they are correct, or in red if they are wrong. Each answer also has a brief description and depending on how many questions were answered right or wrong, the player will receive a certain mission completion percentage.
In the end, it is possible to review all of the answers with brief descriptions, as well as restart the quiz or return to the main menu.

## Tech Stack
The quiz is built with a combination of HTML, CSS and JavaScript language.
It does not require any additional framework or libraries, which makes it easy to setup and work with.

## The Mechanic
Inside the script, there is an array of trivia objects with their respective answers.

Each time an option is selected, the progress bar, question indicator, and answer highlighter get updated. When the form is submitted, all of the answers are compared to the correct ones and the percentage is calculated.
After that, all the answers are revealed with their brief description, similar to a review screen.

The timer counts from 10 minutes and when it reaches zero, the quiz is forcefully ended.

## Project Structure
```

cosmic-trivia/
│
├── index.html
├── style.css
├── script.js
└── README.md
```
