const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const API_KEY = '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';

app.post('/summarize', async (req, res) => {
  const { url } = req.body;
  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt: `Summarize the article at ${url}`,
    max_tokens: 100,
    n: 1,
    stop: ['\n']
  }, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  const summary = response.data.choices[0].text.trim();
  res.send(summary);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
