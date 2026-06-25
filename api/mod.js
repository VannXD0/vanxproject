export default async function handler(req, res) {
  // URL Gist terbaru dari lu
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a4ba3b4274f05867eee46fdb9027beda2aa19790/Arc.sh";
  
  try {
    const response = await fetch(GIST_URL);
    if (!response.ok) return res.status(500).send("echo 'Gist Unreachable'");
    
    let script = await response.text();

    // SANITASI EKSTREM:
    // 1. Buang karakter non-ASCII (sering jadi penyebab error)
    // 2. Normalize baris (buang CR/CRLF, paksa jadi LF)
    script = script.replace(/[^\x00-\x7F]/g, "");
    script = script.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Mencegah error syntax ( ) pada sh Android tua
    // Jika masih error, ini menghapus karakter sampah di sekitar kurung
    script = script.replace(/\(\)/g, "() ");

    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(script);
  } catch (err) {
    // BACKUP: Jika Gist mati, ini akan dijalankan sebagai fallback
    const fallback = `#!/system/bin/sh\necho "Gist Gagal, menggunakan backup local..."`;
    return res.status(200).send(fallback);
  }
}
