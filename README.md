# affinity-project
Simple poll widget
This is an example of a poll widget implemented in HTML, CSS, and JavaScript.

Description
This widget allows users to answer a poll question by selecting one of the predefined options. Users can submit their vote, and the results are stored locally using the browser's localStorage API.

Usage
To use the poll widget:

Open the HTML file (index.html) in a web browser.
Answer the poll question by selecting one of the provided options.
Click the "Submit" button to submit your vote.
To close the poll widget, click the close button (×) in the top-right corner.

Save Poll: After entering a new poll question and options, click the "Save Poll" button to save it. This will save the question in the localStorage.

User can change the poll provided that multiple polls have been created and saved.

Notes
Poll data is stored locally using the browser's localStorage API. This means that poll data will persist across browser sessions.
If there are no existing polls stored locally, or all polls have already been seen by the user then an error message will be displayed.