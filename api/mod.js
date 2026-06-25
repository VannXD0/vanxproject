export default async function handler(req, res) {
  // Gist lu yang sudah ada kode base64-nya
  const GIST_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a4ba3b4274f05867eee46fdb9027beda2aa19790/Arc.sh";
  
  // Redirect 302 adalah cara paling aman agar terminal langsung memanggil Gist
  return res.redirect(302, GIST_URL);
}
