export default async function handler(req, res) {
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a4ba3b4274f05867eee46fdb9027beda2aa19790/Arc.sh";
  
  try {
    const response = await fetch(GIST_URL);
    const script = await response.text();
    
    // Kirim sebagai teks agar langsung dibaca oleh shell
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(script);
  } catch (err) {
    return res.status(500).send("echo 'Gagal Fetch'");
  }
}
