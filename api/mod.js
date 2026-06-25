export default async function handler(req, res) {
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a4ba3b4274f05867eee46fdb9027beda2aa19790/Arc.sh";
  
  try {
    const response = await fetch(GIST_URL);
    let script = await response.text();
    
    // Bersihkan carriage return agar tidak merusak formatting ASCII
    script = script.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    res.setHeader("Content-Type", "text/plain");
    // Gunakan stream agar data sampai utuh ke RAM
    return res.status(200).send(script);
  } catch (err) {
    return res.status(500).send("echo 'Error'");
  }
}
