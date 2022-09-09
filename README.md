<div id="top"></div>

Temporary URL for development: 
https://tourmaline-custard-ff7a4b.netlify.app/

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![image](https://user-images.githubusercontent.com/32856579/165184664-8f4e3648-bea2-4b1e-94a3-2eec4ab499a2.png)

openlayers map which uses api key to check available nearmap coverage data.

Supports drag and drop for the following file types:
  ```sh
  gpx, geojson, igc, kml, kmz, topojson
  ```


Notes:

- Developed to give more transparency on coverage without giving full mapbrowser access.
- Requires API Key from admin page
- Codebase Still being updated.

Please keep up to date with the repo, as this is still in development. Node JS Depolyment.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With


- [Node.js](https://nodejs.org/en/)
- [JQuery](https://jquery.com)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Clone Repo and Run npm install to install required packages

### Prerequisites

- npm
  ```sh
  https://nodejs.org/en/
  ```

### Installation

Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at Nearmap Admin Page
2. Clone the repo
   ```sh
   git clone https://github.com/Connor-Tluck/nearmap_coverage_check_openlayers
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run Node
   ```sh
   npm run
   ```
5. Enter your API in `program input window after running program`

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Drag and Drop Support
- [x] Show Existing Coverage
- [ ] Repair table Parsing, not all values load as of now (high priority)
- [ ] Export Coverage Report
- [ ] Coverage Reporting based on Loaded Shapes

<p align="right">(<a href="#top">back to top</a>)</p>
