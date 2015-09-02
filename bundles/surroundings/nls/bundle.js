define({ 
  root: {
    bundleName: "Surroundings Bundle",
    bundleDescription: "The bundle provides different selection tools for surroundings.",
    error: {
        failedQuery: "Query was not successfull"
    },
    warning: {
        resultErrorWarning: "Results could not be loaded: ",
        polygonErrorWarning: "Polygon could not be calculated: ",
        noToolSelectedWarning: "Please select first a tool to determine the start position",
        noQueryParams: "Found store, but no query specified",
        noResultsAdressSearch: "No results for query found: "
    },
    info: {
        noResultsAreaInfo: "No Results in this area"
    },
    SrWidget:{
        title: "Surroundings",
        storeSelector: "Select a search topic",
        selectionTool:{
            heading: "Define the scope of your search",
            distanceTool: "Distance in kilometers",
            travelTimeTool: "Distance in travel-time (ArcGIS-Online Account is required)"
        },
        between: "Between",
        and: "and",
        minutes: "minutes",
        chooseStart: "Choose Start",
        searchButton: "Search",
        resetButton: "Reset"
    },
    toggleTool:{
        title:"Surrounding Search",
        tooltip:"Open surroundingsearch window"
    }
   
  },
  "de": true
});