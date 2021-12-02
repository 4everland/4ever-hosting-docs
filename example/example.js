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
      body.push({ h3: "Endpoint" });
      body.push({ path: [item.method, item.path] });
    }

    if (item.req_headers.length > 0) {
      const keys = ["name", "value", "required"];
      body.push({ h3: "Request Headers" });
      body.push({
        table: headerTable(keys, item.req_headers),
      });
    }
    if (item.req_query.length > 0) {
      const keys = ["name", "required", "desc"];
      body.push({ h3: "Request Query" });
      body.push({
        table: headerTable(keys, item.req_query),
      });
    }
    if (item.req_body_form.length > 0) {
      const keys = ["name", "type", "required"];
      body.push({ h3: "Request Body" });
      body.push({
        table: headerTable(keys, item.req_body_form),
      });
    }
    if (item.markdown) {
      body.push({ markDown: item.markdown });
    }
  });
  let arr = [{ h1: ele.name }, ...body];
  let md = json2md(arr);
  fs.writeFile("src/api/cli/" + ele.name + ".md", md, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file " + ele.name + ".md was saved!");
  });
});

function headerTable(keys, list) {
  let headers = keys;
  let rows = [];
  list.forEach((ele) => {
    let obj = {};
    headers.forEach((key) => {
      if (key == "required") {
        ele[key] = ele[key] === "1" ? "true" : "false";
      }
      if (ele[key]) {
        obj[key] = ele[key];
      } else {
        obj[key] = "";
      }
    });
    rows.push(obj);
  });
  return {
    headers,
    rows,
  };
}

function bodyTable(obj) {
  let headers = ["name", "type", "required"];
  let rows = [];
  list.forEach((ele) => {
    let obj = {};
    headers.forEach((key) => {
      if (key == "required") {
        ele[key] = ele[key] === "1" ? "true" : "false";
      }
      if (ele[key]) {
        obj[key] = ele[key];
      } else {
        obj[key] = "";
      }
    });
    rows.push(obj);
  });
  return {
    headers,
    rows,
  };
}
