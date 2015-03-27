$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.attr("data-content-tabs"));
  this.$el.on("click", 'a', this.clickTab.bind(this));
 };

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

$.Tabs.prototype.clickTab = function(event) {
  event.preventDefault();
  this.$activeTab = this.$contentTabs.find(".tab-pane.active");
  this.$activeTab.removeClass("active").addClass("transitioning");
  this.$el.find(".active").removeClass("active");
  var newLink = $(event.currentTarget).addClass("active");
  this.$newTab = $(newLink.attr("href"));
  this.$activeTab.one("transitionend", function(event) {
    this.$activeTab.removeClass("transitioning");
    this.$activeTab = this.$newTab;
    this.$activeTab.addClass('active');
  }.bind(this));
};



  // setTimeout( function(){
  //   var newLink = $(event.currentTarget).addClass("active");
  //   $(newLink.attr("href")).addClass("active");
  // }, 500);
