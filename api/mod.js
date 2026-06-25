export default function handler(req, res) {
  const { type } = req.query;

  const E = {
    I: "aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9WYW5uWEQwL2U3YmEzNGYxZDY0MWQ0MGYyMDlmYzBiZjg5OWJjNmZmL3Jhdy9hODE5MWZkMzA3ZmQwZDQ4OWE4MDQ2YmRiYjFjNjg3ODIzMDcxYjQzL0FyYy5zaA==",
    U: "aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9WYW5uWEQwL2U3YmEzNGYxZDY0MWQ0MGYyMDlmYzBiZjg5OWJjNmZmL3Jhdy81M2ZlOTNmMWEyYjFlMmNkMGI5MjBjMjk4NjQ1NTY1NmNkODljN2Y5L0FyYy5zaCUyMHU="
  };

  const decode = (str) => Buffer.from(str, 'base64').toString('utf-8');
  const targetUrl = (type === 'uninstall') ? decode(E.U) : decode(E.I);

  fetch(targetUrl)
    .then(response => response.text())
    .then(data => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send("# Gagal mengambil script dari server");
    });
}
