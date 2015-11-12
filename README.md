# Surrounding Search Bundle
The surroundings bundle enables the user to search for features on predefined stores. In contrast to omnisearch the surroundingssearch is not based on a string. The user can define a location with a click on the map and a radius around this location. The result will contain all features from the selected store within the defined radius around the location set by the user.

Additionally, if ArcGIS Online credentials are available, the radius can be defined dependant on driving time instead of distance.

The bundle has also it's own live-configuration so that setting it up should go with ease. 

### Sample App ###
http://www.mapapps.de/mapapps/resources/apps/downloads_surroundings/index.html

Anleitung (DE)
--------------
Das Surroundings-Bundle ermöglicht die Selektion von Features innerhalb eines Kreises mit definierten Radius und Ausgangspunkt. Dabei wird der jeweils ausgesuchte Store unabhängig von anderen Attributen räumlich gefiltert und die Ergebnisse im ResultCenter dargestellt.

Zusätzlich erlaubt das Bundle die räumliche Selektion von Feature durch die Berechnung eines Fahrzeit-Polygons ebenfalls von einem definierten Ausgangspunkt. Hierfür wird ein ArcGIS-Online Account benötigt und es können zusätzliche Kosten anfallen. Dazu wird ein externer Dienst (ArcGIS-Geoprocessing) verwendet, der auf Grundlage des Ausgangspunktes und der Zeit (in Minuten) ein Polygon liefert, das die erreichbare Fläche in der gegebenen Zeit repräsentiert.

Neben der Auswahl des Ausgangspunktes durch einen Klick auf die Karte kann auch der aktuelle Standort oder das Ergebnis einer Suche (Adresse oder Koordinaten) benutzt werden.

Jegliche Selektionen durch das Bundle werden ausschließlich auf den gewählten Store durchgeführt. Dabei ist nicht relevant ob der Store als Layer zur Verfügung steht und ob ggf. dieser oder andere Layer aktiviert werden. Zu beachten ist, dass für den gewünschten Store die Eigenschaft "useIn" der Wert "selection" vergeben wurde.

![Umkreissuche](http://developernetwork.conterra.de/en/system/files/images/surrounding1.png)

Das Bundle bietet die Möglichkeit die einzelnen Parameter, Minimum- und Maximumwerte, sowie die zur Verfügung stehenden Stores in der Live-Konfiguration anzupassen. Der entsprechende Dialog befindet sich unter: Live Configuration -> Widgets -> Surroundings.

![Umkreissuche2](http://developernetwork.conterra.de/en/system/files/images/surrounding2.png)

###Übersicht der Konfigurierbaren Parameter###
AGS-Store-IDs: Dieses Textfeld enthält ein Array der durchsuchbaren Stores durch das Bundle (benötigt wird die Store-ID, Layer-IDs können nicht verwendet werden). Die Reihenfolge entspricht somit auch der der Dropdown im Bundle-Widget. Store-IDs werden automatisch erzeugt, wenn in der Live-Konfiguration ein Suchthema angelegt wird (beispielsweise auf einen Feature-Service). Anschließend können die Store-IDs über die app.json im Bereich bundles -> agssearch -> AGSStore für das jeweilige Suchthema (AGSStore) hinter dem Attribut „id“ (letzter Eintrag) eingesehen werden:
![Umkreissuche3](http://developernetwork.conterra.de/en/system/files/images/surrounding3.png)

Das Surroundings-Bundle reagiert auch auf Änderungen während der laufzeit. Sollten die gelisteten Stores in der Live-Konfigurationen hinzugefügt oder entfernt werden, so wird diese Änderung auch im Surroundings-Widget wiedergegeben. Auch die mit map.apps 3.2 unterstützte automatische Registrierung eines ArcGIS-Server Stores wird unterstützt.
- Unit for travel distance: Hier kann die Einheit für die Selektion basierend auf einem Radius gewählt werden. Zur Verfügung stehen dabei Meter und Kilometer.
- Minimum travel distance: Der minimale Radius basierend auf der definierten Längeneinheit
- Maximum travel distance: Der maximale Radius basierend auf der definierten Längeneinheit
- Interval between fix slider values: Abstände zwischen den diskreten Werten bei Benutzung des Schiebereglers („einrasten“). Durch Benutzung der Textfelder im Widget können nach wie vor andere Werte innerhalb des Intervalls gewählt werden.
- Minimum travel distance (minutes): Die minimale Reisezeit für das Fahrzeitpolygon (Minuten)
- Maximum travel distance (minutes): Die maximale Reisezeit für das Fahrzeitpolygon (Minuten)
- Interval between fix slider values: Abstände zwischen den diskreten Werten bei Benutzung des Schiebereglers (“einrasten”). Durch Benutzung des Textfeldes im Widget können nach wie vor andere Werte innerhalb des Intervalls gewählt werden.
- Geoprocessor URL: Link des verwendeten Geoprozessor für die Ermittlung des Fahrzeitpolygons

Da die Funktionalität des Surroundings-Widgets konfiguriert werden kann, ist auch die Größe des Inhalts variabel. Die genaue Größe und Position des Widgets in Pixelkoordinate kann in der app.json im Bereich des bundles „template“ wie folgt angepasst werden:

![Umkreissuche4](http://developernetwork.conterra.de/en/system/files/images/surrounding4.png)
