var request = require("http/v4/request");
var response = require("http/v4/response");
var lifecycle = require("platform/v4/lifecycle");
var workspace = require("platform/v4/workspace");
var user = require("security/v4/user");

let size = request.getParameter("size");
if (!size) {
    size = 100;
}

let data = generateTestData(size);
updateTestData(data);
response.println("Done!");

function generateTestData(size) {
    let data = [];
    let description = "Duis vehicula, libero eget euismod tincidunt, felis nulla fermentum nunc, vitae tincidunt turpis odio ut erat. Nulla a turpis varius lectus bibendum condimentum. Nam vehicula non lectus id tempus. Etiam ac magna non felis ornare accumsan. Duis sapien enim, pulvinar ut dolor quis, efficitur semper nunc. Quisque a diam non orci vehicula malesuada. Quisque at ante est. Mauris ornare neque id mi porta suscipit. Donec felis arcu, gravida a posuere vestibulum, vehicula id odio. Curabitur id quam turpis. Etiam tempus purus nulla, dictum placerat nibh mattis ut. Nunc eget augue a metus maximus porta. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum nunc neque, dapibus a viverra sit amet, placerat in neque. Fusce purus enim, vestibulum id tellus et, finibus convallis lorem.";

    for (let i = 0; i < size; i ++) {
        let id = i + 1;
        data.push("" + id + "|John|Doe" + id + "|" + id + "|" + description + "|" + description + "|" + description + "|" + description + "|" + description + "|" + description + "|" + description + "|" + description + "|" + description + "|" + description);
    }
    return data;
}

function updateTestData(data) {
    var ws = workspace.getWorkspace("workspace");
    var project = ws.getProject("university-data");
    var file = project.createFile("STUDENTS.replace");
    file.setText(data.join("\n"));

    lifecycle.publish(user.getName(), "workspace", "university-data");
}