/** Start looking satellite images from the 1st of January, 2010
 * Realistically the first satellite image is available in the year 2013
 * */
export const startSatelliteImagesSearchDate = 1262304000;

export const userLevels = {
  "free": 0,
  "starter": 1,
  "small": 2,
  "corp": 3
}

// center map to London
export const defaultCenterMap = [0.1278, 51.5074];
export const mapBoxAccessToken = 'pk.eyJ1IjoiYXZvbG92aWsiLCJhIjoiY2txdzNpdWs1MGkwZjJ3cGNrYnZua3I4aCJ9.Le6NapjFYy5FfdDXfBmvrg';
export const polygonShapeSize = 48;


export const cropColorDict = {
    "0": {
        "color": "#000000",
        "name": "Background",
        "visible": 1
    },
    "1": {
        "color": "#ffd300",
        "name": "Corn",
        "visible": 1
    },
    "2": {
        "color": "#ff2626",
        "name": "Cotton",
        "visible": 1
    },
    "3": {
        "color": "#00a8e4",
        "name": "Rice",
        "visible": 1
    },
    "4": {
        "color": "#ff9e0b",
        "name": "Sorghum",
        "visible": 1
    },
    "5": {
        "color": "#267000",
        "name": "Soybeans",
        "visible": 1
    },
    "6": {
        "color": "#ffff00",
        "name": "Sunflower",
        "visible": 1
    },
    "7": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "8": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "9": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "10": {
        "color": "#70a500",
        "name": "Peanuts",
        "visible": 1
    },
    "11": {
        "color": "#00af4b",
        "name": "Tobacco",
        "visible": 1
    },
    "12": {
        "color": "#dda50b",
        "name": "Sweet Corn",
        "visible": 1
    },
    "13": {
        "color": "#dda50b",
        "name": "Pop or Orn Corn",
        "visible": 1
    },
    "14": {
        "color": "#7ed3ff",
        "name": "Mint",
        "visible": 1
    },
    "15": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "16": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "17": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "18": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "19": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "20": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "21": {
        "color": "#e2007c",
        "name": "Barley",
        "visible": 1
    },
    "22": {
        "color": "#896254",
        "name": "Durum Wheat",
        "visible": 1
    },
    "23": {
        "color": "#d8b56b",
        "name": "Spring Wheat",
        "visible": 1
    },
    "24": {
        "color": "#a57000",
        "name": "Winter Wheat",
        "visible": 1
    },
    "25": {
        "color": "#d69ebc",
        "name": "Other Small Grains",
        "visible": 1
    },
    "26": {
        "color": "#707000",
        "name": "Dbl Crop WinWht/Soybeans",
        "visible": 1
    },
    "27": {
        "color": "#ac007c",
        "name": "Rye",
        "visible": 1
    },
    "28": {
        "color": "#a05989",
        "name": "Oats",
        "visible": 1
    },
    "29": {
        "color": "#700049",
        "name": "Millet",
        "visible": 1
    },
    "30": {
        "color": "#d69ebc",
        "name": "Speltz",
        "visible": 1
    },
    "31": {
        "color": "#d1ff00",
        "name": "Canola",
        "visible": 1
    },
    "32": {
        "color": "#7e99ff",
        "name": "Flaxseed",
        "visible": 1
    },
    "33": {
        "color": "#d6d600",
        "name": "Safflower",
        "visible": 1
    },
    "34": {
        "color": "#d1ff00",
        "name": "Rape Seed",
        "visible": 1
    },
    "35": {
        "color": "#00af4b",
        "name": "Mustard",
        "visible": 1
    },
    "36": {
        "color": "#ffa5e2",
        "name": "Alfalfa",
        "visible": 1
    },
    "37": {
        "color": "#a5f28c",
        "name": "Other Hay/Non Alfalfa",
        "visible": 1
    },
    "38": {
        "color": "#00af4b",
        "name": "Camelina",
        "visible": 1
    },
    "39": {
        "color": "#d69ebc",
        "name": "Buckwheat",
        "visible": 1
    },
    "40": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "41": {
        "color": "#a800e4",
        "name": "Sugarbeets",
        "visible": 1
    },
    "42": {
        "color": "#a50000",
        "name": "Dry Beans",
        "visible": 1
    },
    "43": {
        "color": "#702600",
        "name": "Potatoes",
        "visible": 1
    },
    "44": {
        "color": "#00af4b",
        "name": "Other Crops",
        "visible": 1
    },
    "45": {
        "color": "#b17eff",
        "name": "Sugarcane",
        "visible": 1
    },
    "46": {
        "color": "#702600",
        "name": "Sweet Potatoes",
        "visible": 1
    },
    "47": {
        "color": "#ff6666",
        "name": "Misc Vegs & Fruits",
        "visible": 1
    },
    "48": {
        "color": "#ff6666",
        "name": "Watermelons",
        "visible": 1
    },
    "49": {
        "color": "#ffcc66",
        "name": "Onions",
        "visible": 1
    },
    "50": {
        "color": "#ff6666",
        "name": "Cucumbers",
        "visible": 1
    },
    "51": {
        "color": "#00af4b",
        "name": "Chick Peas",
        "visible": 1
    },
    "52": {
        "color": "#00ddaf",
        "name": "Lentils",
        "visible": 1
    },
    "53": {
        "color": "#54ff00",
        "name": "Peas",
        "visible": 1
    },
    "54": {
        "color": "#f2a377",
        "name": "Tomatoes",
        "visible": 1
    },
    "55": {
        "color": "#ff6666",
        "name": "Caneberries",
        "visible": 1
    },
    "56": {
        "color": "#00af4b",
        "name": "Hops",
        "visible": 1
    },
    "57": {
        "color": "#7ed3ff",
        "name": "Herbs",
        "visible": 1
    },
    "58": {
        "color": "#e8bfff",
        "name": "Clover/Wildflowers",
        "visible": 1
    },
    "59": {
        "color": "#afffdd",
        "name": "Sod/Grass Seed",
        "visible": 1
    },
    "60": {
        "color": "#00af4b",
        "name": "Switchgrass",
        "visible": 1
    },
    "61": {
        "color": "#bfbf77",
        "name": "Fallow/Idle Cropland",
        "visible": 1
    },
    "62": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "63": {
        "color": "#93cc93",
        "name": "Forest",
        "visible": 0
    },
    "64": {
        "color": "#c6d69e",
        "name": "Shrubland",
        "visible": 1
    },
    "65": {
        "color": "#ccbfa3",
        "name": "Barren",
        "visible": 1
    },
    "66": {
        "color": "#ff00ff",
        "name": "Cherries",
        "visible": 1
    },
    "67": {
        "color": "#ff8eaa",
        "name": "Peaches",
        "visible": 1
    },
    "68": {
        "color": "#ba004f",
        "name": "Apples",
        "visible": 1
    },
    "69": {
        "color": "#704489",
        "name": "Grapes",
        "visible": 1
    },
    "70": {
        "color": "#007777",
        "name": "Christmas Trees",
        "visible": 1
    },
    "71": {
        "color": "#b19a70",
        "name": "Other Tree Crops",
        "visible": 1
    },
    "72": {
        "color": "#ffff7e",
        "name": "Citrus",
        "visible": 1
    },
    "73": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "74": {
        "color": "#b5705b",
        "name": "Pecans",
        "visible": 1
    },
    "75": {
        "color": "#00a582",
        "name": "Almonds",
        "visible": 1
    },
    "76": {
        "color": "#e9d6af",
        "name": "Walnuts",
        "visible": 1
    },
    "77": {
        "color": "#b19a70",
        "name": "Pears",
        "visible": 1
    },
    "78": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "79": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "80": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "81": {
        "color": "#f2f2f2",
        "name": "Clouds/No Data",
        "visible": 0
    },
    "82": {
        "color": "#9a9a9a",
        "name": "Developed",
        "visible": 0
    },
    "83": {
        "color": "#4b70a3",
        "name": "Water",
        "visible": 0
    },
    "84": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "85": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "86": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "87": {
        "color": "#7eb1b1",
        "name": "Wetlands",
        "visible": 1
    },
    "88": {
        "color": "#e8ffbf",
        "name": "Nonag/Undefined",
        "visible": 1
    },
    "89": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "90": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "91": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "92": {
        "color": "#00ffff",
        "name": "Aquaculture",
        "visible": 1
    },
    "93": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "94": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "95": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "96": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "97": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "98": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "99": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "100": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "101": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "102": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "103": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "104": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "105": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "106": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "107": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "108": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "109": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "110": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "111": {
        "color": "#4b70a3",
        "name": "Open Water",
        "visible": 0
    },
    "112": {
        "color": "#d3e2f9",
        "name": "Perennial Ice/Snow ",
        "visible": 0
    },
    "113": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "114": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "115": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "116": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "117": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "118": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "119": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "120": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "121": {
        "color": "#9a9a9a",
        "name": "Developed/Open Space",
        "visible": 0
    },
    "122": {
        "color": "#9a9a9a",
        "name": "Developed/Low Intensity",
        "visible": 0
    },
    "123": {
        "color": "#9a9a9a",
        "name": "Developed/Med Intensity",
        "visible": 0
    },
    "124": {
        "color": "#9a9a9a",
        "name": "Developed/High Intensity",
        "visible": 0
    },
    "125": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "126": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "127": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "128": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "129": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "130": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "131": {
        "color": "#ccbfa3",
        "name": "Barren",
        "visible": 1
    },
    "132": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "133": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "134": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "135": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "136": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "137": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "138": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "139": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "140": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "141": {
        "color": "#93cc93",
        "name": "Deciduous Forest",
        "visible": 0
    },
    "142": {
        "color": "#93e693",
        "name": "Evergreen Forest",
        "visible": 0
    },
    "143": {
        "color": "#93cc93",
        "name": "Mixed Forest",
        "visible": 0
    },
    "144": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "145": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "146": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "147": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "148": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "149": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "150": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "151": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "152": {
        "color": "#c6d69e",
        "name": "Shrubland",
        "visible": 0
    },
    "153": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "154": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "155": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "156": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "157": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "158": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "159": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "160": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "161": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "162": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "163": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "164": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "165": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "166": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "167": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "168": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "169": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "170": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "171": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "172": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "173": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "174": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "175": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "176": {
        "color": "#e8ffbf",
        "name": "Grassland/Pasture",
        "visible": 0
    },
    "177": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "178": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "179": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "180": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "181": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "182": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "183": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "184": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "185": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "186": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "187": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "188": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "189": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "190": {
        "color": "#7eb1b1",
        "name": "Woody Wetlands",
        "visible": 0
    },
    "191": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "192": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "193": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "194": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "195": {
        "color": "#7eb1b1",
        "name": "Herbaceous Wetlands",
        "visible": 1
    },
    "196": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "197": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "198": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "199": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "200": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "201": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "202": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "203": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "204": {
        "color": "#00ff8c",
        "name": "Pistachios",
        "visible": 1
    },
    "205": {
        "color": "#d69ebc",
        "name": "Triticale",
        "visible": 1
    },
    "206": {
        "color": "#ff6666",
        "name": "Carrots",
        "visible": 1
    },
    "207": {
        "color": "#ff6666",
        "name": "Asparagus",
        "visible": 1
    },
    "208": {
        "color": "#ff6666",
        "name": "Garlic",
        "visible": 1
    },
    "209": {
        "color": "#ff6666",
        "name": "Cantaloupes",
        "visible": 1
    },
    "210": {
        "color": "#ff8eaa",
        "name": "Prunes",
        "visible": 1
    },
    "211": {
        "color": "#334933",
        "name": "Olives",
        "visible": 1
    },
    "212": {
        "color": "#e47026",
        "name": "Oranges",
        "visible": 1
    },
    "213": {
        "color": "#ff6666",
        "name": "Honeydew Melons",
        "visible": 1
    },
    "214": {
        "color": "#ff6666",
        "name": "Broccoli",
        "visible": 1
    },
    "215": {
        "color": "#66994c",
        "name": "Avocados",
        "visible": 1
    },
    "216": {
        "color": "#ff6666",
        "name": "Peppers",
        "visible": 1
    },
    "217": {
        "color": "#b19a70",
        "name": "Pomegranates",
        "visible": 1
    },
    "218": {
        "color": "#ff8eaa",
        "name": "Nectarines",
        "visible": 1
    },
    "219": {
        "color": "#ff6666",
        "name": "Greens",
        "visible": 1
    },
    "220": {
        "color": "#ff8eaa",
        "name": "Plums",
        "visible": 1
    },
    "221": {
        "color": "#ff6666",
        "name": "Strawberries",
        "visible": 1
    },
    "222": {
        "color": "#ff6666",
        "name": "Squash",
        "visible": 1
    },
    "223": {
        "color": "#ff8eaa",
        "name": "Apricots",
        "visible": 1
    },
    "224": {
        "color": "#00af4b",
        "name": "Vetch",
        "visible": 1
    },
    "225": {
        "color": "#ffd300",
        "name": "Dbl Crop WinWht/Corn",
        "visible": 1
    },
    "226": {
        "color": "#ffd300",
        "name": "Dbl Crop Oats/Corn",
        "visible": 1
    },
    "227": {
        "color": "#ff6666",
        "name": "Lettuce",
        "visible": 1
    },
    "228": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "229": {
        "color": "#ff6666",
        "name": "Pumpkins",
        "visible": 1
    },
    "230": {
        "color": "#896254",
        "name": "Dbl Crop Lettuce/Durum Wht",
        "visible": 1
    },
    "231": {
        "color": "#ff6666",
        "name": "Dbl Crop Lettuce/Cantaloupe",
        "visible": 1
    },
    "232": {
        "color": "#ff2626",
        "name": "Dbl Crop Lettuce/Cotton",
        "visible": 1
    },
    "233": {
        "color": "#e2007c",
        "name": "Dbl Crop Lettuce/Barley",
        "visible": 1
    },
    "234": {
        "color": "#ff9e0b",
        "name": "Dbl Crop Durum Wht/Sorghum",
        "visible": 1
    },
    "235": {
        "color": "#ff9e0b",
        "name": "Dbl Crop Barley/Sorghum",
        "visible": 1
    },
    "236": {
        "color": "#a57000",
        "name": "Dbl Crop WinWht/Sorghum",
        "visible": 1
    },
    "237": {
        "color": "#ffd300",
        "name": "Dbl Crop Barley/Corn",
        "visible": 1
    },
    "238": {
        "color": "#a57000",
        "name": "Dbl Crop WinWht/Cotton",
        "visible": 1
    },
    "239": {
        "color": "#267000",
        "name": "Dbl Crop Soybeans/Cotton",
        "visible": 1
    },
    "240": {
        "color": "#267000",
        "name": "Dbl Crop Soybeans/Oats",
        "visible": 1
    },
    "241": {
        "color": "#ffd300",
        "name": "Dbl Crop Corn/Soybeans",
        "visible": 1
    },
    "242": {
        "color": "#000099",
        "name": "Blueberries",
        "visible": 1
    },
    "243": {
        "color": "#ff6666",
        "name": "Cabbage",
        "visible": 1
    },
    "244": {
        "color": "#ff6666",
        "name": "Cauliflower",
        "visible": 1
    },
    "245": {
        "color": "#ff6666",
        "name": "Celery",
        "visible": 1
    },
    "246": {
        "color": "#ff6666",
        "name": "Radishes",
        "visible": 1
    },
    "247": {
        "color": "#ff6666",
        "name": "Turnips",
        "visible": 1
    },
    "248": {
        "color": "#ff6666",
        "name": "Eggplants",
        "visible": 1
    },
    "249": {
        "color": "#ff6666",
        "name": "Gourds",
        "visible": 1
    },
    "250": {
        "color": "#ff6666",
        "name": "Cranberries",
        "visible": 1
    },
    "251": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "252": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "253": {
        "color": "#000000",
        "name": "",
        "visible": 1
    },
    "254": {
        "color": "#267000",
        "name": "Dbl Crop Barley/Soybeans",
        "visible": 1
    }
};