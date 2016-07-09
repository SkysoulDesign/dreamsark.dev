<?php

namespace SkysoulDesign\Translation\Jobs;

use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Collection;
use Illuminate\Translation\Translator;
use SkysoulDesign\Translation\Models\Group;
use SkysoulDesign\Translation\Models\Language;
use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;
use Symfony\Component\Finder\Finder;

class ScanKeysAndImportJob extends Job
{
    use DispatchesJobs;

    /**
     * ScanKeysAndImportJob constructor.
     */
    public function __construct()
    {
    }

    public function handle(Application $app, Translator $translator, TranslationRepositoryInterface $repository, Dispatcher $event)
    {

        /** @var Collection $groups */
        $groups = dispatch(new ImportGroupsJob());

        /** @var Collection $languages */
        $languages = dispatch(new ImportLanguagesJob());

//        $keyword = "/(?:@lang|trans)\(['\"]+(.*?)['\"]+\)/";
//        $keyword = "/(?:@lang|trans)\(['\"]([^$# {}<>]+?)['\"]\)/";
        $keyword = "/(?:@lang|trans|trans_choice)\(['\"]([^$# {}<>]+?)['\"][\),]/"; // with params used in @lang() & trans()
        /** @var Finder $finder */
        $finder = new Finder();
        $finder = $finder->files()
            ->in(
                array_merge(
                    [$app->path()],
                    $app['config']['view.paths']
                )
            )
            ->contains($keyword)
            ->name('*.php');

        /** @var Collection $keywordList */
        $keywordList = collect();
        foreach ($finder as $file) {
            preg_match_all($keyword, $file->getContents(), $output_array);
            if (!empty($output_array)) {
                collect($output_array[1])->each(function ($item) use ($keywordList) {
                    $temp = explode('.', $item);
                    if (isset($temp[1]))
                        $keywordList->push(['group' => $temp[0], 'key' => $temp[1], 'value' => null]);
                });
            }
        }
        /** @var Language $language */
        $language = $languages->where('name', 'en')->first();

        foreach ($keywordList->groupBy('group') as $groupName => $keyList) {
            /** @var Group $group */
            $group = $groups->where('name', $groupName)->first();
            if (empty($group))
                $group = dispatch(new CreateGroupJob($groupName));

            if ($group) {
                $model = $repository->fetch($language->id, $group->id);
                $database = $model->pluck('value', 'key');

                $newKeys = collect();

                $keyList->each(function ($data) use ($newKeys) {
                    $newKeys->put($data['key'], $data['value']);
                });

                $newItems = $newKeys->merge($database)->diffKeys($database)->map(function ($value, $key) use ($language, $group) {
                    return $this->dispatch(new CreateTranslationJob($language->id, $group->id, compact('key', 'value')));
                });
            }
        }
        /**
         * after inserting new keys to 'en' sync with all languages
         */
        dispatch(
            new SyncTranslationJob()
        );
    }
}