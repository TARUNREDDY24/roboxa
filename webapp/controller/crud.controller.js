sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("project2.controller.crud", {
        onInit: function () {
            var oContext =oModel.CreateEntry("/proSet",
                {
                    book:{
                        name:"hello",
                        desciption:"welcome",
                        code:"73"
                    }
                });
                oForm.setBindingContext(oContext);

        }
    });
});

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/odata/v2/ODataModel"
], function (Controller, Fragment, ODataModel) {
    "use strict";

    return Controller.extend("project.", {

        onInit: function () {
            var oModel = new ODataModel("/path/to/odata/service");
            this.getView().setModel(oModel);
            this.getView().setModel(new sap.ui.model.json.JSONModel({ selectedItem: null }), "view");
        },

        onAddItem: function () {
            if (!this._addDialog) {
                this._addDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "my.namespace.view.AddDialog",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            this._addDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onEditItem: function () {
            if (!this._editDialog) {
                this._editDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "my.namespace.view.EditDialog",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            this._editDialog.then(function (oDialog) {
                var oSelectedItem = this.getView().getModel("view").getProperty("/selectedItem");
                oDialog.setBindingContext(this.getView().getModel().createBindingContext(`/Items(${oSelectedItem.ID})`));
                oDialog.open();
            }.bind(this));
        },

        onSelectionChange: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("rowContext");
            this.getView().getModel("view").setProperty("/selectedItem", oSelectedItem ? oSelectedItem.getObject() : null);
        }
    });
});

