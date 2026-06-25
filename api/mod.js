export default async function handler(req, res) {
  // Link Gist RAW lu yang sudah terbukti valid
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a623799f90de9120d904cb5ce6f0dca9ef090934/Arc.sh";

  try {
    const response = await fetch(GIST_URL);
    
    if (!response.ok) {
      return res.status(response.status).send(`echo 'Gist error: ${response.status}'`);
    }

    const script = await response.text();

    // Membersihkan karakter \r (CR) yang bikin terminal Android lu error/print teks
    const cleanScript = script.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Set header biar terminal tahu ini script shell
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(cleanScript);

  } catch (err) {
    return res.status(500).send(`echo 'Vercel Fetch Error: ${err.message}'`);
  }
}
