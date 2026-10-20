# Nurali Galiev — Modern Tech Portfolio

Responsive portfolio for Computer Engineering, software development and network engineering.

**Live site:** https://kore-net2.github.io/portfolio/index.html

## Public project repositories

| Project | Repository |
| --- | --- |
| Yahtzee — C# Windows Forms Game | https://github.com/Kore-net2/Yahtzee-Game-CSharp |
| Temperature Monitor | https://github.com/Kore-net2/TemperatureMonitor |
| MasterMind — Raspberry Pi prototype & PC Edition | https://github.com/Kore-net2/RaspberryPi-MasterMind |
| Python Sudoku Solver | https://github.com/Kore-net2/Python-Sudoku-Solver |
| Multi-AS GNS3 BGP/OSPF/ACL Labs | https://github.com/Kore-net2/Multi-AS-BGP-Network |
| Network Topologies (IPv4/IPv6) | https://github.com/Kore-net2/Network-Topologies-GNS3 |
| Portfolio source | https://github.com/Kore-net2/portfolio |

The Projects page also describes university PDDL planning coursework (no public source repository) and an **ongoing private** IoT botnet detection honours research proposal (no public link).

## Site structure

- `index.html` — Home, certification and featured projects
- `projects/index.html` — project cards with project-specific source links
- `resume/index.html` — web resume and PDF download
- `assets/` — theme, CSS, JS, images, PDF resume and Cisco Networking Academy course completion certificate
- `404.html` — not-found page

## Deployment

This is a static site designed to be hosted at `/portfolio/` on GitHub Pages. Navigation uses explicit relative `index.html` paths so it also works in a local preview. Use **Settings → Pages → Deploy from a branch → main / (root)** in the GitHub repository.

Locally: open `index.html` or run `py -m http.server 5500` in the site root and visit `http://localhost:5500/index.html`.

## Notes

- The Cisco Networking Academy **Ethical Hacker** certificate represents **course completion**, not an EC-Council CEH certification.
- The original MasterMind Raspberry Pi C/ARM hardware implementation is not fully verified; its repository contains a separate tested PC/browser adaptation.
- Published GNS3 sources do not include Cisco IOS images. Router operation must be verified in a compatible simulator environment.
- University coursework contributions and publication rights should be represented accurately; project READMEs contain relevant caveats.
- Honours research is a work in progress; no working detector or benchmark is claimed.
- The fixed Home scroll behavior from Claude's `assets/js/home.js` is preserved (no Hero parallax transformation).

## License

MIT License for original website code (see `LICENSE`). Third-party fonts, images, certification documents and linked coursework are not automatically covered by the site license.
