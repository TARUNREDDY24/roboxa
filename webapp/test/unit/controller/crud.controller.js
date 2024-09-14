/*global QUnit*/

sap.ui.define([
	"project2/controller/crud.controller"
], function (Controller) {
	"use strict";

	QUnit.module("crud Controller");

	QUnit.test("I should test the crud controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
