export default async function handler(req, res) {
  // Link Gist lu
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc66f/raw/a623799f9de9120d904cb5ce6f0dca9ef090934/Arc.sh";

  try {
    const response = await fetch(GIST_URL);
    if (!response.ok) throw new Error("Gagal ambil Gist");
    
    const script = await response.text();

    // KIRIM TEKS POLOS: Ini kunci biar AxManager gak bingung
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(script);
  } catch (err) {
    res.status(500).send("echo 'Error: Server Gagal Ambil Script'");
  }
}
