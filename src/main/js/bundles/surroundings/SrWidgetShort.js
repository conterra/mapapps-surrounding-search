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
    "dojo/text!./templates/SrWidgetShort.html"
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