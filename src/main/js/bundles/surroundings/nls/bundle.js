/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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