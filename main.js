import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import Overlay from "ol/Overlay";
import TileLayer from "ol/layer/Tile";
import Feature from "ol/Feature";
import { fromLonLat, toLonLat } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";
import View from "ol/View";
import { DragAndDrop, defaults as defaultInteractions } from "ol/interaction";
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import View from "ol/View";
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource, XYZ } from "ol/source";



///check that geojson has loaded for coverage and add to map.
const hc1GeojsonSource = new VectorSource({
  features: new GeoJSON().readFeatures(coverageShapeGeojson),
});

console.log(hc1GeojsonSource)

const vectorLayer = new VectorLayer({
  source: hc1GeojsonSource,
});


// // document.querySelector("#api_key").value = 100
// console.log(document.forms[0].querySelector("#api_key").value);
// document.querySelector("#api_key").value;

// console.log(document.querySelector("#api_key").value)

document
  .querySelector("#api_key_button")
  .addEventListener("click", function () {
    const api_key = document.querySelector("#api_key").value;
    const testUrl =
      "https://api.nearmap.com/coverage/v2/point/-90.1534099,34.9662661?apikey=" +
      api_key +
      "&limit=1&offset=0&sort=captureDate";
    console.log(api_key);
    console.log(testUrl);

    var myRequest = new Request(testUrl);
    fetch(myRequest).then(function (response) {
      console.log(response.status); // returns status

      if (response.status == 200) {
        alert("API Key Good, Please continue to check Coverage Data");
        //  block of code to be executed if the condition is true
      } else {
        alert("API KEY SUBMISSION BAD, Please Confirm");
        //  block of code to be executed if the condition is false
      }
    });
  });

const layer = new TileLayer({
  source: new OSM(),
});

// Create functions to extract KML and icons from KMZ array buffer,
// which must be done synchronously.

const zip = new JSZip();

function getKMLData(buffer) {
  let kmlData;
  zip.load(buffer);
  const kmlFile = zip.file(/.kml$/i)[0];
  if (kmlFile) {
    kmlData = kmlFile.asText();
  }
  return kmlData;
}

function getKMLImage(href) {
  let url = href;
  let path = window.location.href;
  path = path.slice(0, path.lastIndexOf("/") + 1);
  if (href.indexOf(path) === 0) {
    const regexp = new RegExp(href.replace(path, "") + "$", "i");
    const kmlFile = zip.file(regexp)[0];
    if (kmlFile) {
      url = URL.createObjectURL(new Blob([kmlFile.asArrayBuffer()]));
    }
  }
  return url;
}

// Define a KMZ format class by subclassing ol/format/KML

class KMZ extends KML {
  constructor(opt_options) {
    const options = opt_options || {};
    options.iconUrlFunction = getKMLImage;
    super(options);
  }

  getType() {
    return "arraybuffer";
  }

  readFeature(source, options) {
    const kmlData = getKMLData(source);
    return super.readFeature(kmlData, options);
  }

  readFeatures(source, options) {
    const kmlData = getKMLData(source);
    return super.readFeatures(kmlData, options);
  }
}

// Set up map with Drag and Drop interaction

const dragAndDropInteraction = new DragAndDrop({
  formatConstructors: [KMZ, GPX, GeoJSON, IGC, KML, TopoJSON],
});

const map = new Map({
  interactions: defaultInteractions().extend([dragAndDropInteraction]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vectorLayer,
  ],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

dragAndDropInteraction.on("addfeatures", function (event) {
  const vectorSource = new VectorSource({
    features: event.features,
  });
  map.addLayer(
    new VectorLayer({
      source: vectorSource,
    })
  );
  map.getView().fit(vectorSource.getExtent());
});

const pos = fromLonLat([16.3725, 48.208889]);

// Popup showing the position the user clicked
const popup = new Overlay({
  element: document.getElementById("popup"),
});
map.addOverlay(popup);



map.on("click", function (evt) {
  const element = popup.getElement();
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));
  let lat = toLonLat(coordinate)[0];
  let long = toLonLat(coordinate)[1];
  // let api_key = document.getElementById("api_key");
  console.log(api_key.value);
  let url =
    "https://api.nearmap.com/coverage/v2/point/" +
    lat +
    "," +
    long +
    "?apikey=" +
    api_key.value +
    "&limit=1000&offset=0&sort=captureDate";
  console.log(url);

  $.getJSON(url, function (coverage_response) {
    // JSON result in `data` variable

    console.log(coverage_response);
    console.log(coverage_response.surveys);

    if (coverage_response.surveys.length > 0) {
      //formatting for the display table.
      var el_up = document.getElementById("GFG_UP");

      var list = coverage_response.surveys;
      console.log(list);

      function constructTable(selector) {
        // Getting the all column names
        var cols = Headers(list, selector);

        // Traversing the JSON data
        for (var i = 0; i < list.length; i++) {
          var row = $("<tr/>");
          for (var colIndex = 0; colIndex < cols.length; colIndex++) {
            var val = list[i][cols[colIndex]];

            // If there is any key, which is matching
            // with the column name
            if (val == null) val = "";
            row.append($("<td/>").html(val));
          }

          // Adding each row to the table
          $(selector).append(row);
        }
      }

      function Headers(list, selector) {
        var columns = [];
        var header = $("<tr/>");

        for (var i = 0; i < list.length; i++) {
          var row = list[i];

          for (var k in row) {
            if ($.inArray(k, columns) == -1) {
              columns.push(k);

              // Creating the header
              header.append($("<th/>").html(k));
            }
          }
        }

        // Appending the header to the table
        $(selector).append(header);
        return columns;
      }

      constructTable("#table");
    } else {
      // document.getElementById("info").innerHTML = "NO CAPTURE DATA FOUND";
      document.alert('No Capture Data Found for this Point, Try again')


    }

    $(element).popover("dispose");
    popup.setPosition(coordinate);
    $(element).popover({
      container: element,
      placement: "top",
      animation: false,
      html: true,
      content:
        "<p>The location you clicked was:</p><code>" +
        toLonLat(coordinate) +
        "</code>",
    });
    $(element).popover("show");
  });
});
