function loadProjects() {
    const columnCount = 3;
    $.getJSON("generative.json", function(json) {
        var columns = $('<div class="columns is-desktop has-text-centered">');
        json.projects.forEach((proj, index) => {
            // Determine which column this should go in
            var columnNumber = index % columnCount + 1;

            var column = $('<div class="column">');
            var anchor = $(`<a href=${proj.link} target="_blank" rel="noopener noreferrer">`);
            var box = $('<div class="box">');
            var image = $('<figure class="image">').append($(`<img src="generative/${proj.image}">`));
            var title = $(`<h1 class="title">${proj.title}</h1>`);
            var desc = $(`<p>${proj.description}</p>`);
            var tags = $('<div class="tags">');
            var tags = $(`<span class="tag is-light is-danger">${proj.tag}</span><span class="tag is-light is-link">${proj.language}</span>`);

            box.append(image).append(title).append(desc).append(tags);
            column.append(anchor.append(box));
            columns.append(column);

            if (columnNumber == columnCount || index == json.projects.length - 1) {
                while (columnNumber < columnCount) {
                    columns.append($('<div class="column">'));
                    columnNumber++;
                    console.log("in loop")
                }
                $("#projects").append(columns);

                columns = $('<div class="columns is-desktop has-text-centered">');
            }
        });
    })
}