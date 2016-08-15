<ark-tab content="tab-manage" icon="rss" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.destrivution-project-manage')
    @push('tab-item')
    <div id="tab-manage" class="row align-center +margin-top">

        <div class="small-10 columns segment --large-padding">

            <ark-form action="{{ route('project.manage.update', $project) }}" method="patch" enctype="multipart/form-data">

                <ark-input name="name" label="@lang('project.name')">{{ $project->name }}</ark-input>

                <ark-fields>
                    <ark-input type="file" name="poster" label="@lang('project.destrictuion-upload-image')"></ark-input>
                    <ark-input type="file" name="trailer" label="@lang('project.destrictuion-upload-video')"></ark-input>
                </ark-fields>

                <ark-textarea name="description" :rows="3"
                              label="@lang('project.destrivution-short-description')">{{ $project->stage->description }}</ark-textarea>

                <ark-textarea rich-text name="full_description"
                              label="@lang('project.destrivution-full-description')">{{ $project->stage->full_description }}</ark-textarea>

                <ark-button color="success">@lang('project.funding-description-save')</ark-button>

            </ark-form>

        </div>

    </div>
    @endpush
</ark-tab>

@push('styles')
<link rel="stylesheet" media="all" href="{{ asset('css/plugins/medium/medium.css') }}">
@endpush

@push('scripts')
<script src="{{ asset('js/plugins/Medium.js') }}"></script>
@endpush
