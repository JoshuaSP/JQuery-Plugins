$.fn.carousel = function() {
  return this.each(function() {
    new $.Carousel(this);
  })
};

$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.$el.find('.items img:first-child').addClass("active");
  this.$el.find('.slide-right').on('click', function(event){
    this.switchImage(1);
  }.bind(this));
  this.$el.find('.slide-left').on('click', function(event){
    this.switchImage(-1);
  }.bind(this));
};

$.Carousel.prototype = {

  switchImage: function(increment) {
    if (this.transitioning) {
      return;
    }
    this.transitioning = true;
    var images = this.$el.find('img');
    var oldImg = images.eq(this.activeIdx);
    oldImg.addClass(increment < 0 ? 'left' : 'right');
    oldImg.one("transitionend", function() {
      this.transitioning = false;
      oldImg.removeClass('active');
      oldImg.removeClass('left').removeClass('right');
    }.bind(this));
    this.activeIdx += increment;
    var len = images.length;
    this.activeIdx = (this.activeIdx + len) % len;
    var newImg = images.eq(this.activeIdx);
    newImg.addClass('active').addClass(increment > 0 ? 'left' : 'right');
    setTimeout(function() {
      newImg.removeClass('left').removeClass('right');
    }, 0);
  }
};
