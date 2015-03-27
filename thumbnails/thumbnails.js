$.Thumbnails = function(el) {
  this.$el = $(el);
  this.gutterIdx = 0;
  var gutter = this.$gutter = this.$el.find('.gutter-images');
  this.$images = gutter.find('img');
  this.$activeImg = this.$el.find('.gutter-images img:first-child');
  this.activate(this.$activeImg);
  this.fillGutterImages();
  this.bindClicks.bind(this)();
};



$.fn.thumbnails = function() {
  return this.each(function() {
    new $.Thumbnails(this);
  });
};

$.Thumbnails.prototype = {
  activate: function($img) {
    var $clonedImg = $img.clone();
    this.$el.find('.big').html($clonedImg);
  },

  fillGutterImages: function() {
    this.$gutter.html(Array.prototype.slice.call(this.$images, this.gutterIdx, this.gutterIdx + 5));
  },

  bindClicks: function() {
    this.$gutter.on('click', 'img', function(event){
      this.$activeImg = $(event.currentTarget);
      this.activate(this.$activeImg);
    }.bind(this));
    this.$gutter.on('mouseenter', 'img', function(event){
      this.activate($(event.currentTarget));
    }.bind(this));
    this.$gutter.on('mouseleave', 'img', function(event){
      this.activate(this.$activeImg);
    }.bind(this));
    this.$el.find('a.nav').on('click', function(event){
      var button = $(event.currentTarget);
      var numImages = this.$images.length;
      if (button.text() === "<") {
        this.gutterIdx = this.gutterIdx === 0 ? 0 : this.gutterIdx - 1;
      } else {
        this.gutterIdx = this.gutterIdx === numImages - 5 ? numImages - 5 : this.gutterIdx + 1;
      }
      this.fillGutterImages();
    }.bind(this));
  }

};
