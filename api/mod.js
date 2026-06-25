export default async function handler(req, res) {
  // Langsung masukkan script di sini, tidak usah fetch dari Gist
  const script = `
#!/system/bin/sh
echo "MOD BERHASIL DIJALANKAN"
# Masukkan semua perintah mod lu di bawah sini
# Contoh: input keyevent 3
  `;

  res.setHeader("Content-Type", "text/plain");
  return res.status(200).send(script);
}
