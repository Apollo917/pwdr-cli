<div align="center">

# 💻 PwdrCLI

CLI for the [pwdr](https://www.npmjs.com/package/pwdr) npm package

[![version](https://img.shields.io/npm/v/pwdr-cli?style=for-the-badge)](https://www.npmjs.com/package/pwdr-cli)
[![license](https://img.shields.io/npm/l/pwdr-cli?style=for-the-badge)](https://github.com/Apollo917/pwdr-cli/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dw/pwdr-cli?style=for-the-badge)](https://www.npmjs.com/package/pwdr-cli)

</div>

## 🚀 Quickstart

```bash
npx pwdr-cli -p compatibility_check_phrase -k compatibility_check_key -l 32
```

### 🧾 CLI args

- **required**
    - `-p, --phrase <secret-phrase>` secret phrase
    - `-k, --keys <secret-keys>` secret key(s)
- **optional**
    - `-l, --length <password-length>` password length (default 32)

### 🔢 Resulting password

- Minimum length: 16
- Maximum length: 64
- Default length: 32

## 🔁 Version compatibility check

- phrase: `compatibility_check_phrase`
- key: `compatibility_check_key`
- length: `32`

### 🏷️ Versions

- **v1.x.x**
    - result: `1e9/wtB["D0NS/oCa/ra9p,v'NHBT4GQ`
- **v2.x.x**
    - result: `Ey,7Lg#4Vp(9Dg^2Nm_3Rm@5Bv!5Zj^8`