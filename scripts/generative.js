function loadGenProjects() {
    $.getJSON("generative.json", function(json) {
        json.projects.forEach((proj, index) => {
            // Determine which column this should go in
            const col = "col" + (index % 2 + 1);

            const columns = $('<div class="columns is-desktop is-vcentered">');

            var image = $(`<img src="generative/${proj.image}">`);
            var figure = $('<figure class="image">').append(image);
            var imageCol = $('<div class="column">').append(figure);

            var title = $(`<h1 class="title">${proj.title}</h1>`);
            var desc = $(`<p>${proj.description}</p>`);

            var descCol = $('<div class="column">');
            descCol.append(title);
            descCol.append(desc);

            columns.append(imageCol).append(descCol);

            var box = $('<div class="box">').html(columns);

            var link = $(`<a href=${proj.link} target="_blank" rel="noopener noreferrer">`).html(box);
            $("#" + col).append(link);
        });
    })
}