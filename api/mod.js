export default function handler(req, res) {
  const { type } = req.query;


  const INSTALL_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/a8191fd307fd0d489a8046bdbb1c687823071b43/Arc.sh";
  const UNINSTALL_URL = "https://gist.githubusercontent.com/VannXD0/e7ba34f1d641d40f209fc0bf899bc6ff/raw/53fe93f1a2b1e2cd0b920c2986455656cd89c7f9/Arc.sh%2520u";

  const targetUrl = (type === 'uninstall') ? UNINSTALL_URL : INSTALL_URL;

  fetch(targetUrl)
    .then(response => response.text())
    .then(data => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send("# Gagal mengambil script dari server");
    });
}
