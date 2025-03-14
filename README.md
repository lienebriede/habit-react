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



