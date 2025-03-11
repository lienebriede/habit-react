### Bugs and Issues

1. Habit stack logs not showing
**Issue:**

The logs for habit stacks were not showing correctly. Specifically, Habit Stack 1 displayed all seven logs, but Habit Stack 2 only showed three logs instead of the expected fourteen logs altogether. All the logs were properly stored in the backend but were missing from the frontend display. 

**Fix:**

The root cause of this was API pagination—by default, the API returned only ten logs per request, requiring an additional request to fetch the remaining logs from the next page.
The root cause of the issue was API pagination. By default, the API returned only ten logs per request, meaning an additional request was needed to retrieve the remaining logs from the next page.
To resolve this, the `fetchHabitLogs` function was updated to handle pagination correctly. Instead of fetching only the first page of logs, the function now loops through all available pages, checking the 'next' field in the API response to retrieve every log. This ensures that all logs are fetched and displayed correctly on the dashboard.