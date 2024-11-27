"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BoxShadowGenerator =
/*#__PURE__*/
function () {
  function BoxShadowGenerator(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, color, colorRef, opacity, opacityRef, inset, previewBox, rule, webkitRule, mozRule) {
    _classCallCheck(this, BoxShadowGenerator);

    this.horizontal = horizontal;
    this.horizontalRef = horizontalRef;
    this.vertical = vertical;
    this.verticalRef = verticalRef;
    this.blur = blur;
    this.blurRef = blurRef;
    this.spread = spread;
    this.spreadRef = spreadRef;
    this.color = color;
    this.colorRef = colorRef;
    this.opacity = opacity;
    this.opacityRef = opacityRef;
    this.inset = inset;
    this.insetRef = inset.checked;
    this.previewBox = previewBox;
    this.rule = rule;
    this.webkitRule = webkitRule;
    this.mozRule = mozRule;
  }

  _createClass(BoxShadowGenerator, [{
    key: "initialize",
    value: function initialize() {
      this.horizontalRef.value = this.horizontal.value;
      this.verticalRef.value = this.vertical.value;
      this.blurRef.value = this.blur.value;
      this.spreadRef.value = this.spread.value;
      this.colorRef.value = this.color.value;
      this.opacityRef.value = this.opacity.value;
      this.applyRule();
      this.showRule();
    }
  }, {
    key: "updateValue",
    value: function updateValue(type, value) {
      switch (type) {
        case "horizontal":
          this.horizontalRef.value = value;
          break;

        case "vertical":
          this.verticalRef.value = value;
          break;

        case "spread":
          this.spreadRef.value = value;
          break;

        case "blur":
          this.blurRef.value = value;
          break;

        case "color":
          this.colorRef.value = value;
          break;

        case "opacity":
          this.opacityRef.value = value;
          break;

        case "inset":
          this.insetRef = value;
          break;
      }

      this.applyRule();
      this.showRule();
    }
  }, {
    key: "applyRule",
    value: function applyRule() {
      var rgbValue = this.hexToRgb(this.colorRef.value);
      var shadowRule = "".concat(this.insetRef ? "inset" : "", " ").concat(this.horizontalRef.value, "px ").concat(this.verticalRef.value, "px ").concat(this.blurRef.value, "px ").concat(this.spreadRef.value, "px rgba(").concat(rgbValue, ", ").concat(this.opacityRef.value, ")");
      this.previewBox.style.boxShadow = shadowRule;
      this.currentRule = shadowRule;
    }
  }, {
    key: "showRule",
    value: function showRule() {
      var ruleWithSemiColon = "".concat(this.currentRule, ";");
      this.rule.innerText = ruleWithSemiColon;
      this.webkitRule.innerText = ruleWithSemiColon;
      this.mozRule.innerText = ruleWithSemiColon;
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      return "".concat("0x" + hex[1] + hex[2] | 0, ", ").concat("0x" + hex[3] + hex[4] | 0, ", ").concat("0x" + hex[5] + hex[6] | 0);
    }
  }]);

  return BoxShadowGenerator;
}(); // Selecionar elementos


var horizontal = document.querySelector("#horizontal");
var horizontalRef = document.querySelector("#horizontal-value");
var vertical = document.querySelector("#vertical");
var verticalRef = document.querySelector("#vertical-value");
var blur = document.querySelector("#blur");
var blurRef = document.querySelector("#blur-value");
var spread = document.querySelector("#spread");
var spreadRef = document.querySelector("#spread-value");
var previewBox = document.querySelector("#box");
var color = document.querySelector("#color");
var colorRef = document.querySelector("#color-value");
var opacity = document.querySelector("#opacity");
var opacityRef = document.querySelector("#opacity-value");
var inset = document.querySelector("#inset");
var rule = document.querySelector("#rule span");
var webkitRule = document.querySelector("#webkit-rule span");
var mozRule = document.querySelector("#moz-rule span");
var boxShadow = new BoxShadowGenerator(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, color, colorRef, opacity, opacityRef, inset, previewBox, rule, webkitRule, mozRule);
boxShadow.initialize(); // Eventos

horizontal.addEventListener("input", function (e) {
  var value = e.target.value;
  boxShadow.updateValue("horizontal", value);
});
vertical.addEventListener("input", function (e) {
  var value = e.target.value;
  boxShadow.updateValue("vertical", value);
});
blur.addEventListener("input", function (e) {
  var value = e.target.value;
  boxShadow.updateValue("blur", value);
});
spread.addEventListener("input", function (e) {
  var value = e.target.value;
  boxShadow.updateValue("spread", value);
});
color.addEventListener("input", function (e) {
  var value = e.target.value;
  boxShadow.updateValue("color", value);
});
opacity.addEventListener("input", function (e) {
  var value = e.target.value;
  boxShadow.updateValue("opacity", value);
});
inset.addEventListener("input", function (e) {
  var value = e.target.checked;
  boxShadow.updateValue("inset", value);
}); // Copiar regra

var rulesArea = document.querySelector("#rules-area");
var copyInstructions = document.querySelector("#copy-instructions");
rulesArea.addEventListener("click", function () {
  var rules = rulesArea.innerText.replace(/^\s*\n/gm, "");
  navigator.clipboard.writeText(rules).then(function () {
    copyInstructions.innerText = "Regra copiada com sucesso!";
    setTimeout(function () {
      copyInstructions.innerText = "Clique no quadro acima para copiar as regras";
    }, 1000);
  });
});