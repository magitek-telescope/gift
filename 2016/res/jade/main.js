function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (caption, id, image, name) {
var jade_indent = [];
jade_mixins["card"] = jade_interp = function(id, image, name, caption){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("\n");
buf.push.apply(buf, jade_indent);
buf.push("<article" + (jade.attr("data-id", id, true, false)) + " class=\"card\">\n  ");
buf.push.apply(buf, jade_indent);
buf.push("<div" + (jade.attr("style", 'background-image:url('+ image + ');', true, false)) + " class=\"card-image imagebox\"></div>\n  ");
buf.push.apply(buf, jade_indent);
buf.push("<div class=\"card-caption\">\n    ");
buf.push.apply(buf, jade_indent);
buf.push("<h1 class=\"card-title\">" + (null == (jade_interp = name) ? "" : jade_interp) + "\n    ");
buf.push.apply(buf, jade_indent);
buf.push("</h1>\n    ");
buf.push.apply(buf, jade_indent);
buf.push("<p>" + (null == (jade_interp = caption) ? "" : jade_interp) + "\n    ");
buf.push.apply(buf, jade_indent);
buf.push("</p>\n  ");
buf.push.apply(buf, jade_indent);
buf.push("</div>\n");
buf.push.apply(buf, jade_indent);
buf.push("</article>");
};
jade_indent.push('');
jade_mixins["card"](id, image, name, caption);
jade_indent.pop();}.call(this,"caption" in locals_for_with?locals_for_with.caption:typeof caption!=="undefined"?caption:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"image" in locals_for_with?locals_for_with.image:typeof image!=="undefined"?image:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
}