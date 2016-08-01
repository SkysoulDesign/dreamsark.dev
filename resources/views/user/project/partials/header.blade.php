<div class="project-page__header --default --animated">

    <div class="project-page__header__overlay --animated"></div>

    <div class="row align-middle +full-height +center">

        <div class="small-12 columns">
            <header class="header +color-white +text-shadow">
                @lang('project.project')
                <h1 class="+uppercase" v-cloak>
                    {{ isset($project) ? $project->name : ("{{ model.name || '". trans('project.creation')) ."'}".'}'  }}
                </h1>
            </header>
        </div>

    </div>

</div>
