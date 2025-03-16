<h2 align="center">Habit by Bit</h2>

[Find the project here](https://habit-by-bit-react-e35ac67403a0.herokuapp.com/signin)

[To Backend Repo](https://github.com/lienebriede/habit-api)

This web application is a habit tracking platform designed to help users build and maintain positive habits. It allows users to create, track, and manage habit stacks, set reminders, and visualize their progress through an intuitive dashboard. The application is built with a Django backend for robust data handling and React for a dynamic and responsive frontend. The platform follows a mobile-first design, ensuring a seamless experience across all devices, from desktop to mobile.

Responsive:<img src="">

## Table of Contents

1. [Project Description](#1-project-description)
2. [User Experience](#2-user-experience)
    - [Agile Methodology](#agile-methodology)
    - [User Stories](#user-stories)
    - [Design](#design)
3. [Features](#3-features)
4. [Technologies Used](#4-technologies-used)
    - [Languages and Frameworks Used](#languages-and-frameworks-used)
    - [Frameworks, Libraries and Programs Used](#frameworks-libraries-and-programs-used)
5. [Validation and Testing](#5-validation-and-testing)
6. [Bugs and Fixes](#6-bugs-and-fixes)
7. [Deployment](#7-deployment)
    - [Deployment to Heroku](#deployment-to-heroku)
    - [Cloning and Forking the Repository](#cloning-and-forking-the-repository)

# 1. Project Description

### Key features

- **Seamless User Authentication & Security**: The application supports secure user registration, login, and profile management, ensuring personal data is protected while offering a smooth onboarding experience.
- **Scalable Habit Tracking System**: Built to handle multiple habit stacks for individual users, the system enables them to create, track, and modify their habits with flexibility. It supports habit extensions, automatic scheduling, and a reminder system to keep users on track.
- **Data-Driven Insights**: The platform offers users detailed analytics, such as streaks, milestones, and progress tracking, allowing users to visualize their habit journey and maintain motivation over time.
- **Mobile-First & Responsive Design**: Designed with a mobile-first approach, the app provides an optimized, fluid user experience across all devices, ensuring that users can track and update their habits anywhere, anytime.
- **Community Engagement & Social Features**: The app includes social sharing features where users can post their milestones, share progress in a feed, and celebrate achievements with others in the community. This fosters a sense of connection and encourages collective growth.

### Site goals

- Offer an intuitive and easy-to-use habit building tool.
- Visual tools like streaks and milestones to inspire users to stick with their habits.
- Create a space for users to share progress and connect with like-minded people.
- Customizable habit stacks, reminders, and extensions to meet users' evolving needs.
- Fully mobile-optimized and responsive design to make habit tracking easy on any device.

### The Ideal User

The ideal user is a motivated individual who wants to form new habits but needs encouragement and visibility of their progress. They value a simple, easy-to-use interface but also seek motivation through streaks, milestones, and community support. This user wants to share their journey, connect with others, and receive positive reinforcement to stay on track. They prefer a mobile-friendly platform but appreciate a consistent, seamless experience across all devices.

[Return to contents list](#table-of-contents)

# 2. User Experience

## Agile Methodology

A project named 'habit by bit' was created to facilitate the planning and management of the app's development process. See the project [here](https://github.com/users/lienebriede/projects/10).

Agile values and principles have been followed in the creation of this project for educational purposes. Common Agile practices such as Epics, User Stories, Story Points and prioritization have been implemented.

### Kanban Board

There have been 42 issues managed on the Kanban board, encompassing Epics, User Stories and Bugs. 
Throughout the project, encountered bugs were tracked separately with a dedicated bug label. By the project's conclusion, all implemented requirements were moved to the 'Done' column (excluding Epics and 'Won't Have' items).

<img src="docs/kanban_screenshot.png" width="600">


### Epics and Milestones

User Stories were devided into 7 Epics:

- User Registration and Profile Management
- Navigation & UI Structure
- Habit Stack Management
- Habit Tracking
- Habit Progress
- Content Sharing
- Testing

To effectively track the project and organize development phases, milestones were established. Given that the frontend development had to be completed within a month, the work was divided into four milestones, each spanning one week. To streamline progress tracking, epics were assigned to specific milestones, ensuring a structured and efficient workflow.

*Sprint 1:* Focused on foundational features, including User Registration and Profile Management, as well as Navigation & UI Structure, to ensure a smooth onboarding experience.

*Sprint 2:* Centered on Habit Stack Management, allowing users to create, edit, and organize their habit stacks.

*Sprint 3:* 
Introduced Habit Tracking and Habit Progress, enabling users to monitor their daily habits, view streaks, and track their long-term progress.

*Sprint 4:* 
Primarily allocated for testing and refining the user experience. If time allowed, Content Sharing, which had a "could-have" priority was planned to be implemented. However, due to the complexity of previous sprints and the need for thorough testing, Content Sharing was ultimately not developed within the given timeframe.

### MoSCoW Prioritisation and Story Points

The user stories were prioritized using the MoSCoW method. Story Points were assigned for each User Story to indicate their relative complexity or effort. The MoSCoW prioritization categorizes requirements as follows:

- **Must-Have**: Critical requirements necessary for the project's success.

- **Should-Have**: Important requirements that add significant value but are not critical.

- **Could-Have**: Desirable features that are nice to have but not essential.

- **Won't-Have**: Features explicitly excluded from the project scope.

Additionally, labels were used to denote the story points, MoSCoW priorities and sprint number throughout the project's lifecycle.

A total of **120** story points were allocated across the project's user stories:

| Priority | Story Points |
|----------|--------------|
| Must-Have | 70           |
| Should-Have | 30         |
| Could-Have | 20          |

By the project's completion, 15 story points in total were categorized as 'Won't-Have' due to project constraints.

Since this project serves educational purposes, it's important to note that the assigned story points may not always accurately reflect the actual effort required. Some tasks may have required more time, while others may have required less.

[Return to contents list](#table-of-contents)

## User Stories

The user stories in this project are categorized into three main roles: Registered User, New  User and Tester. 
Since this project focuses mainly on registered users, most of the stories are for them (because you have to be logged in to track your habits).

<details>
<summary>
View the list of User Stories categorized by role:</summary>

### New Users

- As a new user, I want to register for the app so that I can start tracking my habits and have my profile created.
- As a new user, I want to see a welcome page when opening the site so that I can understand what the app offers before signing up.
- As a new or registered user, I want to log in and log out securely so that I can access my account and protect my personal data.
- As a new or registered user, I want to upload or update my profile picture so that I can personalize my account.

### Registered Users

- As a registered user, I want to view and edit my profile details so that I can keep my account information up to date.
- As a registered user, I want see a navbar that helps me navigate the app easily so that I can quickly find the features I need.
- As a registered user, I want a consistent layout and background so that the app looks visually appealing and easy to use.
- As a registered user, I want to create a habit stack so that I can organize my habits and track my progress effectively.
- As a registered user, I want to view all my habit stacks in a list so that I can easily access and manage them.
- As a registered user, I want to view the details of my habit stack so that I can see the specific habits included and make changes if needed.
- As a registered user, I want to edit my habit stack(s) so that I can update habits that are no longer relevant.
- As a registered user, I want to delete my habit stack(s) so that I can remove habit stacks I no longer want to track.
- As a registered user, I want to select habits from a predefined list  so that I can easily add habits to my habit stack.
- As a registered user, I want to see my habits on a dashboard view so that I can track my habits for the day.
- As a registered user, I want my habit stack to be automatically scheduled for 7 days when I create it so that I can start tracking them.
- As a registered user, I want to mark my habit stacks as completed so that I can track my daily progress easily.
- As a registered user, I want to extend my habit stack by 7 or 14 days when I reach the last day, so that I can continue tracking my habits.
- As a registered user, I want to receive a reminder message on the dashboard when a habit stack is about to expire so that I can keep tracking my habits without interruption.
- As a registered user, I want to be able to see the history of my habit stack's completion status in the progress view so that I can track my journey.
- As a registered user, I want to see my current streak in the progress view so that I can stay motivated to maintain my habit consistency.
- As a registered user, I want to see milestone achievements in the progress view so that I can track my long-term progress and celebrate my milestones.
- As a registered user, I want to see the total number of times I have completed a habit stack in my progress view so that I can measure my overall success.
- As a registered user, I want to receive a message when I achieve a streak so that I can celebrate my progress.
- As a registered user, I want to receive a message when I achieve a milestone so that I can celebrate my progress.
- As a registered user, I want to access a "Feed" section from the navbar so that I can see shared habit stack achievements from other users and share mine.
- As a registered user, I want to share my milestone achievements on the feed so that others can see my progress.
- As a registered user, I want to view milestone achievements shared by others in the feed so that I can stay motivated.

### Tester

- As a tester, I want to test the UI and navigation so that I can ensure a smooth user experience.
- As a tester, I want to verify that all forms (login, register, profile, habit stack creation) work correctly so that users can enter and update information without issues.
- As a tester, I want to test habit tracking functionality so that I can ensure users can mark habits as completed and see progress correctly.
- As a tester, I want to test content sharing so that I can confirm users can share and view milestone achievements.
</details>

<details>
<summary>
View the list of User Stories categorized by User Story prioritization:</summary>

### Must Have

- As a new user, I want to register for the app so that I can start tracking my habits and have my profile created.
- As a new or registered user, I want to log in and log out securely so that I can access my account and protect my personal data.
- As a registered user, I want to view and edit my profile details so that I can keep my account information up to date.
- As a registered user, I want see a navbar that helps me navigate the app easily so that I can quickly find the features I need.
- As a new user, I want to see a welcome page when opening the site so that I can understand what the app offers before signing up.
- As a registered user, I want to create a habit stack so that I can organize my habits and track my progress effectively.
- As a registered user, I want to view all my habit stacks in a list so that I can easily access and manage them.
- As a registered user, I want to view the details of my habit stack so that I can see the specific habits included and make changes if needed.
- As a registered user, I want to edit my habit stack(s) so that I can update habits that are no longer relevant.
- As a registered user, I want to delete my habit stack(s) so that I can remove habit stacks I no longer want to track.
- As a registered user, I want to see my habits on a dashboard view so that I can track my habits for the day.
- As a registered user, I want my habit stack to be automatically scheduled for 7 days when I create it so that I can start tracking them.
- As a registered user, I want to mark my habit stacks as completed so that I can track my daily progress easily.
- As a registered user, I want to extend my habit stack by 7 or 14 days when I reach the last day, so that I can continue tracking my habits.
- As a registered user, I want to be able to see the history of my habit stack's completion status in the progress view so that I can track my journey.
- As a tester, I want to test the UI and navigation so that I can ensure a smooth user experience.
- As a tester, I want to verify that all forms (login, register, profile, habit stack creation) work correctly so that users can enter and update information without issues.
- As a tester, I want to test habit tracking functionality so that I can ensure users can mark habits as completed and see progress correctly.

### Should Have

- As a registered user, I want to view and edit my profile details so that I can keep my account information up to date.
- As a registered user, I want a consistent layout and background so that the app looks visually appealing and easy to use.
- As a registered user, I want to select habits from a predefined list  so that I can easily add habits to my habit stack.
- As a registered user, I want to see my current streak in the progress view so that I can stay motivated to maintain my habit consistency.
- As a registered user, I want to see milestone achievements in the progress view so that I can track my long-term progress and celebrate my milestones.
- As a registered user, I want to see the total number of times I have completed a habit stack in my progress view so that I can measure my overall success.
- As a registered user, I want to receive a message when I achieve a streak so that I can celebrate my progress.
- As a registered user, I want to receive a message when I achieve a milestone so that I can celebrate my progress.
- As a registered user, I want to receive a reminder message on the dashboard when a habit stack is about to expire so that I can keep tracking my habits without interruption.

### Could Have

- As a new or registered user, I want to upload or update my profile picture so that I can personalize my account.
- As a registered user, I want to access a "Feed" section from the navbar so that I can see shared habit stack achievements from other users and share mine.
- As a registered user, I want to share my milestone achievements on the feed so that others can see my progress.
- As a registered user, I want to view milestone achievements shared by others in the feed so that I can stay motivated.
- As a tester, I want to test content sharing so that I can confirm users can share and view milestone achievements.
</details>

### 'Won't Have' User Stories

Due to time constraints, certain features were not implemented during this project.

Sprint 4 was primarily allocated for testing and refining the user experience. Content Sharing, which had been given a "could-have" priority, was planned for implementation if time allowed. However, due to the complexity of previous sprints and the need for thorough testing, Content Sharing was not developed within the given timeframe.

As a result, these user stories are now labeled as 'Won't Have' for this project and are considered for future implementation.

[Return to contents list](#table-of-contents)

## Design

The visual identity of Habit by Bit is built around the concept of stacking circles, reinforcing the ideas of habit formation, habit stacking, and neural pathways. This design language is consistently applied throughout the project, from the logo to the background graphic, calendar view, and interactive elements.

### Logo and Background Image

The logo features two stacked circles alongside the name Habit by Bit. These circles symbolize habit stacking, where one habit builds on another, reinforcing the gradual "bit by bit" process of habit formation. The blue color represents neutrality and stability, grounding the design in a sense of calm and consistency.


<img src="docs/logo.png" width=150>


The background image consists of stacked circles, visually echoing the logo and reinforcing the habit-stacking process.

 <img src="docs/background.png" width=600>


### Interactive Elements

**Calendar view:**
The calendar provides a visual representation of habit progress, where each completed habit is highlighted with a circle.
**Gray:** Days with no recorded habit completion.
**Green:** Days when habits were successfully completed, reinforcing progress and consistency.

**Tickbox:**
The habit completion tickbox mirrors the theme of stacking circles. Upon marking a habit as completed, the tickbox transitions from gray to green, visually signifying progress and success.

### Colour Scheme

<img src="docs/color_palette.png">

- Green: Represents success and completion. It highlights days when habits are successfully completed, reinforcing the sense of achievement.
- Orange: Symbolizes action and motivation. It emphasizes streaks, encouraging users to stay consistent and motivated.
- Gray: Denotes the default or inactive state. This color is used for untouched calendar days and unchecked habit completion checkboxes.


### Typography and Icons

The app utilizes the "Roboto" font, with Serif as the fallback, ensuring a clean and modern look throughout. To enhance the visual appeal and functionality, Font Awesome icons are incorporated across the platform, making the interface more intuitive and engaging. These icons are used as follows:

- My Stack Button: Stack of cubes icon, representing the user's habit stack.
- Back Buttons: Arrow icons for easy navigation.
- Tickbox in Dashboard: Circular checkmark icon to track habit completion status.
- View Progress Button: Chart icon to represent tracking and progress visualization.
- Milestone Button: Trophy icon to highlight achievements.
- Edit Button: Pencil icon for editing existing habit stacks.
- Add/Extend Stack: Plus icon to add a new stack or extend an existing one.
- Delete Button: Trash can icon for removing stacks.
These icons not only improve the visual aesthetics but also contribute to a more user-friendly and interactive experience.

### Error Pages

### Responsivness

### Wireframes

These wireframes were created during the project planning phase. Several changes have been implemented in the final application to enhance the user experience.

<img src="">

[Return to contents list](#table-of-contents)

# 3. Features

## User registration and login/logout

## Welcome Modal

## Habit Stacks

## Habit Tracking

## Habit Progress View

## Future Features - Content Sharing

# 4. Technologies Used

## Languages and Frameworks Used

-   [React](https://en.wikipedia.org/wiki/React_(software))
-   [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)

## Frameworks, Libraries and Programs Used

1. [Git:](https://git-scm.com/)
    Used for version control via Gitpod terminal for commits and pushes to GitHub.
1. [GitHub:](https://github.com/)
    Used to store the project's code after being pushed from Git.
1. [Heroku](https://heroku.com/)
    Used for deploying the project.
1. [React Bootstrap 4](https://react-bootstrap.netlify.app/)
    Used for creating the design and layout of the page.
1. [Font Awesome:](https://fontawesome.com/)
    Used to add icons for aesthetic and UX purposes.
1. [Coudinary](https://cloudinary.com/)
    Used for image management.
1. [Adobe Illustrator](https://www.adobe.com/)
    Used to create the logo and background image.
1. [Google Fonts:](https://fonts.google.com/)
    Used to import fonts for styling.

[Return to contents list](#table-of-contents)

# 5. Validation and Testing

See [testing.md](testing.md) for all testing and validation.

### Bugs and Issues

1. Habit stack logs not showing

*Issue:*
The logs for habit stacks were not showing correctly. Specifically, Habit Stack 1 displayed all seven logs, but Habit Stack 2 only showed three logs instead of the expected fourteen logs altogether. All the logs were properly stored in the backend but were missing from the frontend display. 

*Fix:*
The root cause of this was API pagination—by default, the API returned only ten logs per request, requiring an additional request to fetch the remaining logs from the next page.
The root cause of the issue was API pagination. By default, the API returned only ten logs per request, meaning an additional request was needed to retrieve the remaining logs from the next page.
To resolve this, the `fetchHabitLogs` function was updated to handle pagination correctly. Instead of fetching only the first page of logs, the function now loops through all available pages, checking the 'next' field in the API response to retrieve every log. This ensures that all logs are fetched and displayed correctly on the dashboard.

2. Profile Image Showing only After Page Refresh

*Issue:*
After logging in, the profile image wasn't fetched automatically when the user landed on the dashboard page. The image only appeared after the user manually refreshed the page. This issue occurred because the profile was fetched asynchronously within the `useEffect` hook in the `ProfileContext`, but the component didn't properly wait for the profile data to load before rendering the profile image.

*Fix:*
Ensured that the profile data was fetched immediately after login, and the state was properly updated by adding logic to fetch the profile within the `useEffect` and managing the state correctly.


3. Token Expired, Not Directed to Login

*Issue:*
The `refresh_token` was not being stored when the user logged in, which caused issues with automatic token refreshing. This led to scenarios where the user was not redirected to the login page after the access token expired.

*Fix:*
The Signin logic was modified to store both the `access_token` and `refresh_token` in localStorage so that the token refresh functionality could work properly.

[Return to contents list](#table-of-contents)

# 7. Deployment

1. Sign up for Heroku.
Once logged in, locate the "New" button at the top right of the dashboard.

2. Create a New App.
Click the "New" button to open a dropdown menu and select "Create New App". This will redirect to a page where you can choose the region and provide a unique name for the app. After entering the details, click "Create App".

3. Deploy the App.

Navigate to the "Deploy" tab.
In this section, several deployment options are available. For this project, GitHub was used.
Click the GitHub button to search for and connect the GitHub repository.
After connecting, deploy the app by choosing either automatic or manual deployment. Automatic deployment was selected for this project, enabling continuous deployment.

## Forking and Cloning the Repository

To experiment or work on this code without modifying the original, you can either fork or clone the repository. The steps for each process are as follows:

1. Forking:

- Navigate to the "Fork" button in the top-right corner of the repository page, next to the "Star" button.
- Click Fork, and a copy of the repository will be added to your GitHub account.

2. Cloning:

- Go to the top-right of the repository page and click the "Code" button to open a dropdown menu.
- Choose one of the options:
1. Choose "Download ZIP" to download all the project files as a ZIP archive and save them locally.
2. Choose "Open with GitHub Desktop" to clone the repository and work from there.

[Return to contents list](#table-of-contents)