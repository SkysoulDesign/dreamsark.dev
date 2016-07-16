@foreach($expenditures as $expenditure)
    <tr>
        <td>
            <h4 class="ui image header">
                <div class="content">
                    {{ $expenditure->expenditurable->name }}
                    <div class="sub header">
                        {{ (is_object($expenditure->expenditurable->profile) ? $expenditure->expenditurable->profile->display_name : '') }}
                    </div>
                </div>
            </h4>
        </td>
        <td>
            {{ $expenditure->expenditurable->description }}
        </td>
        <td>
            {{ $expenditure->expenditurable->cost }}
        </td>
    </tr>
@endforeach