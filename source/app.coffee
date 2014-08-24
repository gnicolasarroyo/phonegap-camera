App = @App = 
  version    : "0.0.1"
  Models     : {}
  Collections: {}
  Views      : {}

  Instance  :
    Collections: {}
    Views      : {}


#onDeviceReady = () ->
#  App.Instance.Views.Pictures = new App.Views.Pictures()


#document.addEventListener "deviceready", onDeviceReady, false

$ () ->
  App.Instance.Collections.Picture = new App.Collections.Picture()
  App.Instance.Views.Pictures = new App.Views.Pictures
    collection: App.Instance.Collections.Picture
