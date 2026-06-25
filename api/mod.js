export default async function handler(req, res) {
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a623799f90de9120d904cb5ce6f0dca9ef090934/Arc.sh";
  
  // Ambil user-agent dari request yang masuk
  const userAgent = req.headers['user-agent'] || "";

  // Filter: Izinkan HANYA kalau request datang dari curl, wget, atau sejenisnya
  const isAllowed = /curl|wget|fetch/i.test(userAgent);

  if (!isAllowed) {
    return res.status(403).send("Access Denied: Only curl/wget allowed.");
  }

  try {
    const response = await fetch(GIST_URL);
    
    if (!response.ok) {
      return res.status(response.status).send(`echo 'Gist error: ${response.status}'`);
    }

    const script = await response.text();
    // Bersihkan karakter sampah biar gak syntax error
    const cleanScript = script.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(cleanScript);
  } catch (err) {
    return res.status(500).send(`echo 'Fetch failed'`);
  }
}
