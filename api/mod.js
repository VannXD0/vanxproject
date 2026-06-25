export default async function handler(req, res) {
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc66f/raw/a623799f9de9120d904cb5ce6f0dca9ef090934/Arc.sh";

  try {
    const response = await fetch(GIST_URL);
    if (!response.ok) throw new Error("Gagal ambil Gist");
    
    let script = await response.text();

    // BERSIHKAN KARAKTER SAMPAH (CRLF to LF)
    // Ini yang bikin script lu cuma nongol jadi teks
    script = script.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(script);
  } catch (err) {
    res.status(500).send("echo 'Error Server'");
  }
}
