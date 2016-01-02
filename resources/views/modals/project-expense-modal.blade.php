<div id="project-expense-modal" class="ui modal">
    <div class="header">
        @lang('project.add-expense')
    </div>
    <div class="content">
        <form id="project-expense-form" class="ui form" method="post"
              action="{{ route('committee.project.expense.store', $review->project->id) }}">

            {{ csrf_field() }}

            @include('partials.select',
            [
                'name' => 'position',
                'translation' => 'positions',
                'collection' => $positions->where('type.name', 'expense')->lists('name', 'id')

            ])

            @include('partials.field', ['name' => 'cost', 'type' => 'text'])

            @include('partials.textarea', ['name' => 'description'])

        </form>
    </div>
    <div class="actions">
        <div class="ui black deny button">
            @lang('forms.cancel')
        </div>
        <div class="ui positive right labeled icon button">
            @lang('forms.add')
            <i class="checkmark icon ok"></i>
        </div>
    </div>
</div>