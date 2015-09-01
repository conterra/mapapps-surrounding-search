# Surrounding Search Bundle
The surroundings bundle enables the user to search for features on predefined stores. In contrast to omnisearch the surroundingssearch is not based on a string. The user can define a location with a click on the map and a radius around this location. The result will contain all features from the selected store within the defined radius around the location set by the user.

Additionally, if ArcGIS Online credentials are available, the radius can be defined dependant on driving time instead of distance.

The bundle has also it's own live-configuration so that setting it up should go with ease. 

Anleitung (DE)
--------------
Das Surroundings-Bundle ermöglicht die Selektion von Features innerhalb eines Kreises mit definierten Radius und Ausgangspunkt. Dabei wird der jeweils ausgesuchte Store unabhängig von anderen Attributen räumlich gefiltert und die Ergebnisse im ResultCenter dargestellt.

Zusätzlich erlaubt das Bundle die räumliche Selektion von Feature durch die Berechnung eines Fahrzeit-Polygons ebenfalls von einem definierten Ausgangspunkt. Hierfür wird ein ArcGIS-Online Account benötigt und es können zusätzliche Kosten anfallen. Dazu wird ein externer Dienst (ArcGIS-Geoprocessing) verwendet, der auf Grundlage des Ausgangspunktes und der Zeit (in Minuten) ein Polygon liefert, das die erreichbare Fläche in der gegebenen Zeit repräsentiert.

Neben der Auswahl des Ausgangspunktes durch einen Klick auf die Karte kann auch der aktuelle Standort oder das Ergebnis einer Suche (Adresse oder Koordinaten) benutzt werden.

Jegliche Selektionen durch das Bundle werden ausschließlich auf den gewählten Store durchgeführt. Dabei ist nicht relevant ob der Store als Layer zur Verfügung steht und ob ggf. dieser oder andere Layer aktiviert werden.

Das Bundle bietet die Möglichkeit die einzelnen Parameter, Minimum- und Maximumwerte, sowie die zur Verfügung stehenden Stores in der Live-Konfiguration anzupassen. Der entsprechende Dialog befindet sich unter: Live Configuration -> Widgets -> Surroundings.
