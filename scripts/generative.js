function loadGenProjects() {
    $.getJSON("generative.json", function(json) {
        json.projects.forEach((proj, index) => {
            // Determine which column this should go in
            const col = "col" + (index % 2 + 1);

            const columns = $('<div class="columns is-desktop is-vcentered">');

            var image = $(`<img src="generative/${proj.image}">`);
            var figure = $('<figure class="image is-128x128">').html(image);
            var imageCol = $('<div class="column">').html(figure);

            var title = $(`<h1 class="title">${proj.title}</h1>`);
            var titleCol = $('<div class="column">').html(title);

            var desc = $(`<p class="${proj.description}">Gens</p>`);
            var descCol = $('<div class="column">').html(desc);

            columns.append(imageCol).append(titleCol).append(descCol);

            var box = $('<div class="box">').html(columns);
            $("#" + col).append(box);
        });
    })
}