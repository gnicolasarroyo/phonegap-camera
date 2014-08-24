###
@namespace App.Models
@class     Picture

@author    G. Nicolas Arroyo <g.nicolas.arroyo@gmail.com> || @gnicoarr
###

"use strict"

class App.Models.Picture extends Backbone.Model
  defaults:
    date: new Date()
    image_data: ""