MY CAMPUS TRACKER

A simple, accessible planner that helps students keep classes, clubs, events, workouts, and dorm plans organised in one place. Built as a collaborative front-end web development project.

ABOUT THE PROJECT

My Campus Tracker is a front-end web application built with HTML, CSS, and JavaScript. It allows students to record and manage different campus activities, including courses, club meetings, campus events, internships, sports, gym sessions, and dorm plans.

The app stores activities locally in the browser, so users can add, update, and organise their weekly plans without needing an account or a backend server.
FEATURES

Add, delete, and sort campus activities.

Search with regular expressions.

Filter by category using @tag:category.

Dashboard with totals, weekly plan progress, and a 7-day chart.

Save activities in localStorage.



Minutes and hours conversion.
Accessible forms, keyboard navigation, and clear messages.
Responsive layout for mobile, tablet, and desktop screens.

COMPONENTS AND STRUCTURE

The project is organised into separate files so that each part of the application has a clear responsibility.
index.html contains the main page structure, forms, dashboard, activity table, and navigation.
css/styles.css contains the layout, colours, typography, responsive design, and focus styles.
scripts/state.js manages the activity data, IDs, sorting, and helper functions.

scripts/validators.js checks user input using regular expressions and returns clear validation messages.
scripts/search.js handles normal text search, regular-expression search, and category filtering using @tag:category.
scripts/storage.js saves activities in localStorage and manages JSON import and export.
scripts/ui.js updates the page, displays messages, renders activities, and handles user actions.
scripts/main.js connects the HTML elements, state, validation, search, storage, and interface together.
tests/tests.html contains the automated browser tests used to check that the main functions work correctly.

CHALLENGES

One challenge was making sure the regular expressions correctly validated user input without rejecting valid activity names, dates, durations, or categories.
Another challenge was managing activity data safely in localStorage, especially when importing JSON files or replacing existing activities.
We also had to make sure the dashboard updated correctly after adding, editing, deleting, importing, or exporting activities.
Making the application accessible required careful use of labels, keyboard navigation, focus styles, and ARIA live messages so that users could understand what was happening on the page.
Finally, creating a responsive layout took time because the activity table, forms, and dashboard needed to remain clear and usable on mobile, tablet, and desktop screens.

TECHNOLOGIES USED

HTML5, CSS3, JavaScript, localStorage, regular expressions, JSON, and GitHub Pages.

DEMO VIDEO

https://www.youtube.com/watch?v=7o_JkgHwcTo

WEB LINK
https://igiranezasammybelin.github.io/MY-CAMPUS-TRACKER/#main

