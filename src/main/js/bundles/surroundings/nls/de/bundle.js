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
    bundleName: "Umkreissuche Bundle",
    bundleDescription: "Dieses Bundle stellt verschiedene Werkzeuge f\u00FCr die Umkreissuche zur Verf\u00FCgung.",
    error: {
        failedQuery: "Anfrage fehlgeschlagen"
    },
    warning: {
        resultErrorWarning: "Ergebnisse konnten nicht geladen werden: ",
        polygonErrorWarning: "Polygon konnte nicht berechnet werden: ",
        noToolSelectedWarning: "Bitte w\u00E4hlen sie zuerst mithilfe der Werkzeuge eine Startposition aus",
        noQueryParams: "Store gefunden aber keine Anfrage spezifiziert",
        noResultsAdressSearch: "Keine Ergebnisse gefunden: "
    },
    info: {
        noResultsAreaInfo: "Keine Ergebnisse in deisem Gebiet"
    },
    SrWidget: {
        title: "Umkreissuche",
        storeSelector: "Bitte w\u00E4hlen sie ein Suchthema",
        selectionTool: {
            heading: "Definieren sie den Umfang ihrer Umkreissuche",
            distanceTool: "Entfernung in Kilometern",
            travelTimeTool: "Entfernung nach Fahrzeit (ArcGIS-Online Account ben\u00F6tigt)"
        },
        between: "Zwischen",
        and: "und",
        minutes: "Minuten",
        chooseStart: "Start w\u00E4hlen",
        searchButton: "Suche",
        resetButton: "Zur\u00FCck"
    },
    toggleTool:{
        title:"Umkreissuche",
        tooltip:"Fenster f\u00FCr Umkreissuche \u00F6ffnen"
    }
});