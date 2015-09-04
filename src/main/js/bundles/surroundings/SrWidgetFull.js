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
    "dojo/i18n!./nls/bundle",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/form/Button",
    "dijit/form/Select",
    "dijit/form/RadioButton",
    "dojox/form/RangeSlider",
    "dojo/text!./templates/SrWidgetFull.html"
], function (declare, i18n, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, Buttton, Select, RadioButton, RangeSlider, templateStringContent) {

    return declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: templateStringContent,
        SrWidget: {
            introduction: "To get suggeestions from your area, please choose one of the tools to select a atarting position and configure the following parameters.",
            storeSelector: "What are you looking for?",
            selectionTool: {
                heading: "How do you want to configure the extent of your travel?",
                distanceTool: "Distance in kilometers",
                travelTimeTool: "Distance in travel-time (ArcGIS-Online Account is required)"
            },
            searchButton: "Search",
            resetButton: "Reset",
            closeButton: "Close"
        },
        constructor: function () {
            this.SrWidget = i18n.SrWidget;
        },
        // onCancel event        
        onCancel: function (event) {
        },
        // on start location choose
        onChooseStart: function (event) {
        },
        // setTerm event        
        onSearch: function (event) {
        },
        // onReset event        
        onReset: function (event) {
        },
        // onCategory event        
        onCategory: function (event) {
        },
        // onDrivetime radiobutton event
        onDrivetime: function (event) {
        },
        // onDistance radiobutton event
        onDistance: function (event) {
        }
    });
});