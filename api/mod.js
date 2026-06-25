export default async function handler(req, res) {
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc66f/raw/a623799f9de9120d904cb5ce6f0dca9ef090934/Arc.sh";

  try {
    // Menambahkan timeout agar tidak menggantung (hang) yang memicu error 500
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000); // Timeout 8 detik

    const response = await fetch(GIST_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:86.0) Gecko/20100101 Firefox/86.0'
      }
    });
    
    clearTimeout(id);

    if (!response.ok) {
      return res.status(response.status).send(`echo 'Gist error: ${response.status}'`);
    }

    const script = await response.text();

    // Memastikan output bersih dari karakter CR
    const cleanScript = script.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(cleanScript);

  } catch (err) {
    return res.status(500).send(`echo 'Vercel Fetch Error: ${err.message}'`);
  }
}
