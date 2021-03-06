(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pageTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"filterTemplate"),depth0,{"name":"filterTemplate","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"postTemplate"),depth0,{"name":"postTemplate","data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "    <button type=\"button\" id=\"add-hike-button\"><i class=\"fas fa-plus\"></i></button>\r\n\r\n    <div id=\"modal-backdrop\" class=\"hidden\"></div>\r\n    <div id=\"add-hike-modal\" class=\"hidden\">\r\n      <div class=\"modal-dialog\">\r\n\r\n        <div class=\"modal-header\">\r\n          <h3>Add Your Favourite Hike</h3>\r\n          <button type=\"button\" id=\"modal-close\" class=\"modal-hide-button\">&times;</button>\r\n        </div>\r\n\r\n        <div class=\"modal-body\">\r\n\r\n          <div class=\"post-input-element\">\r\n            <label for=\"post-name-input\">Name</label>\r\n            <input type=\"text\" id=\"post-name-input\"></input>\r\n          </div>\r\n\r\n          <div class=\"post-input-element\">\r\n            <label for=\"post-photo-input\">Photo URL</label>\r\n            <input type=\"text\" id=\"post-photo-input\">\r\n          </div>\r\n\r\n          <div class=\"post-input-element\">\r\n            <label for=\"post-length-input\">Length (km)</label>\r\n            <input type=\"number\" id=\"post-length-input\">\r\n          </div>\r\n\r\n          <div class=\"post-input-element\">\r\n            <label for=\"post-type-input\">Type</label>\r\n            <input type=\"text\" id=\"post-type-input\">\r\n          </div>\r\n\r\n          <div class=\"post-input-element\">\r\n            <fieldset id=\"post-difficulty-fieldset\" class=\"post-fieldset\">\r\n              <legend>Difficulty</legend>\r\n              <div>\r\n                <input type=\"radio\" name=\"post-difficulty\" id=\"post-difficulty-beginner\" value=\"beginner\" checked>\r\n                <label for=\"post-difficulty-beginner\">Beginner</label>\r\n              </div>\r\n              <div>\r\n                <input type=\"radio\" name=\"post-difficulty\" id=\"post-difficulty-amateur\" value=\"amateur\">\r\n                <label for=\"post-difficulty-amateur\">Amateur</label>\r\n              </div>\r\n              <div>\r\n                <input type=\"radio\" name=\"post-difficulty\" id=\"post-difficulty-intermediate\" value=\"intermediate\">\r\n                <label for=\"post-difficulty-intermediate\">Intermediate</label>\r\n              </div>\r\n              <div>\r\n                <input type=\"radio\" name=\"post-difficulty\" id=\"post-difficulty-experienced\" value=\"experienced\">\r\n                <label for=\"post-difficulty-experienced\">Experienced</label>\r\n              </div>\r\n              <div>\r\n                <input type=\"radio\" name=\"post-difficulty\" id=\"post-difficulty-veteran\" value=\"veteran\">\r\n                <label for=\"post-difficulty-veteran\">Veteran</label>\r\n              </div>\r\n            </fieldset>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" id=\"modal-cancel\" class=\"modal-hide-button action-button\">Cancel</button>\r\n          <button type=\"button\" id=\"modal-accept\" class=\"action-button\">Add Hike</button>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\r\n<html>\r\n<script src=\"/pageTemplate.js\" charset =\"utf-8\" defer></script>\r\n<!-- <script src = \"handlebars-v4.7.6.js\"></script> -->\r\n<link href=\"https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab:100\" rel=\"stylesheet\">\r\n\r\n<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.15.1/css/all.css\" crossorigin=\"anonymous\">\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js\" charset=\"utf-8\" defer></script>\r\n<!-- <script src=\"https://cdn.jsdelivr.net/npm/handlebars@4.7.6/runtime.js\" charset=\"utf-8\" defer></script> -->\r\n<script src=\"https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js\"></script>\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"websiteHeaderTemplate"),depth0,{"name":"websiteHeaderTemplate","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n    <main class=\"content\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"show") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":6},"end":{"line":16,"column":13}}})) != null ? stack1 : "")
    + "      <section id=\"posts\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"posts") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":8},"end":{"line":21,"column":17}}})) != null ? stack1 : "")
    + "\r\n      </section>\r\n\r\n    </main>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"show") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":4},"end":{"line":95,"column":11}}})) != null ? stack1 : "")
    + "\r\n  </body>\r\n</html>\r\n";
},"usePartial":true,"useData":true});
})();