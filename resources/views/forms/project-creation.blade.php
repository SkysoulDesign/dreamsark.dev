<form class="ui form warning error" action="{{ route('user.project.store') }}" method="post">

    {!! csrf_field() !!}

    <table class="ui celled striped table">
        <thead>
        <tr>
            <th colspan="3">
                Project Cast
            </th>
        </tr>
        </thead>
        <tbody id="td-body">

        </tbody>
    </table>

    <div class="ui tall stacked segment">
        <div class="ui fluid action input">
            <input id="name" type="text" placeholder="Name...">
            <select id="cast" class="ui compact selection dropdown">
                <option value="main-actor">Main Actor</option>
                <option value="main-actress">Main Actress</option>
                <option value="actor">Actor</option>
                <option value="actress">Actress</option>
            </select>

            <div id="add-cast" class="ui button">Add</div>
        </div>

        <script>
            document.getElementById('add-cast').addEventListener('click', function () {
                var e = document.getElementById("cast");
                var option = e.options[e.selectedIndex].value;
                var name = document.getElementById("name").value;
                var table = document.getElementById("td-body");
                var input = '<input class="ui transparent input" name="casts[]" type="text" value="' + name + '">';
                var hidden = '<input name="casts-position[]" type="hidden" value="' + option + '">';
                var salaryInput = '<input placeholder="Expected Salary" class="ui transparent input" name="casts-salary[]" type="text">';
                var template = '<tr><td>' + input + '</td><td>' + salaryInput + '</td><td>' + option + hidden + '</td></tr>'
                table.insertAdjacentHTML('beforeend', template)
            })
        </script>

    </div>

    <table class="ui celled striped table">
        <thead>
        <tr>
            <th colspan="3">
                Project Crew
            </th>
        </tr>
        </thead>
        <tbody id="td-body-crew">

        </tbody>
    </table>

    <div class="ui tall stacked segment">
        <div class="ui fluid action input">
            <input id="salary-crew" type="text" placeholder="Expected Salary...">
            <select id="crew" class="ui compact selection dropdown">
                <option value="camera-man">Camera Man</option>
                <option value="director">Director</option>
                <option value="designer">Designer</option>
                <option value="make-up-artist">Make-up Artist</option>
            </select>

            <div id="add-crew" class="ui button">Add</div>
        </div>

        <script>
            document.getElementById('add-crew').addEventListener('click', function () {
                var e = document.getElementById("crew");
                var option = e.options[e.selectedIndex].value;
                var salary = document.getElementById("salary-crew").value;
                var table = document.getElementById("td-body-crew");
                var hidden = '<input name="crews-position[]" type="hidden" value="' + option + '">';
                var salaryInput = '<input placeholder="Expected Salary" value="' + salary + '" class="ui transparent input" name="crews-salary[]" type="text">';
                var template = '<tr><td>' + salaryInput + '</td><td>' + option + hidden + '</td></tr>'
                table.insertAdjacentHTML('beforeend', template)
            })
        </script>

    </div>

    <button class="ui primary button" type="submit">@lang('forms.save-draft')</button>

    <a id="publish" href="#" class="ui olive button">@lang('forms.publish')</a>

    <script>
        document.getElementById('publish').addEventListener('click', function () {
            $form = this.parentElement;
            $form.action = '{{ route('project.project.store', $project->id)  }}';
            $form.submit();
        })
    </script>

</form>