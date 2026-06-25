export default async function handler(req, res) {
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a623799f9de9120d904cb5ce6f0dca9ef090934/Arc.sh";

  try {
    const response = await fetch(GIST_URL);
    let script = await response.text();

    // BERSIHKAN SEMUA KARAKTER ANEH
    // Ini buat ngapus semua karakter non-printable yang sering bikin error ')'
    script = script.replace(/[^\x00-\x7F]/g, ""); 
    script = script.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(script);
  } catch (err) {
    res.status(500).send("echo 'Error Server'");
  }
}
