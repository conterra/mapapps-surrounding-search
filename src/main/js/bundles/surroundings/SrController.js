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
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/i18n!./nls/bundle",
    "dijit/form/HorizontalRuleLabels",
    "./SrWidgetFull",
    "./SrWidgetShort",
    "ct/_Connect",
    "ct/_when",
    "ct/store/Filter",
    "esri/units",
    "esri/graphic",
    "esri/tasks/FeatureSet",
    "esri/tasks/Geoprocessor",
    "esri/symbols/SimpleMarkerSymbol"
], function (declare, d_array, d_lang, i18n, HorizontalRuleLabels, SrWidgetFull, SrWidgetShort, _Connect, ct_when, Filter, Units, Graphic, FeatureSet, Geoprocessor, SimpleMarkerSymbol) {
    return declare([_Connect], {
        widgetsInTemplate: true,
        mapClickTool: null,
        constructor: function (properties) {
            this.windowOptions = properties.windowOptions;
            this.storeIds = properties.storeIds;
            this.distanceSliderProps = properties.distance;
            this.timeSliderProps = properties.time;
            this.geoProUrl = properties.geoprocessorUrl;
            this.startLocation = null;
            this.stores = [];
            this.selectedStore = null;
            this.layerId = [];
            this.radiusUnit = Units[this.distanceSliderProps.unit];
            this.i18n = i18n;
            if (this.distanceSliderProps.unit === "METERS") {
                this.radiusUnitShort = "m";
            } else if (this.distanceSliderProps.unit === "KILOMETERS") {
                this.radiusUnitShort = "km";
            }
        },
        createInstance: function () {
            this._graphicsHandler.activate();
            if (this.timeSliderProps.enabled) {
                this._srWidget = new SrWidgetFull({});
                this._configureTimeSlider();
            } else {
                this._srWidget = new SrWidgetShort({});
                // make sure distance option range for search is always selected
                d_lang.mixin(this._srWidget, {
                    distOptOne: {
                        checked: false
                    },
                    distOptTwo: {
                        checked: true
                    }
                });
            }
            this._srWidget.storeSelect.options = this.selectionOptions;

            var distanceMinimum = Math.round(this.distanceSliderProps.minimum);
            var distanceMaximum = Math.round(this.distanceSliderProps.maximum);
            var distanceDifference = distanceMaximum - distanceMinimum;

            // configure distance slider
            var discreteValues = (distanceMaximum - distanceMinimum) / this.distanceSliderProps.interval + 1;
            this._srWidget.distanceSlider.set("discreteValues", discreteValues);
            this._srWidget.distanceSlider.set("minimum", distanceMinimum);
            this._srWidget.distanceSlider.set("maximum", distanceMaximum);
            this._srWidget.distanceSlider.set("value", [
                distanceMinimum + (distanceDifference * 0.25),
                distanceMaximum - (distanceDifference * 0.25)
            ]);

            //configure distance rule labels
            new HorizontalRuleLabels({
                container: "topDecoration",
                labels: ["",
                    distanceMinimum + (distanceDifference * 0.2) + this.radiusUnitShort,
                    distanceMinimum + (distanceDifference * 0.4) + this.radiusUnitShort,
                    distanceMinimum + (distanceDifference * 0.6) + this.radiusUnitShort,
                    distanceMinimum + (distanceDifference * 0.8) + this.radiusUnitShort,
                    ""],
                labelStyle: "height: 1.2em; font-weight: bold"
            }, this._srWidget.distanceRuleLabels);

            // set button icons
            this._srWidget.searchButton.set("iconClass", "icon-magnifier");
            this._srWidget.chooseStartButton.set("iconClass", "icon-map-locate");

            // connect button events
            this.connect(this._srWidget, "onChooseStart", this.activateClickListener);
            this.connect(this._srWidget, "onSearch", this.search);
            this.connect(this._srWidget, "onReset", this.reset);
            this.connect(this._srWidget, "onCategory", this.changeSelectedStore);
            this.connect(this._srWidget.distanceSlider, "onChange", this.onDistanceSliderChange);
            this.connect(this._srWidget.distFromText, "onBlur", this.onDistInputChange);
            this.connect(this._srWidget.distToText, "onBlur", this.onDistInputChange);

            // configure validator for slider changes
            this._srWidget.distFromUnit.innerHTML = this.radiusUnitShort;
            this._srWidget.distToUnit.innerHTML = this.radiusUnitShort;

            var that = this;
            this._srWidget.distFromText.validator = function (value, constraints) {
                var min = that._srWidget.distanceSlider.get("minimum");
                var max = that._srWidget.distanceSlider.get("value")[1];
                value = Number(value);
                if (value < min || value > max || isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            };
            this._srWidget.distToText.validator = function (value, constraints) {
                var min = that._srWidget.distanceSlider.get("value")[0];
                var max = that._srWidget.distanceSlider.get("maximum");
                value = Number(value);
                if (value < min || value > max || isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            };
            this._createGeoprocessor();
            this.changeSelectedStore();
            return this._srWidget;
        },
        _configureTimeSlider: function () {
            var timeMinimum = Math.round(this.timeSliderProps.minimum);
            var timeMaximum = Math.round(this.timeSliderProps.maximum);
            var timeDifference = timeMaximum - timeMinimum;

            var discreteValues = (timeMaximum - timeMinimum) / this.timeSliderProps.interval + 1;
            this._srWidget.timeSlider.set("discreteValues", discreteValues);
            this._srWidget.timeSlider.set("minimum", timeMinimum);
            this._srWidget.timeSlider.set("maximum", timeMaximum);
            this._srWidget.timeSlider.set("value", [
                timeMinimum + (timeDifference * 0.5)
            ]);

            //configure time rule labels
            new HorizontalRuleLabels({
                container: "topDecoration",
                labels: ["",
                    timeMinimum + (timeDifference / 3) + "min",
                    timeMinimum + (timeDifference * (2 / 3)) + "min",
                    ""],
                labelStyle: "height: 1.2em; font-weight: bold"
            }, this._srWidget.timeRuleLabels);

            // connect events
            this.connect(this._srWidget, "onDrivetime", this.onTimeSelection);
            this.connect(this._srWidget, "onDistance", this.onDistanceSelection);
            this.connect(this._srWidget.timeSlider, "onChange", this.onTimeSliderChange);
            this.connect(this._srWidget.timeText, "onBlur", this.onTimeInputChange);

            // configure slider validator
            var that = this;
            this._srWidget.timeText.validator = function (value, constraints) {
                var min = that._srWidget.timeSlider.get("minimum");
                var max = that._srWidget.timeSlider.get("maximum");
                value = Number(value);
                if (value < min || value > max || isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            };
        },
        _createGeoprocessor: function () {
            this.gp = new Geoprocessor(this.geoProUrl);

            var that = this;
            this.gp.on("job-complete", function (evt) {
                var jobId = evt.jobInfo.jobId;

                that.gp.getResultData(jobId, "service_areas", function (results) {
                    var driveTimePolygon = results.value.features[0];
                    driveTimePolygon.geometry = that._coordinateTransformer.transform(driveTimePolygon.geometry, that._mapState.getSpatialReference().wkid);
                    that._graphicsHandler.drawDriveTimePolygon(driveTimePolygon);
                    that._mapState.setExtent(driveTimePolygon.geometry.getExtent());

                    that._queryStore(driveTimePolygon.geometry, that.selectedStore);
                    that._srWidget.searchButton.set("iconClass", "icon-magnifier");
                }, function (error) {
                    that._logService.warn(that.i18n.warning.resultErrorWarning + evt.error.message);
                });
            });

            this.gp.on("error", function (evt) {
                that._logService.warn(this.i18n.warning.polygonErrorWarning + evt.error.message);
                that._srWidget.searchButton.set("iconClass", "icon-magnifier");
            });
        },
        activateClickListener: function () {
            this.mapClickListener = this.connect(this._mapState, "onClick", this._onMapClick);
        },
        deactivateClickListener: function () {
            this.disconnect(this.mapClickListener);
        },
        _onMapClick: function (event) {
            this.startLocation = this._coordinateTransformer.transform(event.mapPoint, this._mapState.getSpatialReference().wkid);
            this._graphicsHandler.drawStartMarker(this.startLocation);
            this.disconnect(this.mapClickListener);
        },
        onTimeSelection: function () {
            this._srWidget.distanceSlider.set("disabled", true);
            this._srWidget.distFromText.set("disabled", true);
            this._srWidget.distToText.set("disabled", true);
            this._srWidget.timeSlider.set("disabled", false);
            this._srWidget.timeText.set("disabled", false);
            this._eventService.postEvent("ct/framework/user/FORCE_LOGIN");
        },
        onDistanceSelection: function () {
            this._srWidget.timeSlider.set("disabled", true);
            this._srWidget.timeText.set("disabled", true);
            this._srWidget.distanceSlider.set("disabled", false);
            this._srWidget.distFromText.set("disabled", false);
            this._srWidget.distToText.set("disabled", false);
        },
        onDistanceSliderChange: function (event) {
            this._srWidget.distFromText.setAttribute("value", event[0]);
            this._srWidget.distToText.setAttribute("value", event[1]);
        },
        onTimeSliderChange: function (event) {
            this._srWidget.timeText.setAttribute("value", event);
        },
        onDistInputChange: function () {
            var fromValid = this._srWidget.distFromText.isValid();
            var toValid = this._srWidget.distToText.isValid();
            var oldFromValue = this._srWidget.distanceSlider.get("value")[0];
            var oldToValue = this._srWidget.distanceSlider.get("value")[1];
            var newFromValue = this._srWidget.distFromText.get("value");
            var newToValue = this._srWidget.distToText.get("value");
            if (!fromValid && !toValid) {
                return;
            } else if (fromValid && toValid) {
                this._srWidget.distanceSlider.set("value", [newFromValue, newToValue]);
            } else if (fromValid) {
                this._srWidget.distanceSlider.set("value", [newFromValue, oldToValue]);
            } else if (toValid) {
                this._srWidget.distanceSlider.set("value", [oldFromValue, newToValue]);
            }
        },
        onTimeInputChange: function () {
            var timeValidationTb = this._srWidget.timeText;
            if (timeValidationTb.isValid()) {
                this._srWidget.timeSlider.set("value", timeValidationTb.get("value"));
            }
        },
        search: function () {
            if (!this.startLocation) {
                this._logService.warn(this.i18n.warning.noToolSelectedWarning);
                return;
            }
            this._srWidget.searchButton.set("iconClass", "icon-spinner");
            var geometry = this.startLocation;

            // if range in drive-time is selected
            if (this._srWidget.distOptOne.checked) {
                var minutes = Number(this._srWidget.timeSlider.value);
                var symbol = new SimpleMarkerSymbol();
                var graphic = new Graphic(geometry, symbol);

                var features = [];
                features.push(graphic);
                var featureSet = new FeatureSet();
                featureSet.features = features;
                var params = {"facilities": featureSet, "break_values": minutes, "f": "json"};
                this.gp.outSpatialReference = this._mapState.spatialReference;
                ;
                this.gp.submitJob(params);
                this._graphicsHandler.drawDistanceText(geometry, minutes + "minutes");

                // if range in meters/kilometers is selected
            } else if (this._srWidget.distOptTwo.checked) {
                var minDistance = this._srWidget.distanceSlider.value[0];
                var maxDistance = this._srWidget.distanceSlider.value[1];
                var queryFeature = this._graphicsHandler.drawCircle(geometry, minDistance, maxDistance, this.radiusUnit);

                var extent = queryFeature.geometry.getExtent();
                this._mapState.setExtent(extent);
                if (minDistance === 0) {
                    this._graphicsHandler.drawDistanceText(geometry,
                            maxDistance +
                            this.radiusUnitShort
                            );
                } else {
                    this._graphicsHandler.drawDistanceText(geometry,
                            minDistance +
                            this.radiusUnitShort +
                            " - " +
                            maxDistance +
                            this.radiusUnitShort
                            );

                }
                this._queryStore(queryFeature.geometry, this.selectedStore);
                this._srWidget.searchButton.set("iconClass", "icon-magnifier");
            }
        },
        _queryStore: function (geometry, store) {
            var query = {
                geometry: {
                    $intersects: geometry
                }
            };
            var idProperty = store.idProperty;
            var opts = {
                fields: {}
            };
            opts.fields[idProperty] = true;
            ct_when(store.query(query, opts), function (result) {
                if (!result || result.length === 0) {
                    this._dataModel.setDatasource();
                    this._logService.info(this.i18n.info.noResultsAreaInfo);
                    return;
                }
                // required to exclude polygon geometry, otherwise it is handled to resultcenter
                var idList = d_array.map(result, function (item) {
                    return item[idProperty];
                });
                var query = {};
                query[idProperty] = {$in: idList};
                this._dataModel.setDatasource(Filter(store, query));
            }, this);
        },
        changeSelectedStore: function () {
            var storeIds = this.storeIds;
            var selectedOption;
            var currentValue = this._srWidget.storeSelect.value;
            if (currentValue) {
                selectedOption = currentValue;
            } else {
                selectedOption = storeIds.length ? storeIds[0] : "";
            }
            d_array.forEach(this.stores, function (store) {
                if (store.serviceproperties.id === selectedOption) {
                    this.selectedStore = store;
                }
            }, this);

            this._dataModel.setDatasource();
        },
        reset: function () {
            var distanceMinimum = Math.round(this.distanceSliderProps.minimum);
            var distanceMaximum = Math.round(this.distanceSliderProps.maximum);
            var distanceDifference = distanceMaximum - distanceMinimum;
            this._srWidget.distanceSlider.set("value", [
                distanceMinimum + (distanceDifference * 0.25),
                distanceMaximum - (distanceDifference * 0.25)
            ]);
            this._graphicsHandler.reset();
            this.startLocation = null;

            this._dataModel.setDatasource();
        },
        deactivate: function () {
            this.disconnect();
            this._graphicsHandler.reset();
            this._srWidget.destroyRecursive();
            this._srWidget = null;

        },
        addSurroundingStore: function (store, serviceproperties) {
            // filter incoming stores for configured storeid-array
            var index = d_array.indexOf(this.storeIds, serviceproperties.id);
            if (index > -1) {
                // merge store and its own properties
                store.serviceproperties = serviceproperties;
                this.stores.push(store);
                if (this._srWidget) {
                    this._srWidget.storeSelect.addOption({
                        label: store.serviceproperties.title,
                        value: store.serviceproperties.id
                    });
                } else {
                    // if widget has not been initialized yet we store all options
                    this.selectionOptions = [];
                    d_array.forEach(this.stores, function (store) {
                        var option = {
                            label: store.serviceproperties.title,
                            value: store.serviceproperties.id
                        };
                        this.selectionOptions.push(option);
                    }, this);
                }
            }
        },
        removeSurroundingStore: function (store, serviceproperties) {
            // filter removed stores for configured storeid-array
            var index = d_array.indexOf(this.stores, store);
            if (index > -1) {
                // remove store from array
                this.stores = d_array.filter(this.stores, function (item) {
                    return item.serviceproperties.id !== serviceproperties.id;
                });
                // remove store from widget
                if (this._srWidget) {
                    this._srWidget.storeSelect.removeOption(serviceproperties.id);
                } else {
                    // if widget has not been initialized yet we store all options
                    this.selectionOptions = [];
                    d_array.forEach(this.stores, function (store) {
                        var option = {
                            label: store.serviceproperties.title,
                            value: store.serviceproperties.id
                        };
                        this.selectionOptions.push(option);
                    }, this);
                }
            }
        }
    });
});