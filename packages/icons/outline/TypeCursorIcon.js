const React = require("react");

function TypeCursorIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, props), /*#__PURE__*/React.createElement("g", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    clipPath: "url(#a)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 18.748v-13.5M7.5 23.248a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5M7.5.748a4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1 4.5-4.5"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "a"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M0 0h24v24H0z"
  }))));
}

module.exports = TypeCursorIcon;