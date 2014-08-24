###
@namespace App.Views
@class     Pictures

@author    G. Nicolas Arroyo <g.nicolas.arroyo@gmail.com> || @gnicoarr
###

"use strict"

class App.Views.Pictures extends Backbone.View
  el: "#pictures-page"

  events:
    "tap #btn-take-picture": "takePicture"

  tpl_picture_list: _.template $("#picture-list").html()

  initialize: ->
    @listenTo @collection, "add", @render
    @

  render: ->
    @$el.find("#picture-list-wrapper").html(@tpl_picture_list({ collection: @collection.toJSON() }))
    @

  takePicture: ->
    onSuccess = (imageData) =>
      @collection.add {image_data: "data:image/jpeg;base64," + imageData}
    
    onFail = (message) ->
      alert "Failed because: " + message

    navigator.camera.getPicture onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL }
    
    #@collection.add {image_data: "data:image/jpeg;base64,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"}