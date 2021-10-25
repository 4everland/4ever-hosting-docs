const json2md = require("json2md");
const fs = require("fs");
const API = require("./api.json");
json2md.converters.markDown = function(markDown) {
  return markDown;
};

json2md.converters.path = function(inptu) {
  return "```\n" + inptu[0] + ` ` + inptu[1] + "\n```";
};
API.forEach((ele, index) => {
  let body = [];
  ele.list.forEach((item, index) => {
    body.push({ h2: item.title });
    if (item.path) {
      body.push({ p: "**Endpoint**" });
      body.push({ path: [item.method, item.path] });
    }
    if (item.markdown) {
      body.push({ markDown: item.markdown });
    }
    if (item.req_query.length > 0) {
      body.push({ p: "**Request Parameters**" });
      body.push({
        table: {
          headers: ["Key", "Required", "Description"],
          rows: [{ Key: "col1", Required: "col2", Description: "col3" }],
        },
      });
    }
  });
  let arr = [{ h1: ele.name }, ...body];
  let md = json2md(arr);
  fs.writeFile("src/api/" + ele.name + ".md", md, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file " + ele.name + ".md was saved!");
  });
});
