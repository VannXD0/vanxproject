export default async function handler(req, res) {
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a4ba3b4274f05867eee46fdb9027beda2aa19790/Arc.sh";
  
  // Langsung fetch dan pipe respon ke res
  const response = await fetch(GIST_URL);
  
  // Set header agar browser/terminal tau ini file script
  res.setHeader("Content-Type", "text/plain");
  
  // Langsung kirim body tanpa diproses apa-apa
  return response.body.pipe(res);
}
