# Testing and Validation

## Table of Contents

[Code Validation](#code-validation)

[Manual Testing](#manual-testing)

[Compatibility Testing](#cross-device-and-cross-browser-testing)

## Code Validation

### JavaScript Validation

EsLint was installed and in use during building of this project and has been used to validate all the JavaScript files. All files pass through the EsLint without warning except:

`src/pages/dashboard/Dashboard.js Line 13:12:  'stacks' is assigned a value but never used  no-unused-vars`

This warning was ignored because excluding stacks from the dependency array could cause issues with stale state. Including stacks ensures that the effect always has the most up-to-date value when it runs. This prevents potential UI inconsistencies, such as showing outdated habit stack data, and ensures that the component properly reflects the current state when interacting with external data sources like the API.

### CSS Validation

All css files have been passed through the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/).

No errors were found.

[Return to contents list](#table-of-contents)

## Manual Testing

### User Stories

| User Story | Result |
| -- | -- |
|As a new user, I want to register for the app so that I can start tracking my habits and have my profile created.|PASS|
|As a new or registered user, I want to log in and log out securely so that I can access my account and protect my personal data.|PASS|
|As a registered user, I want to view and edit my profile details so that I can keep my account information up to date.|PASS|
|As a new or registered user, I want to upload or update my profile picture so that I can personalize my account.|PASS|
|As a registered user, I want see a navbar that helps me navigate the app easily so that I can quickly find the features I need.|PASS|
|As a new user, I want to see a welcome page when opening the site so that I can understand what the app offers before signing up.|PASS|
|As a registered user, I want a consistent layout and background so that the app looks visually appealing and easy to use.|PASS|
|As a registered user, I want to create a habit stack so that I can organize my habits and track my progress effectively.|PASS|
|As a registered user, I want to view all my habit stacks in a list so that I can easily access and manage them.|PASS|
|As a registered user, I want to view the details of my habit stack so that I can see the specific habits included and make changes if needed.|PASS|
|As a registered user, I want to edit my habit stack(s) so that I can update habits that are no longer relevant.|PASS|
|As a registered user, I want to delete my habit stack(s) so that I can remove habit stacks I no longer want to track.As a registered user, I want to select habits from a predefined list  so that I can easily add habits to my habit stack.|PASS|
|As a registered user, I want to see my habits on a dashboard view so that I can track my habits for the day.|PASS|
|As a registered user, I want my habit stack to be automatically scheduled for 7 days when I create it so that I can start tracking them.|PASS|
|As a registered user, I want to mark my habit stacks as completed so that I can track my daily progress easily.|PASS|
|As a registered user, I want to extend my habit stack by 7 or 14 days when I reach the last day, so that I can continue tracking my habits.|PASS|
|As a registered user, I want to receive a reminder message on the dashboard when a habit stack is about to expire so that I can keep tracking my habits without interruption.|PASS|
|As a registered user, I want to be able to see the history of my habit stack's completion status in the progress view so that I can track my journey.|PASS|
|As a registered user, I want to see my current streak in the progress view so that I can stay motivated to maintain my habit consistency.|PASS|
|As a registered user, I want to see milestone achievements in the progress view so that I can track my long-term progress and celebrate my milestones.|PASS|
|As a registered user, I want to see the total number of times I have completed a habit stack in my progress view so that I can measure my overall success.|PASS|
|As a registered user, I want to receive a message when I achieve a streak so that I can celebrate my progress.|PASS|
|As a registered user, I want to receive a message when I achieve a milestone so that I can celebrate my progress.|PASS|

### Checklist

**Welcome Screen**

- The welcome screen is visible before registration but not after a user has registered and logged out (only the login screen is visible after logout).
- The button to proceed is correctly located and easily accessible.
- All text on the welcome screen is readable, and the scroll functionality works properly.
- The button on the welcome screen redirects users to the Sign-Up page.

**Sign-Up**

- Error messages are correctly displayed during the sign-up process.
- A link to the login page is located at the bottom of the sign-up form.
- Clicking this link redirects users to the login page.

**Log-In**

- Error messages are correctly displayed during the login process.
- A link to the sign-up page is located at the bottom of the login form.
- After successful login, users are redirected to the dashboard page.

**Log Out**

- Clicking the log-out button redirects users to the login page.
- A link to the sign-up page is located at the bottom of the login screen.

**Navbar**

- The logo in the navbar correctly redirects users to the dashboard.
- The "My Stacks" button is easily accessible in the navbar.
- The image in the navbar is always displayed.
- If no image selected, profile placeholder image is displayed.
- The image in the navbar has a dropdown menu that provides options to view "My Profile" or log out.

**Profile**

- A welcome message is displayed with the user's username.
- The user's "Since" date is correctly shown, indicating the date they joined.
- Users can update their profile image.
- A modal confirmation message is shown after updating the profile image.

**My Stacks**

- The "Create a Stack" button is always visible, even when there are no stacks in the list.
- Stacks are displayed in a list format, with an edit button under each stack.
- The "Active until" field contains the correct expiration date for each stack. 
- An "Extend" button appears when there are only two days remaining before the "Active until" date. 
- Clicking the "Extend" button opens a modal that allows users to choose to extend the stack for either 7 or 14 days. 
- After extending a habit stack, a success message is displayed, confirming the updated expiration date. 
- The "Active until" date is updated in the stacks list to reflect the new expiration date after the extension.

**Create Stack**

- Validation works correctly during stack creation. 
- Users can choose mixed habits (custom + custom, custom + predefined, predefined + custom).
- After a stack is created, a confirmation modal appears.
- After closing the confirmation modal, the user is redirected to the stacks list page.
- The newly created habit stack is added to the list.
Edit Stack
- A trash icon appears when hovering over a stack, with a "Delete Stack" option.
- The back button in the edit page redirects users to the stacks list page.
- Clicking "Delete" prompts a confirmation modal.
- After deletion, a success message appears, and the user is redirected back to the stacks list.
- After updating a stack, a success message appears.
- Users can update either habit in the stack.

**Dashboard**

- Users can navigate through days by clicking on individual days or using the navigation arrows. The UI updates correctly, displaying the habit stack log for the selected day.
- A list of habit stacks is displayed, with a "View Progress" button under each stack.
- A message is displayed if no logs have been created.
- The correct habit names are displayed.
- A gray or green tickbox indicates completion status, and the checkbox functions both ways (tick and untick).
- On larger screens, a text message is displayed, indicating whether a habit has been completed or not.
- An error message is shown when attempting to complete a habit stack for a future date. 
- A message indicating that a stack is expiring and needs to be extended appears under the stack on the last two days before its "active until" date.

**View Progress**
- The stack name is displayed correctly in the view progress page.
- The back button in the view progress page correctly redirects users to the dashboard.
- Users can navigate through months in the calendar view.
- In the calendar, green circles highlight the dates when habit stack completion has been marked as completed.
- Streak, milestone, and total completion values are fetched accurately and update correctly with stack updates.
- The streak and completions count display "0" when no completions have been made.
- A no milestone message is shown if no milestones have been achieved.
- Milestones are correctly displayed with the correct day count and achievement date.

[Return to contents list](#table-of-contents)

## Cross-Device and Cross-Browser Testing

The app was tested on these devices:

1. Desktop Devices:

- MacBook Air
  - Safari
  - Google Chrome
  - Mozilla Firefox
- Microsoft Computer
  - Microsoft Edge
  - Google Chrome
  - Mozilla Firefox

2. Mobile Devices:

- Samsung Galaxy Tablet
  - Chrome (Android)
  - Mozilla Firefox
- iPhone SE
  - Safari (iOS)
- Samsung Galaxy Smartphone
  - Chrome (Android) 
  - Mozilla Firefox

The application functions smoothly across all devices, except for the issues outlined in the Bugs and Issues section.

[Return to contents list](#table-of-contents)