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
define([
    "dojo/_base/declare",
    "dojo/_base/Color",
    "ct/mapping/edit/GraphicsRenderer",
    "esri/Color",
    "esri/geometry/Circle",
    "esri/symbols/Font",
    "esri/symbols/TextSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol"
], function (declare, dojo_Color, GraphicsRenderer, Color, Circle, Font, TextSymbol, SimpleFillSymbol, SimpleLineSymbol) {

    return declare([], {
        constructor: function (properties) {
            this.graphicLayerId = properties.graphicLayerId;
            this.surroundingsPolygon = null;
        },
        activate: function () {
            this.graphicsRenderer = GraphicsRenderer.createForGraphicsNode(this.graphicLayerId, this._mapModel);

            if (this.graphicsRenderer.get("hasNodeCreated")) {
                this._mapModel.fireModelStructureChanged({
                    source: this
                });
            }
        },
        drawStartMarker: function (geometry) {
            if (this.startLocationMarker) {
                this.graphicsRenderer.erase(this.startLocationMarker);
            }
            this.startLocationMarker = this.graphicsRenderer.draw({geometry: geometry});
        },
        drawDriveTimePolygon: function (feature) {
            if (this.surroundingsPolygon) {
                this.graphicsRenderer.erase(this.surroundingsPolygon);
            }

            var symbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                            SimpleLineSymbol.STYLE_DASHDOT,
                            new Color([0, 0, 0]),
                            2
                            ),
                    new Color([0, 150, 255, 0.1])
                    );
            feature.setSymbol(symbol);

            this.surroundingsPolygon = this.graphicsRenderer.draw(feature);
            return this.surroundingsPolygon;
        },
        drawCircle: function (center, minDistance, maxDistance, radiusUnit) {
            var outerCircle = new Circle(center, {
                "radius": maxDistance,
                "radiusUnit": radiusUnit
            });

            if (minDistance !== 0) {
                var innerCircle = new Circle(center, {
                    "radius": minDistance,
                    "radiusUnit": radiusUnit
                });
                var ring = innerCircle.rings[0];
                outerCircle.addRing(ring.reverse());
            }

            var symbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                            SimpleLineSymbol.STYLE_DASHDOT,
                            new Color([0, 0, 0]), 2),
                    new Color([0, 150, 255, 0.1])
                    );

            var feature = {
                "geometry": outerCircle,
                "symbol": symbol
            };

            if (this.surroundingsPolygon) {
                this.graphicsRenderer.erase(this.surroundingsPolygon);
            }
            this.surroundingsPolygon = this.graphicsRenderer.draw(feature);
            return feature;
        },
        drawDistanceText: function (geometry, text) {
            var font = new Font();
            font.setSize("12pt");
            font.setWeight(Font.WEIGHT_BOLD);
            var textSymbol = new TextSymbol(text);
            textSymbol.setColor(new dojo_Color([128, 0, 0]));
            textSymbol.setAlign(TextSymbol.ALIGN_START);
            textSymbol.setVerticalAlignment(TextSymbol.ALIGN_END);
            textSymbol.setFont(font);
            textSymbol.setOffset(10,-5);

            if (this.descriptionText) {
                this.graphicsRenderer.erase(this.descriptionText);
            }
            this.descriptionText = this.graphicsRenderer.draw(
                    {
                        geometry: geometry,
                        symbol: textSymbol
                    }
            );
        },
        reset: function () {
            this.graphicsRenderer.erase(this.startLocationMarker);
            this.graphicsRenderer.erase(this.surroundingsPolygon);
            this.graphicsRenderer.erase(this.descriptionText);
            this.startLocationMarker = null;
            this.surroundingsPolygon = null;
            this.descriptionText = null;
        }
    });
});