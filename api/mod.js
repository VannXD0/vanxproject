export default async function handler(req, res) {
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc66f/raw/a623799f9de9120d904cb5ce6f0dca9ef090934/Arc.sh";

  try {
    // Kita gunakan fetch dengan opsi yang lebih "ramah" buat Vercel serverless
    const response = await fetch(GIST_URL, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });

    if (!response.ok) throw new Error("Gist tidak merespon");

    const data = await response.text();

    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(data);
  } catch (err) {
    // Kalo error, kita kirim pesan yang gak bikin shell AxManager crash
    res.status(500).send("echo 'Server Gagal Bridge Gist'");
  }
}
